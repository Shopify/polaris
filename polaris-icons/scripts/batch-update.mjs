import {readFileSync, writeFileSync} from 'fs';
import path from 'path';

import globby from 'globby';
import jsYaml from 'js-yaml';

const iconBasePath = new URL('../icons', import.meta.url).pathname;
const iconPaths = globby.sync(path.join(iconBasePath, '*.yml'));

iconPaths.forEach((iconFile) => {
  const iconData = jsYaml.load(readFileSync(iconFile), {
    schema: jsYaml.JSON_SCHEMA,
  });
  // TODO If --add-author 'Joe Thomas'
  if (!iconData.authors.includes('Joe Thomas')) {
    const currentAuthors = [...iconData.authors];
    currentAuthors.push('Joe Thomas');
    iconData.authors = currentAuthors;
  }
  // TODO if change global set
  // Might be handy if we remove sets altogether

  // Update date_modified
  iconData.date_modified = new Date().toISOString().split('T')[0];

  const filename = path.basename(iconFile);
  writeFileSync(
    `${iconBasePath}/${filename}`,
    jsYaml.dump(iconData, {schema: jsYaml.JSON_SCHEMA}),
  );
});
