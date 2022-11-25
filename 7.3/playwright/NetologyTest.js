const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const authorization = require("./user");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 3000,
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', authorization.testEmail);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', authorization.testPassword);
  await page.click('[data-testid="login-submit-btn"]');
  expect(page).toHaveURL("https://netology.ru/profile");
  expect(page.getByRole("heading", { name: "Мои курсы и профессииl" }));
  await page.pause();
  await browser.close();
})();

// Незарегистрированный пользователь
(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 3000,
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', "test@mail.ru");
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', "12345");
  await page.click('[data-testid="login-submit-btn"]');
  expect (page.getByTestId('login-error-hint'));
  await page.pause();
  //assertion
  await browser.close();
})();
