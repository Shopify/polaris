import {check} from '../../../utilities/check';

const transform = 'v14-styles-replace-custom-property-text';
const fixtures = ['v14-styles-replace-custom-property-text'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
