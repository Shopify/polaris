import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {AvatarProps} from '@shopify/polaris';
import {
  ActionList,
  Avatar,
  Button,
  Popover,
  VerticalStack,
  HorizontalStack,
  Box,
  Text,
} from '@shopify/polaris';

import type {Entries} from '../../types';

import type {STYLE_CLASSES} from './Avatar';

export default {
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const shapes: {
  [S in NonNullable<AvatarProps['shape']>]: string;
} = {
  round: 'Round',
  square: 'Square',
};

const shapeEntries = Object.entries(shapes) as Entries<typeof shapes>;

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
    <VerticalStack gap="4">
      {shapeEntries.map(([shape, shapeLabel]) => (
        <Box key={shape} paddingBlockEnd="2">
          <VerticalStack gap="3">
            <Text as="h2" variant="headingXl">
              Shape: {shapeLabel}
            </Text>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                Default
              </Text>
              <HorizontalStack gap="2" blockAlign="center">
                {sizeEntries.map(([size]) => (
                  <Avatar key={size} shape={shape} size={size} />
                ))}
              </HorizontalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With customer
              </Text>
              <HorizontalStack gap="2" blockAlign="center">
                {sizeEntries.map(([size]) => (
                  <Avatar key={size} shape={shape} size={size} customer />
                ))}
              </HorizontalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With image
              </Text>
              <HorizontalStack gap="2" blockAlign="center">
                {sizeEntries.map(([size]) => (
                  <Avatar
                    key={size}
                    shape={shape}
                    size={size}
                    source="https://burst.shopifycdn.com/photos/woman-dressed-in-pale-colors.jpg"
                  />
                ))}
              </HorizontalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With name (all styles)
              </Text>
              <VerticalStack gap="2">
                {styleInitialsDefaultEntries.map(([style, initials]) => (
                  <HorizontalStack key={style} gap="2" blockAlign="center">
                    {sizeEntries.map(([size]) => (
                      <Avatar
                        key={size}
                        shape={shape}
                        name={initials}
                        size={size}
                      />
                    ))}
                  </HorizontalStack>
                ))}
              </VerticalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With default initials (all styles)
              </Text>
              <VerticalStack gap="2">
                {styleInitialsDefaultEntries.map(([style, initials]) => (
                  <HorizontalStack key={style} gap="2" blockAlign="center">
                    {sizeEntries.map(([size]) => (
                      <Avatar
                        key={size}
                        shape={shape}
                        initials={initials}
                        size={size}
                      />
                    ))}
                  </HorizontalStack>
                ))}
              </VerticalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With long initials (all styles)
              </Text>
              <VerticalStack gap="2">
                {styleInitialsLongEntries.map(([style, initialsLong]) => (
                  <HorizontalStack key={style} gap="2" blockAlign="center">
                    {sizeEntries.map(([size]) => (
                      <Avatar
                        key={size}
                        shape={shape}
                        initials={initialsLong}
                        size={size}
                      />
                    ))}
                  </HorizontalStack>
                ))}
              </VerticalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                With long and wide initials
              </Text>
              <VerticalStack gap="2">
                <HorizontalStack gap="2" blockAlign="center">
                  {sizeEntries.map(([size]) => (
                    <Avatar
                      key={size}
                      shape={shape}
                      size={size}
                      initials="WWW"
                    />
                  ))}
                </HorizontalStack>
              </VerticalStack>
            </VerticalStack>
          </VerticalStack>
        </Box>
      ))}
    </VerticalStack>
  );
}

export function Default() {
  return <Avatar />;
}

export function CircleIconColorsSizes() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="4">
        <Avatar customer size="extraSmall" />
        <Avatar name="AG" size="extraSmall" />
        <Avatar name="AA" size="extraSmall" />
        <Avatar name="AC" size="extraSmall" />
        <Avatar name="AB" size="extraSmall" />
        <Avatar name="AE" size="extraSmall" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="small" />
        <Avatar name="AG" size="small" />
        <Avatar name="AA" size="small" />
        <Avatar name="AC" size="small" />
        <Avatar name="AB" size="small" />
        <Avatar name="AE" size="small" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="medium" />
        <Avatar name="AG" size="medium" />
        <Avatar name="AA" size="medium" />
        <Avatar name="AC" size="medium" />
        <Avatar name="AB" size="medium" />
        <Avatar name="AE" size="medium" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="large" />
        <Avatar name="AG" size="large" />
        <Avatar name="AA" size="large" />
        <Avatar name="AC" size="large" />
        <Avatar name="AB" size="large" />
        <Avatar name="AE" size="large" />
      </HorizontalStack>
    </VerticalStack>
  );
}

