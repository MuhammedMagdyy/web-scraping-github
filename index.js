import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

const scrapeTextFromSelectors = async (url, selector) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url);

  const extractedTexts = await page.evaluate(selector => {
    const elements = Array.from(document.querySelectorAll(selector)).map(
      element => element.innerText
    );

    return elements;
  }, selector);

  console.log(extractedTexts);

  await browser.close();
};

const userChoices = {
  username: process.env.USER_NAME,
  following: {
    tab: 'following',
    selector: 'span.Link--secondary.pl-1',
  },
  followers: {
    tab: 'followers',
    selector: 'span.Link--secondary',
  },
  repositores: {
    tab: 'repositories',
    selector: `a[itemprop="codeRepository"]`,
  },
};

if (userChoices.username) {
  const url = `https://github.com/${userChoices.username}?tab=${userChoices.followers.tab}`;
  const selector = `${userChoices.followers.selector}`;

  scrapeTextFromSelectors(url, selector).catch(error => {
    console.error('Error scraping text from selectors:', error);
  });
} else {
  console.error('Username not provided in .env file!');
}
