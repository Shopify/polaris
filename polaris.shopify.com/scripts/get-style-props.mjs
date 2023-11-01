import css from '@webref/css';
import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Generate style.module.scss from that same spec
/*
  .Box {
    @getResponsiveProps(${namespace}, ${propertyName}, ${variableName})
  }
*/

const parsedFiles = await css.listAll();
const file = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);

await file.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
await file.write("\n@import '../../styles/common';");
await file.write('\n.Box {');
for (let [shortname, data] of Object.entries(parsedFiles)) {
  for (let i = 0; i < data.properties.length; i++) {
    await file.write(
      `\n  @include responsive-props('box', '${data.properties[i].name}', '${data.properties[i].name}');`,
    );
  }
}
await file.write('\n};');
await file.close();
