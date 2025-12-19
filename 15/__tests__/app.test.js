import { test, expect } from "@playwright/test";
import users from "../__fixtures__/user.js";

test("Test", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  await expect(page.getByText("Добро пожаловать, гость")).toBeVisible();

  await page.getByText("Войти").click();

  await page.getByLabel("Имя пользователя").fill(users[0].username);
  await page.getByLabel("Пароль").fill(users[0].password);

  await page.getByText("Войти").click();

  await expect(
    page.getByText(`Добро пожаловать, ${users[0].username}`)
  ).toBeVisible();

  await page.getByText("Выйти").click();

  await expect(page.getByText("Добро пожаловать, гость")).toBeVisible();
});
