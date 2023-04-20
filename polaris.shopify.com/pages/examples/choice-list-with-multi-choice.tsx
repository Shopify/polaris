import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function MultiChoiceListExample() {
  const [selected, setSelected] = useState<string[]>(['hidden']);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);

  return (
    <ChoiceList
      allowMultiple
      title="While the customer is checking out"
      choices={[
        {
          label: 'Use the shipping address as the billing address by default',
          value: 'shipping',
          helpText:
            'Reduces the number of fields required to check out. The billing address can still be edited.',
        },
        {
          label: 'Require a confirmation step',
          value: 'confirmation',
          helpText:
            'Customers must review their order details before purchasing.',
        },
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}

export default withPolarisExample(MultiChoiceListExample);
