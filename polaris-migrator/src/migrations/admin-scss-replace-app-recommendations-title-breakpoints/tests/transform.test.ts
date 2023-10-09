import {check} from '../../../utilities/check';

const transform = 'admin-scss-replace-app-recommendations-title-breakpoints';
const fixtures = ['admin-scss-replace-app-recommendations-title-breakpoints'];

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
