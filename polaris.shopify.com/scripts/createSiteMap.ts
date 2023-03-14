import * as fs from 'fs';
import {content} from '../src/content';
import {getPageUrl} from '../src/components/Editor/utils';

let urlLines: string[] = [];

const BASE_URL = 'https://polaris.shopify.com/';

content.pages.forEach((page) => {
  const url = getPageUrl(content, page);
  const lastMod = Date.now().toString();
  urlLines.push(
    `<url><loc>${BASE_URL}/${url}</loc><lastmod>${lastMod}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`,
  );
});

const fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlLines.join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', fileContent);

console.log('✅ Created sitemap.xml');
