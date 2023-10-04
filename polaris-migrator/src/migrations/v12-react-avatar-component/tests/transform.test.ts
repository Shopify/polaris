import {check} from '../../../utilities/check';

const transform = 'v12-react-avatar-component';
const fixtures = ['v12-react-avatar-component'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
    },
  });
}
