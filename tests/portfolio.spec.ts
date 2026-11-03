import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { projects } from "../src/data/projects";
const copy = Object.fromEntries(
  ["fr", "pt", "en"].map((locale) => [
    locale,
    JSON.parse(readFileSync("messages/" + locale + ".json", "utf8")),
  ]),
);
for (const locale of ["fr", "pt", "en"]) {
  for (const width of [360, 390, 768, 1440]) {
    test(locale + " renders without overflow at " + width, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/" + locale);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        locale === "pt" ? "pt-PT" : locale,
      );
      await expect(page.locator("h1")).toContainText(copy[locale].hero.line1);
      await expect(page.locator("h1")).toContainText(copy[locale].hero.line2);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://rlopes.pt/" + locale,
      );
      expect(
        await page.locator('link[rel="alternate"][hreflang]').count(),
      ).toBe(4);
      await expect(
        page.locator('meta[property="og:description"]'),
      ).toHaveAttribute("content", copy[locale].meta.description);
      await expect(page.locator(".project-panel")).toHaveCount(3);
      await expect(page.locator(".archive-grid, details")).toHaveCount(0);
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await expect(page.locator("#email")).toBeVisible();
      if (width < 1024)
        await expect(page.locator(".is-animated")).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
  test(
    locale + " form validation, pending, success and failure",
    async ({ page }) => {
      await page.goto("/" + locale + "#contact");
      await page.locator(".contact-form").evaluate((form) => {
        form.addEventListener("focusin", (event) => {
          const field = event.target as HTMLInputElement;
          if (field.id !== "name") return;
          const errorId = field.getAttribute("aria-describedby");
          form.setAttribute(
            "data-error-at-focus",
            String(
              field.getAttribute("aria-invalid") === "true" &&
                !!errorId &&
                !!document.getElementById(errorId)?.textContent,
            ),
          );
        });
      });
      await page.locator('button[type="submit"]').click();
      await expect(page.locator("#name")).toBeFocused();
      await expect(page.locator(".contact-form")).toHaveAttribute(
        "data-error-at-focus",
        "true",
      );
      await expect(page.locator("#name-error")).toHaveText(
        copy[locale].contact.required,
      );
      await page.locator("#name").fill("Preview test");
      await page.locator("#email").fill("not-an-email");
      await page.locator("#project-type").selectOption("website");
      await page
        .locator("#message")
        .fill("A professional website for a small business.");
      await page.locator('button[type="submit"]').click();
      await expect(page.locator("#email-error")).toHaveText(
        copy[locale].contact.invalidEmail,
      );
      await page.locator("#email").fill("preview@example.com");
      await page.route("**/__forms.html", async (route) => {
        expect(route.request().method()).toBe("POST");
        expect(route.request().headers()["content-type"]).toContain(
          "application/x-www-form-urlencoded",
        );
        const payload = new URLSearchParams(route.request().postData() || "");
        expect([...payload.keys()].sort()).toEqual(
          [
            "form-name",
            "bot-field",
            "locale",
            "name",
            "email",
            "project-type",
            "message",
          ].sort(),
        );
        expect(payload.get("form-name")).toBe("project-enquiry");
        expect(payload.get("locale")).toBe(locale);
        expect(payload.get("project-type")).toBe("website");
        expect(payload.get("bot-field")).toBe("");
        await route.fulfill({ status: 500, body: "Test failure" });
      });
      await page.locator('button[type="submit"]').click();
      await expect(page.locator('.contact-form [role="alert"]')).toHaveText(
        copy[locale].contact.error,
      );
      await expect(page.locator("#message")).toHaveValue(
        "A professional website for a small business.",
      );
      await page.unroute("**/__forms.html");
      let release: () => void = () => {};
      const pending = new Promise<void>((resolve) => (release = resolve));
      await page.route("**/__forms.html", async (route) => {
        await pending;
        await route.fulfill({ status: 200, body: "Accepted by mock" });
      });
      await page.locator('button[type="submit"]').click();
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
      await expect(page.locator('button[type="submit"]')).toContainText(
        copy[locale].contact.sending,
      );
      release();
      await expect(page.locator(".form-status")).toContainText(
        copy[locale].contact.success,
      );
      await expect(page.locator(".form-status")).toBeFocused();
      await page
        .getByRole("button", {
          name: copy[locale].contact.newMessage,
          exact: true,
        })
        .click();
      await expect(page.locator("#name")).toBeFocused();
    },
  );
  test(
    locale + " accessibility of curated showcase and form",
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/" + locale);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    },
  );
}
test("root uses French fallback and remembers chosen language with section", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
  await page.goto("/fr#services");
  await page
    .locator("header")
    .getByRole("link", { name: "PT — Português", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt#services$/);
  await expect(page.locator("#services")).toBeInViewport();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await page.goto("/pt/privacy");
  await page
    .locator("header")
    .getByRole("link", { name: "EN — English", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/privacy$/);
});
test("mobile menu supports keyboard, Escape and section navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/#services$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#services")).toBeInViewport();
});
test("desktop scroll transitions both ways and exits to contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  await expect(page.locator(".work-gallery")).toHaveClass(/is-animated/);
  await page.locator(".work-gallery").evaluate((el) =>
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "instant",
    }),
  );
  const next = page.getByRole("button", { name: "Next project", exact: true });
  const prev = page.getByRole("button", {
    name: "Previous project",
    exact: true,
  });
  await next.click();
  await expect(page.locator(".project-loprim3d")).toHaveCSS("opacity", "1");
  await next.click();
  await expect(page.locator(".project-belofer")).toHaveCSS("opacity", "1");
  await expect(next).toBeDisabled();
  await prev.click();
  await expect(page.locator(".project-loprim3d")).toHaveCSS("opacity", "1");
  await prev.click();
  await expect(page.locator(".project-spooliq")).toHaveCSS("opacity", "1");
  await page
    .locator("header")
    .getByRole("link", { name: "Let’s discuss your project", exact: true })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
  await expect
    .poll(() =>
      page
        .locator("header")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(0);
});
test("desktop keyboard can reach hidden project by switching to document flow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  await expect(page.locator(".work-gallery")).toHaveClass(/is-animated/);
  await page.locator(".project-nav a").first().focus();
  await page.keyboard.press("Tab");
  await page.locator(".project-loprim3d .project-link").focus();
  await expect(page.locator(".work-gallery")).not.toHaveClass(/is-animated/);
  await expect(page.locator(".project-loprim3d .project-link")).toBeFocused();
  await expect(
    page.locator(".project-loprim3d .project-link"),
  ).toBeInViewport();
});
test("reduced motion and explicit list show every featured project", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await expect(page.locator(".is-animated")).toHaveCount(0);
  for (const id of ["spooliq", "loprim3d", "belofer"])
    await expect(page.locator(".project-" + id)).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".work-gallery")).toHaveClass(/is-animated/);
  await page
    .getByRole("button", {
      name: copy.en.work.list,
      exact: true,
    })
    .click();
  await expect(page.locator(".is-animated")).toHaveCount(0);
});
test("static blueprint, assets, sitemap, legacy redirects and localized 404", async ({
  request,
  page,
}) => {
  const html = await (await request.get("/__forms.html")).text();
  for (const name of [
    "form-name",
    "bot-field",
    "locale",
    "name",
    "email",
    "project-type",
    "message",
  ])
    expect(html).toContain('name="' + name + '"');
  expect(html).toContain('data-netlify="true"');
  for (const path of [
    "/portfolio",
    "/en/portfolio",
    "/pt/portfolio",
    "/fr/portfolio",
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toContain("#work");
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const locale of ["fr", "pt", "en"]) {
    expect(sitemap).toContain("https://rlopes.pt/" + locale);
    expect((await request.get("/og/" + locale + ".png")).ok()).toBeTruthy();
  }
  await page.goto("/en/missing-page");
  await expect(page.locator("h1")).toHaveText(copy.en.error.title);
  await page.goto("/en");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const img of await page.locator("main img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
});
test("no-JavaScript content and direct contact remain available", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/en");
  await expect(page.locator("h1")).toContainText(copy.en.hero.line1);
  await expect(page.locator(".project-panel")).toHaveCount(3);
  await expect(
    page.locator('a[href="mailto:contact@rlopes.pt"]').first(),
  ).toBeVisible();
  await expect(page.locator("noscript p")).toBeVisible();
  await context.close();
});
test("translations have identical keys and no empty strings", () => {
  function keys(value: unknown, prefix = ""): string[] {
    if (typeof value === "string") {
      expect(value.trim().length).toBeGreaterThan(0);
      return [prefix];
    }
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      keys(v, prefix + "." + k),
    );
  }
  expect(keys(copy.fr)).toEqual(keys(copy.en));
  expect(keys(copy.fr)).toEqual(keys(copy.pt));
});

