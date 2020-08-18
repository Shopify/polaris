/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const pa11y = require('pa11y');

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
    // eslint-disable-next-line require-atomic-updates
    instance.page = await instance.browser.newPage();
  });

  let browserIndex = 0;

  const results = [];

  const setupBrowser = browsers[0].browser;
  const page = await setupBrowser.newPage();

  // eslint-disable-next-line node/no-path-concat
  const iframePath = `file://${__dirname}/../build/storybook/static/iframe.html`;

  const stories = await page
    .goto(iframePath)
    .then(() => page.evaluate(() => window.__STORYBOOK_CLIENT_API__.raw()));

  const storyQueryStrings = stories.reduce((memo, story) => {
    // There is no need to test the Playground, or the "All Examples" stories
    const isSkippedStory =
      story.kind === 'Playground/Playground' || story.name === 'All Examples';

    if (!isSkippedStory) {
      const idParam = `id=${encodeURIComponent(story.id)}`;
      memo.push(
        idParam,
        `${idParam}&contexts=Global%20Theming=Enabled%20-%20Light%20Mode`,
        // Dark mode has lots of errors. It is still very WIP so ignore for now
        // `${idParam}&contexts=Global%20Theming=Enabled%20-%20Dark%20Mode`,
      );
    }
    return memo;
  }, []);

  storyQueryStrings.forEach((queryString) => {
    const currentBrowser = browsers[browserIndex % NUMBER_OF_BROWSERS];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Testing ', queryString);
      const result = await pa11y(`${iframePath}?${queryString}`, {
        browser: currentBrowser.browser,
        ignore: [
          // Missing lang attribute on <html> tag
          // Storybook does not include this property so ignore it
          'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2',
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

  const results = rawResults.filter((result) => result.issues.length);

  if (results.length) {
    console.log(
      `

========================================================================
The following issues were discovered and need to be fixed before this code can be merged
========================================================================
`,
    );

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
    console.log(
      `

========================================================================
No issues were discovered!
========================================================================
`,
    );
  }

  if (results.length) {
    process.exit(1);
  }
  process.exit(0);
})();
