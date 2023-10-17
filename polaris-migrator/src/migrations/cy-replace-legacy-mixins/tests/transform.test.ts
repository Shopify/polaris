import {check} from '../../../utilities/check';

const transform = 'cy-replace-legacy-mixins';
const fixtures = [
  'cy-replace-legacy-mixins',
  'with-usage-inside-atrule-params',
  'with-usage-inside-declaration',
  'with-common-se23',
  'with-common-se23-complex',
  'with-unsupported-at-use',
  'with-interpolation',
  'with-placeholder',
  'with-placeholder-complex',
  'with-mixin',
  'with-common-variable',
];

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
