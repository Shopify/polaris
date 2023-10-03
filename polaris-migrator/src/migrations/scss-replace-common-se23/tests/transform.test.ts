import {check} from '../../../utilities/check';

const transform = 'scss-replace-common-se23';
const fixtures = ['scss-replace-common-se23'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
    options: {
      customSyntax: 'postcss-scss',
      reportDescriptionlessDisables: true,
      rules: {},
    },
  });
}
