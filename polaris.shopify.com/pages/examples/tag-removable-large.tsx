import {Tag, LegacyStack, Text, BlockStack, Card} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

export function RemovableLarge() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
  ]);

  const removeTag = useCallback(
    (tag: string) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag size="large" key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const tagWithLinkMarkup = selectedTags.map((option) => (
    <Tag size="large" key={option} onRemove={removeTag(option)} url="#">
      {option}
    </Tag>
  ));

  return (
    <BlockStack gap="100">
      <Card>
        <Text as="p">Large</Text>
        <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>
      </Card>

      <Card>
        <Text as="p">Large with link</Text>
        <LegacyStack spacing="tight">{tagWithLinkMarkup}</LegacyStack>
      </Card>
    </BlockStack>
  );
}

export default withPolarisExample(RemovableLarge);
