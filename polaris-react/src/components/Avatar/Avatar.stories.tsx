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

const sizes: {
  [S in NonNullable<AvatarProps['size']>]: string;
} = {
  '2xl-experimental': 'XXL',
  'xl-experimental': 'XL',
  large: 'Large',
  medium: 'Medium',
  small: 'Small',
  extraSmall: 'XS',
};

const sizeEntries = Object.entries(sizes) as Entries<typeof sizes>;

type Style = typeof STYLE_CLASSES[number];

const styleInitialsDefault: {
  [S in Style]: string;
} = {
  one: 'AA',
  two: 'AG',
  three: 'AC',
  four: 'AB',
  five: 'AE',
};

const styleInitialsDefaultEntries = Object.entries(
  styleInitialsDefault,
) as Entries<typeof styleInitialsDefault>;

const styleInitialsLong: {
  [S in Style]: string;
} = {
  one: 'AAA',
  two: 'AAB',
  three: 'AAC',
  four: 'AAD',
  five: 'AAE',
};

const styleInitialsLongEntries = Object.entries(styleInitialsLong) as Entries<
  typeof styleInitialsLong
>;

export function All() {
  return (
    <BlockStack gap="4">
      <Box paddingBlockEnd="2">
        <BlockStack gap="3">
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              Default
            </Text>
            <InlineStack gap="2" blockAlign="center">
              {sizeEntries.map(([size]) => (
                <Avatar key={size} size={size} />
              ))}
            </InlineStack>
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With customer
            </Text>
            <InlineStack gap="2" blockAlign="center">
              {sizeEntries.map(([size]) => (
                <Avatar key={size} size={size} customer />
              ))}
            </InlineStack>
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With image
            </Text>
            <InlineStack gap="2" blockAlign="center">
              <Image />
            </InlineStack>
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With icon (all styles)
            </Text>
            <IconColorsSizes />
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With default initials (all styles)
            </Text>
            <InitialsColorsSizes />
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With long initials (all styles)
            </Text>
            <InitialsLong />
          </BlockStack>
          <BlockStack gap="2">
            <Text as="h2" variant="headingXs">
              With long and wide initials
            </Text>
            <BlockStack gap="2">
              <InlineStack gap="2" blockAlign="center">
                {sizeEntries.map(([size]) => (
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
    <BlockStack gap="2">
      {styleInitialsDefaultEntries.map(([style, initials]) => (
        <InlineStack key={style} gap="2" blockAlign="center">
          {sizeEntries.map(([size]) => (
            <Avatar key={size} name={initials} size={size} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export function InitialsColorsSizes() {
  return (
    <BlockStack gap="2">
      {styleInitialsDefaultEntries.map(([style, initials]) => (
        <InlineStack key={style} gap="2" blockAlign="center">
          {sizeEntries.map(([size]) => (
            <Avatar key={size} initials={initials} size={size} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

export function InitialsLong() {
  return (
    <BlockStack gap="2">
      {styleInitialsLongEntries.map(([style, initialsLong]) => (
        <InlineStack key={style} gap="2" blockAlign="center">
          {sizeEntries.map(([size]) => (
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
              prefix: <Avatar customer size="extraSmall" name="Chet Baker" />,
            },
            {
              content: 'Farrah Fawcett',
              prefix: (
                <Avatar customer size="extraSmall" name="Farrah Fawcett" />
              ),
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export function Image() {
  return (
    <InlineStack gap="2" blockAlign="center">
      {sizeEntries.map(([size]) => (
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
