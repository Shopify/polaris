import {check} from '../../../utilities/testUtils';

const migration = 'v11-react-replace-link-external-property';
const fixtures = [
  {
    name: 'v11-react-replace-link-external-property',
  },
  {
    name: 'v11-react-replace-link-external-property-invalid',
  },
  {
    name: 'with-relative-link',
    options: {
      relative: true,
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    migration,
    options: fixture.options,
  });
}
