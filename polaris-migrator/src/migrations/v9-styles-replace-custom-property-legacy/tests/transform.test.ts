import {check} from '../../../utilities/check';

const transform = 'v9-styles-replace-custom-property-legacy';
const fixtures = ['v9-styles-replace-custom-property-legacy'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
