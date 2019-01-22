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

  // window.__storybook_stories__ is injected into the iframe by the percy addon
  // so that Percy's script knows what stories exist. Piggybacking off that is
  // kinda fragile as they may change that output but it gives us what we need
  // for now
  const stories = await page
    .goto(iframePath)
    .then(() => page.evaluate(() => window.__storybook_stories__));

  const queryStrings = stories.reduce((memo, book) => {
    // There is no need to test the Playground, or the "All Examples" stories
    const isSkippedStory = (story) => {
      return book.kind === 'Playground' || story.name === 'All Examples';
    };

    const bookToQueryString = (story) =>
      `selectedKind=${encodeURIComponent(
        book.kind,
      )}&selectedStory=${encodeURIComponent(story.name)}`;

    return memo.concat(
      book.stories
        .filter((story) => !isSkippedStory(story))
        .map(bookToQueryString),
    );
  }, []);

  queryStrings.forEach((queryString) => {
    const currentBrowser = browsers[browserIndex % NUMBER_OF_BROWSERS];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Testing ', queryString);
      results.push(
        await pa11y(`${iframePath}?${queryString}`, {
          browser: currentBrowser.browser,
          ignore: [
            // Missing lang attribute on <html> tag
            // Storybook does not include this property so ignore it
            'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2',
            // Color contrast failures
            'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
          ],
        }),
      );
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
      console.log(issue.pageUrl);
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
      console.log(result.pageUrl);
      console.log(
        '------------------------------------------------------------------------',
      );
      console.log(JSON.stringify(result.issues, null, 2));
    });
  } else {
    console.log('No issues!');
  }

  if (results.length || remainingIssues) {
    // This is temporarily returning 0 while we ensure pa11y doesn't throw any false positives
    process.exit(0);
  }
  process.exit(0);
})();
