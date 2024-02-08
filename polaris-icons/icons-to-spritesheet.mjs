import path from 'path';
import {readFileSync, existsSync, unlinkSync, writeFileSync} from 'fs';

import globby from 'globby';

const iconSpriteSheetPath = new URL('./icon-spritesheet.svg', import.meta.url)
  .pathname;

const iconBasePath = new URL('./icons', import.meta.url).pathname;
const iconPaths = globby.sync(path.join(iconBasePath, '*.svg'));

const spriteData = [];

iconPaths.forEach((iconFileName) => {
  const iconId = path.basename(iconFileName).replace('.svg', '');
  const iconData = readFileSync(iconFileName, {encoding: 'utf-8'})
    .replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">', '')
    .replace('</svg>', '');

  spriteData.push(`<g id="${iconId}">${iconData}</g>`);
});

if (existsSync(iconSpriteSheetPath)) unlinkSync(iconSpriteSheetPath);

const iconSpriteSheet = `<svg><defs>${spriteData.join('')}</defs></svg>`;

writeFileSync(iconSpriteSheetPath, iconSpriteSheet);
