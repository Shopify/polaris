import {globbySync} from 'globby';
import fs from 'fs';

const countLines = (file) => file.split('\n').length;

function fileShouldBeSkipped(file) {
  const shouldBeSkipped =
    file.includes('node_modules') ||
    // Exclude content: It's not fair to include it in the comparison
    // since the new site "optimizes" the way data is stored without
    // actually reducing the maintainance burden.
    file.includes('polaris.shopify.com/content') ||
    // Reduce the examples. They're not really part of the site.
    file.includes('polaris.shopify.com/pages/examples') ||
    file.includes('app/examples/') ||
    // The old site has some snapshot tests. Not fair to include them.
    file.includes('__snapshots__') ||
    // Ignore next.config.js because almost all of the file is a list
    // of redirects. It would be unfair to count them since they aren't
    // really something that we "maintain".
    file.includes('next.config.js') ||
    // Ignore public dir. It's just a bunch of images.
    file.includes('/public') ||
    // Playroom isn't really a part of the site, it's a separate tool
    file.includes('/playroom') ||
    // Legacy content
    file.includes('/legacy/') ||
    file.includes('/Editor/') || // Debatable
    // Ignore new content structure
    file.endsWith('content.ts') ||
    // Ignore scripts that will be remove pre-merge
    file.endsWith('fix-examples.mjs') ||
    file.endsWith('move-examples.mjs') ||
    file.endsWith('migrateContentToEditor.mjs') ||
    // Skip package.json. We don't really *maintain* it.
    file.endsWith('package.json') ||
    // Ignore this script
    file.endsWith('compare-size.mjs') ||
    // Ignore other config and content files
    file.endsWith('lock.json') ||
    file.endsWith('.log') ||
    file.endsWith('.next-env.d.ts') ||
    file.endsWith('README.md') ||
    file.endsWith('CHANGELOG.md') ||
    file.endsWith('tsbuildinfo') ||
    file.endsWith('yarn.lock') ||
    // Ignore non-typescript files
    // file.endsWith('.scss') || // Debatable
    file.endsWith('.svg') ||
    file.endsWith('.png') ||
    file.endsWith('.ico') ||
    file.endsWith('.ttf');

  // if (shouldBeSkipped && !file.includes('node_modules')) {
  //   console.log(`Skipping ${file}`);
  // }

  return shouldBeSkipped;
}

function getStats(entry) {
  let linesTotal = 0;
  let files = [];
  globbySync(entry).forEach((file) => {
    if (!fileShouldBeSkipped(file)) {
      const content = fs.readFileSync(file, 'utf8');
      files.push(file);
      linesTotal += countLines(content);
    }
  });

  const packageJSONfile = fs.readFileSync(`${entry}/package.json`, 'utf8');
  const packageJSON = JSON.parse(packageJSONfile);

  const dependencies =
    Object.keys(packageJSON.dependencies).length +
    (packageJSON.devDependencies
      ? Object.keys(packageJSON.devDependencies).length
      : 0);

  console.log(JSON.stringify({entry, linesTotal, dependencies}, null, 2));
}

getStats('../polaris.shopify.com');
getStats('../polaris.shopify.com-lite');
