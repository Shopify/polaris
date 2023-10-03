import {check} from '../../../utilities/check';

const transform = 'admin-replace-breakpoint-after';
const fixtures = ['admin-replace-breakpoint-after', 'with-inclusive'];

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
