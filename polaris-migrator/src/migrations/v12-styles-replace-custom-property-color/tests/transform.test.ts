import {check} from '../../../utilities/check';

const transform = 'v12-styles-replace-custom-property-color';
const fixtures = ['v12-styles-replace-custom-property-color'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
