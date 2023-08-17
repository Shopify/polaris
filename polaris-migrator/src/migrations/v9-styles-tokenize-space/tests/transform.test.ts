import {check} from '../../../utilities/check';

const transform = 'v9-styles-tokenize-space';
const fixtures = ['v9-styles-tokenize-space', 'with-namespace'];

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
