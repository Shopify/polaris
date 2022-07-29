import {mountWithApp} from 'tests/utilities';

import {TextField} from '../../../../TextField';
import {Item} from '../Item';

describe('<Item />', () => {
  it('renders its children', () => {
    const children = (
      <TextField onChange={noop} label="test" autoComplete="off" />
    );
    const item = mountWithApp(<Item>{children}</Item>);
    expect(item).toContainReactComponent(TextField, {
      onChange: noop,
      label: 'test',
    });
  });
});

function noop() {}
