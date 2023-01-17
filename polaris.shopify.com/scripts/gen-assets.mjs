import genSiteMap from './gen-site-map.mjs';
import genCacheJson from './gen-cache-json.mjs';
import genOgImages from './gen-og-images.mjs';

const genAssets = async () => {
  await Promise.all([genSiteMap(), genCacheJson()]);
  await genOgImages();
};

await genAssets();
