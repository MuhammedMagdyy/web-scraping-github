import puppeteer from 'puppeteer';
import inquirer from 'inquirer';

const scrapeTextFromSelectors = async (url, selector) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const extractedTexts = await page.evaluate(selector => {
    const elements = Array.from(document.querySelectorAll(selector)).map(
      element => element.innerText.trim()
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

const constructUrlAndSelector = async (userInput, username) => {
  let url, selector;

  switch (userInput) {
    case 'followers':
      url = `https://github.com/${username}?tab=followers`;
      selector = 'span.Link--secondary';
      break;
    case 'following':
      url = `https://github.com/${username}?tab=following`;
      selector = 'span.Link--secondary.pl-1';
      break;
    default:
      throw new Error('Invalid choice entered.');
  }

  return { url, selector };
};

const fetchUserInformation = async username => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://github.com/${username}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  const userInfo = await page.evaluate(() => {
    const namesContainer = document.querySelector('.vcard-names-container');
    const fullNameElement = namesContainer.querySelector('.p-name.vcard-fullname.d-block');
    const usernameElement = namesContainer.querySelector('.p-nickname.vcard-username.d-block');
    const bioElement = document.querySelector('div.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4');
    const locationElement = document.querySelector('li[itemprop="homeLocation"]');
    const companyElement = document.querySelector('span.p-org');

    let company = companyElement ? companyElement.innerText.trim() : 'Not provided';
    company = company.replace('@', '');

    return {
      fullName: fullNameElement ? fullNameElement.innerText.trim() : 'Not provided',
      username: usernameElement ? usernameElement.innerText.trim() : 'Not provided',
      bio: bioElement ? bioElement.innerText : 'Not provided',
      location: locationElement ? locationElement.innerText : 'Not provided',
      company: company.trim() !== '' ? company.trim() : 'Not provided',
    };
  });

  await browser.close();

  return userInfo;
};

const main = async () => {
  try {
    const username = await getUserInput();
    const answers = await getUserChoice();
    const { url, selector } = await constructUrlAndSelector(answers.choice, username);

    const userInfo = await fetchUserInformation(username);

    console.log('==============================================');
    console.log(`    GitHub Profile Information for ${username}`);
    console.log('==============================================');
    console.log('\x1b[33m%s\x1b[0m', `Username: ${userInfo.username}`);
    console.log(`Full Name: ${userInfo.fullName}`);
    console.log(`Bio: ${userInfo.bio.trim() === '' ? 'Not provided' : userInfo.bio}`);
    console.log(`Location: ${userInfo.location}`);
    console.log(`Company: ${userInfo.company}`);
    console.log('----------------------------------------------');

    process.stdout.write(`\x1b[36mFetching ${answers.choice} from GitHub...\x1b[0m\n`);

    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(`\r\x1b[K${spinner[i++ % spinner.length]} Fetching`);
    }, 100);

    await scrapeTextFromSelectors(url, selector);

    clearInterval(interval);
    process.stdout.write('\r\x1b[K');
    console.log('\x1b[32m%s\x1b[0m', `✅ ${answers.choice.charAt(0).toUpperCase() + answers.choice.slice(1)} fetched successfully.\n`);
    console.log('==============================================');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', error.message);
  }
};

main();