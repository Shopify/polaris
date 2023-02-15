import {SkeletonPage, Layout, LegacyCard, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <SkeletonPage title="Products" primaryAction>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <SkeletonBodyText />
          </LegacyCard>
          <LegacyCard sectioned title="Images">
            <SkeletonBodyText />
          </LegacyCard>
          <LegacyCard sectioned title="Variants">
            <SkeletonBodyText />
          </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title="Sales channels">
            <LegacyCard.Section>
              <SkeletonBodyText lines={2} />
            </LegacyCard.Section>
            <LegacyCard.Section>
              <SkeletonBodyText lines={1} />
            </LegacyCard.Section>
          </LegacyCard>
          <LegacyCard title="Organization" subdued>
            <LegacyCard.Section>
              <SkeletonBodyText lines={2} />
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
