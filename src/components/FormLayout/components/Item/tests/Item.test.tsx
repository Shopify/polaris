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

  it('renders item with First className when index is 0', () => {
    const item = mountWithApp(<Item {...defaultProps} index={0} />);
    expect(item.find('div')?.props.className).toContain('First');
  });

  it('renders item with First className when index is not 0', () => {
    const item = mountWithApp(<Item {...defaultProps} index={1} />);
    expect(item.find('div')?.props.className).not.toContain('First');
  });
});

function noop() {}
