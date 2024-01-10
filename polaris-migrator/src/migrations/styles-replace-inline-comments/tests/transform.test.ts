import {check} from '../../../utilities/check';

const transform = 'styles-replace-inline-comments';
const fixtures = ['styles-replace-inline-comments'];

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
