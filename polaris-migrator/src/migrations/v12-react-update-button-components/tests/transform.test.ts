import {check} from '../../../utilities/check';

const transform = 'v12-react-update-button-components';
const fixtures = [
  'v12-react-update-button-components',
  'v12-react-update-button-primary-plain-components',
  'v12-react-update-button-plain-monochrome-components',
  'v12-react-update-button-self-closing',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
