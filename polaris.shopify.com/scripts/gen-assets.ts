import genCacheJson from './gen-cache-json';
(async function run() {
  await genCacheJson();
  // Note: no sitemap. The archived site is `noindex`, so advertising its URLs
  // to crawlers would work against that.
  await import('./gen-fonts').then(({default: genFonts}) => genFonts());
  await import('./gen-icon-files').then(({default: genIconFiles}) =>
    genIconFiles(),
  );
  await import('./gen-search-index').then(({default: genSearchIndex}) =>
    genSearchIndex(),
  );
  await import('./gen-token-api').then(({default: genTokenApi}) =>
    genTokenApi(),
  );
  await import('./gen-og-images').then(({default: genOgImages}) =>
    genOgImages(),
  );
})();
