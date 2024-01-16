import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AutoSizeExample() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const suffix = value ? 'in: Unfulfilled orders' : null;

  return (
    <TextField
      label="Search view"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      placeholder="Searching in Unfulfilled orders"
      suffix={suffix}
    />
  );
}

export default withPolarisExample(AutoSizeExample);
