const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");
const { getDocument, querie, queries } = require("pptr-testing-library");
const { getByLabeText } = queries;

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(
    `https://qamid.tmweb.ru/client/index.php${string}`,
    {
      setTimeout: 5000,
    }
  );
});

When(
  "the user will be redirected to the seat selection page {string}",
  async function (string) {
    await this.page.click(
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a"
    );
  }
);

Then("user sees the title of the movie {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});
