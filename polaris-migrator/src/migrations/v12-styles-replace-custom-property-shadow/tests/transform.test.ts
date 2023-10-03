import {check} from '../../../utilities/check';

const transform = 'v12-styles-replace-custom-property-shadow';
const fixtures = ['v12-styles-replace-custom-property-shadow'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
