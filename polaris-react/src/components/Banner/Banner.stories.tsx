/* eslint-disable react/no-children-prop */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  BlockStack,
  Banner,
  Button,
  Card,
  LegacyCard,
  InlineStack,
  Link,
  List,
  Modal,
  Text,
  TextContainer,
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
      tone="warning"
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
      tone="info"
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
      tone="success"
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
      tone="warning"
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
      tone="critical"
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
            <Banner action={{content: 'Connect account'}} tone="warning">
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
      tone="critical"
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
    <Card roundedAbove="sm">
      <BlockStack gap="300">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Banner onDismiss={() => {}}>
          <Text as="p">
            Use your finance report to get detailed information about your
            business. <Link url="">Let us know what you think</Link>
          </Text>
        </Banner>
        <Text as="p">View a summary of your online store’s performance.</Text>
      </BlockStack>
    </Card>
  );
}

export function InALegacyCard() {
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
    <Banner tone="critical">
      <BlockStack gap="100">
        <InlineStack gap="400" align="space-between">
          <Text variant="headingMd" fontWeight="semibold" as="h3">
            Deployment failed in 5min
          </Text>
          <Link external url="https://example.com">
            Logs
          </Link>
        </InlineStack>
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
      </BlockStack>
    </Banner>
  );
}

export function HideIcon() {
  return (
    <LegacyCard title="Edit customer" sectioned>
      <Banner tone="warning" hideIcon>
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
      tone="info"
      icon={DiscountsMajor}
      title="Choose a plan and your discount will be applied at checkout."
    />
  );
}

export function All() {
  return (
    <BlockStack gap="300">
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
      <AllBanners
        title={undefined}
        onDismiss={() => {}}
        children={
          <Text as="p">
            Changing the phone number for this customer will unsubscribe them
            from SMS marketing text messages until they provide consent.
          </Text>
        }
      />
      <Text as="h2" variant="headingMd">
        No title with actions
      </Text>
      <AllBanners
        title={undefined}
        action={{content: 'Primary action'}}
        secondaryAction={{content: 'Secondary action'}}
        children={
          <Text as="p">
            Changing the phone number for this customer will unsubscribe them
            from SMS marketing text messages until they provide consent.
          </Text>
        }
      />
      <Text as="h2" variant="headingMd">
        No title with hidden icon
      </Text>
      <AllBanners
        title={undefined}
        hideIcon
        onDismiss={() => {}}
        children={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </>
        }
      />
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
        With links
      </Text>
      <AllBanners
        onDismiss={() => {}}
        children={
          <>
            Text with <Link url="">monochrome link</Link>.
          </>
        }
      />
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
      <Text as="h2" variant="headingMd">
        In card with links
      </Text>
      <LegacyCard sectioned>
        <AllBanners
          onDismiss={() => {}}
          children={
            <>
              Text with <Link url="">monochrome link</Link>.
            </>
          }
        />
      </LegacyCard>
      <Text as="h2" variant="headingMd">
        In card with long text
      </Text>
      <LegacyCard sectioned>
        <AllBanners
          onDismiss={() => {}}
          title={undefined}
          children={
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </>
          }
        />
      </LegacyCard>
    </BlockStack>
  );
}

function AllBanners(props) {
  return (
    <BlockStack>
      <Banner
        title="Default"
        children={<Text as="p">Default status</Text>}
        {...props}
      />
      <Banner
        title="Info"
        tone="info"
        children={<Text as="p">Info status</Text>}
        {...props}
      />
      <Banner
        title="Success"
        tone="success"
        children={<Text as="p">Success status</Text>}
        {...props}
      />
      <Banner
        title="Warning"
        tone="warning"
        children={<Text as="p">Warning status</Text>}
        {...props}
      />
      <Banner
        title="Critical"
        tone="critical"
        children={<Text as="p">Critical status</Text>}
        {...props}
      />
    </BlockStack>
  );
}
