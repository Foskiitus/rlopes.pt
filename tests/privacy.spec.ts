import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// A non-French browser language catches next-intl's former automatic session cookie.
test.use({ locale: "pt-PT" });

async function expectEmptyStorage(page: Page, context: BrowserContext) {
  expect(await context.cookies()).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
    })),
  ).toEqual({ local: [], session: [] });
}

for (const locale of ["fr", "pt", "en"]) {
  test(`${locale}: first visits use no cookies, browser storage or third-party resources`, async ({
    page,
    context,
    baseURL,
  }) => {
    const foreign: string[] = [];
    const cookieResponses: string[] = [];
    const pending: Promise<void>[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== new URL(baseURL!).origin)
        foreign.push(request.url());
    });
    page.on("response", (response) => {
      pending.push(
        response.headerValue("set-cookie").then((value) => {
          if (value) cookieResponses.push(response.url());
        }),
      );
    });
    for (const suffix of ["", "/privacy", "/legal"]) {
      const response = await page.goto(`/${locale}${suffix}`, {
        waitUntil: "networkidle",
      });
      expect(response?.status()).toBe(200);
      await expectEmptyStorage(page, context);
      await expect(page.locator("iframe")).toHaveCount(0);
    }
    await Promise.all(pending);
    expect(cookieResponses).toEqual([]);
    expect(foreign).toEqual([]);
  });

  test(`${locale}: privacy information remains readable and accessible on mobile and desktop`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/privacy`);
      await expect(page.locator("main")).toContainText("NEXT_LOCALE");
      await expect(page.locator("main")).toContainText("Netlify Forms");
      await expect(page.locator("main")).toContainText("12");
      await expect(
        page.locator('main a[href="mailto:contact@rlopes.pt"]'),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      const returnLink = page.locator("main > a");
      await returnLink.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));
    }
  });
}

for (const width of [390, 1440]) {
  test(`language choice at ${width}: keyboard, persistence, change and removal without a consent gate`, async ({
    page,
    context,
    browser,
    baseURL,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr", { waitUntil: "networkidle" });
    await expectEmptyStorage(page, context);
    const portuguese = page
      .locator("footer")
      .getByRole("link", { name: "PT — Português", exact: true });
    await portuguese.focus();
    await expect(portuguese).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/pt$/);
    const cookies = await context.cookies();
    expect(cookies).toHaveLength(1);
    expect(cookies[0]).toMatchObject({
      name: "NEXT_LOCALE",
      value: "pt",
      path: "/",
      sameSite: "Lax",
    });
    const remaining = cookies[0].expires - Date.now() / 1000;
    expect(remaining).toBeGreaterThan(31536000 - 120);
    expect(remaining).toBeLessThanOrEqual(31536000);
    // Opening another localized URL must neither change nor renew the explicit choice.
    await page.goto("/en/privacy");
    expect(await context.cookies()).toEqual(cookies);
    await page.reload();
    expect(await context.cookies()).toEqual(cookies);
    await page.goto("/");
    await expect(page).toHaveURL(/\/pt$/);
    const restored = await browser.newContext({
      storageState: await context.storageState(),
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    try {
      const returning = await restored.newPage();
      await returning.goto(baseURL!);
      await expect(returning).toHaveURL(/\/pt$/);
      const english = returning
        .locator("footer")
        .getByRole("link", { name: "EN — English", exact: true });
      await english.focus();
      await returning.keyboard.press("Enter");
      await expect(returning).toHaveURL(/\/en$/);
      expect(
        (await restored.cookies()).map((cookie) => [cookie.name, cookie.value]),
      ).toEqual([["NEXT_LOCALE", "en"]]);
      await restored.clearCookies();
      await returning.goto(baseURL!, { waitUntil: "networkidle" });
      await expect(returning).toHaveURL(/\/fr$/);
      await expectEmptyStorage(returning, restored);
    } finally {
      await restored.close();
    }
  });
}

test("navigation and form submission work when cookie persistence is unavailable", async ({
  page,
  context,
}) => {
  // Simulate a browser refusing the only application cookie write; never send a real enquiry.
  await context.addInitScript(() => {
    Object.defineProperty(Document.prototype, "cookie", {
      configurable: true,
      get: () => "",
      set: () => {},
    });
  });
  await page.goto("/fr");
  await page
    .locator("footer")
    .getByRole("link", { name: "EN — English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en$/);
  await expectEmptyStorage(page, context);
  let submitted = false;
  await page.route("**/__forms.html", async (route) => {
    expect(route.request().method()).toBe("POST");
    const fields = new URLSearchParams(route.request().postData() || "");
    expect(fields.get("form-name")).toBe("project-enquiry");
    expect(fields.get("locale")).toBe("en");
    expect(fields.has("consent")).toBe(false);
    submitted = true;
    await route.fulfill({ status: 200, body: "ok" });
  });
  await page.locator("#name").fill("Privacy test");
  await page.locator("#email").fill("audit@example.test");
  await page.locator("#project-type").selectOption("website");
  await page
    .locator("#message")
    .fill("Local privacy test with cookie persistence unavailable.");
  await expect(
    page.locator('.contact-form input[type="checkbox"]'),
  ).toHaveCount(0);
  await page.locator('.contact-form button[type="submit"]').click();
  await expect(page.locator(".form-status")).toContainText("Thank");
  expect(submitted).toBe(true);
  await expectEmptyStorage(page, context);
});
