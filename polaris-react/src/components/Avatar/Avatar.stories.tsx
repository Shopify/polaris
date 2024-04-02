import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {AvatarProps} from '@shopify/polaris';
import {
  ActionList,
  Avatar,
  Button,
  Popover,
  BlockStack,
  InlineStack,
  Box,
  Text,
} from '@shopify/polaris';

import type {Entries} from '../../types';

import type {STYLE_CLASSES} from './Avatar';

export default {
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const sizes: NonNullable<AvatarProps['size']>[] = [
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
];

type Style = (typeof STYLE_CLASSES)[number];

const styleInitialsDefault: {
  [S in Style]: string;
} = {
  one: 'AI',
  two: 'AM',
  three: 'AB',
  four: 'AC',
  five: 'AG',
  six: 'AA',
  seven: 'AE',
};

const styleInitialsDefaultEntries = Object.entries(
  styleInitialsDefault,
) as Entries<typeof styleInitialsDefault>;

const styleInitialsLong: {
  [S in Style]: string;
} = {
  one: 'AAG',
  two: 'AAD',
  three: 'AAB',
  four: 'AEE',
  five: 'AAE',
  six: 'AAF',
  seven: 'AAC',
};

const styleInitialsLongEntries = Object.entries(styleInitialsLong) as Entries<
  typeof styleInitialsLong
>;

export function All() {
  return (
    <BlockStack gap="400">
      <Box paddingBlockEnd="200">
        <BlockStack gap="300">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              Default
            </Text>
            <InlineStack gap="200" blockAlign="center">
              {sizes.map((size) => (
                <Avatar key={size} size={size} />
              ))}
            </InlineStack>
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With customer
            </Text>
            <InlineStack gap="200" blockAlign="center">
              {sizes.map((size) => (
                <Avatar customer key={size} size={size} />
              ))}
            </InlineStack>
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With image
            </Text>
            <InlineStack gap="200" blockAlign="center">
              <Image />
            </InlineStack>
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With icon (all styles)
            </Text>
            <IconColorsSizes />
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With default initials (all styles)
            </Text>
            <InitialsColorsSizes />
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With long initials (all styles)
            </Text>
            <InitialsLong />
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              With long and wide initials
            </Text>
            <BlockStack gap="200">
              <InlineStack gap="200" blockAlign="center">
                {sizes.map((size) => (
                  <Avatar key={size} size={size} initials="WWW" />
                ))}
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </BlockStack>
  );
}

export function Default() {
  return <Avatar />;
}

export function IconColorsSizes() {
  return (
    <BlockStack gap="200">
      {styleInitialsDefaultEntries.map(([style, initials]) => (
        <InlineStack key={style} gap="200" blockAlign="center">
          {sizes.map((size) => (
            <Avatar key={size} name={initials} size={size} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export function InitialsColorsSizes() {
  return (
    <BlockStack gap="200">
      {styleInitialsDefaultEntries.map(([style, initials]) => (
        <InlineStack key={style} gap="200" blockAlign="center">
          {sizes.map((size) => (
            <Avatar key={size} initials={initials} size={size} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export function InitialsLong() {
  return (
    <BlockStack gap="200">
      {styleInitialsLongEntries.map(([style, initialsLong]) => (
        <InlineStack key={style} gap="200" blockAlign="center">
          {sizes.map((size) => (
            <Avatar key={size} initials={initialsLong} size={size} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export function ExtraSmallInContext() {
  const [active, setActive] = useState(true);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Manage staff
    </Button>
  );

  return (
    <div style={{height: '144px'}}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList
          items={[
            {
              content: 'Chet Baker',
              prefix: <Avatar customer size="xs" name="Chet Baker" />,
            },
            {
              content: 'Farrah Fawcett',
              prefix: <Avatar customer size="xs" name="Farrah Fawcett" />,
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function Image() {
  return (
    <InlineStack gap="200" blockAlign="center">
      {sizes.map((size) => (
        <Avatar
          key={size}
          size={size}
          initials="WWW"
          name="Image"
          source="https://burst.shopifycdn.com/photos/woman-dressed-in-pale-colors.jpg"
        />
      ))}
    </InlineStack>
  );
}