export function CircleInitialsColorsSizes() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="extraSmall" />
        <Avatar initials="AA" size="extraSmall" />
        <Avatar initials="AC" size="extraSmall" />
        <Avatar initials="AB" size="extraSmall" />
        <Avatar initials="AE" size="extraSmall" />
        <Avatar initials="WW" size="extraSmall" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="small" />
        <Avatar initials="AA" size="small" />
        <Avatar initials="AC" size="small" />
        <Avatar initials="AB" size="small" />
        <Avatar initials="AE" size="small" />
        <Avatar initials="WW" size="small" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="medium" />
        <Avatar initials="AA" size="medium" />
        <Avatar initials="AC" size="medium" />
        <Avatar initials="AB" size="medium" />
        <Avatar initials="AE" size="medium" />
        <Avatar initials="WW" size="medium" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="large" />
        <Avatar initials="AA" size="large" />
        <Avatar initials="AC" size="large" />
        <Avatar initials="AB" size="large" />
        <Avatar initials="AE" size="large" />
        <Avatar initials="WW" size="large" />
      </HorizontalStack>
    </VerticalStack>
  );
}

export function CircleInitialsLong() {
  return <Avatar initials="WWW" name="Woluwayemisi Wolu Weun-Jung" />;
}

export function CircleExtraSmallInContext() {
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

export function CircleImage() {
  return (
    <Avatar
      name="Image"
      source="https://burst.shopifycdn.com/photos/woman-dressed-in-pale-colors.jpg"
    />
  );
}

export function SquareIconColorsSizes() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="4">
        <Avatar customer size="extraSmall" shape="square" />
        <Avatar name="AG" size="extraSmall" shape="square" />
        <Avatar name="AA" size="extraSmall" shape="square" />
        <Avatar name="AC" size="extraSmall" shape="square" />
        <Avatar name="AB" size="extraSmall" shape="square" />
        <Avatar name="AE" size="extraSmall" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="small" shape="square" />
        <Avatar name="AG" size="small" shape="square" />
        <Avatar name="AA" size="small" shape="square" />
        <Avatar name="AC" size="small" shape="square" />
        <Avatar name="AB" size="small" shape="square" />
        <Avatar name="AE" size="small" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="medium" shape="square" />
        <Avatar name="AG" size="medium" shape="square" />
        <Avatar name="AA" size="medium" shape="square" />
        <Avatar name="AC" size="medium" shape="square" />
        <Avatar name="AB" size="medium" shape="square" />
        <Avatar name="AE" size="medium" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar customer size="large" shape="square" />
        <Avatar name="AG" size="large" shape="square" />
        <Avatar name="AA" size="large" shape="square" />
        <Avatar name="AC" size="large" shape="square" />
        <Avatar name="AB" size="large" shape="square" />
        <Avatar name="AE" size="large" shape="square" />
      </HorizontalStack>
    </VerticalStack>
  );
}

export function SquareInitialsColorsSizes() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="extraSmall" shape="square" />
        <Avatar initials="AA" size="extraSmall" shape="square" />
        <Avatar initials="AC" size="extraSmall" shape="square" />
        <Avatar initials="AB" size="extraSmall" shape="square" />
        <Avatar initials="AE" size="extraSmall" shape="square" />
        <Avatar initials="WW" size="extraSmall" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="small" shape="square" />
        <Avatar initials="AA" size="small" shape="square" />
        <Avatar initials="AC" size="small" shape="square" />
        <Avatar initials="AB" size="small" shape="square" />
        <Avatar initials="AE" size="small" shape="square" />
        <Avatar initials="WW" size="small" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="medium" shape="square" />
        <Avatar initials="AA" size="medium" shape="square" />
        <Avatar initials="AC" size="medium" shape="square" />
        <Avatar initials="AB" size="medium" shape="square" />
        <Avatar initials="AE" size="medium" shape="square" />
        <Avatar initials="WW" size="medium" shape="square" />
      </HorizontalStack>
      <HorizontalStack gap="4">
        <Avatar initials="AG" size="large" shape="square" />
        <Avatar initials="AA" size="large" shape="square" />
        <Avatar initials="AC" size="large" shape="square" />
        <Avatar initials="AB" size="large" shape="square" />
        <Avatar initials="AE" size="large" shape="square" />
        <Avatar initials="WW" size="large" shape="square" />
      </HorizontalStack>
    </VerticalStack>
  );
}
