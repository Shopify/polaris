import React from 'react';

import {
  Card,
  DescriptionList,
  EmptyState,
  Heading,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextStyle,
} from '../src';

export function Playground() {
  return (
    <Page title="Playground" fullWidth>
      <Heading>page-content-when-not-fully-condensed</Heading>
      <br />
      <Card title="Online store dashboard" sectioned>
        <p>View a summary of your online store’s performance.</p>
      </Card>
      <br />
      <br />
      <Heading>page-content-when-not-partially-condensed</Heading>
      <br />
      <EmptyStatez />
      <br />
      <br />
      <Heading>page-content-when-layout-not-stacked</Heading>
      <br />
      <SkeletonPagez />
      <br />
      <br />
      <Heading>page-content-breakpoint-after(679px or before)</Heading>
      <br />
      <DescriptionListz />
      <br />
      <br />
      <Heading>page-content-when-partially-condensed</Heading>
      <br />
      <ResourceItemz />
      <br />
      <br />
      <Heading>page-content-when-layout-stacked</Heading>
      <br />
      <SkeletonPagez />
      <br />
      <br />
    </Page>
  );
}

function ResourceItemz() {
  const [selectedItems, setSelectedItems] = React.useState([]);

  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'blog post', plural: 'blog posts'}}
        items={[
          {
            id: 6,
            url: 'posts/6',
            title: 'How To Get Value From Wireframes',
            author: 'Jonathan Mangrove',
          },
        ]}
        selectedItems={selectedItems}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const {id, url, title, author} = item;
          const authorMarkup = author ? <div>by {author}</div> : null;
          return (
            <ResourceItem
              id={String(id)}
              url={url}
              accessibilityLabel={`View details for ${title}`}
              name={title}
              shortcutActions={[{content: 'test'}]}
            >
              <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
              {authorMarkup}
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

function DescriptionListz() {
  return (
    <DescriptionList
      items={[
        {
          term: 'Logistics',
          description:
            'The management of products or other resources as they travel between a point of origin and a destination.',
        },
        {
          term: 'Sole proprietorship',
          description:
            'A business structure where a single individual both owns and runs the company.',
        },
        {
          term: 'Discount code',
          description:
            'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
        },
      ]}
    />
  );
}

function SkeletonPagez() {
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

function EmptyStatez() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </Card>
  );
}
