import {check} from '../../../utilities/check';

const transform = 'react-remove-major-minor-icons';
const fixtures = ['transform'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
