import {Listbox, LegacyStack, Icon} from '@shopify/polaris';
import {CirclePlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ListboxWithActionExample() {
  return (
    <Listbox accessibilityLabel="Listbox with Action example">
      <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
      <Listbox.Option value="UniqueValue-2" divider>
        Item 2
      </Listbox.Option>
      <Listbox.Action value="ActionValue">
        <LegacyStack spacing="tight">
          <Icon source={CirclePlusIcon} tone="base" />
          <div>Add item</div>
        </LegacyStack>
      </Listbox.Action>
    </Listbox>
  );
}

export default withPolarisExample(ListboxWithActionExample);
