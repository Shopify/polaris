import React from 'react';

import {Page, Box} from '../src';

export function Playground() {
  const Card = ({children}: {children: React.ReactNode}) => (
    <Box background="surface" padding="2" border="base" borderRadius="1">
      {children}
    </Box>
  );

  return (
    <Page title="Playground">
      <Card>
        <Box margin="12" padding="10" border="base" borderRadius="3">
          elemenet
        </Box>
        <Box>elemenet</Box>
      </Card>
    </Page>
  );
}
