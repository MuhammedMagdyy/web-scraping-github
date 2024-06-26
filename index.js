import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import inquirer from 'inquirer';

dotenv.config();

const scrapeTextFromSelectors = async (url, selector) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const extractedTexts = await page.evaluate(selector => {
    const elements = Array.from(document.querySelectorAll(selector)).map(
      element => element.innerText
    );

    return elements;
  }, selector);

  console.log(extractedTexts);

  await browser.close();
};

const getUserInput = async () => {
  const usernamePrompt = await inquirer.prompt({
    type: 'input',
    name: 'username',
    message: "Enter your or someone else's GitHub username:",
  });

  return usernamePrompt.username;
};

const getUserChoice = async () => {
  const questions = [
    {
      type: 'list',
      name: 'choice',
      message: 'What do you want to fetch?',
      choices: ['followers', 'following'],
    },
  ];

  return inquirer.prompt(questions);
};

const constructUrlAndSelector = (userInput, userChoices, username) => {
  let url, selector;

  switch (userInput) {
    case 'followers':
      url = `https://github.com/${username}?tab=${userChoices.followers.tab}`;
      selector = `${userChoices.followers.selector}`;
      break;
    case 'following':
      url = `https://github.com/${username}?tab=${userChoices.following.tab}`;
      selector = `${userChoices.following.selector}`;
      break;
    default:
      throw new Error('Invalid choice entered.');
  }

  return { url, selector };
};

const main = async () => {
  try {
    const username = await getUserInput();
    const answers = await getUserChoice();
    const { url, selector } = constructUrlAndSelector(
      answers.choice,
      userChoices,
      username
    );

    await scrapeTextFromSelectors(url, selector);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const userChoices = {
  following: {
    tab: 'following',
    selector: 'span.Link--secondary.pl-1',
  },
  followers: {
    tab: 'followers',
    selector: 'span.Link--secondary',
  },
};

main();
