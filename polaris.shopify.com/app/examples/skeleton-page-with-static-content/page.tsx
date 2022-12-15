'use client';

import {SkeletonPage, Layout, Card, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function SkeletonExample() {
  return (
    <SkeletonPage title="Products" primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned title="Images">
            <SkeletonBodyText />
          </Card>
          <Card sectioned title="Variants">
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Sales channels">
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={1} />
            </Card.Section>
          </Card>
          <Card title="Organization" subdued>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2} />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default withPolarisExample(SkeletonExample);
