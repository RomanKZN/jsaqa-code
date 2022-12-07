const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/hall.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Positive qamid.tmweb.ru tests", () => {
  test("Ticket booking'", async () => {
    await page.click(
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a"
    );
    await page.click(
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(11) > span:nth-child(5)"
    );
    await page.click("body > main > section > button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("The first link text 'Идем В Кино'", async () => {
    const actual = await getText(page, "h1");
    expect(actual).toContain("Идёмвкино");
  });

  test("Book tickets for another day'", async () => {
    await page.click("body > nav > a:nth-child(5) > span.page-nav__day-week"
    );
    await page.click(
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a"
    );
    await page.click(
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(11) > span:nth-child(10)"
    );
    await page.click("body > main > section > button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });
});

describe("Nigative qamid.tmweb.ru test", () => {
  test("Can't buy a booked ticket'", async () => {
    await page.click("body > main > section:nth-child(1) > div:nth-child(2) > ul > li");
    await page.click("body > main > section > button");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Логан")
    });
});
