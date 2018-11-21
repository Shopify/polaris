/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const {Percy, FileSystemAssetLoader} = require('@percy/puppeteer');

(async () => {
  // If a build is from a forked repository, CircleCI does not pass environment
  // environment variables into the build to prevent credential leakage.
  // In that case, exit cleanly so the build does not fail.
  // Once we start using @percy/puppeteer v1 this can be removed as it is
  // checked within Percy. See https://github.com/percy/percy-puppeteer/pull/3
  if (!process.env.PERCY_TOKEN) {
    console.log('No PERCY_TOKEN provided. Skipping snapshots.');
    process.exit();
  }

  const percy = new Percy({
    loaders: [
      new FileSystemAssetLoader({
        buildDir: './playground/build/assets',
        mountPath: '/assets',
      }),
    ],
  });

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
  ];

  await browsers.forEach(async (instance) => {
    instance.page = await instance.browser.newPage();
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let browserIndex = 0;

  try {
    await percy.startBuild();
    await page.goto('http://localhost:3000/examples');

    const batchComponentExamples = await page.evaluate(() =>
      [...document.querySelectorAll('.componentLinks a')]
        .map((element) => element.getAttribute('href'))
        .filter((link) => link !== '/modal'),
    );

    // Modals open on load, so we have to test the modal examples individually
    const individualModalExamples = await page.evaluate(() =>
      [...document.querySelectorAll('.modalLink a')].map((element) =>
        element.getAttribute('href'),
      ),
    );

    const urls = [...batchComponentExamples, ...individualModalExamples];

    urls.forEach((path) => {
      const currentBrowser = browsers[browserIndex % 2];
      browserIndex++;
      currentBrowser.taken = currentBrowser.taken.then(async () => {
        console.log('Snapshotting ', path);
        await currentBrowser.page.goto(`http://localhost:3000${path}`);
        return percy.snapshot(`Snapshot of ${path}`, currentBrowser.page);
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await Promise.all(browsers.map((instance) => instance.taken));
    await percy.finalizeBuild();
    await browser.close();
    await Promise.all(browsers.map((instance) => instance.browser.close()));
  }
})();
