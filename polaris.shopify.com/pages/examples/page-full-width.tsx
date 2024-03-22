import {Page, Card, Text} from '@shopify/polaris';
import {ExportIcon, PlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{
        content: 'Create order',
        icon: PlusIcon,
        accessibilityLabel: 'Create order',
      }}
      secondaryActions={[
        {accessibilityLabel: 'Export orders', icon: ExportIcon},
      ]}
      pagination={{
        hasNext: true,
      }}
    >
      <Card>
        <Text as="h2" variant="headingSm">
          Credit card
        </Text>
        <Text as="p" variant="bodyMd">
          Credit card information
        </Text>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
