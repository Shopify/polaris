import {Tag, LegacyStack, Card} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function RemovableTagWithLinkExample() {
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
    <Card key={option}>
      <Tag onRemove={removeTag(option)} url="#">
        {option}
      </Tag>
    </Card>
  ));

  return <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>;
}

export default withPolarisExample(RemovableTagWithLinkExample);
