import React from 'react';

import {Page, Grid, Text, LegacyStack, Button} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* <Grid columns={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}> */}
      <Grid columns={10}>
        <Grid.Cell columnSpan={{ xs: 2, md: 1 }}>
          <Text as="h1">First columns</Text>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 4, md: 6 }}>
          <LegacyStack vertical spacing="none">
            <Text variant="bodyMd" as="span" fontWeight="semibold">
              TITLE
            </Text>
            <Text variant="bodyMd" as="span" color="subdued">
              Variant Title
            </Text>
          </LegacyStack>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 3, md: 2 }}>
          <Text variant="bodyMd" as="span" color="subdued">
            Variant Title
          </Text>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 1, md: 1 }}>
          <Button> Click here </Button>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
