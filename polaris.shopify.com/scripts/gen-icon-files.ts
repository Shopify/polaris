import path from 'path';
import {copyFile, mkdir} from 'fs/promises';

import iconMetadata from '@shopify/polaris-icons/metadata';
import ora from 'ora';

/**
 * Self-hosts the raw icon SVGs.
 *
 * `/icons` renders each icon from its React component, but the "Download"
 * button needs the original file. It used to `fetch()` that from
 * `raw.githubusercontent.com/Shopify/polaris/main/...`, which is both an
 * off-origin request the archived site shouldn't make and a link to a branch
 * nothing keeps pointing at these icons. Copying them out of
 * `@shopify/polaris-icons` (which exports `dist/svg/*.svg`) makes the download
 * self-contained and guarantees it matches the rendered icon.
 *
 * Deliberately not `public/icons`: that would put a directory next to the
 * `icons.html` the `/icons` page exports, and there's no reason to lean on how
 * GitHub Pages breaks that tie.
 */
const genIconFiles = async () => {
  const spinner = ora('Generating public/icon-svgs').start();

  const fileNames = Object.keys(iconMetadata);
  const outputDir = path.join(process.cwd(), 'public', 'icon-svgs');

  await mkdir(outputDir, {recursive: true});

  await Promise.all(
    fileNames.map((fileName) =>
      copyFile(
        require.resolve(`@shopify/polaris-icons/dist/svg/${fileName}.svg`),
        path.join(outputDir, `${fileName}.svg`),
      ),
    ),
  );

  spinner.succeed(`Generated public/icon-svgs (${fileNames.length} icons)`);
};

export default genIconFiles;
