const puppeteer = require('puppeteer');
const pa11y = require('pa11y');
const chalk = require('chalk');

const iframePath = `file://${__dirname}/../build/storybook/static/iframe.html`;
const sinkUrl = `${iframePath}?id=playground-playground--kitchen-sink&viewMode=story`;

const urls = [
  sinkUrl,
  `${sinkUrl}&contexts=Global%20Theming=Enabled%20-%20Light%20Mode`,
  // Dark mode has lots of errors. It is still very WIP so ignore for now
  // `${sinkUrl}&contexts=Global%20Theming=Enabled%20-%20Dark%20Mode`,
];

const printTitle = ({type, message}) => {
  switch (type) {
    case 'error':
      return `${chalk.red('Error:')} ${message}`;
    case 'warning':
      return `${chalk.yellow('Warning:')} ${message}`;
    case 'notice':
      return `${chalk.blue('Notice:')} ${message}`;
  }
};

const allowedErrors = [
  'Duplicate id attribute value "AppFrameMain" found on the web page.',
  'Duplicate id attribute value "AppFrameMainContent" found on the web page.',
];

const testUrls = async (urls) => {
  const browser = await puppeteer.launch();

  const testPage = async (url) => {
    const page = await browser.newPage();
    const result = await pa11y(url, {browser});
    await page.close();
    return result;
  };

  const testPages = urls.map((url) => testPage(url));
  const pageResults = await Promise.all(testPages);

  await browser.close();

  const issues = [].concat.apply(
    [],
    pageResults.map((result) => result.issues),
  );
  return issues
    .filter((issue) => !allowedErrors.includes(issue.message))
    .map((issue) => `${chalk.bold(printTitle(issue))}\n${issue.context}`);
};

(async () => {
  const results = await testUrls(urls);

  if (results.length) {
    console.log(results.join('\n\n'));
    console.log(chalk.bold(`\nFound ${results.length} issues testing URLs:`));
    console.log(`- ${urls.join('\n -')}`);
    process.exit(1);
  }
  console.log(`${chalk.bold.green('Success: ')} No issues were discovered!`);
  process.exit(0);
})();
