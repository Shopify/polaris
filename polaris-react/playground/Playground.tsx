import React from 'react';

import {Box, Card, Page, Text} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      <Card padding="4">
        <div style={{background: 'black'}}>
          <Box padding="4">
            <div
              style={{
                backgroundColor:
                  'var(--p-color-experimental-bg-inverse-transparent-active)',
              }}
            >
              <Box padding="4">
                <Text as="p" color="text-inverse">
                  transparency!
                </Text>
              </Box>
            </div>
          </Box>
        </div>
      </Card>
    </Page>
  );
}
