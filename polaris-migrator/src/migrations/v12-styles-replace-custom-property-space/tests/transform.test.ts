import {check} from '../../../utilities/check';

const transform = 'v12-styles-replace-custom-property-space';
const fixtures = ['v12-styles-replace-custom-property-space'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
