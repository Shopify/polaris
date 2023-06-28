import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ActionList,
  Button,
  ButtonGroup,
  LegacyCard,
  Icon,
  Image,
  List,
  Popover,
  ResourceList,
  LegacyStack,
  Text,
  TextContainer,
  VerticalStack,
  Box,
} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';

export default {
  component: LegacyCard,
} as ComponentMeta<typeof LegacyCard>;

export function Default() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <p>View a summary of your online store’s performance.</p>
    </LegacyCard>
  );
}

export function WithHeaderActions() {
  return (
    <LegacyCard sectioned title="Variants" actions={[{content: 'Add variant'}]}>
      <p>
        Add variants if this product comes in multiple versions, like different
        sizes or colors.
      </p>
    </LegacyCard>
  );
}

export function WithFooterActions() {
  return (
    <LegacyCard
      title="Shipment 1234"
      secondaryFooterActions={[{content: 'Edit shipment'}]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <LegacyCard.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithMultipleFooterActions() {
  return (
    <LegacyCard
      title="Shipment 1234"
      secondaryFooterActions={[
        {content: 'Cancel shipment', destructive: true},
        {content: 'Add another shipment', disabled: true},
      ]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <LegacyCard.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithCustomFooterActions() {
  return (
    <LegacyCard title="Secure your account with 2-step authentication">
      <LegacyCard.Section>
        <LegacyStack spacing="loose" vertical>
          <p>
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </p>
          <LegacyStack distribution="trailing">
            <ButtonGroup>
              <Button>Enable two-step authentication</Button>
              <Button plain>Learn more</Button>
            </ButtonGroup>
          </LegacyStack>
        </LegacyStack>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithDestructiveFooterAction() {
  return (
    <LegacyCard
      title="Shipment 1234"
      secondaryFooterActions={[{content: 'Cancel shipment', destructive: true}]}
      primaryFooterAction={{content: 'Add tracking number'}}
    >
      <LegacyCard.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithMultipleSections() {
  return (
    <LegacyCard title="Online store dashboard">
      <LegacyCard.Section>
        <p>View a summary of your online store’s performance.</p>
      </LegacyCard.Section>

      <LegacyCard.Section>
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithMultipleTitledSections() {
  return (
    <LegacyCard title="Online store dashboard">
      <LegacyCard.Section title="Reports">
        <p>View a summary of your online store’s performance.</p>
      </LegacyCard.Section>

      <LegacyCard.Section title="Summary">
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithSectionsAndActions() {
  return (
    <LegacyCard title="Customer">
      <LegacyCard.Section>
        <p>John Smith</p>
      </LegacyCard.Section>
      <LegacyCard.Section
        title="Contact Information"
        actions={[{content: 'Edit'}]}
      >
        <p>john.smith@example.com</p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithSubsection() {
  return (
    <LegacyCard title="Customer">
      <LegacyCard.Section>
        <p>John Smith</p>
      </LegacyCard.Section>
      <LegacyCard.Section title="Addresses">
        <LegacyCard.Subsection>
          123 First St
          <br />
          Somewhere
          <br />
          The Universe
        </LegacyCard.Subsection>
        <LegacyCard.Subsection>
          123 Second St
          <br />
          Somewhere
          <br />
          The Universe
        </LegacyCard.Subsection>
      </LegacyCard.Section>
      <LegacyCard.Section>
        <LegacyCard.Subsection>
          A single subsection without a sibling has no visual appearance
        </LegacyCard.Subsection>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithDestructiveAction() {
  return (
    <LegacyCard title="Customer">
      <LegacyCard.Section>
        <p>John Smith</p>
      </LegacyCard.Section>
      <LegacyCard.Section
        title="Contact Information"
        actions={[{content: 'Delete', destructive: true}, {content: 'Edit'}]}
      >
        <p>john.smith@example.com</p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithASubduedSection() {
  return (
    <LegacyCard title="Staff accounts">
      <LegacyCard.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </LegacyCard.Section>

      <LegacyCard.Section subdued title="Deactivated staff accounts">
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithSubduedForSecondaryContent() {
  return (
    <LegacyCard title="Deactivated staff accounts" sectioned subdued>
      <List>
        <List.Item>Felix Crafford</List.Item>
        <List.Item>Ezequiel Manno</List.Item>
      </List>
    </LegacyCard>
  );
}

export function WithSeparateHeader() {
  return (
    <LegacyCard>
      <LegacyCard.Header
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
      </LegacyCard.Header>
      <LegacyCard.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithCustomReactNodeTitle() {
  return (
    <LegacyCard title="Products">
      <LegacyCard.Section
        title={
          <LegacyStack>
            <Icon source={ProductsMajor} />
            <Text variant="headingSm" as="h3">
              New Products
            </Text>
          </LegacyStack>
        }
      >
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithAllElements() {
  return (
    <LegacyCard
      secondaryFooterActions={[{content: 'Dismiss'}]}
      primaryFooterAction={{content: 'Export Report'}}
    >
      <LegacyCard.Header
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
      </LegacyCard.Header>
      <LegacyCard.Section>
        <TextContainer>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </TextContainer>
      </LegacyCard.Section>
      <LegacyCard.Section title="Total Sales Breakdown">
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
                <LegacyStack>
                  <LegacyStack.Item fill>{sales}</LegacyStack.Item>
                  <LegacyStack.Item>{amount}</LegacyStack.Item>
                </LegacyStack>
              </ResourceList.Item>
            );
          }}
        />
      </LegacyCard.Section>
      <LegacyCard.Section title="Deactivated reports" subdued>
        <List>
          <List.Item>Payouts</List.Item>
          <List.Item>Total Sales By Channel</List.Item>
        </List>
      </LegacyCard.Section>
      <LegacyCard.Section title="Note">
        <TextContainer>
          The sales reports are available only if your store is on the Shopify
          plan or higher.
        </TextContainer>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function WithFlushedSections() {
  return (
    <LegacyCard>
      <LegacyCard.Section flush>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
      </LegacyCard.Section>
      <LegacyCard.Section subdued>
        <TextContainer>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </TextContainer>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export function All() {
  return (
    <VerticalStack gap="2">
      <LegacyCard title="All headings">
        <LegacyCard.Section title="Section 1 heading">
          Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section title="Section 2 heading">
          Section 2 content
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard title="Non-text first item">
        <LegacyCard.Section>
          <Box
            minHeight="50px"
            borderRadius="2"
            borderStyle="solid"
            borderWidth="1"
            borderColor="border"
          />
        </LegacyCard.Section>
        <LegacyCard.Section title="Section 2 heading">
          Section 2 content
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <LegacyCard.Section>No titles Section 1 content</LegacyCard.Section>
        <LegacyCard.Section>No titles Section 2 content</LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <div>
          <LegacyCard.Header title="Content wrapped in div" />
          <LegacyCard.Section title="Section 1 heading">
            Section 1 in div
          </LegacyCard.Section>
          <LegacyCard.Section title="Section 2 heading">
            Section 2 in div
          </LegacyCard.Section>
        </div>
      </LegacyCard>
      <LegacyCard>
        <div>
          <LegacyCard.Section title="Section 1 heading">
            Section 1 in div
          </LegacyCard.Section>
          <LegacyCard.Section title="Section 2 heading">
            Section 2 in div
          </LegacyCard.Section>
        </div>
      </LegacyCard>
      <LegacyCard title="Non section last child">
        <LegacyCard.Section>Section 1 content</LegacyCard.Section>
        <LegacyCard.Section>
          Section 2 content, there is an empty div under this
        </LegacyCard.Section>
        <div />
      </LegacyCard>
      <LegacyCard>
        <div>Card content in div not in section</div>
      </LegacyCard>
      <LegacyCard title="Card headings with top subdued">
        <LegacyCard.Section title="Section 1 heading" subdued>
          Subdued Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section title="Section 2 heading">
          Section 2 content
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard title="Card headings with bottom subdued">
        <LegacyCard.Section title="Section 1 heading">
          Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section title="Section 2 heading" subdued>
          <p>Subdued section 2 content</p>
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard title="No section headings with top subdued">
        <LegacyCard.Section subdued>
          Subdued Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section>Section 2 content</LegacyCard.Section>
      </LegacyCard>
      <LegacyCard title="No section headings with bottom subdued">
        <LegacyCard.Section>Section 1 content</LegacyCard.Section>
        <LegacyCard.Section subdued>
          Subdued section 2 content
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <LegacyCard.Section subdued>
          Subdued Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section>Section 2 content</LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <LegacyCard.Section>Section 1 content</LegacyCard.Section>
        <LegacyCard.Section subdued>
          Subdued section 2 content
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard>
        <LegacyCard.Section>Section 1 content</LegacyCard.Section>
        <LegacyCard.Section subdued>
          Subdued section 2 content
        </LegacyCard.Section>
        <LegacyCard.Section>Section 3 content</LegacyCard.Section>
      </LegacyCard>
      <LegacyCard title="Flush sections">
        <LegacyCard.Section title="Section 1 heading">
          Section 1 content
        </LegacyCard.Section>
        <LegacyCard.Section title="Flush section heading" flush>
          This should be flush
        </LegacyCard.Section>
      </LegacyCard>
      <LegacyCard
        secondaryFooterActions={[{content: 'Dismiss'}]}
        primaryFooterAction={{content: 'Export Report'}}
      >
        <LegacyCard.Header
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
        </LegacyCard.Header>
        <LegacyCard.Section title="Total Sales Breakdown">
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
                  <LegacyStack>
                    <LegacyStack.Item fill>{sales}</LegacyStack.Item>
                    <LegacyStack.Item>{amount}</LegacyStack.Item>
                  </LegacyStack>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard.Section>
        <LegacyCard.Section title="Deactivated reports" subdued>
          Outside of subsection
          <LegacyCard.Subsection>Inside of subsection</LegacyCard.Subsection>
          Outside of subsection
        </LegacyCard.Section>
        <LegacyCard.Section>
          The sales reports are available only if your store is on the Shopify
          plan or higher.
        </LegacyCard.Section>
      </LegacyCard>
    </VerticalStack>
  );
}
