/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const {Percy, FileSystemAssetLoader} = require('@percy/puppeteer');

(async () => {
  console.log(1);
  const percy = new Percy({
    loaders: [
      new FileSystemAssetLoader({
        buildDir: './visual-regression-testing-build/assets',
        mountPath: '/assets',
      }),
    ],
  });

  console.log(2);
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
  console.log(3);

  await browsers.forEach(async (instance) => {
    instance.page = await instance.browser.newPage();
  });
  console.log(4);

  let browserIndex = 0;
  console.log(5);

  await percy.startBuild();
  console.log(6);

  // Launch the browser and visit example.com
  const browser = await puppeteer.launch();
  console.log(7);
  const page = await browser.newPage();
  await page.screenshot({path: 'hello.png'});
  console.log(8);
  await page.goto('http://localhost:3000');
  console.log(9);
  let urls = await page.evaluate(() =>
    [...document.querySelectorAll('a')].map((element) =>
      element.getAttribute('href'),
    ),
  );

  console.log(10);
  urls = urls.filter((url) => !url.includes('embedded'));

  console.log(urls);
  urls.map((path) => {
    const currentBrowser = browsers[browserIndex % 2];
    browserIndex++;
    currentBrowser.taken = currentBrowser.taken.then(async () => {
      console.log('Snapshotting ', path);
      await currentBrowser.page.goto(`http://localhost:3000${path}`);
      return percy.snapshot(`Snapshot of ${path}`, currentBrowser.page);
    });
  });

  console.log(12);
  await Promise.all(browsers.map((instance) => instance.taken));
  console.log(13);
  await percy.finalizeBuild();
  console.log(14);
  await browser.close();
  console.log(15);
  await Promise.all(browsers.map((instance) => instance.browser.close()));
  console.log(16);
})();
