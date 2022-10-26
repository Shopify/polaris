import type {SpacingSpaceScale} from '@shopify/polaris-tokens';
import React from 'react';

import {
  Box,
  Card,
  FormLayout,
  Heading,
  Layout,
  Page,
  Stack,
  Text,
  TextField,
} from '../src';
import {useBreakpointsValues} from '../src/utilities/breakpoints';
import type {ResponsiveProp} from '../src/utilities/css';

type Spacing = ResponsiveProp<SpacingSpaceScale>;

export function Playground() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <Box
            padding={
              useBreakpointsValues({xs: '1', sm: '2', md: '3'}) as Spacing
            }
          >
            box1
          </Box>
          <Box padding={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}>
            <Stack>
              <Heading id="storeDetails">Store details</Heading>

              <Text as="p" variant="bodyMd" color="subdued">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </Stack>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={() => {}}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={() => {}}
                autoComplete="email"
              />
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
