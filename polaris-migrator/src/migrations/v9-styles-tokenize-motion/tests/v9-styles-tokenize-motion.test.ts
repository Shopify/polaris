import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-tokenize-motion';
const fixtures = ['v9-styles-tokenize-motion'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
