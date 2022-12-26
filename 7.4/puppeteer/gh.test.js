const jestConfig = require("./jest.config");

let page;
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(() => {
  page.close();
});

//first test
describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
    await page.setDefaultTimeout(10000);
  }, 50000);
});

//second test
describe("The h1 header content", () => {
  beforeEach(async () => {
    await page.goto("https://github.blog");
  });
  test("button jump", async () => {
    const title2 = await page.title();
    expect(title2).toEqual(
      "The GitHub Blog | Updates, ideas, and inspiration from GitHub to help developers build and design software."
    );
  }, 45000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("https://github.com");
  }, 50000);

  test("The page contains Sign in button", async () => {
    const btnSelector =
      "body > header > div > nav > div > a.btn-mktg.font-weight-semibold.ml-5.js-header-cta.header-cta";
    await page.waitForSelector(btnSelector, {});
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Free trial");
  }, 50000);
});
