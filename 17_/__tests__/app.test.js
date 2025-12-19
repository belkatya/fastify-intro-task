import { test, expect } from "@playwright/test";

test.afterEach(async ({ page }) => await page.close());

test("Create new post", async ({ page }) => {
  const post = {
    title: "Новый пост",
    body: "Текст для нового поста",
  };
  await page.goto("/", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByText("Создать пост")).toBeVisible();

  await page.getByText("Создать пост").click({ force: true });

  await page.getByLabel("Название").fill(post.title);
  await page.getByLabel("Текст").fill(post.body);

  await page.getByText("Создать").click({ force: true });

  await expect(page.getByText("Пост был успешно создан!")).toBeVisible();
  await expect(page.getByText(post.title)).toBeVisible();

  await page.getByText(post.title).click({ force: true });

  await expect(page.getByText(post.body)).toBeVisible();
});

test("Create new post failure", async ({ page }) => {
  const post = {
    title: "Н",
    body: "Текст для нового поста",
  };
  await page.goto("/", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByText("Создать пост")).toBeVisible();

  await page.getByText("Создать пост").click({ force: true });

  await page.getByLabel("Название").fill(post.title);
  await page.getByLabel("Текст").fill(post.body);

  await page.getByText("Создать").click({ force: true });

  await expect(page.getByText("Пост был успешно создан!")).not.toBeVisible();
  await expect(page.getByText("Ошибка создания поста!")).toBeVisible();
});
