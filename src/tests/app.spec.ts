import { test, expect } from "@playwright/test";

test("Navigate to word 的", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Hanzi Explain/);

  await page.click("text=的");

  await expect(page).toHaveURL("/的");

  expect(page.getByRole("heading", { name: "Etymology" }));
});

test("Traditional Toggle", async ({ page }) => {
  await page.goto("/门");

  await expect(
    page.getByText("Simplified form of 門. Pictograph of a gate."),
  ).toBeVisible();

  await page.getByRole("switch").click();

  await expect(
    page.getByText("Simplified form of 門. Pictograph of a gate."),
  ).not.toBeVisible();

  await page.getByRole("switch").click();

  await expect(
    page.getByText("Simplified form of 門. Pictograph of a gate."),
  ).toBeVisible();
});

test("Search", async ({ page, browserName }) => {
  await page.goto("/");

  browserName === "webkit" && (await page.waitForTimeout(2000));

  await page.getByRole("search").fill("space exploration");

  await expect(page).toHaveTitle(/space exploration · Hanzi Explain/);

  await expect(page.getByText("太空探索")).toBeVisible();
});

test("Recently viewed in local storage", async ({ page }) => {
  await page.goto("/太空探索");

  await page.waitForTimeout(500);

  await page.goto("/");

  await expect(page.getByText("太空探索")).toBeVisible();
});

test("Data table sort", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Hanzi Explain/);

  await page.goto("/words");

  await expect(
    page.getByText(
      "Phonosemantic compound. 京 represents the meaning and 尤 represents the sound.",
    ),
  ).toBeVisible();

  await page.getByRole("button", { name: "Frequency" }).click();

  await page.getByRole("menuitem", { name: "Asc" }).click();

  await expect(page.getByText("At symbol, @")).toBeVisible();
});

test("Examples section", async ({ page }) => {
  await page.goto("/做");

  await expect(page.getByText("我无法取代她做英语老师。")).not.toBeVisible();

  await expect(
    page.getByText("I can't take the place of her as an English teacher."),
  ).not.toBeVisible();

  await page.getByRole("button", { name: "Examples Toggle" }).click();

  await expect(page.getByText("我无法取代她做英语老师。")).toBeVisible();

  await expect(
    page.getByText("I can't take the place of her as an English teacher."),
  ).toBeVisible();

  await expect(
    page.getByText("Simplified form of 門. Pictograph of a gate."),
  ).not.toBeVisible();

  await page.getByRole("button", { name: "Examples Toggle" }).click();

  await expect(
    page.getByText("I can't take the place of her as an English teacher."),
  ).not.toBeVisible();
});
