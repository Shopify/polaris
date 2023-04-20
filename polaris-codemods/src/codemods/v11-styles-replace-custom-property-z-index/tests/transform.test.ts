import {check} from '../../../utilities/check';

const transform = 'v11-styles-replace-custom-property-z-index';
const fixtures = ['v11-styles-replace-custom-property-z-index'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
