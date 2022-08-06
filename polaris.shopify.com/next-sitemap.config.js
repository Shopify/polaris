/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://polaris.shopify.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
};

export default config;
