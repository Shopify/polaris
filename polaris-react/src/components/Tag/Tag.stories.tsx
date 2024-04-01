import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  InlineStack,
  Icon,
  LegacyStack,
  Tag,
  Bleed,
  BlockStack,
  Text,
} from '@shopify/polaris';
import {WandIcon} from '@shopify/polaris-icons';

export default {
  component: Tag,
} as ComponentMeta<typeof Tag>;

export function All() {
  return (
    <BlockStack gap="100">
      <Text as="p">Default</Text>
      <Default />
      <br />
      <Text as="p">Removable</Text>
      <Removable />
      <br />
      <Text as="p">Clickable</Text>
      <Clickable />
      <br />
      <Text as="p">With Link</Text>
      <WithLink />
      <br />
      <Text as="p">With Custom Content</Text>
      <WithCustomContent />
      <br />
      <Text as="p">Removable with Link</Text>
      <RemovableWithLink />
      <br />
      <Text as="p">Removable large</Text>
      <RemovableLarge />
    </BlockStack>
  );
}

export function Default() {
  return (
    <InlineStack gap="100">
      <Tag>Wholesale</Tag>
      <Tag disabled>Disabled</Tag>
      <Tag url="#">With URL</Tag>
    </InlineStack>
  );
}

export function Removable() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsum quam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctus metus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, et venenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices. Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximus felis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justo aliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor non pulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximus lorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringilla euismod risus commodo, mattis blandit nulla.',
  ]);

  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag
      key={option}
      onRemove={removeTag(option)}
      disabled={option === 'Antique'}
    >
      {option}
    </Tag>
  ));

  return <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>;
}

export function Clickable() {
  return (
    <InlineStack gap="100">
      <Tag onClick={() => console.log('Clicked')}>Wholesale</Tag>
      <Tag onClick={() => console.log('Clicked')} disabled>
        Wholesale (clickable disabled)
      </Tag>
    </InlineStack>
  );
}

export function WithLink() {
  return <Tag url="#">Wholesale</Tag>;
}

export function WithCustomContent() {
  return (
    <Tag url="#">
      <InlineStack gap="050">
        <Bleed marginInlineStart="100">
          <Icon tone="base" source={WandIcon} />
        </Bleed>
        <span>Wholesale</span>
      </InlineStack>
    </Tag>
  );
}

export function RemovableWithLink() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
  ]);

  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)} url="#">
      {option}
    </Tag>
  ));

  return <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>;
}

export function RemovableLarge() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
  ]);

  const removeTag = useCallback(
    (tag) => () => {
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
      <Text as="p">Large</Text>
      <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>
      <Text as="p">Large with link</Text>
      <LegacyStack spacing="tight">{tagWithLinkMarkup}</LegacyStack>
    </BlockStack>
  );
}
