import {check} from '../../../utilities/check';

const transform = 'v11-styles-replace-custom-property-color';
const fixtures = ['v11-styles-replace-custom-property-color'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
