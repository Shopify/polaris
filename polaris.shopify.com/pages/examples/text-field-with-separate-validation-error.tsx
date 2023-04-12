import {
  LegacyStack,
  FormLayout,
  Select,
  TextField,
  InlineError,
  Button,
  LegacyCard,
} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SeparateValidationErrorExample() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectTypeValue, setSelectTypeValue] = useState('Product type');
  const [selectConditionValue, setSelectConditionValue] =
    useState('is equal to');

  const handleTextFieldValueChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleSelectTypeChange = useCallback(
    (value: string) => setSelectTypeValue(value),
    [],
  );

  const handleSelectConditionChange = useCallback(
    (value: string) => setSelectConditionValue(value),
    [],
  );

  const textFieldID = 'ruleContent';
  const isInvalid = isValueInvalid(textFieldValue);
  const errorMessage = isInvalid
    ? 'Enter 3 or more characters for product type is equal to'
    : '';

  const formGroupMarkup = (
    <LegacyStack wrap={false} alignment="leading" spacing="loose">
      <LegacyStack.Item fill>
        <FormLayout>
          <FormLayout.Group condensed>
            <Select
              labelHidden
              label="Collection rule type"
              options={['Product type']}
              value={selectTypeValue}
              onChange={handleSelectTypeChange}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={['is equal to']}
              value={selectConditionValue}
              onChange={handleSelectConditionChange}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={textFieldValue}
              onChange={handleTextFieldValueChange}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
        <div style={{marginTop: '4px'}}>
          <InlineError message={errorMessage} fieldID={textFieldID} />
        </div>
      </LegacyStack.Item>
      <Button icon={DeleteMinor} accessibilityLabel="Remove item" />
    </LegacyStack>
  );

  return (
    <LegacyCard sectioned>
      <FormLayout>{formGroupMarkup}</FormLayout>
    </LegacyCard>
  );

  function isValueInvalid(content: string) {
    if (!content) {
      return true;
    }

    return content.length < 3;
  }
}

export default withPolarisExample(SeparateValidationErrorExample);
