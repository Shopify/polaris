import genSiteMap from './gen-site-map.mjs';
import genCacheJson from './gen-cache-json.mjs';

const genAssets = async () => {
  await Promise.all([genSiteMap(), genCacheJson()]);
};

await genAssets();
