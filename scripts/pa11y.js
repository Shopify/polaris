/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const pa11y = require('pa11y');
const fs = require('fs');
const a11yCheck = require('./pa11y-utilities.js').a11yCheck;

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

  await page.goto('http://localhost:3000');
  const urls = Array.from(
    await page.evaluate(() =>
      [...document.querySelectorAll('a')].map((element) =>
        element.getAttribute('href'),
      ),
    ),
  );

  urls.map((path) => {
    const currentBrowser = browsers[browserIndex % NUMBER_OF_BROWSERS];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Testing ', path);
      results.push(
        await pa11y(`http://localhost:3000${path}`, {
          browser: currentBrowser.browser,
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
  let results;
  try {
    rawResults = await runPa11y();

    if (rawResults.length === 0) {
      throw new Error('Component URLs could not be crawled');
    }

    results = a11yCheck(rawResults, shitlist);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

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
    process.exit(1);
  } else {
    console.log('No issues!');
    process.exit(0);
  }
})();
