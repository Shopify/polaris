import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SingleChoiceListExample() {
  const [selected, setSelected] = useState<string[]>(['hidden']);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);

  return (
    <ChoiceList
      title="Company name"
      choices={[
        {label: 'Hidden', value: 'hidden'},
        {label: 'Optional', value: 'optional'},
        {label: 'Required', value: 'required'},
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}

export default withPolarisExample(SingleChoiceListExample);