for (const locale of ["fr", "pt", "en"]) {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    test(
      locale +
        " first viewport shows the intended project composition and actions at " +
        viewport.width,
      async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto("/" + locale);
        await page.evaluate(() => document.fonts.ready);
        const art = page.locator(".project-spooliq .project-art");
        const frame = (await art.boundingBox())!;
        expect(
          Math.min(frame.height, viewport.height - frame.y),
        ).toBeGreaterThan(150);
        const image = art.locator("img");
        await expect
          .poll(() =>
            image.evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
            ),
          )
          .toBeTruthy();
        await expect(page.locator(".hero .button")).toBeInViewport({
          ratio: 1,
        });
        await expect(page.locator('main img[src*="spooliq"]')).toHaveCount(1);
        await expect(page.locator(".hero-role")).toContainText(
          copy[locale].hero.role,
        );
      },
    );
  }
}

for (const locale of ["fr", "pt", "en"]) {
  test(
    locale + " curated projects preserve facts, actions and historical assets",
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/" + locale);
      const work = page.locator("#work");
      const selected = projects.filter((p) => p.featuredOrder);
      expect(selected.map((p) => p.id)).toEqual([
        "spooliq",
        "loprim3d",
        "belofer",
      ]);
      await expect(work.locator("[data-project-id]")).toHaveCount(3);
      for (const project of selected) {
        const article = work.locator('[data-project-id="' + project.id + '"]');
        await expect(
          article.getByRole("heading", { name: project.name, exact: true }),
        ).toHaveCount(1);
        await expect(article.locator(".project-description")).toHaveText(
          copy[locale].projects[project.id].description,
        );
        await expect(article.locator("img")).toHaveAttribute(
          "alt",
          copy[locale].projects[project.id].alt,
        );
        await expect(article.locator("a")).toHaveAttribute(
          "href",
          project.url || project.image,
        );
        await expect(article.locator(".archive-label")).toHaveCount(
          project.status === "archived" ? 1 : 0,
        );
      }
      await expect(work.locator(".archive-label")).toHaveText(
        copy[locale].work.archived,
      );
      await expect(
        work.locator(
          ".project-number,.image-caption,.project-topline,.project-status,.project-category,.counter-total,.archive-grid",
        ),
      ).toHaveCount(0);
      expect(await work.innerText()).not.toMatch(
        /\b(?:PHP|React|Next\.js|Tailwind|Shopify|JavaScript|20\d\d)\b/,
      );
      expect(projects).toHaveLength(9);
      for (const project of projects)
        expect(readFileSync("public" + project.image).length).toBeGreaterThan(
          0,
        );
      expect(await page.locator("main").innerText()).not.toMatch(
        /LoPrim3D|LOPRIM3D|LoPrim 3D|PhotoCelos|Tecniwall|Gestão de Stocks|Tarefas\+|Evently|TempoApp/,
      );
      await expect(page.locator(".footer-location")).toHaveText(
        copy[locale].footer.location,
      );
    },
  );
}
test("historical data distinguishes plans from recovered evidence", () => {
  const stocks = projects.find((p) => p.id === "gestao-stocks")!;
  expect(stocks.history?.started).toBe("2021");
  expect(stocks.history?.stopped).toBe("2023-01");
  expect(stocks.history?.plannedOnly).toContain("Production tracking");
  expect(stocks.history?.verifiedVisuals).not.toContain("Production tracking");
  expect(stocks.screenshot?.demonstrationData).toBe(true);
  expect(stocks.url).toBeUndefined();
  expect(
    projects.find((p) => p.id === "photocelos")?.history
      ?.approximateActiveYears,
  ).toBe(4);
  expect(projects.find((p) => p.id === "loprim3d")?.technologies).toContain(
    "Shopify",
  );
});

