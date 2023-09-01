import {check} from '../../../utilities/check';

const transform = 'v12-styles-replace-custom-property-font';
const fixtures = ['v12-styles-replace-custom-property-font'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
