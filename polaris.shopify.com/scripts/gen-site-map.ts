import fs from 'fs';
import path from 'path';
import typedSiteJSON from '../.cache/site';
import {FrontMatter} from '../src/types';

const genSiteMap = () => {
  const outputFile = path.resolve(__dirname, '../public/sitemap.xml');
  const lastMod = new Date().toISOString();
  const siteMapURLS = [
    '',
    ...Object.entries(typedSiteJSON)
      .filter(([, value]) => !(value.frontMatter as FrontMatter).noIndex)
      .map(([key]) => key),
  ]
    .map(
      (path) =>
        `<url><loc>https://polaris.shopify.com${path}</loc><lastmod>${lastMod}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`,
    )
    .join('\n');

  const siteMapData = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${siteMapURLS}
</urlset>`;

  fs.writeFileSync(outputFile, siteMapData);
};

genSiteMap();
