let page;

beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
    await page.waitForSelector('h1');
  });

  test("The page title content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 20000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 12000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 12000);
});

describe("task 2 tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/enterprise");
    const linkAdvSec = await page.$("[data-testid='SubNav-root-link']");
    await linkAdvSec.click();
    await page.waitForSelector('h1');
  });

  test("The advanced security page title", async () => {
    const title = await page.title();
    expect(title).toEqual('GitHub Advanced Security · Built-in protection for every repository · GitHub')
  }, 12000);

test("Plans and pricing page header", async () => {
  const link = await page.$x('//span/span[contains(text(), "See plans & pricing")][@class]');
  await link[0].click();
  await page.waitForSelector('h1');
  const actualHeaderText = await page.$eval('#hero-section-brand-heading', el => el.textContent);
  expect(actualHeaderText.replace(/\s+/g, ' ')).toContain("The perfect pair for complete protection")
}, 12000);

test("Request a demo page header", async () => {
  const link = await page.$x('//span/span[contains(text(), "Request a demo")]');
  await link[0].click();
  await page.waitForSelector('h1');
  const text = await page.$x('//*[@data-testid="Label"]/following::h1');
  const actualHeaderText = await text[0].evaluate(el => el.textContent);
  expect(actualHeaderText.replace(/\s+/g, ' ')).toContain("Sign up for a demo")
}, 12000);
});