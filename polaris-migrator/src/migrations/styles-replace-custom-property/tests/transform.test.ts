import {check} from '../../../utilities/check';

const transform = 'styles-replace-custom-property';
const fixtures = [
  {
    name: 'with-from-to-flags-basic',
    options: {
      decl: 'color',
      from: '--p-text',
      to: '--p-color-text',
    },
  },
  {
    name: 'with-from-to-flags-regexp',
    options: {
      decl: '/^animation/',
      from: '--p-duration-200',
      to: '--p-motion-duration-200',
    },
  },
  {
    name: 'with-maps-flag',
    options: {
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps',
    },
  },
  {
    name: 'with-replacementMaps-option',
    options: {
      replacementMaps: {color: {'--p-text': '--p-color-text'}},
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    extension: 'scss',
    options: fixture.options,
  });
}
