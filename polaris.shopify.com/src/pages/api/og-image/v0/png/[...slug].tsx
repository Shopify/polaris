import type { NextApiResponse, NextApiRequest } from "next";
import puppeteer from "puppeteer";

export const VERSION = "v0";

const generateScreenshot = async (url: string) => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1200, height: 630 },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const file = await page.screenshot();
  return file;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) throw new Error(`og-image API requires a URL`);
    const siteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://polaris.shopify.com";
    const slug = req.url.replace(`/api/og-image/${VERSION}/png/`, "");
    const imageUrl = `${siteUrl}/api/og-image/${VERSION}/html/${slug}`;

    const image = await generateScreenshot(imageUrl);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );

    res.end(image);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
