import {check} from '../../../utilities/check';

const transform = 'scss-remove-unused-at-use';
const fixtures = [
  'scss-remove-unused-at-use',
  'with-used-at-use',
  'with-at-use-namespace',
  'with-used-at-use-namespace',
  'with-options',
  'with-configuration',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
    options: {
      url: fixture.includes('options')
        ? 'media-queries'
        : 'global-styles/legacy-polaris-v8',
    },
  });
}
