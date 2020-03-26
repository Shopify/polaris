import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {TextField} from 'components';

import {FormLayout} from '../FormLayout';

describe('<FormLayout />', () => {
  it('renders its children', () => {
    const children = <TextField onChange={noop} label="test" />;
    const formLayout = mountWithAppProvider(
      <FormLayout>{children}</FormLayout>,
    );
    expect(formLayout.contains(children)).toBe(true);
  });
});

function noop() {}
