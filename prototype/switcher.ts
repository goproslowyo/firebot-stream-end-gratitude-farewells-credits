/**
 * PROTOTYPE — floating variant-switcher bar injected before </body> by the preview server.
 *
 * Rendering gotcha this must survive: the base theme puts an edge-fade `mask-image` on
 * `html, body`, which would fade any fixed bottom bar to near-invisible. The bar therefore
 * uses `popover="manual"` + showPopover() — top-layer elements escape ancestor masks and
 * any theme z-index games — with a try/catch fallback to a plain fixed bar.
 *
 * All state lives in the URL (?variant=&mode=&bg=…) so switching is reload-based, shareable,
 * and restarts the roll — which is what you want when judging a theme. The ⚙ params modal
 * (S) exposes every hidden lever the server reads; it reads/writes location.search directly,
 * so the server needs no extra plumbing. Bar buttons preserve unrelated params on switch.
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

  const variantOptions = variants
    .map((v) => `<option value="${v.key}"${v.key === currentKey ? " selected" : ""}>${v.key} — ${v.name}</option>`)
    .join("");

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

  /* ---- ⚙ params modal: every hidden URL lever, toggleable (S) ---- */
  #__params {
    position: fixed;
    /* explicit inset: the popover UA default (inset:0 + margin:auto) would
       otherwise decide placement; pin it just under the switcher bar */
    top: 48px;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: min(560px, calc(100vw - 32px));
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 12px;
    padding: 14px 16px;
    background: rgba(10, 10, 14, 0.96);
    color: #f2f2f7;
    font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    text-shadow: none;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  }
  #__params h3 { margin: 0 0 10px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; }
  #__params .__grid {
    display: grid;
    grid-template-columns: max-content 1fr max-content 1fr;
    gap: 6px 10px;
    align-items: center;
  }
  #__params label { opacity: 0.8; white-space: nowrap; }
  #__params input[type="number"], #__params select, #__params textarea {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 3px 6px;
    background: rgba(255, 255, 255, 0.08);
    color: inherit;
    font: inherit;
  }
  #__params input[type="checkbox"] { justify-self: start; accent-color: #7fff9e; }
  #__params .__wide { grid-column: 1 / -1; }
  #__params textarea { min-height: 3.2em; resize: vertical; }
  #__params .__row { display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end; align-items: center; }
  #__params .__row .__note { margin-right: auto; opacity: 0.5; font-size: 11px; }
  #__params button {
    all: unset;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.12);
    font: inherit;
  }
  #__params button:hover { background: rgba(255, 255, 255, 0.25); }
  #__params #__apply { background: rgba(127, 255, 158, 0.22); color: #7fff9e; }
  #__params #__apply:hover { background: rgba(127, 255, 158, 0.35); }
</style>
<div id="__switcher" popover="manual">
  <button id="__prev" title="Previous variant (←)">←</button>
  <span class="__label">${label}</span>
  <button id="__next" title="Next variant (→)">→</button>
  <button id="__mode" title="Toggle scroll/slideshow (M)">${mode === "slideshow" ? "slides" : "scroll"}</button>
  <button id="__replay" title="Replay (R)">↻</button>
  <button id="__bg" title="Transparency check (B)" ${bg ? 'class="__on"' : ""}>bg</button>
  <button id="__gear" title="URL params (S)">⚙</button>
  <span class="__hint">←/→ variant · M mode · R replay · B bg · S params</span>
</div>
<div id="__params" popover="manual">
  <h3>URL params — applied on reload</h3>
  <div class="__grid">
    <label for="__p_variant">theme</label>
    <select id="__p_variant" class="__wide" style="grid-column: 2 / -1;">${variantOptions}</select>

    <label for="__p_mode">mode</label>
    <select id="__p_mode" data-param="mode" data-default="scroll">
      <option value="scroll">scroll</option>
      <option value="slideshow">slideshow</option>
    </select>
    <label for="__p_speed">speed px/s</label>
    <input id="__p_speed" data-param="speed" type="number" min="1" placeholder="60" />

    <label for="__p_jump">jump s</label>
    <input id="__p_jump" data-param="jump" type="number" min="0" step="0.5" placeholder="0" />
    <label for="__p_slide">slide s</label>
    <input id="__p_slide" data-param="slide" type="number" min="1" placeholder="5" />

    <label for="__p_startslide">startslide</label>
    <input id="__p_startslide" data-param="startslide" type="number" min="0" placeholder="0" />
    <label for="__p_freeze">freeze px</label>
    <input id="__p_freeze" data-param="freeze" type="number" min="0" placeholder="off" />

    <label for="__p_fpsprobe">fpsprobe s</label>
    <input id="__p_fpsprobe" data-param="fpsprobe" type="number" min="0" placeholder="off" />
    <label for="__p_bg">bg check</label>
    <input id="__p_bg" data-param="bg" type="checkbox" />

    <label for="__p_killanim">killanim</label>
    <input id="__p_killanim" data-param="killanim" type="checkbox" />
    <label for="__p_noscenery">noscenery</label>
    <input id="__p_noscenery" data-param="noscenery" type="checkbox" />

    <label for="__p_bare">bare ⚠ hides this UI</label>
    <input id="__p_bare" data-param="bare" type="checkbox" />
    <span></span><span></span>

    <label for="__p_xcss" class="__wide" style="opacity:0.8;">xcss — extra CSS injected after everything</label>
    <textarea id="__p_xcss" class="__wide" placeholder="body::before { outline: 2px solid lime; }"></textarea>
  </div>
  <div class="__row">
    <span class="__note">Esc closes · empty/default fields are dropped from the URL</span>
    <button id="__reset">reset</button>
    <button id="__apply">apply ⏎</button>
  </div>
