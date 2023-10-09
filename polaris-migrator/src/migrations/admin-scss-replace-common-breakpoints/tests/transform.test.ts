import {check} from '../../../utilities/check';

const transform = 'admin-scss-replace-common-breakpoints';
const fixtures = ['admin-scss-replace-common-breakpoints'];

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
