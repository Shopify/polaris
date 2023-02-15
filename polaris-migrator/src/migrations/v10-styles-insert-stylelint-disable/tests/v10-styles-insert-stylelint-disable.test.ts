import path from 'path';

import {check} from '../../../utilities/testUtils';

const migration = 'v10-styles-insert-stylelint-disable';
const fixtures = ['v10-styles-insert-stylelint-disable'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
    options: {
      config: path.join(__dirname, './test-config'),
    },
  });
}
