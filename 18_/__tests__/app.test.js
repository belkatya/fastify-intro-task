import { test, expect } from "@playwright/test";

test("Create new product", async ({ page }) => {
  const product = {
    title: "Новый товар",
    description: "Описание нового товара",
    price: 1234,
  };
  await page.goto("http://localhost:8080/");

  await page.getByText("Товары").click();

  await page.getByText("Создать товар").click();

  await page.getByLabel("Название").fill(product.title);
  await page.getByLabel("Описание").fill(product.description);
  await page.getByLabel("Цена").fill(product.price.toString());

  await page.getByText("Создать").click();

  await expect(page.getByText(product.title)).toBeVisible();

  await page.getByText(product.title).click();

  await expect(page.getByText(product.description)).toBeVisible();
  await expect(page.getByText(product.price.toString())).toBeVisible();
});
