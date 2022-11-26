const { test, expect } = require("@playwright/test");
const { testEmail, testPassword } = require("../user");

test("Registered user", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.fill('[placeholder="Email"]', testEmail);
  await page.getByPlaceholder("Пароль").click();
  await page.fill('[placeholder="Пароль"]', testPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page).toHaveTitle("Мои программы обучения");
});

test("Unregistered user", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.fill('[placeholder="Email"]', "test@mail.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.fill('[placeholder="Пароль"]', "12345");
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).not.toHaveURL("error");
});
