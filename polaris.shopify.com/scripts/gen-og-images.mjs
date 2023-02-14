import puppeteer from 'puppeteer';
import matter from 'gray-matter';
import {existsSync} from 'fs';
import path from 'path';
import {writeFile, readFile, mkdir, rm} from 'fs/promises';
import pMap from 'p-map';

const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
const imgDir = path.join(process.cwd(), 'public/og-images');

const shopifyLogo = `<svg height="30" width="30" viewBox="0 0 109.5 124.5" xmlns="http://www.w3.org/2000/svg" fill="#fff">
<path d="M74.7,14.8c0,0-1.4,0.4-3.7,1.1c-0.4-1.3-1-2.8-1.8-4.4c-2.6-5-6.5-7.7-11.1-7.7c0,0,0,0,0,0
  c-0.3,0-0.6,0-1,0.1c-0.1-0.2-0.3-0.3-0.4-0.5c-2-2.2-4.6-3.2-7.7-3.1c-6,0.2-12,4.5-16.8,12.2c-3.4,5.4-6,12.2-6.7,17.5
  c-6.9,2.1-11.7,3.6-11.8,3.7c-3.5,1.1-3.6,1.2-4,4.5C9.1,40.7,0,111.2,0,111.2l75.6,13.1V14.6C75.2,14.7,74.9,14.7,74.7,14.8z
    M57.2,20.2c-4,1.2-8.4,2.6-12.7,3.9c1.2-4.7,3.6-9.4,6.4-12.5c1.1-1.1,2.6-2.4,4.3-3.2C56.9,12,57.3,16.9,57.2,20.2z M49.1,4.3
  c1.4,0,2.6,0.3,3.6,0.9c-1.6,0.8-3.2,2.1-4.7,3.6c-3.8,4.1-6.7,10.5-7.9,16.6c-3.6,1.1-7.2,2.2-10.5,3.2
  C31.7,19.1,39.8,4.6,49.1,4.3z M37.4,59.3c0.4,6.4,17.3,7.8,18.3,22.9c0.7,11.9-6.3,20-16.4,20.6c-12.2,0.8-18.9-6.4-18.9-6.4
  l2.6-11c0,0,6.7,5.1,12.1,4.7c3.5-0.2,4.8-3.1,4.7-5.1c-0.5-8.4-14.3-7.9-15.2-21.7C23.8,51.8,31.4,40.1,48.2,39
  c6.5-0.4,9.8,1.2,9.8,1.2l-3.8,14.4c0,0-4.3-2-9.4-1.6C37.4,53.5,37.3,58.2,37.4,59.3z M61.2,19c0-3-0.4-7.3-1.8-10.9
  c4.6,0.9,6.8,6,7.8,9.1C65.4,17.7,63.4,18.3,61.2,19z"/>
<path d="M78.1,123.9l31.4-7.8c0,0-13.5-91.3-13.6-91.9c-0.1-0.6-0.6-1-1.1-1c-0.5,0-9.3-0.2-9.3-0.2s-5.4-5.2-7.4-7.2
  V123.9z"/>
</svg>
`;

const defaultImage = `<svg viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M98.9999 49.5C98.9999 76.838 76.838 98.9999 49.5 98.9999C22.1619 98.9999 0 76.838 0 49.5C0 22.1619 22.1619 0 49.5 0C76.838 0 98.9999 22.1619 98.9999 49.5Z" fill="#fff"/>
<path d="M99.0001 49.6709C99.0001 76.9144 76.9149 98.9996 49.6714 98.9996C49.6714 71.7561 71.7566 49.6709 99.0001 49.6709Z" fill="#fff"/>
<path d="M49.5 0C49.5 27.3381 27.3381 49.5 0 49.5C27.3381 49.5 49.5 71.6618 49.5 98.9999C49.5 71.6618 71.6618 49.5 98.9999 49.5C71.6618 49.5 49.5 27.3381 49.5 0Z" fill="#000"/>
</svg>
`;

const capitalizeFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const generateHTML = async (url, slug) => {
  const title = capitalizeFirstLetter(slug || '')
    .replace('.png', '')
    .replace(/-/g, ' ');

  let htmlImg = `<div class="default-icon">${defaultImage}</div>`;

  if (url.startsWith('/components/')) {
    const imgPath = path.join(process.cwd(), `public/images${url}.png`);
    const image = await readFile(imgPath);
    const base64 = Buffer.from(image).toString('base64');
    htmlImg = `<img src="data:image/png;base64,${base64}" class="component-image" />`;
  }

  if (
    url.startsWith('/foundations/') ||
    url.startsWith('/design/') ||
    url.startsWith('/content/') ||
    url.startsWith('/patterns/')
  ) {
    const mdFilePath = path.join(process.cwd(), `content${url}.md`);
    const markdownContent = await readFile(mdFilePath, 'utf-8');
    const {data} = matter(markdownContent);
    if (data.icon) {
      const iconFilePath = path.join(
        process.cwd(),
        `../polaris-icons/dist/svg/${data.icon}.svg`,
      );
      const iconData = await readFile(iconFilePath);

      htmlImg = `<div class="polaris-icon">${iconData}</div>`;
    }
  }

  const html = `
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
    background: #000;
    color: #fff;
    perspective: 1800px;
    transform-style: preserve-3d;
  }

  h1 {
    font-size: 80px;
    font-weight: 500;
    letter-spacing: -0.01rem;
    max-width: 520px;
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

  .polaris-icon,
  .default-icon {
    position: absolute;
    left: 600px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    opacity: .2;
  }

  .polaris-icon svg,
  .default-icon svg {
    width: 400px;
    height: 400px;
  }

  .default-icon {
    filter: brightness(1000%);
  }

  .polaris-icon {
    filter: invert();
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
</style>

<body>
  <h1>${title}</h1>
  ${htmlImg}
  <div class="logo">
    ${shopifyLogo} Polaris
  </div>
</body>`;

  return Buffer.from(html).toString('base64');
};

const genOgImages = async () => {
  if (existsSync(imgDir)) await rm(imgDir, {recursive: true});
  await mkdir(imgDir, {recursive: true});

  const sitemap = await readFile(sitemapPath, 'utf-8');
  const urls = sitemap
    .match(/loc>[^<]+/gi)
    .map((match) => match.replace('loc>https://polaris.shopify.com', ''));

  const browser = await puppeteer.launch({
    defaultViewport: {width: 1200, height: 630},
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const getPNG = async (url) => {
    try {
      const slug = url === '' ? 'home' : url.split('/').pop();
      const imgPath =
        url.split('/').length > 1 ? url.split('/').slice(0, -1).join('/') : url;
      const html = await generateHTML(url, slug);
      const encodedUrl = `data:text/html;charset=utf-8;base64,${html}`;
      const page = await browser.newPage();
      await page.goto(encodedUrl, {waitUntil: 'networkidle0'});
      const image = await page.screenshot();
      if (!existsSync(`${imgDir}${imgPath}`)) {
        await mkdir(`${imgDir}${imgPath}`, {recursive: true});
      }
      await writeFile(`${imgDir}${imgPath}/${slug}.png`, image);
      await page.close();
    } catch (error) {
      console.error(`❌ Failed to generate png for ${url}`);
      throw new Error(error);
    }
  };

  const generateImages = await pMap(urls, getPNG, {concurrency: 30});

  await Promise.all(generateImages);

  await browser.close();
  console.log(`✅ Created ${urls.length} og-images from sitemap`);
};

export default genOgImages;
