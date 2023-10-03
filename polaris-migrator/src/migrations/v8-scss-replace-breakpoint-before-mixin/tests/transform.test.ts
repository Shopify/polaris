import {check} from '../../../utilities/check';

const transform = 'v8-scss-replace-breakpoint-before-mixin';
const fixtures = ['v8-scss-replace-breakpoint-before-mixin', 'with-inclusive'];

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
