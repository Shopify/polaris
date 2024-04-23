import React, {useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  ActionList,
  BlockStack,
  Bleed,
  Box,
  Button,
  ButtonGroup,
  Card,
  Icon,
  Image,
  InlineGrid,
  InlineStack,
  List,
  Popover,
  ResourceList,
  Text,
} from '@shopify/polaris';
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  ProductIcon,
} from '@shopify/polaris-icons';

export default {
  component: Card,
} as Meta<typeof Card>;

export const Default = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Online store dashboard
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithResponsiveBorderRadius = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Online store dashboard
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithResponsivePadding = {
  render() {
    return (
      <Card padding={{xs: '500', sm: '600', md: '800'}} roundedAbove="sm">
        <BlockStack gap={{xs: '400', sm: '500'}}>
          <Text as="h2" variant="headingSm">
            Online store dashboard
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithSubdued = {
  render() {
    return (
      <Card background="bg-surface-secondary" roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Online store dashboard
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithSubduedForSecondaryContent = {
  render() {
    return (
      <Card background="bg-surface-secondary" roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Deactivated staff accounts
          </Text>
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </BlockStack>
      </Card>
    );
  },
};

export const WithSection = {
  render() {
    return (
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">
          Online store dashboard
        </Text>
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </Box>
      </Card>
    );
  },
};

export const WithSubduedSection = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Staff accounts
          </Text>
          <Box paddingBlockEnd="200">
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </Box>
        </BlockStack>
        <Bleed marginBlockEnd="400" marginInline="400">
          <Box background="bg-surface-secondary" padding="400">
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated staff accounts
              </Text>
              <List>
                <List.Item>Felix Crafford</List.Item>
                <List.Item>Ezequiel Manno</List.Item>
              </List>
            </BlockStack>
          </Box>
        </Bleed>
      </Card>
    );
  },
};

export const WithMultipleSections = {
  render() {
    return (
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">
          Online store dashboard
        </Text>
        <Box paddingBlock="200">
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </Box>
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance, including sales,
            visitors, top products, and referrals.
          </Text>
        </Box>
      </Card>
    );
  },
};

export const WithMultipleTitledSections = {
  render() {
    return (
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">
          Online store dashboard
        </Text>
        <Box paddingBlock="200">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Reports
            </Text>
            <Text as="p" variant="bodyMd">
              View a summary of your online store’s performance.
            </Text>
          </BlockStack>
        </Box>
        <Box paddingBlockStart="200">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Summary
            </Text>
            <Text as="p" variant="bodyMd">
              View a summary of your online store’s performance, including
              sales, visitors, top products, and referrals.
            </Text>
          </BlockStack>
        </Box>
      </Card>
    );
  },
};

export const WithSubsection = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              Customer
            </Text>
            <Text as="p" variant="bodyMd">
              John Smith
            </Text>
          </BlockStack>
          <div>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Addresses
              </Text>
              <div>
                <Text as="p" variant="bodyMd">
                  123 First St
                </Text>
                <Text as="p" variant="bodyMd">
                  Somewhere
                </Text>
                <Text as="p" variant="bodyMd">
                  The Universe
                </Text>
              </div>
              <div>
                <Text as="p" variant="bodyMd">
                  123 Second St
                </Text>
                <Text as="p" variant="bodyMd">
                  Somewhere
                </Text>
                <Text as="p" variant="bodyMd">
                  The Universe
                </Text>
              </div>
            </BlockStack>
          </div>
          <div>
            <Text as="p" variant="bodyMd">
              A single subsection without a sibling has no visual appearance
            </Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const WithFlushedSection = {
  render() {
    return (
      <Card roundedAbove="sm">
        <Bleed marginInline="400" marginBlockStart="400">
          <Image
            source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
            alt="a sheet with purple and orange stripes"
          />
        </Bleed>
        <Box paddingBlockStart="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers’
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
        </Box>
      </Card>
    );
  },
};

export const WithFlushedSectionAndSubduedSection = {
  render() {
    return (
      <Card roundedAbove="sm">
        <Bleed marginInline="400" marginBlock="400">
          <Image
            source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
            alt="a sheet with purple and orange stripes"
          />
          <Box background="bg-surface-secondary" padding="400">
            <Text as="p" variant="bodyMd">
              You can use sales reports to see information about your customers’
              orders based on criteria such as sales over time, by channel, or
              by staff.
            </Text>
          </Box>
        </Bleed>
      </Card>
    );
  },
};

export const WithSectionsAndActions = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              Customer
            </Text>
            <Text as="p" variant="bodyMd">
              John Smith
            </Text>
          </BlockStack>
          <BlockStack gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Contact Information
              </Text>
              <Button
                icon={EditIcon}
                variant="tertiary"
                onClick={() => {}}
                accessibilityLabel="Edit"
              />
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              john.smith@example.com
            </Text>
          </BlockStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithSectionsAndCriticalAction = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              Customer
            </Text>
            <Text as="p" variant="bodyMd">
              John Smith
            </Text>
          </BlockStack>
          <BlockStack gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Contact Information
              </Text>
              <ButtonGroup>
                <Button
                  icon={DeleteIcon}
                  variant="tertiary"
                  tone="critical"
                  onClick={() => {}}
                  accessibilityLabel="Delete"
                />
                <Button
                  icon={EditIcon}
                  variant="tertiary"
                  onClick={() => {}}
                  accessibilityLabel="Edit"
                />
              </ButtonGroup>
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              john.smith@example.com
            </Text>
          </BlockStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithSeparateHeader = {
  render() {
    const [actionActive, toggleAction] = useState(false);

    const handleToggleAction = () => {
      toggleAction(!actionActive);
    };

    const items = [{content: 'Member'}, {content: 'Admin'}];

    const disclosureButtonActivator = (
      <Button variant="plain" disclosure onClick={handleToggleAction}>
        Add account
      </Button>
    );

    const disclosureButton = (
      <Popover
        active={actionActive}
        activator={disclosureButtonActivator}
        onClose={handleToggleAction}
      >
        <ActionList items={items} />
      </Popover>
    );

    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingSm">
              Staff accounts
            </Text>
            <ButtonGroup>
              <Button
                variant="plain"
                onClick={() => {}}
                accessibilityLabel="Preview"
              >
                Preview
              </Button>
              {disclosureButton}
            </ButtonGroup>
          </InlineGrid>
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </BlockStack>
      </Card>
    );
  },
};

export const WithHeaderActions = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingSm">
              Variants
            </Text>
            <Button
              icon={PlusIcon}
              onClick={() => {}}
              accessibilityLabel="Add variant"
            >
              Add variant
            </Button>
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            Add variants if this product comes in multiple versions, like
            different sizes or colors.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithFooterActions = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Shipment 1234
          </Text>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Items
            </Text>
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </BlockStack>
          <InlineStack align="end">
            <ButtonGroup>
              <Button onClick={() => {}} accessibilityLabel="Fulfill items">
                Fulfill items
              </Button>
              <Button
                icon={PlusIcon}
                variant="primary"
                onClick={() => {}}
                accessibilityLabel="Create shipping label"
              >
                Create shipping label
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithMultipleFooterActions = {
  render() {
    const [actionActive, toggleAction] = useState(false);

    const handleToggleAction = () => {
      toggleAction(!actionActive);
    };

    const items = [
      {content: 'Cancel shipment', destructive: true},
      {content: 'Add another shipment', disabled: true},
    ];

    const disclosureButtonActivator = (
      <Button disclosure accessibilityLabel="More" onClick={handleToggleAction}>
        More
      </Button>
    );

    const disclosureButton = (
      <Popover
        active={actionActive}
        activator={disclosureButtonActivator}
        onClose={handleToggleAction}
      >
        <ActionList items={items} />
      </Popover>
    );

    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Shipment 1234
          </Text>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Items
            </Text>
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </BlockStack>
          <InlineStack align="end">
            <ButtonGroup>
              {disclosureButton}
              <Button
                variant="primary"
                onClick={() => {}}
                accessibilityLabel="Add tracking number"
              >
                Add tracking number
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithCustomFooterActions = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="500">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              Secure your account with 2-step authentication
            </Text>
            <Text as="p" variant="bodyMd">
              Two-step authentication adds an extra layer of security when
              logging in to your account. A special code will be required each
              time you log in, ensuring only you can access your account.
            </Text>
          </BlockStack>
          <InlineStack align="end">
            <ButtonGroup>
              <Button
                onClick={() => {}}
                accessibilityLabel="Enable two-step authentication"
              >
                Enable two-step authentication
              </Button>
              <Button variant="plain">Learn more</Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithCriticalFooterActions = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Shipment 1234
          </Text>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Items
            </Text>
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </BlockStack>
          <InlineStack align="end">
            <ButtonGroup>
              <Button
                variant="secondary"
                tone="critical"
                onClick={() => {}}
                accessibilityLabel="Cancel shipment"
              >
                Cancel shipment
              </Button>
              <Button
                variant="primary"
                onClick={() => {}}
                accessibilityLabel="Add tracking number"
              >
                Add tracking number
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Card>
    );
  },
};

export const WithCustomReactNodeTitle = {
  render() {
    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Products
          </Text>
          <BlockStack inlineAlign="start">
            <InlineStack gap="400">
              <Icon source={ProductIcon} />
              <Text as="h3" variant="headingSm">
                New Products
              </Text>
            </InlineStack>
          </BlockStack>
          <List>
            <List.Item>Socks</List.Item>
            <List.Item>Super Shoes</List.Item>
          </List>
        </BlockStack>
      </Card>
    );
  },
};

