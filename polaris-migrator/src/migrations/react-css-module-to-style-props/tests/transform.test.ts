import {check} from '../../../utilities/check';

const transform = 'react-css-module-to-style-props';
const options = {};
const fixtures = [
  // {
  //   name: 'simple-class',
  //   options,
  // },
  // {
  //   name: 'compound-class',
  //   options,
  // },
  {
    name: 'compound-array-class',
    options,
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    options: fixture.options,
  });
}
