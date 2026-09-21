const { test, expect } = require("@playwright/test");

const LIGHT = { accent: "#b509ac", muted: "rgb(107, 114, 128)" };
const DARK = { accent: "#2698ba", muted: "rgb(154, 154, 154)" };

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const paths = ["/", "/blog/", "/repositories/", "/cv/", "/portfolio/", "/publications/", "/projects/"];

const setTheme = (target, theme) =>
  target.evaluate((value) => document.documentElement.setAttribute("data-theme", value), theme);

test.describe("homepage design invariants", () => {
  test("keeps the owned shell, brand, and hero contract", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toHaveClass(/hao-home-page/);
    await expect(page.locator(".hao-home-navbar-brand")).toHaveText("Zhihao LIU");
    await expect(page.locator(".hao-home--alfolio")).toHaveCount(1);

    // The hero image is the LCP element: it must stay eager, keep its webp
    // srcset, carry a real alt, and reserve its box so the banner cannot shift.
    const hero = page.locator(".post > article > .profile picture");
    await expect(hero.locator('source[type="image/webp"]')).toHaveAttribute("srcset", /-480\.webp/);
    const img = hero.locator("img");
    await expect(img).toHaveAttribute("loading", "eager");
    await expect(img).toHaveAttribute("alt", /Portrait of Zhihao Liu/);

    const box = await img.boundingBox();
    expect(box).not.toBeNull();
    const ratio = box.width / box.height;
    expect(ratio, `hero box ratio ${ratio.toFixed(3)} should reserve the 3:4 photo`).toBeGreaterThan(0.72);
    expect(ratio).toBeLessThan(0.78);
  });

  test("uses the theme accent and an AA muted caption in both modes", async ({ page }) => {
    await page.goto("/");

    await setTheme(page, "light");
    const lightAccent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim(),
    );
    expect(lightAccent).toBe(LIGHT.accent);
    await expect(page.locator(".hao-home-page .more-info")).toHaveCSS("color", LIGHT.muted);

    await setTheme(page, "dark");
    const darkAccent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim(),
    );
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
