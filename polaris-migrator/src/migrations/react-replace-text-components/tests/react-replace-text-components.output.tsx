import React from 'react';
import type {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  TextStyleProps,
} from '@shopify/polaris';
import {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  DisplayText,
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  TextStyle,
  Text,
  InlineCode,
} from '@shopify/polaris';

const noop = (..._: any) => {};

export function App() {
  const textStyle =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    /* Replace with: Text */
    TextStyle;
  const textStyleProps: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  TextStyleProps = {
    variation: 'positive',
  };

  const MyDisplayText =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    /* Replace with: Text */
    DisplayText;

  noop(textStyle);

  return (
    <>
      <Text variant="heading4xl" as="p">
        Display text
      </Text>
      <Text variant="heading2xl" as="p">
        Display text
      </Text>
      <Text variant="headingXl" as="p">
        Display text
      </Text>
      <Text variant="headingXl" as="p">
        Display text
      </Text>
      <Text variant="headingLg" as="p">
        Display text
      </Text>
      <Text as="h1" variant="headingMd">
        Heading
      </Text>
      <Text variant="headingMd" as="h2">
        Heading
      </Text>
      <Text as="h2" variant="headingXs">
        Subheading
      </Text>
      <Text variant="headingXs" as="h3">
        Subheading
      </Text>
      <Text variant="bodySm" as="p">
        Caption
      </Text>
      <Text variant="bodyMd" as="span" fontWeight="semibold">
        Strong
      </Text>
      <Text variant="bodyMd" as="span" color="success">
        Positive
      </Text>
      <Text variant="bodyMd" as="span" color="critical">
        Negative
      </Text>
      <Text variant="bodyMd" as="span" color="warning">
        Warning
      </Text>
      <Text variant="bodyMd" as="span">
        <InlineCode>Code</InlineCode>
      </Text>
      <Text variant="bodyMd" as="span">
        <Text variant="bodyMd" as="span">
          <InlineCode>Code</InlineCode>
        </Text>
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <TextStyle variation={Math.random() > 0.5 ? 'positive' : 'negative'}>
        Code
      </TextStyle>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <TextStyle {...textStyleProps}>Positive</TextStyle>
      <Text variant="bodySm" as="span" visuallyHidden>
        Hidden text
      </Text>
      <MyDisplayText />
    </>
  );
}
