/**
 * PROTOTYPE — local theme-preview harness. Throwaway; not part of the shipped script.
 *
 * One command: `npm run preview` (or `npm run preview:watch`), then open
 * http://127.0.0.1:7473/ and flip variants with ←/→ (M mode, R replay, B bg-check).
 *
 * It renders the REAL credits pipeline (buildCreditsModel + renderCreditsView) with
 * sample data, and serves each theme variant's CSS layered after BASE_THEME_CSS on the
 * same path Firebot would (`/integrations/stream-end-credits/theme.css`) — the exact
 * cascade contract stage 2 formalizes. The view's fetch("complete") ping resolves to
 * /complete here and is answered with 204 (and logged, as a free timing sanity check).
 */
import { createServer } from "node:http";
import { CREDITS_ROUTE_PREFIX, THEME_CSS_ROUTE } from "../src/server/server";
import { buildCreditsModel } from "../src/view/model";
import { type DisplayMode, renderCreditsView } from "../src/view/render";
import { BASE_THEME_CSS } from "../src/view/theme";
import { SAMPLE_CREDITS } from "./sample-credits";
import { buildSwitcherHtml } from "./switcher";
import { VARIANTS } from "./variants";

const HOST = "127.0.0.1";
// One above Firebot's 7472 so a running Firebot never conflicts; PREVIEW_PORT
// lets parallel agents run isolated instances during theme iteration.
const PORT = Number(process.env.PREVIEW_PORT) || 7473;

/** The exact stylesheet href renderCreditsView hardcodes (rebuilt from the same constants). */
const THEME_CSS_HREF = `/integrations/${CREDITS_ROUTE_PREFIX}/${THEME_CSS_ROUTE}`;

function findVariant(key: string | null) {
  return VARIANTS.find((v) => v.key === key) ?? VARIANTS[0];
}

/**
 * Compose the preview stylesheet: variant @imports hoisted to the top (CSSOM ignores
 * non-leading @import — the base rules would otherwise kill every variant's webfonts),
 * then the base, then the variant layer so it wins the cascade.
 */
function composePreviewCss(variantKey: string, variantCss: string): string {
  const importLines: string[] = [];
  // Line-anchored and newline-free so prose mentions of "@import" inside comments never
  // match; the optional (...) group swallows the semicolons Google Fonts URLs contain
  // (wght@500;700) before we scan for the terminating semicolon.
  const rest = variantCss.replace(/^[ \t]*@import[^;()\n]*(?:\([^)\n]*\))?[^;\n]*;/gm, (line) => {
    importLines.push(line.trim());
    return "";
  });
  return `${importLines.join("\n")}
${BASE_THEME_CSS}
/* --- variant: ${variantKey} --- */
${rest}`;
}

/**
 * Fast-forward hooks for judging (and headless screenshots — Chrome's
 * --virtual-time-budget races the render-blocking stylesheet, so real-time it is):
 * `?jump=<sec>` back-dates the scroll clock so the crawl starts <sec> in;
 * `?startslide=<n>` starts the slideshow at slide n (0 = intro card).
 * Both patch the exact inline VIEW_SCRIPT text and throw if render.ts drifted.
 */
function patchScript(html: string, needle: string, replacement: string): string {
  if (!html.includes(needle)) {
    throw new Error(`preview: view-script needle not found (render.ts drifted?): ${needle}`);
  }
  return html.replace(needle, replacement);
}

