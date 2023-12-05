import {LegacyStack, Tag, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function VerticalContentExample() {
  const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const verticalContentMarkup =
    tags.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </LegacyStack>
    ) : null;

  return (
    <TextField
      label="Tags"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Search tags"
      autoComplete="off"
      verticalContent={verticalContentMarkup}
    />
  );
}

export default withPolarisExample(VerticalContentExample);
