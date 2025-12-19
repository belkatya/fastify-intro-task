import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Test", async ({ page }) => {
  await page.goto("http://localhost:8080/articles/new");

  await page.getByLabel("Название").fill(faker.lorem.word(1));
  await page.getByLabel("Текст").fill(faker.lorem.word(10));

  await page.getByText("Создать").click();

  await expect(
    page.getByText("Название не должно быть короче двух символов")
  ).toBeVisible();

  await page.getByLabel("Название").fill(faker.lorem.word(2));
  await page.getByLabel("Текст").fill(faker.lorem.word(9));

  await page.getByText("Создать").click();

  await expect(
    page.getByText("Статья должна быть не короче 10 символов")
  ).toBeVisible();

  const article = {
    title: faker.lorem.word(5),
    text: faker.lorem.text(15),
  };

  await page.getByLabel("Название").fill(article.title);
  await page.getByLabel("Текст").fill(article.text);

  await page.getByText("Создать").click();

  await expect(page.getByText(article.title)).toBeVisible();

  await page.goto("http://localhost:8080/articles/new");

  await page.getByLabel("Название").fill(article.title);
  await page.getByLabel("Текст").fill(article.text);

  await page.getByText("Создать").click();

  await expect(
    page.getByText("Статья с таким названием уже существует")
  ).toBeVisible();
});
