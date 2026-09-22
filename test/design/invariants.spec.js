const { test, expect } = require("@playwright/test");

// `--global-theme-color` is read as an authored value (hex), while toHaveCSS
// compares computed values (rgb), so both forms are kept side by side.
const LIGHT = { accent: "#b509ac", accentRgb: "rgb(181, 9, 172)", muted: "rgb(107, 114, 128)" };
const DARK = { accent: "#2698ba", accentRgb: "rgb(38, 152, 186)", muted: "rgb(154, 154, 154)" };

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const paths = ["/", "/blog/", "/repositories/", "/cv/", "/portfolio/", "/publications/", "/projects/"];

const setTheme = (target, theme) => target.evaluate((value) => document.documentElement.setAttribute("data-theme", value), theme);

test.describe("homepage design invariants", () => {
  test("keeps the owned shell, brand, and hero contract", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toHaveClass(/hao-home-page/);
    await expect(page.locator(".hao-home-navbar-brand")).toHaveText("Zhihao LIU");
    await expect(page.locator(".hao-home--alfolio")).toHaveCount(1);

    // The hero image is the LCP element: it must stay eager, carry a real alt,
    // and reserve its box so the banner cannot shift when it loads.
    const hero = page.locator(".post > article > .profile picture");
    const img = hero.locator("img");
    await expect(img).toHaveAttribute("loading", "eager");
    await expect(img).toHaveAttribute("alt", /Portrait of Zhihao Liu/);

    const box = await img.boundingBox();
    expect(box).not.toBeNull();
    const ratio = box.width / box.height;
    expect(ratio, `hero box ratio ${ratio.toFixed(3)} should reserve the 3:4 photo`).toBeGreaterThan(0.72);
    expect(ratio).toBeLessThan(0.78);

    // Responsive images are a build-time decision: the deploy workflow disables
    // ImageMagick for pull requests that cannot affect images, and the theme then
    // emits a plain <img> with no <source>. Assert the webp srcset whenever the
    // build produced any, so production and image changes are still covered.
    const webpSources = await page.locator('source[type="image/webp"]').count();
    if (webpSources > 0) {
      await expect(hero.locator('source[type="image/webp"]')).toHaveAttribute("srcset", /-480\.webp/);
    } else {
      console.log("note: this build has no responsive webp variants, skipping the srcset assertion");
    }
  });

  test("keeps the optical shell and the kind-label contract", async ({ page }) => {
    await page.goto("/");

    // The shell contract from docs/HOMEPAGE_FRONTEND_GOVERNANCE.md: the navbar and
    // footer shell is deliberately 3rem wider than the content shell, which is the
    // optical compensation that puts their visible edges on the same line.
    const contentShell = await page.evaluate(() => getComputedStyle(document.querySelector('.hao-home-page > .container[role="main"]')).maxWidth);
    const navShell = await page.evaluate(() => getComputedStyle(document.querySelector(".hao-home-page #navbar > .container")).maxWidth);
    expect(contentShell).toBe("1296px"); // 81rem
    expect(navShell).toBe("1344px"); // 84rem
    expect(parseFloat(navShell) - parseFloat(contentShell)).toBe(48); // 3rem

    // The kind label used to rely on !important to out-rank `.hao-home-record p`.
    // Assert the rendered result so the cascade cannot regress silently.
    await expect(page.locator("p.hao-home-kind").first()).toHaveCSS("color", LIGHT.accentRgb);
    await expect(page.locator("p.hao-home-kind").first()).toHaveCSS("font-size", "12.48px");
    await setTheme(page, "dark");
    await expect(page.locator("p.hao-home-kind").first()).toHaveCSS("color", DARK.accentRgb);
  });

  test("uses the theme accent and an AA muted caption in both modes", async ({ page }) => {
    await page.goto("/");

    await setTheme(page, "light");
    const lightAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim());
    expect(lightAccent).toBe(LIGHT.accent);
    await expect(page.locator(".hao-home-page .more-info")).toHaveCSS("color", LIGHT.muted);

    await setTheme(page, "dark");
    const darkAccent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim());
    expect(darkAccent).toBe(DARK.accent);
    await expect(page.locator(".hao-home-page .more-info")).toHaveCSS("color", DARK.muted);
  });

  test("honours reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const animationName = await page.evaluate(() => {
      const el = document.querySelector(".hao-home--alfolio");
      return el ? getComputedStyle(el, "::before").animationName : null;
    });
    expect(animationName).toBe("none");
  });

  test("keeps focus visible on the primary actions", async ({ page }) => {
    await page.goto("/");
    const outline = await page.evaluate(() => {
      const link = document.querySelector(".hao-home-text-link, .hao-home-button, a.nav-link");
      if (!link) return null;
      link.focus();
      const { outlineWidth, outlineStyle } = getComputedStyle(link);
      return { outlineWidth, outlineStyle };
    });
    expect(outline).not.toBeNull();
    expect(outline.outlineStyle).not.toBe("none");
    expect(parseFloat(outline.outlineWidth)).toBeGreaterThan(0);
  });
});

