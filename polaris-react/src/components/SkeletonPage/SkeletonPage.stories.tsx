import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Card,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris';

export default {
  component: SkeletonPage,
} as ComponentMeta<typeof SkeletonPage>;

export function WithDynamicContent() {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText />
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={1} />
            </Card.Section>
          </Card>
          <Card subdued>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
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

export function WithStaticContent() {
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
