/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const pa11y = require('pa11y');
const shitlistCheck = require('./pa11y-utilities.js').shitlistCheck;

const shitlist = require('./../a11y_shitlist.json');

const NUMBER_OF_BROWSERS = 5;

async function runPa11y() {
  const browsers = [
    {
      browser: await puppeteer.launch(),
      taken: new Promise((resolve) => {
        resolve();
      }),
    },
    {
      browser: await puppeteer.launch(),
      taken: new Promise((resolve) => {
        resolve();
      }),
    },
    {
      browser: await puppeteer.launch(),
      taken: new Promise((resolve) => {
        resolve();
      }),
    },
    {
      browser: await puppeteer.launch(),
      taken: new Promise((resolve) => {
        resolve();
      }),
    },
    {
      browser: await puppeteer.launch(),
      taken: new Promise((resolve) => {
        resolve();
      }),
    },
  ];

  await browsers.forEach(async (instance) => {
    instance.page = await instance.browser.newPage();
  });

  let browserIndex = 0;

  const results = [];

  const setupBrowser = browsers[0].browser;
  const page = await setupBrowser.newPage();

  const iframePath = `file://${__dirname}/../build/storybook/static/iframe.html`;

  const stories = await page
    .goto(iframePath)
    .then(() => page.evaluate(() => window.__STORYBOOK_CLIENT_API__.raw()));

  const storyIDs = stories.reduce((memo, story) => {
    // There is no need to test the Playground, or the "All Examples" stories
    const isSkippedStory =
      story.kind === 'Playground|Playground' || story.name === 'All Examples';

    if (!isSkippedStory) {
      memo.push(`${encodeURIComponent(story.id)}`);
    }
    return memo;
  }, []);

  storyIDs.forEach((queryString) => {
    const currentBrowser = browsers[browserIndex % NUMBER_OF_BROWSERS];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Testing ', queryString);
      const result = await pa11y(`${iframePath}?id=${queryString}`, {
        browser: currentBrowser.browser,
        ignore: [
          // Missing lang attribute on <html> tag
          // Storybook does not include this property so ignore it
          'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2',
          // Color contrast failures
          'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
        ],
      });
      result.exampleID = queryString;
      delete result.pageUrl;
      results.push(result);
    });
  });

  await Promise.all(browsers.map((instance) => instance.taken));
  await Promise.all(browsers.map((instance) => instance.browser.close()));
  return results;
}

(async () => {
  let rawResults;
  try {
    rawResults = await runPa11y();

    if (rawResults.length === 0) {
      throw new Error('Component URLs could not be crawled');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const {results, remainingIssues} = shitlistCheck(rawResults, shitlist);

  if (remainingIssues) {
    console.log(
      `
========================================================================
The following items were fixed, and therefore should be removed from the shitlist.
Please edit the file a11y_shitlist.json to remove them and run these tests again.',
========================================================================
`,
    );
    remainingIssues.forEach((issue) => {
      console.log(
        '------------------------------------------------------------------------',
      );
      console.log(issue.exampleID);
      console.log(
        '------------------------------------------------------------------------',
      );
      console.log(JSON.stringify(issue.issues, null, 2));
    });
  }

  console.log(
    `

========================================================================
The following issues were discovered and need to be fixed before this code can be merged
========================================================================
`,
  );

  if (results.length) {
    results.forEach((result) => {
      console.log(
        '------------------------------------------------------------------------',
      );
      console.log(result.exampleID);
      console.log(
        '------------------------------------------------------------------------',
      );
      console.log(JSON.stringify(result.issues, null, 2));
    });
  } else {
    console.log('No issues!');
  }

  if (results.length || remainingIssues) {
    process.exit(1);
  }
  process.exit(0);
})();
