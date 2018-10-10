import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import {TextField} from 'components';
import FormLayout from '../FormLayout';

describe('<FormLayout />', () => {
  it('renders its children', () => {
    const children = <TextField onChange={noop} label="test" />;
    const formLayout = mountWithAppProvider(
      <FormLayout>{children}</FormLayout>,
    );
    expect(formLayout.contains(children)).toBe(true);
  });
});