for (const locale of ["fr", "pt", "en"]) {
  test(
    locale + " local positioning, metadata and distinct project framing",
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const viewport of [
        { width: 1440, height: 900 },
        { width: 768, height: 1024 },
        { width: 390, height: 844 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto("/" + locale);
        await page.evaluate(() => document.fonts.ready);
        const locality = page.locator(".hero-locality");
        await expect(locality).toHaveText(copy[locale].hero.locality);
        await expect(locality).toBeInViewport({ ratio: 1 });
        await expect(locality).toContainText("La Ciotat");
        await expect(page.locator(".contact-locality")).toHaveText(
          copy[locale].contact.locality,
        );
        expect(copy[locale].contact.locality).not.toEqual(
          copy[locale].hero.locality,
        );
        const surfaces = await page
          .locator(".project-panel")
          .evaluateAll((panels) =>
            panels.map((panel) => getComputedStyle(panel).backgroundColor),
          );
        expect(new Set(surfaces).size).toBe(3);
        await expect(page.locator(".project-panel img")).toHaveCount(3);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBeTruthy();
        await expect(page).toHaveTitle(copy[locale].meta.title);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          copy[locale].meta.description,
        );
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
          "content",
          copy[locale].meta.title,
        );
        await expect(
          page.locator('meta[name="twitter:description"]'),
        ).toHaveAttribute("content", copy[locale].meta.description);
        const graph = JSON.parse(
          (await page
            .locator('script[type="application/ld+json"]')
            .textContent())!,
        )["@graph"];
        const person = graph.find(
          (node: { "@type": string }) => node["@type"] === "Person",
        );
        expect(person.jobTitle).toBe(copy[locale].hero.role);
        expect(person.address).toEqual({
          "@type": "PostalAddress",
          addressLocality: "La Ciotat",
          addressCountry: "FR",
        });
        expect(
          graph.filter((node: { address?: unknown }) => node.address),
        ).toHaveLength(1);
      }
    },
  );
}

