import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ChoiceListWithErrorExample() {
  const [selected, setSelected] = useState<string[]>(['hidden']);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden', describedByError: true},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      selected={selected}
      onChange={handleChange}
      error="Company name cannot be hidden at this time"
    />
  );
}

export default withPolarisExample(ChoiceListWithErrorExample);
