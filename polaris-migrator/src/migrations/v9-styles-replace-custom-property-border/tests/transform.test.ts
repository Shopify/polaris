import {check} from '../../../utilities/check';

const transform = 'v9-styles-replace-custom-property-border';
const fixtures = ['v9-styles-replace-custom-property-border'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
  });
}
