import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-animatable';
const fixtures = [
  'transition',
  'transition-duration',
  'transition-timing-function',
  'animation',
  'animation-duration',
  'animation-timing-function',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
    options: {
      namespace: 'legacy-polaris-v8',
    },
  });
}

check(__dirname, {
  fixture: 'transition-only',
  migration,
  extension: 'scss',
  options: {
    namespace: 'legacy-polaris-v8',
    withTransition: 'true',
    withAnimation: false,
  },
});

check(__dirname, {
  fixture: 'animation-only',
  migration,
  extension: 'scss',
  options: {
    namespace: 'legacy-polaris-v8',
    withTransition: 'false',
  },
});

check(__dirname, {
  fixture: 'neither',
  migration,
  extension: 'scss',
  options: {
    namespace: 'legacy-polaris-v8',
    withTransition: false,
    withAnimation: false,
  },
});
