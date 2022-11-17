import {check} from '../../../utilities/testUtils';

const migration = 'styles-tokenize-motion';
const fixtures = ['styles-tokenize-motion'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
