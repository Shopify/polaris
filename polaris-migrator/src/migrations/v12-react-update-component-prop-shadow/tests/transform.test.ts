import {check} from '../../../utilities/check';

const transform = 'v12-react-update-component-prop-space';
const fixtures = [
  {
    name: 'basic',
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
  });
}
