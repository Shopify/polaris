import {check} from '../../../utilities/check';

const transform = 'admin-legacy-media-queries';
const fixtures = ['admin-legacy-media-queries'];

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
