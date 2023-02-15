import {Banner, Box, Card, Stack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Stack distribution="center">
      <Box width="360px">
        <Card title="Shipping address" actions={[{content: 'Edit'}]} sectioned>
          <Banner status="warning" hideIcon>
            <p>This order doesn't have a shipping address.</p>
          </Banner>
        </Card>
      </Box>
    </Stack>
  );
}

export default withPolarisExample(BannerExample);
