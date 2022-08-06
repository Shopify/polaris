import {writeFileSync} from 'fs';

import apiColorTokens from './apiTokenColors.json';
import colorStyles from './colorStyles.json';

function addPaintStyleIDtoTokens() {
  const figmaColorStyles = colorStyles.meta.styles;

  if (!('id' in apiColorTokens[0])) {
    apiColorTokens.forEach((token) => {
      figmaColorStyles.forEach((style) => {
        if (style.name === token.figmaName) {
          token.id = style.key;
        }
      });
    });
  }

  writeFileSync(
    'apiTokenColors.json',
    JSON.stringify(apiColorTokens),
    (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('Data written to file');
    },
  );
}

addPaintStyleIDtoTokens();
