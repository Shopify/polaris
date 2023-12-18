import genCacheJson from './gen-cache-json';
import genOgImages from './gen-og-images';
import genSiteMap from './gen-site-map';
(async function run() {
  await genCacheJson();
  await genSiteMap();
  await genOgImages();
})().then();
