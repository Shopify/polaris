import React from 'react';
import type {Meta} from '@storybook/react';
import {
  HorizontalGrid,
  Bleed,
  Box,
  Divider,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
} from '@shopify/polaris';
import {
  ArchiveMinor,
  DeleteMinor,
  DuplicateMinor,
} from '@shopify/polaris-icons';

import {ResourceDetailsLayout} from './ResourceDetailsLayout';

export default {
  component: ResourceDetailsLayout,
} as Meta<typeof ResourceDetailsLayout>;

export function Default() {
  const firstPrimaryCardContent = (
    <>
      <Box border="divider" borderRadius="1" minHeight="2rem" />
      <Box border="divider" borderRadius="1" minHeight="20rem" />
    </>
  );

  const secondPrimaryCardContent = (
    <>
      <SkeletonDisplayText size="small" />
      <HorizontalGrid columns={{xs: '1', md: '2'}} gap="4">
        <Box border="divider" borderRadius="1" minHeight="10rem" />
        <Box border="divider" borderRadius="1" minHeight="10rem" />
      </HorizontalGrid>
    </>
  );

  const firstSecondaryCardContent = (
    <>
      <SkeletonDisplayText size="small" />
      <Box border="divider" borderRadius="1" minHeight="2rem" />
      <Box>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
        </Bleed>
      </Box>
      <SkeletonBodyText />
    </>
  );

  const secondSecondaryCardContent = (
    <>
      <Box border="divider" borderRadius="1" minHeight="2rem" />
      <Box border="divider" borderRadius="1" minHeight="2rem" />
      <SkeletonBodyText />
    </>
  );

  return (
    <Page
      backAction={{content: 'Products', url: '/products'}}
      title="Product"
      secondaryActions={[
        {
          content: 'Duplicate',
          icon: DuplicateMinor,
          accessibilityLabel: 'Secondary action label',
          onAction: () => {},
        },
        {
          content: 'Archive',
          icon: ArchiveMinor,
          accessibilityLabel: 'Secondary action label',
          onAction: () => {},
        },
        {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          accessibilityLabel: 'Secondary action label',
          onAction: () => {},
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <ResourceDetailsLayout>
        <ResourceDetailsLayout.PrimarySection>
          <ResourceDetailsLayout.Card>
            {firstPrimaryCardContent}
          </ResourceDetailsLayout.Card>
          <ResourceDetailsLayout.Card>
            {secondPrimaryCardContent}
          </ResourceDetailsLayout.Card>
        </ResourceDetailsLayout.PrimarySection>
        <ResourceDetailsLayout.SecondarySection>
          <ResourceDetailsLayout.Card>
            {firstSecondaryCardContent}
          </ResourceDetailsLayout.Card>
          <ResourceDetailsLayout.Card>
            {secondSecondaryCardContent}
          </ResourceDetailsLayout.Card>
        </ResourceDetailsLayout.SecondarySection>
      </ResourceDetailsLayout>
    </Page>
  );
}
