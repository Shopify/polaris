import {Listbox, LegacyStack, Icon} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
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
          <Icon source={CirclePlusMinor} color="base" />
          <div>Add item</div>
        </LegacyStack>
      </Listbox.Action>
    </Listbox>
  );
}

export default withPolarisExample(ListboxWithActionExample);
