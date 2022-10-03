import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Tiles, Text} from '@shopify/polaris';

export default {
  component: Tiles,
} as ComponentMeta<typeof Tiles>;

const styles = {
  background: 'var(--p-surface)',
  border: 'var(--p-border-base)',
  borderRadius: 'var(--p-border-radius-2)',
  padding: 'var(--p-space-4)',
};

const children = Array.from(Array(4)).map((ele, index) => (
  <div key={index} style={styles}>
    <Text as="h2" variant="headingMd">
      Sales
    </Text>
    <Text as="p" variant="bodyMd">
      View a summary of your online store’s sales.
    </Text>
  </div>
));

export function Default() {
  return (
    <Tiles columns={{xs: 2}} gap={{xs: '2'}}>
      {children}
    </Tiles>
  );
}

export function LargeSpacing() {
  return (
    <Tiles columns={{xs: 2}} gap={{xs: '10'}}>
      {children}
    </Tiles>
  );
}

export function ManyColumns() {
  const children = Array.from(Array(10)).map((ele, index) => (
    <div key={index} style={styles}>
      <Text as="h2" variant="headingMd">
        Sales
      </Text>
      <Text as="p" variant="bodyMd">
        View a summary of your online store’s sales.
      </Text>
    </div>
  ));

  return (
    <Tiles columns={{xs: 5}} gap={{xs: '2'}}>
      {children}
    </Tiles>
  );
}
