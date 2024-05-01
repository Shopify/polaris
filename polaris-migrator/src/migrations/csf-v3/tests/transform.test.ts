import {check} from '../../../utilities/check';

const transform = 'csf-v3';
const fixtures = ['transform'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
