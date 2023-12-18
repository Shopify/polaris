import genCacheJson from './gen-cache-json';
(async function run() {
  await genCacheJson();
  await import('./gen-site-map').then(({default: genSiteMap}) => genSiteMap());
  await import('./gen-og-images').then(({default: genOgImages}) =>
    genOgImages(),
  );
})();
