import {check} from '../../../utilities/check';

const transform = 'v12-react-update-button-components';
const fixtures = [
  {
    name: 'v12-react-update-button-components',
    options: {
      componentName: 'Button',
      removeProp: 'outline',
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    options: fixture.options,
  });
}
