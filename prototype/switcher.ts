/**
 * PROTOTYPE — floating variant-switcher bar injected before </body> by the preview server.
 *
 * Rendering gotcha this must survive: the base theme puts an edge-fade `mask-image` on
 * `html, body`, which would fade any fixed bottom bar to near-invisible. The bar therefore
 * uses `popover="manual"` + showPopover() — top-layer elements escape ancestor masks and
 * any theme z-index games — with a try/catch fallback to a plain fixed bar.
 *
 * All state lives in the URL (?variant=&mode=&bg=) so switching is reload-based, shareable,
 * and restarts the roll — which is what you want when judging a theme.
 */

export interface SwitcherOptions {
  variants: ReadonlyArray<{ key: string; name: string }>;
  currentKey: string;
  mode: "scroll" | "slideshow";
  bg: boolean;
  /** The current variant's transparent-collapse CSS, applied when the bg check is on. */
  transparentOverride?: string;
}

export function buildSwitcherHtml(options: SwitcherOptions): string {
  const { variants, currentKey, mode, bg, transparentOverride } = options;
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === currentKey),
  );
  const current = variants[index];
  const label = `${index + 1}/${variants.length} · ${current.key} — ${current.name}`;

  // Background-check mode: apply the theme's documented transparent override (inline
  // <style> loses to nothing here — it comes after the linked sheet, so it wins), and
  // show a checkerboard behind all content wherever the page is actually transparent.
  const bgCheckHtml = bg
    ? `<style id="__bgcheck-override">${transparentOverride ?? ":root{--credits-bg:transparent;}"}</style>
<div id="__bgcheck" style="position:fixed;inset:0;z-index:-1;background:repeating-conic-gradient(#555 0% 25%, #888 0% 50%) 0 0 / 32px 32px;"></div>`
    : "";

  return `${bgCheckHtml}
<style>
  #__switcher {
    position: fixed;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    margin: 0;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 999px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(10, 10, 14, 0.92);
    color: #f2f2f7;
    font: 13px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    text-align: left;
    text-shadow: none;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
    z-index: 2147483647;
  }
  #__switcher button {
    all: unset;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.12);
    font: inherit;
  }
  #__switcher button:hover { background: rgba(255, 255, 255, 0.25); }
  #__switcher .__hint { opacity: 0.55; font-size: 11px; }
  #__switcher .__label { min-width: 20ch; text-align: center; }
  #__switcher .__on { color: #7fff9e; }
</style>
<div id="__switcher" popover="manual">
  <button id="__prev" title="Previous variant (←)">←</button>
  <span class="__label">${label}</span>
  <button id="__next" title="Next variant (→)">→</button>
  <button id="__mode" title="Toggle scroll/slideshow (M)">${mode === "slideshow" ? "slides" : "scroll"}</button>
  <button id="__replay" title="Replay (R)">↻</button>
  <button id="__bg" title="Transparency check (B)" ${bg ? 'class="__on"' : ""}>bg</button>
  <span class="__hint">←/→ variant · M mode · R replay · B bg</span>
</div>
<script>
(function () {
  var keys = ${JSON.stringify(variants.map((v) => v.key))};
  var i = ${index};
  var mode = ${JSON.stringify(mode)};
  var bg = ${bg ? "true" : "false"};

  var bar = document.getElementById("__switcher");
  try { bar.showPopover(); } catch (e) { /* pre-popover browser: fixed bar, slightly masked */ }

  function go(nextIndex, nextMode, nextBg) {
    var params = new URLSearchParams();
    params.set("variant", keys[(nextIndex + keys.length) % keys.length]);
    params.set("mode", nextMode);
    if (nextBg) params.set("bg", "1");
    location.search = params.toString();
  }

  function prev() { go(i - 1, mode, bg); }
  function next() { go(i + 1, mode, bg); }
  function toggleMode() { go(i, mode === "scroll" ? "slideshow" : "scroll", bg); }
  function toggleBg() { go(i, mode, !bg); }

  document.getElementById("__prev").addEventListener("click", prev);
  document.getElementById("__next").addEventListener("click", next);
  document.getElementById("__mode").addEventListener("click", toggleMode);
  document.getElementById("__replay").addEventListener("click", function () { location.reload(); });
  document.getElementById("__bg").addEventListener("click", toggleBg);

  window.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "m" || e.key === "M") toggleMode();
    else if (e.key === "r" || e.key === "R") location.reload();
    else if (e.key === "b" || e.key === "B") toggleBg();
  });
})();
</script>`;
}
