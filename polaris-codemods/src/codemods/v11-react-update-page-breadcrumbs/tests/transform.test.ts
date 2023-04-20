import {check} from '../../../utilities/check';

const transform = 'v11-react-update-page-breadcrumbs';
const fixtures = ['v11-react-update-page-breadcrumbs'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
  });
}
