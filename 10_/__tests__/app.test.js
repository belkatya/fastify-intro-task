import { test, expect } from "@playwright/test";

test("Create new user", async ({ page }) => {
  const user = {
    username: "user1",
    email: "test@example.com",
  };
  await page.goto("http://localhost:8080/users/new");

  await page.getByLabel("Имя").fill(user.username);
  await page.getByLabel("Email").fill(user.email);

  await page.getByText("Создать").click();

  await expect(page.getByText(user.username)).toBeVisible();
  await expect(page.getByText(user.email)).toBeVisible();

  await page.goto("http://localhost:8080/users");

  await page.getByText(user.username).click();

  await expect(page.getByText(user.username)).toBeVisible();
  await expect(page.getByText(user.email)).toBeVisible();
});
