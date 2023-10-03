import {check} from '../../../utilities/check';

const transform = 'admin-replace-breakpoint-before';
const fixtures = ['admin-replace-breakpoint-before', 'with-inclusive'];

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
