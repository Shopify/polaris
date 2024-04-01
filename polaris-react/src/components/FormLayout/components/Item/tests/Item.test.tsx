import React from 'react';
import {mountWithApp} from 'tests/utilities';

import styles from '../../../FormLayout.module.css';
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

  it('does not render when children is undefined', () => {
    const item = mountWithApp(<Item />);
    expect(item).not.toContainReactComponent('div', {
      className: styles.Item,
    });
  });
});

function noop() {}