// Programmatic scrolling still works with `overflow: hidden|clip`, so the only
// honest way to assert "this page cannot be dragged sideways" is a real wheel
// event. Decorative, clipped overflow (the homepage ambient field) must not
// count as a defect, but user-reachable horizontal scrolling is one.
const wheelX = async (target) => {
  await target.mouse.move(120, 300);
  await target.mouse.wheel(600, 0);
  await target.waitForTimeout(250);
  const x = await target.evaluate(() => window.scrollX);
  await target.evaluate(() => window.scrollTo(0, 0));
  return x;
};

const wheelY = async (target) => {
  await target.mouse.wheel(0, 600);
  await target.waitForTimeout(250);
  const y = await target.evaluate(() => window.scrollY);
  await target.evaluate(() => window.scrollTo(0, 0));
  return y;
};

test.describe("secondary page shells", () => {
  test("content lines up with the navbar on every secondary page", async ({ browser }) => {
    // The homepage is excluded on purpose: its 3rem optical compensation is a
    // documented, separately asserted contract.
    const secondaryPages = ["/portfolio/", "/repositories/", "/blog/", "/cv/", "/publications/", "/projects/", "/privacy/", "/terms/"];
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const target = await context.newPage();
    const problems = [];

    for (const path of secondaryPages) {
      await target.goto(path, { waitUntil: "domcontentloaded" });
      const edges = await target.evaluate(() => {
        const box = (selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { left: Math.round(rect.left), right: Math.round(rect.right) };
        };
        return { nav: box("#navbar > .container"), main: box('.container[role="main"]') };
      });
      if (!edges.nav || !edges.main) {
        problems.push(`${path}: navbar or content container missing`);
        continue;
      }
      if (Math.abs(edges.nav.left - edges.main.left) > 1 || Math.abs(edges.nav.right - edges.main.right) > 1) {
        problems.push(`${path}: navbar [${edges.nav.left}..${edges.nav.right}] vs content [${edges.main.left}..${edges.main.right}]`);
      }
    }

    expect(problems, problems.join("; ")).toEqual([]);
    await context.close();
  });
});

test.describe("portfolio shell", () => {
  test("keeps its wider dashboard shell, with navbar and footer in the same box", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const target = await context.newPage();
    await target.goto("/portfolio/", { waitUntil: "domcontentloaded" });

    const shell = await target.evaluate(() => {
      const box = (selector) => {
        const el = document.querySelector(selector);
        const rect = el.getBoundingClientRect();
        return { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
      };
      return {
        nav: box("#navbar > .container"),
        main: box('.container[role="main"]'),
        footer: box("footer > .container"),
      };
    });

    // 80rem, deliberately wider than the 920px reading pages: the dashboard needs
    // the canvas, so it declares its own shell instead of inheriting theirs.
    expect(shell.main.width, "the portfolio shell should stay 80rem wide").toBe(1280);
    expect(shell.nav).toEqual(shell.main);
    expect(shell.footer).toEqual(shell.main);

    await context.close();
  });
});

test.describe("consent", () => {
  test("analytics wait for a choice, and the choice is offered", async ({ browser }) => {
    // The consent library hides itself from automated browsers by default
    // (`hideFromBots` checks `navigator.webdriver`), so the dialog never renders
    // in a plain Playwright context and the assertion below would be vacuous.
    // Masking the flag and presenting a normal user agent reproduces what a real
    // visitor gets; it changes nothing about how the scripts are gated.
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    const requests = [];
    context.on("request", (request) => requests.push(request.url()));
    const page = await context.newPage();

    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(2000);

    // Nothing analytics-shaped may load before a choice.
    const beforeChoice = requests.filter((url) => /googletagmanager\.com|cloudflareinsights\.com/.test(url));
    expect(beforeChoice, `nothing may load from analytics before a choice, saw ${beforeChoice.length}`).toEqual([]);

    // The choice has to be offered, or the gate would only be a silent block.
    // `#cc-main` is an empty `position: fixed` wrapper (0x0 box), so visibility
    // has to be asserted on the dialog it contains, not on the host.
    await expect(page.locator("html")).toHaveClass(/show--consent/, { timeout: 20000 });
    await expect(page.locator("#cc-main .cm")).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole("button", { name: /accept all/i }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /reject all/i }).first()).toBeVisible();

    // Accepting has to actually release the gate, otherwise the consent choice
    // would be a permanent silent block instead of a choice.
    await page
      .getByRole("button", { name: /accept all/i })
      .first()
      .click();
    await expect
      .poll(() => requests.filter((url) => url.includes("cloudflareinsights.com")).length, {
        timeout: 30000,
        message: "the Cloudflare beacon should load once analytics is accepted",
      })
      .toBeGreaterThan(0);
    await expect
      .poll(() => requests.filter((url) => url.includes("googletagmanager.com")).length, {
        timeout: 30000,
        message: "Google Analytics should load once analytics is accepted",
      })
      .toBeGreaterThan(0);

    // Withdrawal has to be reachable, not just documented: the footer control
    // must reopen the preferences dialog after a choice is stored.
    const settings = page.getByRole("button", { name: /cookie settings/i });
    await expect(settings).toBeVisible();
    await settings.click();
    await expect(page.locator("html")).toHaveClass(/show--preferences/, { timeout: 20000 });
    await expect(page.locator("#cc-main .pm")).toBeVisible({ timeout: 20000 });

    await context.close();
  });
});