export const WithAllElements = {
  render() {
    const [actionActive, toggleAction] = useState(false);

    const handleToggleAction = () => {
      toggleAction(!actionActive);
    };

    const items = [{content: 'Gross Sales'}, {content: 'Net Sales'}];

    const disclosureButtonActivator = (
      <Button variant="plain" disclosure onClick={handleToggleAction}>
        View Sales
      </Button>
    );

    const disclosureButton = (
      <Popover
        active={actionActive}
        activator={disclosureButtonActivator}
        onClose={handleToggleAction}
      >
        <ActionList items={items} />
      </Popover>
    );

    const salesMarkup = (
      <div>
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
                id={sales}
                url={url}
                accessibilityLabel={`View Sales for ${sales}`}
              >
                <InlineStack align="space-between">
                  <div>{sales}</div>
                  <div>{amount}</div>
                </InlineStack>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );

    return (
      <Card roundedAbove="sm">
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingSm">
              Sales
            </Text>
            <ButtonGroup>
              <Button variant="plain">Total Sales</Button>
              {disclosureButton}
            </ButtonGroup>
          </InlineGrid>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd">
              You can use sales reports to see information about your customers’
              orders based on criteria such as sales over time, by channel, or
              by staff.
            </Text>
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Total Sales Breakdown
            </Text>
          </BlockStack>
          {salesMarkup}
          <Bleed marginInline="400">
            <Box
              background="bg-surface-secondary"
              paddingBlock="300"
              paddingInline="400"
            >
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                  Deactivated reports
                </Text>
                <List>
                  <List.Item>Payouts</List.Item>
                  <List.Item>Total Sales By Channel</List.Item>
                </List>
              </BlockStack>
            </Box>
          </Bleed>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Note
            </Text>
            <Text as="p" variant="bodyMd">
              The sales reports are available only if your store is on the
              Shopify plan or higher.
            </Text>
            <InlineStack align="end">
              <ButtonGroup>
                <Button onClick={() => {}} accessibilityLabel="Dismiss">
                  Dismiss
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {}}
                  accessibilityLabel="Export Report"
                >
                  Export Report
                </Button>
              </ButtonGroup>
            </InlineStack>
          </BlockStack>
        </BlockStack>
      </Card>
    );
  },
};