function renderPage(url: URL): string {
  const variant = findVariant(url.searchParams.get("variant"));
  const mode: DisplayMode = url.searchParams.get("mode") === "slideshow" ? "slideshow" : "scroll";
  const bg = url.searchParams.get("bg") === "1";
  const speed = Number(url.searchParams.get("speed"));
  const slide = Number(url.searchParams.get("slide"));
  const jump = Number(url.searchParams.get("jump"));
  const startSlide = Number(url.searchParams.get("startslide"));
  const fpsProbe = Number(url.searchParams.get("fpsprobe"));
  const freeze = Number(url.searchParams.get("freeze"));
  // Clean-capture mode: no switcher bar, no bg checkerboard — just the pure themed view.
  const bare = url.searchParams.get("bare") === "1";

  let html = renderCreditsView(buildCreditsModel(SAMPLE_CREDITS), {
    mode,
    title: { studio: "GoProSlowYo Live" },
    timing: {
      scrollPxPerSecond: Number.isFinite(speed) && speed > 0 ? speed : undefined,
      slideSeconds: Number.isFinite(slide) && slide > 0 ? slide : undefined,
    },
  });

  // Frame-forensics lever: ?freeze=<cssPx> pins the crawl at an exact offset (no
  // animation, no rounding — the value is applied verbatim so both the snapped and
  // the fractional regimes can be reproduced deterministically for screenshot diffs).
  if (Number.isFinite(freeze) && freeze > 0) {
    html = patchScript(
      html,
      "requestAnimationFrame(frame);\n})();",
      `roll.style.transform = "translate3d(0,-${freeze}px,0)";\n})();`,
    );
  } else if (Number.isFinite(jump) && jump > 0) {
    html = patchScript(
      html,
      "if (start === null) start = now;",
      `if (start === null) start = now - ${Math.round(jump * 1000)};`,
    );
  }
  if (Number.isFinite(startSlide) && startSlide > 0) {
    html = patchScript(html, "var i = 0;", `var i = ${Math.round(startSlide)};`);
    html = patchScript(html, 'slides[0].classList.add("is-active");', "slides[i].classList.add(\"is-active\");");
  }

  // Carry the variant (and the perf-bisect killanim flag) on the stylesheet link.
  // Throw loudly if render.ts drifted — a silent miss would show the base theme
  // and lie about every variant.
  const killAnim = url.searchParams.get("killanim") === "1" ? "&killanim=1" : "";
  const linkWithVariant = `${THEME_CSS_HREF}?variant=${encodeURIComponent(variant.key)}${killAnim}`;
  if (!html.includes(THEME_CSS_HREF)) {
    throw new Error(`preview: stylesheet href ${THEME_CSS_HREF} not found in rendered HTML`);
  }
  html = html.replace(THEME_CSS_HREF, linkWithVariant);

  // Frame-time probe for the performance pass: sample rAF deltas mid-crawl and POST
  // the stats back so headless sweeps can quantify jank per variant.
  if (Number.isFinite(fpsProbe) && fpsProbe > 0) {
    const probe = `<script>
(function () {
  var SETTLE_MS = 1000, SAMPLE_MS = ${Math.round(fpsProbe * 1000)};
  var deltas = [], last = null, t0 = null;
  function tick(now) {
    if (t0 === null) t0 = now;
    if (now - t0 > SETTLE_MS) {
      if (last !== null) deltas.push(now - last);
      last = now;
    }
    if (now - t0 < SETTLE_MS + SAMPLE_MS) { requestAnimationFrame(tick); return; }
    var sorted = deltas.slice().sort(function (a, b) { return a - b; });
    var sum = deltas.reduce(function (a, b) { return a + b; }, 0);
    var pct = function (p) { return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))]; };
    var over = function (ms) { return deltas.filter(function (d) { return d > ms; }).length / deltas.length; };
    // Frame-interval histogram: on variable-refresh (ProMotion) displays the cadence
    // oscillating between refresh buckets (8.3ms vs 16.7ms) IS the judder — averages hide it.
    var hist = {};
    deltas.forEach(function (d) {
      var bucket = d < 6 ? "<6" : d < 11 ? "8" : d < 14 ? "12" : d < 20 ? "17" : d < 28 ? "25" : d < 40 ? "33" : ">40";
      hist[bucket] = (hist[bucket] || 0) + 1;
    });
    fetch("/fps-report", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variant: ${JSON.stringify(variant.key)}, mode: ${JSON.stringify(mode)},
        frames: deltas.length, avgFps: Math.round(10000 * deltas.length / sum) / 10,
        p50: Math.round(pct(0.5) * 10) / 10, p95: Math.round(pct(0.95) * 10) / 10,
        max: Math.round(Math.max.apply(null, deltas) * 10) / 10,
        pctOver20ms: Math.round(over(20) * 1000) / 10, pctOver33ms: Math.round(over(33) * 1000) / 10,
        histMs: hist, dpr: window.devicePixelRatio, ua: navigator.userAgent.indexOf("Headless") >= 0 ? "headless" : "real",
      }) }).catch(function () {});
  }
  requestAnimationFrame(tick);
})();
</script>`;
    html = html.replace("</body>", `${probe}\n</body>`);
  }

  // The switcher bar + bg checkerboard are dev chrome — skip them entirely in ?bare=1
  // (used for clean gallery screenshots).
  if (!bare) {
    const switcher = buildSwitcherHtml({
      variants: VARIANTS,
      currentKey: variant.key,
      mode,
      bg,
      transparentOverride: variant.transparentOverride,
    });
    if (!html.includes("</body>")) {
      throw new Error("preview: </body> not found in rendered HTML");
    }
    html = html.replace("</body>", `${switcher}\n</body>`);
  }

  // Perf-bisect lever: ?noscenery=1 applies the theme's transparent-collapse override
  // (scenery layers off, text identical) WITHOUT the bg-check checkerboard, for clean
  // smoothness A/B comparisons.
  if (url.searchParams.get("noscenery") === "1") {
    const override = variant.transparentOverride ?? ":root{--credits-bg:transparent;}";
    html = html.replace("</body>", `<style id="__noscenery">${override}</style>\n</body>`);
  }

  // Experiment lever: ?xcss=<url-encoded css> injects arbitrary CSS after everything,
  // so fix candidates can be A/B measured without editing theme files.
  const xcss = url.searchParams.get("xcss");
  if (xcss) {
    html = html.replace("</body>", `<style id="__xcss">${xcss}</style>\n</body>`);
  }
  return html;
}

