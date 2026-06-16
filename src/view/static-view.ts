/**
 * The static placeholder "credits view": a self-contained HTML page
 * (no external assets) that proves the custom HTTP route reaches OBS across the split host.
 * The real, data-driven credits view (scroll / slideshow) replaces this.
 */
export function renderStaticCreditsView(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Credits</title>
    <style>
      :root {
        color-scheme: dark;
      }
      html,
      body {
        margin: 0;
        height: 100%;
        background: #000;
        color: #fff;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      }
      .credits-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 0.5rem;
        text-align: center;
      }
      .credits-view h1 {
        font-size: clamp(2rem, 8vw, 5rem);
        letter-spacing: 0.08em;
        margin: 0;
      }
      .credits-view p {
        opacity: 0.7;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <main class="credits-view">
      <h1>Credits</h1>
      <p>Served by stream-end-credits over Firebot's web server.</p>
    </main>
  </body>
</html>
`;
}
