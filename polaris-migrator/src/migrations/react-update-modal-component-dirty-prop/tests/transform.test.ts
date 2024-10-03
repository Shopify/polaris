import {check} from '../../../utilities/check';

const transform = 'react-update-modal-component-dirty-prop';
const fixtures = [
  {
    name: 'basic-modal',
  },
  // {
  //   name: 'with-form-state-import',
  // },
  // {
  //   name: 'with-form-state-import-and-aliased-modal',
  // },
  // {
  //   name: 'with-form-state-import-and-no-dirty-variable',
  // },
  // {
  //   name: 'with-form-state-import-and-spread-props',
  // },
  // {
  //   name: 'with-use-form-import',
  // },
  // {
  //   name: 'with-use-form-import-and-shared-modal-import',
  // },
  // {
  //   name: 'with-use-route-form-import',
  // },
  // {
  //   name: 'with-use-route-form-import-and-dirty-object',
  // },
  // {
  //   name: 'with-use-route-form-import-and-dirty-variable',
  // },
  {
    name: 'modal-wrapper',
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
  });
}
