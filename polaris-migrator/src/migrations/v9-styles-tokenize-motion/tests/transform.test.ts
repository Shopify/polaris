import {check} from '../../../utilities/check';

const transform = 'v9-styles-tokenize-motion';
const fixtures = ['v9-styles-tokenize-motion'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
