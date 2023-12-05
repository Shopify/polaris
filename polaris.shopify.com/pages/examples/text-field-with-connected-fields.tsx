import {TextField, Select, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ConnectedFieldsExample() {
  const [textFieldValue, setTextFieldValue] = useState('10.6');
  const [selectValue, setSelectValue] = useState('kg');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleSelectChange = useCallback(
    (value: string) => setSelectValue(value),
    [],
  );

  return (
    <TextField
      label="Weight"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      autoComplete="off"
      connectedLeft={
        <Select
          value={selectValue}
          label="Weight unit"
          onChange={handleSelectChange}
          labelHidden
          options={['kg', 'lb']}
        />
      }
      connectedRight={<Button>Submit</Button>}
    />
  );
}

export default withPolarisExample(ConnectedFieldsExample);
