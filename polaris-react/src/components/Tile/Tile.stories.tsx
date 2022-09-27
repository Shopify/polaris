import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, Tile, Text} from '@shopify/polaris';

export default {
  component: Tile,
} as ComponentMeta<typeof Tile>;

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
    <Tile columns={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} gap={{xs: '2'}}>
      {children}
    </Tile>
  );
}

export function LargeSpacing() {
  return (
    <Tile columns={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} gap={{xs: '10'}}>
      {children}
    </Tile>
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
    <Tile columns={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}} gap={{xs: '2'}}>
      {children}
    </Tile>
  );
}
