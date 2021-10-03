import React from 'react';
import {TextField} from 'components';
import {mountWithApp} from 'test-utilities';

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
