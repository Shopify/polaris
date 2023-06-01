/* eslint-disable react/no-children-prop */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  VerticalStack,
  Banner,
  Button,
  LegacyCard,
  HorizontalStack,
  Link,
  List,
  Modal,
  Text,
  TextContainer,
  Card,
} from '@shopify/polaris';
import {DiscountsMajor, DiscountsMinor} from '@shopify/polaris-icons';

export default {
  component: Banner,
} as ComponentMeta<typeof Banner>;

export function Default() {
  return (
    <Banner title="Order archived" onDismiss={() => {}}>
      <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </Banner>
  );
}

export function Dismissible() {
  return (
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export function WithFooterCallToAction() {
  return (
    <Banner
      title="Some of your product variants are missing weights"
      status="warning"
      action={{content: 'Edit variant weights', url: ''}}
      secondaryAction={{content: 'Learn more', url: ''}}
      onDismiss={() => {}}
    >
      <p>
        Add weights to show accurate rates at checkout and when buying shipping
        labels in Shopify.
      </p>
    </Banner>
  );
}

export function Informational() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      status="info"
      onDismiss={() => {}}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export function Success() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      status="success"
      action={{content: 'Print label'}}
      onDismiss={() => {}}
    />
  );
}

export function Warning() {
  return (
    <Banner
      title="Before you can purchase a shipping label, this change needs to be made:"
      action={{content: 'Edit address'}}
      status="warning"
    >
      <List>
        <List.Item>
          The name of the city you’re shipping to has characters that aren’t
          allowed. City name can only include spaces and hyphens.
        </List.Item>
      </List>
    </Banner>
  );
}

export function Critical() {
  return (
    <Banner
      title="High risk of fraud detected"
      action={{content: 'Review risk analysis'}}
      status="critical"
    >
      <p>
        Before fulfilling this order or capturing payment, please{' '}
        <Link url="">review the Risk Analysis</Link> and determine if this order
        is fraudulent.
      </p>
    </Banner>
  );
}

export function InAModal() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Button onClick={handleChange}>Open</Button>
      <Modal
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Banner action={{content: 'Connect account'}} status="warning">
              <p>
                Connect your instagram account to your shop before proceeding.
              </p>
            </Banner>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export function WithFocus() {
  const banner = useRef();

  useEffect(() => banner.current.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      status="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
      </p>
    </Banner>
  );
}

export function InACard() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <TextContainer>
        <Banner onDismiss={() => {}}>
          <p>
            Use your finance report to get detailed information about your
            business. <Link url="">Let us know what you think</Link>
          </p>
        </Banner>

        <p>View a summary of your online store’s performance.</p>
      </TextContainer>
    </LegacyCard>
  );
}

export function WithEndJustifiedContent() {
  return (
    <Banner status="critical">
      <VerticalStack gap="1">
        <HorizontalStack gap="4" align="space-between">
          <Text variant="headingMd" fontWeight="semibold" as="h3">
            Deployment failed in 5min
          </Text>
          <Link external url="https://example.com">
            Logs
          </Link>
        </HorizontalStack>
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
      </VerticalStack>
    </Banner>
  );
}

export function HideIcon() {
  return (
    <LegacyCard title="Edit customer" sectioned>
      <Banner status="warning" hideIcon>
        <Text as="p" fontWeight="semibold">
          Changing the phone number for this customer will unsubscribe them from
          SMS marketing text messages until they provide consent.
        </Text>
      </Banner>
    </LegacyCard>
  );
}

export function CustomIcon() {
  return (
    <Banner
      status="info"
      icon={DiscountsMajor}
      title="Choose a plan and your discount will be applied at checkout."
    />
  );
}

export function All() {
  return (
    <VerticalStack gap="3">
      <Text as="h2" variant="headingMd">
        With dismiss and actions
      </Text>
      <AllBanners
        onDismiss={() => {}}
        action={{content: 'Primary action'}}
        secondaryAction={{content: 'Secondary action'}}
      />
      <Text as="h2" variant="headingMd">
        Default by status
      </Text>
      <AllBanners />
      <Text as="h2" variant="headingMd">
        No title
      </Text>
      <AllBanners title={undefined} />
      <Text as="h2" variant="headingMd">
        Only title
      </Text>
      <AllBanners children={undefined} onDismiss={() => {}} />
      <Text as="h2" variant="headingMd">
        Hide icon
      </Text>
      <AllBanners hideIcon onDismiss={() => {}} />
      <Text as="h2" variant="headingMd">
        Custom icon
      </Text>
      <AllBanners icon={DiscountsMajor} onDismiss={() => {}} />
      <Text as="h2" variant="headingMd">
        In card
      </Text>
      <LegacyCard sectioned>
        <AllBanners />
      </LegacyCard>
      <Text as="h2" variant="headingMd">
        In card with dismiss
      </Text>
      <LegacyCard sectioned>
        <AllBanners onDismiss={() => {}} />
      </LegacyCard>
      <Text as="h2" variant="headingMd">
        In card no title
      </Text>
      <LegacyCard sectioned>
        <AllBanners title={undefined} onDismiss={() => {}} />
      </LegacyCard>
      <Text as="h2" variant="headingMd">
        In card no icon
      </Text>
      <LegacyCard sectioned>
        <AllBanners hideIcon onDismiss={() => {}} />
      </LegacyCard>
      <Text as="h2" variant="headingMd">
        In card custom icon
      </Text>
      <LegacyCard sectioned>
        <AllBanners icon={DiscountsMinor} onDismiss={() => {}} />
      </LegacyCard>
    </VerticalStack>
  );
}

function AllBanners(props) {
  return (
    <VerticalStack>
      <Banner
        title="Default"
        children={<Text as="p">Default status</Text>}
        {...props}
      />
      <Banner
        title="Info"
        status="info"
        children={<Text as="p">Info status</Text>}
        {...props}
      />
      <Banner
        title="Success"
        status="success"
        children={<Text as="p">Success status</Text>}
        {...props}
      />
      <Banner
        title="Warning"
        status="warning"
        children={<Text as="p">Warning status</Text>}
        {...props}
      />
      <Banner
        title="Critical"
        status="critical"
        children={<Text as="p">Critical status</Text>}
        {...props}
      />
    </VerticalStack>
  );
}
