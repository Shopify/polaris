import {FormLayout, ChoiceList, TextField, Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function HiddenLabelExample() {
  const [value, setValue] = useState('12');
  const [selected, setSelected] = useState('yes');

  const handleTextChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleChoiceChange = useCallback(
    (selections: string[]) => setSelected(selections[0]),
    [],
  );

  return (
    <FormLayout>
      <ChoiceList
        title="Gift card auto-expiration"
        choices={[
          {label: 'Gift cards never expire', value: 'no'},
          {label: 'Gift cards expire', value: 'yes'},
        ]}
        selected={[selected]}
        onChange={handleChoiceChange}
      />
      <TextField
        label="Gift cards expire after"
        type="number"
        labelHidden
        value={value}
        disabled={selected === 'no'}
        onChange={handleTextChange}
        autoComplete="off"
        connectedRight={
          <Select
            label="Unit of time"
            labelHidden
            options={['months after purchase']}
          />
        }
      />
    </FormLayout>
  );
}

export default withPolarisExample(HiddenLabelExample);
