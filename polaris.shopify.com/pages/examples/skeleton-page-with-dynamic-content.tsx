import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  BlockStack,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <SkeletonBodyText />
          </LegacyCard>
          <LegacyCard sectioned>
            <BlockStack gap="4">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </BlockStack>
          </LegacyCard>
          <LegacyCard sectioned>
            <BlockStack gap="4">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </BlockStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard>
            <LegacyCard.Section>
              <BlockStack gap="4">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <SkeletonBodyText lines={1} />
            </LegacyCard.Section>
          </LegacyCard>
          <LegacyCard subdued>
            <LegacyCard.Section>
              <BlockStack gap="4">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <SkeletonBodyText lines={2} />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default withPolarisExample(SkeletonExample);
