const puppeteer = require('puppeteer');

const iframePath =
  'http://localhost:6006/iframe.html?id=playground-playground--kitchen-sink&args=&viewMode=story&globals=profiler:false';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const data = [];

  page.on('console', async (message) => {
    const messages = await Promise.all(
      message.args().map((arg) => {
        return arg.executionContext().evaluate((obj) => obj, arg);
      }),
    );

    if (message.type() !== 'log') return;

    data.push(...messages);
  });

  await page.goto(iframePath, {waitUntil: 'load'});
  console.log(JSON.stringify(data)); // eslint-disable-line no-console
  await page.close();
  await browser.close();
})();
