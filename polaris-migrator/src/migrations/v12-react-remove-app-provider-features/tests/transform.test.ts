import {check} from '../../../utilities/check';

const transform = 'v12-react-app-provider-component';
const fixtures = ['v12-react-app-provider-component'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
    },
  });
}
