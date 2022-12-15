'use client';

import {Listbox} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ListboxWithLoadingExample() {
  return (
    <Listbox>
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
      <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
      <Listbox.Loading accessibilityLabel="Loading" />
    </Listbox>
  );
}

export default withPolarisExample(ListboxWithLoadingExample);
