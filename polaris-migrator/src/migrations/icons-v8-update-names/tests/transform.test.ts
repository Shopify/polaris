import {check} from '../../../utilities/check';

const transform = 'icons-v8-update-names';
const fixtures = ['transform', 'big-transform'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
