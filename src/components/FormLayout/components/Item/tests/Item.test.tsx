import React from 'react';
import {mountWithApp} from 'test-utilities';
import {TextField} from 'components';

import {Item} from '../Item';

describe('<Item />', () => {
  const defaultProps = {index: 0};

  it('renders its children', () => {
    const children = <TextField onChange={noop} label="test" />;
    const item = mountWithApp(<Item {...defaultProps}>{children}</Item>);
    expect(item).toContainReactComponent(TextField);
  });
});

function noop() {}
