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
