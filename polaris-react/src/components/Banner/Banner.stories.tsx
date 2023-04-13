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
} from '@shopify/polaris';

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
