import {TextField} from '@shopify/polaris';
import {HideMinor, ViewMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextFieldWithIconButtonExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');
  const [showing, setShowing] = useState(false);

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const handleIconButtonClick = useCallback(
    () => setShowing(!showing),
    [showing],
  );

  return (
    <TextField
      label="Store name"
      value={showing ? textFieldValue : '••••••'}
      onChange={handleTextFieldChange}
      iconButton={{
        icon: showing ? HideMinor : ViewMinor,
        accessibilityLabel: 'PIN',
      }}
      onIconButtonClick={handleIconButtonClick}
      autoComplete="off"
    />
  );
}

export default withPolarisExample(TextFieldWithIconButtonExample);
