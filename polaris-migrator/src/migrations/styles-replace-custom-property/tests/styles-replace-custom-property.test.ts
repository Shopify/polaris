import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property';
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
    name: 'with-maps-flag-basic',
    options: {
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps-basic',
    },
  },
  {
    name: 'with-maps-flag-regexp',
    options: {
      maps: 'src/migrations/styles-replace-custom-property/tests/replacement-maps-regexp',
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    migration,
    extension: 'scss',
    options: fixture.options,
  });
}
