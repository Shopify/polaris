import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Tile, Text} from '@shopify/polaris';

export default {
  component: Tile,
} as ComponentMeta<typeof Tile>;

const styles = {
  border: '1px solid grey',
  padding: '5px',
};

export function Default() {
  return (
    <Tile spacing="1" columns="2">
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
    </Tile>
  );
}

export function LargeSpacing() {
  return (
    <Tile spacing="10" columns="2">
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
    </Tile>
  );
}

export function ManyColumns() {
  return (
    <Tile spacing="3" columns="5">
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
      <div style={styles}>
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </div>
    </Tile>
  );
}
