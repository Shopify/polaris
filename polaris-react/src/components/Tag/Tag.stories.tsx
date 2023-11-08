import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {InlineStack, Icon, LegacyStack, Tag, Bleed} from '@shopify/polaris';
import {WandMinor} from '@shopify/polaris-icons';

export default {
  component: Tag,
} as ComponentMeta<typeof Tag>;

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
          <Icon tone="base" source={WandMinor} />
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
