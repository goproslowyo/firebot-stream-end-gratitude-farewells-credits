import type { CreditsModel } from "./model";
import { renderCreditsView } from "./render";

const sample: CreditsModel = {
  blocks: [
    {
      type: "follow",
      title: "Followers",
      credits: [
        { type: "follow", username: "alice" },
        { type: "follow", username: "bob" },
      ],
    },
    {
      type: "cheer",
      title: "Cheers",
      credits: [{ type: "cheer", username: "carol", amount: 250 }],
    },
  ],
};

describe("renderCreditsView (scroll)", () => {
  it("renders a full HTML document", () => {
    const html = renderCreditsView(sample);
    expect(html.toLowerCase().startsWith("<!doctype html>")).toBe(true);
    expect(html.toLowerCase()).toContain("</html>");
  });

  it("renders every block title and username", () => {
    const html = renderCreditsView(sample);
    expect(html).toContain("Followers");
    expect(html).toContain("alice");
    expect(html).toContain("bob");
    expect(html).toContain("Cheers");
    expect(html).toContain("carol");
  });

  it("renders the amount when a credit has one", () => {
    expect(renderCreditsView(sample)).toContain("250");
  });

  it("reflects the scroll display mode", () => {
    expect(renderCreditsView(sample, { mode: "scroll" })).toContain('data-mode="scroll"');
  });

  it("keeps underscores in usernames (no markdown stripping in the HTML view)", () => {
    const model: CreditsModel = {
      blocks: [
        {
          type: "follow",
          title: "Followers",
          credits: [
            { type: "follow", username: "holms_b" },
            { type: "follow", username: "orbitalgun__" },
          ],
        },
      ],
    };
    const html = renderCreditsView(model);
    expect(html).toContain("holms_b");
    expect(html).toContain("orbitalgun__");
  });

  it("escapes HTML in usernames to prevent injection", () => {
    const model: CreditsModel = {
      blocks: [
        {
          type: "follow",
          title: "Followers",
          credits: [{ type: "follow", username: "<script>x" }],
        },
      ],
    };
    const html = renderCreditsView(model);
    expect(html).not.toContain("<script>x");
    expect(html).toContain("&lt;script&gt;x");
  });

  it("links the themeable stylesheet served on the route", () => {
    expect(renderCreditsView(sample)).toContain(
      'href="/integrations/stream-end-credits/theme.css"',
    );
  });
});

describe("renderCreditsView film flourish cards", () => {
  it("frames the credits with an intro and an outro flourish card", () => {
    const html = renderCreditsView(sample);
    expect(html).toContain("flourish--intro");
    expect(html).toContain("flourish--outro");
    expect(html).toContain("In Glorious Twitchicolor");
    expect(html).toContain("The End");
  });

  it("orders intro card → credit blocks → outro card", () => {
    const html = renderCreditsView(sample);
    expect(html.indexOf("flourish--intro")).toBeLessThan(html.indexOf("Followers"));
    expect(html.indexOf("Followers")).toBeLessThan(html.indexOf("flourish--outro"));
  });

  it("uses a sensible default title when none is configured", () => {
    // The default studio name contains an apostrophe, which is HTML-escaped in the output.
    expect(renderCreditsView(sample)).toContain("Tonight&#39;s Stream");
  });

  it("renders the configured studio/tagline, HTML-escaped", () => {
    const html = renderCreditsView(sample, { title: { studio: "My Show", tagline: "Tag <3" } });
    expect(html).toContain("My Show");
    expect(html).toContain("Tag &lt;3");
    expect(html).not.toContain("Tag <3");
  });

  it("shows the flourish cards in slideshow mode too (as slides)", () => {
    const html = renderCreditsView(sample, { mode: "slideshow" });
    expect(html).toContain("credits-slide flourish flourish--intro");
    expect(html).toContain("credits-slide flourish flourish--outro");
  });
});

describe("renderCreditsView timing (tunable via script params)", () => {
  it("emits the default crawl speed and slide dwell as body attributes when none configured", () => {
    const html = renderCreditsView(sample);
    expect(html).toContain('data-scroll-speed="60"');
    expect(html).toContain('data-slide-seconds="5"');
  });

  it("emits the configured crawl speed and slide dwell", () => {
    const html = renderCreditsView(sample, { timing: { scrollPxPerSecond: 120, slideSeconds: 8 } });
    expect(html).toContain('data-scroll-speed="120"');
    expect(html).toContain('data-slide-seconds="8"');
  });

  it("clamps out-of-range and garbage timing to sane bounds, falling back per field", () => {
    const html = renderCreditsView(sample, {
      // 0 px/s would freeze the roll; 9999 would be unreadable; NaN/undefined fall back.
      timing: { scrollPxPerSecond: 0, slideSeconds: 9999 },
    });
    expect(html).toContain('data-scroll-speed="10"'); // clamped up to SCROLL_PX_MIN
    expect(html).toContain('data-slide-seconds="120"'); // clamped down to SLIDE_SECONDS_MAX
  });

  it("the view script reads the timing attributes (so the params actually take effect)", () => {
    const html = renderCreditsView(sample);
    expect(html).toContain('getAttribute("data-scroll-speed")');
    expect(html).toContain('getAttribute("data-slide-seconds")');
  });
});

describe("renderCreditsView (slideshow)", () => {
  it("reflects the slideshow display mode", () => {
    expect(renderCreditsView(sample, { mode: "slideshow" })).toContain('data-mode="slideshow"');
  });

  it("renders a slide per block with titles and usernames", () => {
    const html = renderCreditsView(sample, { mode: "slideshow" });
    expect(html).toContain("credits-slide");
    expect(html).toContain("Followers");
    expect(html).toContain("alice");
    expect(html).toContain("Cheers");
    expect(html).toContain("carol");
  });

  it("does not render the scroll container in slideshow mode", () => {
    expect(renderCreditsView(sample, { mode: "slideshow" })).not.toContain('id="credits-roll"');
  });
});

describe("renderCreditsView completion signal", () => {
  it("pings the complete route when the scroll finishes", () => {
    expect(renderCreditsView(sample, { mode: "scroll" })).toContain('fetch("complete"');
  });

  it("pings the complete route when the slideshow ends", () => {
    expect(renderCreditsView(sample, { mode: "slideshow" })).toContain('fetch("complete"');
  });
});
