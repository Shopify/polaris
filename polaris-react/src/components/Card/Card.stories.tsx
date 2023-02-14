import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Button,
  ButtonGroup,
  Card,
  Icon,
  Image,
  List,
  Popover,
  ResourceList,
  Stack,
  Text,
  TextContainer,
} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

export function Default() {
  return (
    <Card title="Online store dashboard" sectioned>
      <p>View a summary of your online store’s performance.</p>
    </Card>
  );
}

export function WithHeaderActions() {
  return (
    <Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
      <p>
        Add variants if this product comes in multiple versions, like different
        sizes or colors.
      </p>
    </Card>
  );
}

export function WithFooterActions() {
  return (
    <Card
      title="Shipment 1234"
      secondaryFooterActions={[{content: 'Edit shipment'}]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <Card.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithMultipleFooterActions() {
  return (
    <Card
      title="Shipment 1234"
      secondaryFooterActions={[
        {content: 'Cancel shipment', destructive: true},
        {content: 'Add another shipment', disabled: true},
      ]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <Card.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithCustomFooterActions() {
  return (
    <Card title="Secure your account with 2-step authentication">
      <Card.Section>
        <Stack spacing="loose" vertical>
          <p>
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </p>
          <Stack distribution="trailing">
            <ButtonGroup>
              <Button>Enable two-step authentication</Button>
              <Button plain>Learn more</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}

export function WithDestructiveFooterAction() {
  return (
    <Card
      title="Shipment 1234"
      secondaryFooterActions={[{content: 'Cancel shipment', destructive: true}]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <Card.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithMultipleSections() {
  return (
    <Card title="Online store dashboard">
      <Card.Section>
        <p>View a summary of your online store’s performance.</p>
      </Card.Section>

      <Card.Section>
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </Card.Section>
    </Card>
  );
}

export function WithMultipleTitledSections() {
  return (
    <Card title="Online store dashboard">
      <Card.Section title="Reports">
        <p>View a summary of your online store’s performance.</p>
      </Card.Section>

      <Card.Section title="Summary">
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </Card.Section>
    </Card>
  );
}

export function WithSectionsAndActions() {
  return (
    <Card title="Customer">
      <Card.Section>
        <p>John Smith</p>
      </Card.Section>
      <Card.Section title="Contact Information" actions={[{content: 'Edit'}]}>
        <p>john.smith@example.com</p>
      </Card.Section>
    </Card>
  );
}

export function WithSubsection() {
  return (
    <Card title="Customer">
      <Card.Section>
        <p>John Smith</p>
      </Card.Section>
      <Card.Section title="Addresses">
        <Card.Subsection>
          123 First St
          <br />
          Somewhere
          <br />
          The Universe
        </Card.Subsection>
        <Card.Subsection>
          123 Second St
          <br />
          Somewhere
          <br />
          The Universe
        </Card.Subsection>
      </Card.Section>
      <Card.Section>
        <Card.Subsection>
          A single subsection without a sibling has no visual appearance
        </Card.Subsection>
      </Card.Section>
    </Card>
  );
}

export function WithDestructiveAction() {
  return (
    <Card title="Customer">
      <Card.Section>
        <p>John Smith</p>
      </Card.Section>
      <Card.Section
        title="Contact Information"
        actions={[{content: 'Delete', destructive: true}, {content: 'Edit'}]}
      >
        <p>john.smith@example.com</p>
      </Card.Section>
    </Card>
  );
}

export function WithASubduedSection() {
  return (
    <Card title="Staff accounts">
      <Card.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>

      <Card.Section subdued title="Deactivated staff accounts">
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithSubduedForSecondaryContent() {
  return (
    <Card title="Deactivated staff accounts" sectioned subdued>
      <List>
        <List.Item>Felix Crafford</List.Item>
        <List.Item>Ezequiel Manno</List.Item>
      </List>
    </Card>
  );
}

export function WithSeparateHeader() {
  return (
    <Card>
      <Card.Header
        actions={[
          {
            content: 'Preview',
          },
        ]}
        title="Staff accounts"
      >
        <Popover
          active
          activator={
            <Button disclosure plain>
              Add account
            </Button>
          }
          onClose={() => {}}
        >
          <ActionList items={[{content: 'Member'}, {content: 'Admin'}]} />
        </Popover>
      </Card.Header>
      <Card.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithCustomReactNodeTitle() {
  return (
    <Card title="Products">
      <Card.Section
        title={
          <Stack>
            <Icon source={ProductsMajor} />
            <Text variant="headingSm" as="h3">
              New Products
            </Text>
          </Stack>
        }
      >
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export function WithAllElements() {
  return (
    <Card
      secondaryFooterActions={[{content: 'Dismiss'}]}
      primaryFooterAction={{content: 'Export Report'}}
    >
      <Card.Header
        actions={[
          {
            content: 'Total Sales',
          },
        ]}
        title="Sales"
      >
        <Popover
          active={false}
          activator={
            <Button disclosure plain>
              View Sales
            </Button>
          }
          onClose={() => {}}
        >
          <ActionList
            items={[{content: 'Gross Sales'}, {content: 'Net Sales'}]}
          />
        </Popover>
      </Card.Header>
      <Card.Section>
        <TextContainer>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </TextContainer>
      </Card.Section>
      <Card.Section title="Total Sales Breakdown">
        <ResourceList
          resourceName={{singular: 'sale', plural: 'sales'}}
          items={[
            {
              sales: 'Orders',
              amount: 'USD$0.00',
              url: '#',
            },
            {
              sales: 'Returns',
              amount: '-USD$250.00',
              url: '#',
            },
          ]}
          renderItem={(item) => {
            const {sales, amount, url} = item;
            return (
              <ResourceList.Item
                url={url}
                accessibilityLabel={`View Sales for ${sales}`}
              >
                <Stack>
                  <Stack.Item fill>{sales}</Stack.Item>
                  <Stack.Item>{amount}</Stack.Item>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
      <Card.Section title="Deactivated reports" subdued>
        <List>
          <List.Item>Payouts</List.Item>
          <List.Item>Total Sales By Channel</List.Item>
        </List>
      </Card.Section>
      <Card.Section title="Note">
        <TextContainer>
          The sales reports are available only if your store is on the Shopify
          plan or higher.
        </TextContainer>
      </Card.Section>
    </Card>
  );
}

export function WithFlushedSections() {
  return (
    <Card>
      <Card.Section flush>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
      </Card.Section>
      <Card.Section subdued>
        <TextContainer>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </TextContainer>
      </Card.Section>
    </Card>
  );
}
