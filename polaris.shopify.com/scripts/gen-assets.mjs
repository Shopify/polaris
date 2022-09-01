import genSiteMap from './gen-site-map.mjs';
import genSiteJson from './gen-site-json.mjs';
import genOgImages from './gen-og-images.mjs';

const genAssets = async () => {
  await Promise.all([genSiteMap(), genSiteJson()]);
  await genOgImages();
};

await genAssets();
