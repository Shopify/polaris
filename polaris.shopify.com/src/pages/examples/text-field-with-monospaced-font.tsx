import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function TextFieldWithMonospacedFontExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      monospaced
    />
  );
}

export default withPolarisExample(TextFieldWithMonospacedFontExample);
