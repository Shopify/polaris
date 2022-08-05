import puppeteer from "puppeteer";
import { readFile } from "fs/promises";
import type { NextApiResponse, NextApiRequest } from "next";

const shopifyLogo = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 109.5 124.5" style="enable-background:new 0 0 109.5 124.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
</style>
<g>
	<g>
		<path class="st0" d="M74.7,14.8c0,0-1.4,0.4-3.7,1.1c-0.4-1.3-1-2.8-1.8-4.4c-2.6-5-6.5-7.7-11.1-7.7c0,0,0,0,0,0
			c-0.3,0-0.6,0-1,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-2-2.2-4.6-3.2-7.7-3.1c-6,0.2-12,4.5-16.8,12.2c-3.4,5.4-6,12.2-6.7,17.5
			c-6.9,2.1-11.7,3.6-11.8,3.7c-3.5,1.1-3.6,1.2-4,4.5C9.1,40.7,0,111.2,0,111.2l75.6,13.1V14.6C75.2,14.7,74.9,14.7,74.7,14.8z
			 M57.2,20.2c-4,1.2-8.4,2.6-12.7,3.9c1.2-4.7,3.6-9.4,6.4-12.5c1.1-1.1,2.6-2.4,4.3-3.2C56.9,12,57.3,16.9,57.2,20.2z M49.1,4.3
			c1.4,0,2.6,0.3,3.6,0.9c-1.6,0.8-3.2,2.1-4.7,3.6c-3.8,4.1-6.7,10.5-7.9,16.6c-3.6,1.1-7.2,2.2-10.5,3.2
			C31.7,19.1,39.8,4.6,49.1,4.3z M37.4,59.3c0.4,6.4,17.3,7.8,18.3,22.9c0.7,11.9-6.3,20-16.4,20.6c-12.2,0.8-18.9-6.4-18.9-6.4
			l2.6-11c0,0,6.7,5.1,12.1,4.7c3.5-0.2,4.8-3.1,4.7-5.1c-0.5-8.4-14.3-7.9-15.2-21.7C23.8,51.8,31.4,40.1,48.2,39
			c6.5-0.4,9.8,1.2,9.8,1.2l-3.8,14.4c0,0-4.3-2-9.4-1.6C37.4,53.5,37.3,58.2,37.4,59.3z M61.2,19c0-3-0.4-7.3-1.8-10.9
			c4.6,0.9,6.8,6,7.8,9.1C65.4,17.7,63.4,18.3,61.2,19z"/>
		<path class="st0" d="M78.1,123.9l31.4-7.8c0,0-13.5-91.3-13.6-91.9c-0.1-0.6-0.6-1-1.1-1c-0.5,0-9.3-0.2-9.3-0.2s-5.4-5.2-7.4-7.2
			V123.9z"/>
	</g>
</g>
</svg>
`;

const defaultIcon = `<svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M98.9999 49.5C98.9999 76.838 76.838 98.9999 49.5 98.9999C22.1619 98.9999 0 76.838 0 49.5C0 22.1619 22.1619 0 49.5 0C76.838 0 98.9999 22.1619 98.9999 49.5Z" fill="white"/>
  <path d="M99.0001 49.6709C99.0001 76.9144 76.9149 98.9996 49.6714 98.9996C49.6714 71.7561 71.7566 49.6709 99.0001 49.6709Z" fill="white"/>
  <path d="M49.5 0C49.5 27.3381 27.3381 49.5 0 49.5C27.3381 49.5 49.5 71.6618 49.5 98.9999C49.5 71.6618 71.6618 49.5 98.9999 49.5C71.6618 49.5 49.5 27.3381 49.5 0Z" fill="black"/>
  </svg>
`;

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const generateHTML = async (slug: string) => {
  const currentSlug = slug.split("/").at(-1);
  const title = capitalizeFirstLetter(currentSlug || "");

  let htmlImg = `<div class="icon">${defaultIcon}</div>`;

  if (slug.startsWith("components/")) {
    htmlImg = `<img src="/images/${slug}.png" class="component-image" />`;
  }

  if (slug.startsWith("foundations/")) {
    const data = await readFile(
      `${process.cwd()}/content/${slug}/index.md`,
      "utf-8"
    );
    console.log(data);
    htmlImg = `<p>yo</p>`;
  }

  return `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: inter;
    width: 1200px;
    height: 630px;
    padding: 60px;
    background: black;
    color: white;
    perspective: 1800px;
    transform-style: preserve-3d;
  }

  h1 {
    font-size: 80px;
    font-weight: 500;
    letter-spacing: -0.01rem;
    max-width: 520px;
  }

  .default-graphic h1 {
    max-width: 700px;
  }

  .component-image {
    position: absolute;
    left: 100px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    filter: contrast(1.1) invert(1) saturate(0) hue-rotate(180deg);
    mix-blend-mode: lighten;
    opacity: .33;
    height: auto;
    transform: rotateY(-60deg) translateY(-50%) scale(.9);
  }

  .icon {
    filter: brightness(1000%);
    position: absolute;
    left: 600px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    opacity: .2;
  }

  .icon svg {
    width: 721px;
    height: 721px;
  }

  .default-graphic .icon {
    top: 60px;
    left: auto;
    right: 60px;
    width: 300px;
    transform: none;
  }

  .default-graphic .icon svg {
    width: 300px;
    height: 300px;
  }

  .logo {
    position: absolute;
    bottom: 55px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: .5;
    font-size: 24px;
    font-weight: 500;
  }

  .logo svg {
    min-width: 30px;
    max-width: 30px;
    height: auto;
  }
</style>

<body>
  <h1>${title}</h1>
  ${htmlImg}
  <div class="logo">
    ${shopifyLogo} Polaris
  </div>
</body>`;
};

const generateScreenshot = async (html: string) => {
  let base64String = Buffer.from(html).toString("base64");
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1200, height: 630 },
  });
  const page = await browser.newPage();
  const encodedUrl = `data:text/html;charset=utf-8;base64,${base64String}`;
  await page.goto(encodedUrl, { waitUntil: "networkidle0" });
  const file = await page.screenshot();
  return file;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) throw new Error(`og-image API requires a URL`);
    const slug = req.url.replace("/api/og-image/", "");
    const html = await generateHTML(slug);
    const image = await generateScreenshot(html);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
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
