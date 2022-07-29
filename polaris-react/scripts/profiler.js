const puppeteer = require('puppeteer');

const iframePath =
  'http://localhost:6006/iframe.html?id=playground--kitchen-sink&viewMode=story&globals=profiler:false';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(iframePath, {waitUntil: 'networkidle2', timeout: 0});

  const data = await page.evaluate(
    () => document.getElementById('render-performance-profiler').innerHTML,
  );

  console.log(data); // eslint-disable-line no-console
  await page.close();
  await browser.close();
})();
