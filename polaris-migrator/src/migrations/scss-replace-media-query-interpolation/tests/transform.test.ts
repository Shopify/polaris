import {check} from '../../../utilities/check';

const transform = 'scss-replace-media-query-interpolation';
const fixtures = ['scss-replace-media-query-interpolation'];

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