test.describe("portfolio widgets", () => {
  test("only promote the variants that are on screen", async ({ page }) => {
    await page.goto("/portfolio/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    const state = await page.evaluate(() => {
      const pending = [...document.querySelectorAll('script[type="text/tradingview"]')];
      return {
        pending: pending.length,
        promoted: pending.filter((node) => node.hasAttribute("data-promoted")).length,
      };
    });

    // The page ships every widget once per theme and once per analysis symbol.
    expect(state.pending).toBeGreaterThanOrEqual(12);
    expect(state.promoted, "at least the widgets in the default tab must load").toBeGreaterThan(0);
    expect(state.pending, `only visible variants may load, but ${state.promoted} of ${state.pending} were promoted`).toBeGreaterThan(
      state.promoted * 3
    );
  });
});

test.describe("CV detail rows", () => {
  test("stack on small screens so long values never break mid-token", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 320, height: 800 } });
    const target = await context.newPage();
    await target.goto("/cv/", { waitUntil: "domcontentloaded" });

    const data = await target.evaluate(() => {
      const table = document.querySelector("table.table-cv");
      const card = table.closest(".card").getBoundingClientRect();
      const cells = [...table.querySelectorAll("td")].map((cell) => {
        const rect = cell.getBoundingClientRect();
        const style = getComputedStyle(cell);
        return {
          text: (cell.textContent || "").trim(),
          x: Math.round(rect.left),
          right: Math.round(rect.right),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Number(rect.height.toFixed(1)),
          lineHeight: parseFloat(style.lineHeight),
          display: style.display,
        };
      });
      return { cardLeft: Math.round(card.left), cardRight: Math.round(card.right), cells };
    });

    expect(data.cells.length).toBeGreaterThanOrEqual(6);

    // Label above value, both full width: two columns cannot fit the longest
    // value at this width without breaking it mid-token.
    for (let i = 0; i + 1 < data.cells.length; i += 2) {
      const [label, value] = [data.cells[i], data.cells[i + 1]];
      expect(label.display, `${label.text} should be stacked`).toBe("block");
      expect(value.display, `${value.text} should be stacked`).toBe("block");
      expect(Math.abs(label.width - value.width)).toBeLessThanOrEqual(2);
      expect(value.y, `${value.text} should sit below ${label.text}`).toBeGreaterThan(label.y);
    }

    for (const cell of data.cells) {
      expect(cell.x, `${cell.text} must stay inside the card`).toBeGreaterThanOrEqual(data.cardLeft);
      expect(cell.right, `${cell.text} must stay inside the card`).toBeLessThanOrEqual(data.cardRight);
      expect(cell.height, `${cell.text} should render on one line`).toBeLessThanOrEqual(cell.lineHeight * 1.5);
    }

    await context.close();
  });
});

test.describe("pages cannot be scrolled sideways", () => {
  test("every page fits every breakpoint", async ({ browser }) => {
    const problems = [];
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
      const target = await context.newPage();
      for (const path of paths) {
        await target.goto(path, { waitUntil: "domcontentloaded" });
        const sideways = await wheelX(target);
        if (sideways > 0) problems.push(`${path} scrolls sideways by ${sideways}px at ${viewport.name}`);
        // Guard against passing because vertical scrolling broke instead.
        if (path === "/" && viewport.name === "mobile-320" && (await wheelY(target)) === 0) {
          problems.push("the homepage no longer scrolls vertically at mobile-320");
        }
      }
      await context.close();
    }
    expect(problems, problems.join("; ")).toEqual([]);
  });
});
