import {check} from '../../../utilities/check';

const transform = 'v9-scss-replace-z-index';
const fixtures = ['v9-scss-replace-z-index', 'with-namespace'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    extension: 'scss',
    options: {
      namespace: fixture.includes('with-namespace')
        ? 'legacy-polaris-v8'
        : undefined,
    },
  });
}