/** Collected ?fpsprobe= reports, readable at GET /fps-report (performance pass). */
const fpsReports: unknown[] = [];

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${HOST}:${PORT}`);

    if (url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(renderPage(url));
      return;
    }

    if (url.pathname === THEME_CSS_HREF) {
      const variant = findVariant(url.searchParams.get("variant"));
      // Perf-bisect switch: measure a variant's no-animation floor.
      const killAnim =
        url.searchParams.get("killanim") === "1"
          ? "\n*, *::before, *::after { animation: none !important; transition: none !important; }\n"
          : "";
      res.writeHead(200, { "Content-Type": "text/css; charset=utf-8", "Cache-Control": "no-store" });
      res.end(composePreviewCss(variant.key, variant.css) + killAnim);
      return;
    }

    if (url.pathname === "/fps-report" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const report = JSON.parse(body);
          fpsReports.push(report);
          console.log(`[preview] fps ${JSON.stringify(report)}`);
        } catch {
          console.error("[preview] bad fps report");
        }
        res.writeHead(204);
        res.end();
      });
      return;
    }

    if (url.pathname === "/fps-report") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(fpsReports));
      return;
    }

    if (url.pathname === "/complete") {
      console.log("[preview] roll completed (view pinged /complete)");
      res.writeHead(204);
      res.end();
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("not found");
  } catch (error) {
    console.error("[preview]", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(String(error));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[preview] credits theme lab → http://${HOST}:${PORT}/`);
  console.log(`[preview] variants: ${VARIANTS.map((v) => v.key).join(", ")}`);
  console.log("[preview] keys: ←/→ variant · M mode · R replay · B transparency check");
});
