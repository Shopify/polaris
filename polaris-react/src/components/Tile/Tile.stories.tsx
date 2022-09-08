import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, Box, Tile, Text} from '@shopify/polaris';

export default {
  component: Tile,
} as ComponentMeta<typeof Tile>;

export function Default() {
  return (
    <Tile spacing="1" columns="2">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
    </Tile>
  );
}

export function LargeSpacing() {
  return (
    <Tile spacing="10" columns="2">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
    </Tile>
  );
}

export function ManyColumns() {
  return (
    <Tile spacing="3" columns="5">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text as="h2" variant="headingMd">
          Sales
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of your online store’s sales.
        </Text>
      </Box>
    </Tile>
  );
}
