import {check} from '../../../utilities/check';

const transform = 'v12-react-update-button-component';
const fixtures = [
  'v12-react-update-button-component',
  'v12-react-update-button-local-name',
  'v12-react-update-button-primary-plain-component',
  'v12-react-update-button-plain-monochrome-component',
  'v12-react-update-button-self-closing',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