for (const width of [360, 375, 390, 430]) {
  test(
    "V2.5 mobile composition and reading rhythm at " + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: width === 360 ? 740 : 844 });
      await page.goto("/fr");
      await page.evaluate(() => document.fonts.ready);
      const image = (await page
        .locator(".project-spooliq .project-art")
        .boundingBox())!;
      const cta = (await page.locator(".hero .button").boundingBox())!;
      expect(image.width).toBeGreaterThanOrEqual(width - 48);
      expect(image.y).toBeGreaterThan(cta.y + cta.height);
      expect(page.viewportSize()!.height - image.y).toBeGreaterThan(200);
      await expect(page.locator(".work-gallery")).not.toHaveClass(
        /is-animated/,
      );
      for (const element of await page
        .locator(
          ".project-description,.capability-list p,.about-copy>p:not(.about-role),.contact-locality",
        )
        .all()) {
        expect(
          await element.evaluate((el) =>
            parseFloat(getComputedStyle(el).fontSize),
          ),
        ).toBeGreaterThanOrEqual(16);
      }
      await expect(page.locator(".capability-list li")).toHaveCount(3);
      await expect(page.locator(".process, #approach")).toHaveCount(0);
      const bio = (await page.locator(".about-copy").boundingBox())!;
      expect(bio.width).toBeGreaterThanOrEqual(width - 48);
      for (const element of await page
        .locator(".header-contact,.menu-toggle,.locale-toggle")
        .all()) {
        const box = (await element.boundingBox())!;
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
      for (const element of await page
        .locator(".field input,.field select,.field textarea")
        .all()) {
        expect((await element.boundingBox())!.height).toBeGreaterThanOrEqual(
          52,
        );
      }
    },
  );
}
test("V2.5 touch navigation, language chooser and short keyboard viewport", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/fr");
  const localeToggle = page.locator(".locale-toggle");
  await localeToggle.tap();
  await expect(localeToggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(localeToggle).toBeFocused();
  await expect(localeToggle).toHaveAttribute("aria-expanded", "false");
  const menu = page.locator(".menu-toggle");
  await menu.tap();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "À propos", exact: true })
    .tap();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#about$/);
  await localeToggle.tap();
  await page
    .locator("#header-languages")
    .getByRole("link", { name: "EN — English", exact: true })
    .tap();
  await expect(page).toHaveURL(new RegExp("/en#about$"));
  await page.locator(".header-contact").tap();
  await expect(page).toHaveURL(/#contact$/);
  await page.locator("#name").fill("Mobile test");
  await page.setViewportSize({ width: 390, height: 420 });
  await page.locator("#name").scrollIntoViewIfNeeded();
  await expect(page.locator("#name")).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await context.close();
});
test("V2.5 mobile avoids desktop animation download and native touch scroll works", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const scripts: Promise<string>[] = [];
  page.on("response", (response) => {
    if (
      response.url().includes("/_next/") &&
      response.url().split("?")[0].endsWith(".js")
    )
      scripts.push(response.text());
  });
  await page.goto("/fr", { waitUntil: "networkidle" });
  const loaded = await Promise.all(scripts);
  expect(loaded.join("")).not.toContain("ScrollTrigger");
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 195, y: 600, id: 0 }],
  });
  for (const y of [560, 510, 450, 390, 320]) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 195, y, id: 0 }],
    });
    await page.waitForTimeout(50);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await expect(page).toHaveURL(new RegExp("/fr$"));
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".work-gallery")).toHaveClass(/is-animated/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".work-gallery")).not.toHaveClass(/is-animated/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await context.close();
});

