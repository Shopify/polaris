import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LoadingExample() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleClearButtonClick = useCallback(() => setValue(''), []);

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      clearButton
      onClearButtonClick={handleClearButtonClick}
      loading
    />
  );
}

export default withPolarisExample(LoadingExample);
