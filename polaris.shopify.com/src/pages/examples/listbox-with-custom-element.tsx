import {Listbox} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function ListboxWithCustomElementExample() {
  return (
    <Listbox accessibilityLabel="Listbox with custom element example">
      <Listbox.Action value="ActionValue" divider>
        Add item
      </Listbox.Action>
      <Listbox.Option value="UniqueValue-1">
        <div>Item 1</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-2">
        <div>Item 2</div>
      </Listbox.Option>
      <Listbox.Option value="UniqueValue-3">
        <div>Item 3</div>
      </Listbox.Option>
      <Listbox.Loading accessibilityLabel="items are loading" />
    </Listbox>
  );
}

export default withPolarisExample(ListboxWithCustomElementExample);
