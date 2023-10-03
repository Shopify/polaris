import {check} from '../../../utilities/check';

const transform = 'scss-replace-simple-legacy-mixins';
const fixtures = ['scss-replace-simple-legacy-mixins'];

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
