import {mountWithApp} from 'tests/utilities';

import {TextField} from '../../TextField';
import {FormLayout} from '../FormLayout';

describe('<FormLayout />', () => {
  it('renders its children', () => {
    const children = (
      <TextField onChange={noop} label="test" autoComplete="off" />
    );
    const formLayout = mountWithApp(<FormLayout>{children}</FormLayout>);
    expect(formLayout).toContainReactComponent(TextField, {
      onChange: noop,
      label: 'test',
    });
  });
});

function noop() {}
