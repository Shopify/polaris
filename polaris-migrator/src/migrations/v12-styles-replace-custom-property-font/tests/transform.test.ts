import {check} from '../../../utilities/check';

const transform = 'v12-styles-replace-custom-property-font';
const fixtures = [
  {
    name: 'step1',
    options: {
      step: 1,
    },
  },
  {
    name: 'step2',
    options: {
      step: 2,
    },
  },
  {
    name: 'step3',
    options: {
      step: 3,
    },
  },
  {
    name: 'step4',
    options: {
      step: 4,
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    options: fixture.options,
    extension: 'scss',
  });
}
