/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const {Percy, FileSystemAssetLoader} = require('@percy/puppeteer');

(async () => {
  const percy = new Percy({
    loaders: [
      new FileSystemAssetLoader({
        buildDir: './visual-regression-testing-build/assets',
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

  let browserIndex = 0;

  await percy.startBuild();

  // Launch the browser and visit example.com
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  let urls = await page.evaluate(() =>
    [...document.querySelectorAll('a')].map((element) =>
      element.getAttribute('href'),
    ),
  );

  urls = urls.filter((url) => !url.includes('embedded'));

  urls.map((path) => {
    const currentBrowser = browsers[browserIndex % 2];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Snapshotting ', path);
      await currentBrowser.page.goto(`http://localhost:3000${path}`);
      return percy.snapshot(`Snapshot of ${path}`, currentBrowser.page);
    });
  });

  await Promise.all(browsers.map((instance) => instance.taken));
  await percy.finalizeBuild();
  await browser.close();
  await Promise.all(browsers.map((instance) => instance.browser.close()));
})();