</div>
<script>
(function () {
  var keys = ${JSON.stringify(variants.map((v) => v.key))};
  var i = ${index};
  var mode = ${JSON.stringify(mode)};
  var bg = ${bg ? "true" : "false"};

  var bar = document.getElementById("__switcher");
  var modal = document.getElementById("__params");
  try { bar.showPopover(); } catch (e) { /* pre-popover browser: fixed bar, slightly masked */ }

  // Bar buttons rewrite only their own key and keep every other lever (speed, jump,
  // xcss…) intact — switching themes mid-experiment shouldn't reset the experiment.
  function go(nextIndex, nextMode, nextBg) {
    var params = new URLSearchParams(location.search);
    params.set("variant", keys[(nextIndex + keys.length) % keys.length]);
    params.set("mode", nextMode);
    if (nextBg) params.set("bg", "1"); else params.delete("bg");
    location.search = params.toString();
  }

  function prev() { go(i - 1, mode, bg); }
  function next() { go(i + 1, mode, bg); }
  function toggleMode() { go(i, mode === "scroll" ? "slideshow" : "scroll", bg); }
  function toggleBg() { go(i, mode, !bg); }

  /* ---- params modal ---- */
  var open = false;
  function fillFromUrl() {
    var q = new URLSearchParams(location.search);
    document.getElementById("__p_variant").value = keys[i];
    modal.querySelectorAll("[data-param]").forEach(function (el) {
      var v = q.get(el.getAttribute("data-param"));
      if (el.type === "checkbox") el.checked = v === "1";
      else el.value = v !== null ? v : (el.getAttribute("data-default") || "");
    });
    document.getElementById("__p_xcss").value = q.get("xcss") || "";
  }
  function toggleModal(force) {
    open = force !== undefined ? force : !open;
    try { open ? modal.showPopover() : modal.hidePopover(); }
    catch (e) { modal.style.display = open ? "block" : "none"; }
    if (open) { fillFromUrl(); document.getElementById("__p_variant").focus(); }
  }
  function apply() {
    var params = new URLSearchParams();
    var variant = document.getElementById("__p_variant").value;
    if (variant) params.set("variant", variant);
    modal.querySelectorAll("[data-param]").forEach(function (el) {
      var name = el.getAttribute("data-param");
      if (el.type === "checkbox") { if (el.checked) params.set(name, "1"); return; }
      var v = el.value.trim();
      if (v && v !== (el.getAttribute("data-default") || "")) params.set(name, v);
    });
    var xcss = document.getElementById("__p_xcss").value.trim();
    if (xcss) params.set("xcss", xcss); // URLSearchParams handles the encoding
    location.search = params.toString();
  }
  function reset() {
    location.search = new URLSearchParams({ variant: keys[i] }).toString();
  }

  document.getElementById("__prev").addEventListener("click", prev);
  document.getElementById("__next").addEventListener("click", next);
  document.getElementById("__mode").addEventListener("click", toggleMode);
  document.getElementById("__replay").addEventListener("click", function () { location.reload(); });
  document.getElementById("__bg").addEventListener("click", toggleBg);
  document.getElementById("__gear").addEventListener("click", function () { toggleModal(); });
  document.getElementById("__apply").addEventListener("click", apply);
  document.getElementById("__reset").addEventListener("click", reset);
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") { e.preventDefault(); apply(); }
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) { toggleModal(false); return; }
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "m" || e.key === "M") toggleMode();
    else if (e.key === "r" || e.key === "R") location.reload();
    else if (e.key === "b" || e.key === "B") toggleBg();
    else if (e.key === "s" || e.key === "S") toggleModal();
  });
})();
</script>`;
}