for (const locale of ["fr", "pt", "en"]) {
  test(
    locale + " project deep links and browser history stay synchronized",
    async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/" + locale + "#loprim3d");
      await expect(page.locator(".work-gallery")).toHaveClass(/is-animated/);
      await expect(
        page.locator('.project-nav a[aria-current="true"]'),
      ).toHaveAttribute("href", "#loprim3d");
      for (const id of ["belofer", "spooliq", "loprim3d"]) {
        await page.locator('.project-nav a[href="#' + id + '"]').click();
        await expect(page).toHaveURL(new RegExp("#" + id + "$"));
        await expect(
          page.locator('.project-nav a[aria-current="true"]'),
        ).toHaveAttribute("href", "#" + id);
        await expect(page.locator(".project-" + id)).toHaveCSS("opacity", "1");
        await expect(page.locator(".project-" + id)).not.toHaveAttribute(
          "inert",
        );
      }
      await page.goBack();
      await expect(
        page.locator('.project-nav a[aria-current="true"]'),
      ).toHaveAttribute("href", "#spooliq");
      await page.goForward();
      await expect(
        page.locator('.project-nav a[aria-current="true"]'),
      ).toHaveAttribute("href", "#loprim3d");
      await expect(page.locator(".pin-spacer")).toHaveCount(1);
    },
  );
}
test("native project navigation follows forward and backward scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr");
  for (const id of ["spooliq", "loprim3d", "belofer", "loprim3d", "spooliq"]) {
    await page
      .locator("#" + id)
      .evaluate((el) =>
        el.scrollIntoView({ block: "start", behavior: "instant" }),
      );
    await expect(
      page.locator('.project-nav a[aria-current="true"]'),
    ).toHaveAttribute("href", "#" + id);
    await expect(page.locator(".project-nav")).toBeInViewport();
  }
  await page.locator('.project-nav a[href="#belofer"]').click();
  await expect(page).toHaveURL(/#belofer$/);
  await expect(page.locator("#belofer")).toBeInViewport();
});
test("blueprint field names exactly match the rendered form", async ({
  page,
}) => {
  await page.goto("/__forms.html");
  const blueprint = await page
    .locator("form [name]")
    .evaluateAll((fields) => fields.map((f) => f.getAttribute("name")).sort());
  await page.goto("/fr");
  const actual = await page
    .locator("form [name]")
    .evaluateAll((fields) => fields.map((f) => f.getAttribute("name")).sort());
  expect(actual).toEqual(blueprint);
});

for (const locale of ["fr", "pt", "en"]) {
  test(
    locale + " headings reflow with doubled root text size",
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const width of [360, 390]) {
        await page.setViewportSize({ width, height: 844 });
        for (const path of ["", "/legal", "/privacy"]) {
          await page.goto("/" + locale + path);
          await page.evaluate(() => document.fonts.ready);
          await page.addStyleTag({
            content: "html { font-size: 200% !important; }",
          });
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBeTruthy();
          const heading = await page.locator("h1").boundingBox();
          expect(heading!.x + heading!.width).toBeLessThanOrEqual(width);
          await page.locator(".header-contact").click();
          await expect(page.locator("#name")).toBeVisible();
        }
      }
    },
  );
}
