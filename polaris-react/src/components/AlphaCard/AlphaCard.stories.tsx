import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AlphaCard,
  Bleed,
  Box,
  Button,
  ButtonGroup,
  HorizontalGrid,
  Divider,
  Icon,
  Image,
  HorizontalStack,
  LegacyStack,
  List,
  ResourceList,
  Text,
  VerticalStack,
  secondaryActionsFrom,
} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';

export default {
  component: AlphaCard,
} as ComponentMeta<typeof AlphaCard>;

export function Default() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithBackgroundSubdued() {
  return (
    <AlphaCard background="bg-subdued" roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithBorderRadiusRoundedAbove() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithResponsivePadding() {
  return (
    <AlphaCard padding={{xs: '5', sm: '6', md: '8'}} roundedAbove="sm">
      <VerticalStack gap={{xs: '4', sm: '5'}}>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store’s performance.</p>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithSection() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of the performance of your online store.
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithSubduedSection() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h3" variant="headingMd">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="5">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </VerticalStack>
      <Bleed
        marginBlockEnd={{xs: '4', sm: '5'}}
        marginInline={{xs: '4', sm: '5'}}
      >
        <Divider />
        <Box background="bg-subdued" padding={{xs: '4', sm: '5'}}>
          <VerticalStack gap="2">
            <Text as="h3" variant="headingSm">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </VerticalStack>
        </Box>
      </Bleed>
    </AlphaCard>
  );
}

export function WithSubsection() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Customer
        </Text>
        <Text as="p" variant="bodyMd">
          John Smith
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <Box paddingBlockEnd="2">
              <Text as="h3" variant="headingSm">
                Addresses
              </Text>
            </Box>
            <VerticalStack gap="4">
              <Box>
                <Text as="p" variant="bodyMd">
                  123 First St
                </Text>
                <Text as="p" variant="bodyMd">
                  Somewhere
                </Text>
                <Text as="p" variant="bodyMd">
                  The Universe
                </Text>
              </Box>
              <Divider />
              <Box>
                <Text as="p" variant="bodyMd">
                  123 Second St
                </Text>
                <Text as="p" variant="bodyMd">
                  Somewhere
                </Text>
                <Text as="p" variant="bodyMd">
                  The Universe
                </Text>
              </Box>
            </VerticalStack>
          </Box>
        </Bleed>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box paddingInlineStart="5" paddingBlockStart="5">
            <Text as="p" variant="bodyMd">
              A single subsection without a sibling has no visual appearance
            </Text>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithMultipleSections() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Text as="p" variant="bodyMd">
          View a summary of the performance of your online store.
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithFlushSection() {
  return (
    <AlphaCard roundedAbove="sm">
      <Bleed marginInline={{xs: '4', sm: '5'}} marginBlock={{xs: '4', sm: '5'}}>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
        <Divider />
        <Box padding={{xs: '4', sm: '5'}}>
          <VerticalStack gap="2">
            <Text as="p" variant="bodyMd">
              You can use sales reports to see information about your customers’
              orders based on criteria such as sales over time, by channel, or
              by staff.
            </Text>
          </VerticalStack>
        </Box>
      </Bleed>
    </AlphaCard>
  );
}

export function WithTitledSections() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h3" variant="headingSm">
              Reports
            </Text>
          </Box>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </Box>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <Text as="h3" variant="headingSm">
                Summary
              </Text>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithMultipleTitledSections() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Online store dashboard
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h3" variant="headingSm">
              Reports
            </Text>
          </Box>
          <Text as="p" variant="bodyMd">
            View a summary of your online store’s performance.
          </Text>
        </Box>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <Text as="h3" variant="headingSm">
                Summary
              </Text>
              <Text as="p" variant="bodyMd">
                View a summary of your online store’s performance, including
                sales, visitors, top products, and referrals.
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithSectionsAndActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Customer
        </Text>
        <Text as="p" variant="bodyMd">
          John Smith
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <Box>
              <Box paddingBlockEnd="2">
                <HorizontalGrid columns="1fr auto">
                  <Text as="h3" variant="headingSm">
                    Contact Information
                  </Text>
                  <ButtonGroup>
                    <Button plain>Edit</Button>
                  </ButtonGroup>
                </HorizontalGrid>
              </Box>
              <Text as="p" variant="bodyMd">
                john.smith@example.com
              </Text>
            </Box>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithCustomReactNodeTitle() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Products
        </Text>
        <VerticalStack inlineAlign="start" gap="0">
          <HorizontalStack gap="4">
            <Icon source={ProductsMajor} />
            <Text variant="headingSm" as="h3">
              New Products
            </Text>
          </HorizontalStack>
        </VerticalStack>
      </VerticalStack>
      <Box paddingBlockStart="2">
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </Box>
    </AlphaCard>
  );
}

