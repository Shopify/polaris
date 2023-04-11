import path from 'path';

import {check} from '../../../utilities/check';

const transform = 'styles-insert-stylelint-disable';
const fixtures = ['styles-insert-stylelint-disable'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
    options: {
      config: path.join(__dirname, './test-config'),
    },
  });
}
