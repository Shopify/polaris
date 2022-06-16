const puppeteer = require("puppeteer");

const handler = async (req, res) => {
  const { url = "/" } = req.query;
  const fullUrl = `http://localhost:3000${url}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(fullUrl);

  const bufferData = await page.screenshot();

  await browser.close();

  res.setHeader("content-type", "image/png");
  res.send(bufferData);
};

export default handler;