export function WithSeparateHeader() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <HorizontalGrid columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Staff accounts
          </Text>
          <ButtonGroup>
            <Button plain>Preview</Button>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Member'}, {content: 'Admin'}],
              secondaryActionsDisclosureText: 'Add account',
              plainButton: true,
            })}
          </ButtonGroup>
        </HorizontalGrid>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithHeaderActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <HorizontalGrid columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Variants
          </Text>
          <ButtonGroup>
            <Button plain>Add variant</Button>
          </ButtonGroup>
        </HorizontalGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithFooterActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h2" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Edit shipment'}],
            })}
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithMultipleFooterActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h2" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [
                {content: 'Cancel shipment', destructive: true},
                {content: 'Add another shipment', disabled: true},
              ],
            })}
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithCustomFooterActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Secure your account with 2-step authentication
        </Text>
        <Text as="p" variant="bodyMd">
          Two-step authentication adds an extra layer of security when logging
          in to your account. A special code will be required each time you log
          in, ensuring only you can access your account.
        </Text>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [{content: 'Enable two-step authentication'}],
            })}
            <Button plain>Learn more</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithDestructiveFooterActions() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h2" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>
        <HorizontalStack align="end">
          <ButtonGroup>
            {secondaryActionsFrom({
              secondaryActions: [
                {content: 'Cancel shipment', destructive: true},
              ],
            })}
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </HorizontalStack>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithDestructiveAction() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Customer
        </Text>
        <Text as="p" variant="bodyMd">
          John Smith
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <VerticalStack gap="2">
              <HorizontalGrid columns="1fr auto">
                <Text as="h3" variant="headingSm">
                  Contact information
                </Text>
                <ButtonGroup>
                  <Button plain destructive>
                    Delete
                  </Button>
                  <Button plain>Edit</Button>
                </ButtonGroup>
              </HorizontalGrid>
              <Text as="p" variant="bodyMd">
                john.smith@example.com
              </Text>
            </VerticalStack>
          </Box>
        </Bleed>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithAllElements() {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="5">
        <HorizontalGrid columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Sales
          </Text>
          <ButtonGroup>
            <Button plain>Total Sales</Button>
            {secondaryActionsFrom({
              secondaryActions: [
                {content: 'Gross Sales'},
                {content: 'Net Sales'},
              ],
              secondaryActionsDisclosureText: 'View Sales',
              plainButton: true,
            })}
          </ButtonGroup>
        </HorizontalGrid>
        <Text as="p" variant="bodyMd">
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </Text>
        <Bleed marginInline={{xs: '4', sm: '5'}}>
          <Divider />
          <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
            <Box paddingBlockEnd="2">
              <Text as="h3" variant="headingSm">
                Total Sales Breakdown
              </Text>
            </Box>
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
                    <LegacyStack>
                      <LegacyStack.Item fill>{sales}</LegacyStack.Item>
                      <LegacyStack.Item>{amount}</LegacyStack.Item>
                    </LegacyStack>
                  </ResourceList.Item>
                );
              }}
            />
          </Box>
        </Bleed>
        <Bleed
          marginBlockEnd={{xs: '5', sm: '5'}}
          marginInline={{xs: '4', sm: '5'}}
        >
          <Divider />
          <Box background="bg-subdued" padding={{xs: '4', sm: '5'}}>
            <VerticalStack gap="2">
              <Text as="h3" variant="headingSm">
                Deactivated reports
              </Text>
              <List>
                <List.Item>Payouts</List.Item>
                <List.Item>Total Sales By Channel</List.Item>
              </List>
            </VerticalStack>
          </Box>
        </Bleed>
        <Bleed
          marginBlockEnd={{xs: '4', sm: '5'}}
          marginInline={{xs: '4', sm: '5'}}
        >
          <Divider />
        </Bleed>
        <Box paddingBlockStart="5">
          <VerticalStack gap="2">
            <Text as="h3" variant="headingSm">
              Note
            </Text>
            <Text as="p" variant="bodyMd">
              The sales reports are available only if your store is on the
              Shopify plan or higher.
            </Text>
            <Box paddingBlockStart="3">
              <HorizontalStack align="end">
                <ButtonGroup>
                  {secondaryActionsFrom({
                    secondaryActions: [{content: 'Dismiss'}],
                  })}
                  <Button primary>Export Report</Button>
                </ButtonGroup>
              </HorizontalStack>
            </Box>
          </VerticalStack>
        </Box>
      </VerticalStack>
    </AlphaCard>
  );
}
