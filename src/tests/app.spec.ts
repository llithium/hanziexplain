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
});

test("Search", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(500);

  await page.getByRole("search").fill("space exploration");

  await page.waitForTimeout(300);

  await expect(page).toHaveTitle(/space exploration · Hanzi Explain/);

  await expect(page.getByText("太空探索")).toBeVisible();
});
