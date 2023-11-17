import {check} from '../../../utilities/check';

const transform = 'icons-v8-update-names';
const fixtures = ['transform', 'local-name'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
