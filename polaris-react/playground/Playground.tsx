import React from 'react';

import {
  ActionList,
  AlphaCard,
  AlphaStack,
  Box,
  Button,
  Card,
  Columns,
  Inline,
  List,
  Page,
  Popover,
  ResourceList,
  Stack,
  Text,
  TextContainer,
} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <AlphaStack>
        <Columns columns={{xs: '1fr 1fr'}} gap={{xs: '4'}}>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Existing
            </Text>
            <Card title="Online store dashboard" sectioned>
              <p>View a summary of your online store’s performance.</p>
            </Card>
          </AlphaStack>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Alpha default
            </Text>
            <AlphaCard>
              <AlphaStack spacing="5">
                <Text as="h3" variant="headingMd">
                  Online store dashboard
                </Text>
                <p>View a summary of your online store’s performance.</p>
              </AlphaStack>
            </AlphaCard>
          </AlphaStack>
        </Columns>
        <Columns columns={{xs: '1fr 1fr'}} gap={{xs: '4'}}>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Existing with actions
            </Text>
            <Card
              sectioned
              title="Variants"
              actions={[{content: 'Add variant'}]}
            >
              <p>
                Add variants if this product comes in multiple versions, like
                different sizes or colors.
              </p>
            </Card>
          </AlphaStack>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Alpha with actions
            </Text>
            <AlphaCard>
              <AlphaStack spacing="5">
                <Columns columns={{xs: '1fr auto'}} gap={{xs: '4'}}>
                  <Text as="h3" variant="headingMd">
                    Variants{' '}
                  </Text>
                  <Button plain>Add variant</Button>
                </Columns>
                <p>
                  Add variants if this product comes in multiple versions, like
                  different sizes or colors.
                </p>
              </AlphaStack>
            </AlphaCard>
          </AlphaStack>
        </Columns>
        <Columns columns={{xs: '1fr 1fr'}} gap={{xs: '4'}}>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Existing with sections
            </Text>
            <Card title="Online store dashboard">
              <Card.Section>
                <p>View a summary of your online store’s performance.</p>
              </Card.Section>

              <Card.Section>
                <p>
                  View a summary of your online store’s performance, including
                  sales, visitors, top products, and referrals.
                </p>
              </Card.Section>
            </Card>
          </AlphaStack>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Alpha with sections
            </Text>
            <AlphaCard padding="0">
              <AlphaStack spacing="0">
                <Box padding="5">
                  <AlphaStack spacing="5">
                    <Text as="h3" variant="headingMd">
                      Online store dashboard
                    </Text>
                    <p>View a summary of your online store’s performance.</p>
                  </AlphaStack>
                </Box>
                <Box padding="5" borderTop="divider" shadow="transparent">
                  <p>
                    View a summary of your online store’s performance, including
                    sales, visitors, top products, and referrals.
                  </p>
                </Box>
              </AlphaStack>
            </AlphaCard>
          </AlphaStack>
        </Columns>
        <Columns columns={{xs: '1fr 1fr'}} gap={{xs: '4'}}>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Existing with sections
            </Text>
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
                  You can use sales reports to see information about your
                  customers’ orders based on criteria such as sales over time,
                  by channel, or by staff.
                </TextContainer>
              </Card.Section>
              <Card.Section title="Total Sales Breakdown">
                <ResourceList
                  resourceName={{singular: 'sale', plural: 'sales'}}
                  items={[
                    {
                      sales: 'Orders',
                      amount: 'USD$0.00',
                      url: 'reports/orders',
                    },
                    {
                      sales: 'Returns',
                      amount: '-USD$250.00',
                      url: 'reports/returns',
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
                  The sales reports are available only if your store is on the
                  Shopify plan or higher.
                </TextContainer>
              </Card.Section>
            </Card>
          </AlphaStack>
          <AlphaStack>
            <Text as="h2" variant="bodySm">
              Alpha with all the things
            </Text>
            <AlphaCard padding="0">
              <Box padding="5">
                <Columns columns={{xs: '1fr auto auto'}} gap={{xs: '4'}}>
                  <Text as="h3" variant="headingMd">
                    Sales
                  </Text>
                  <Button plain>Total Sales</Button>
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
                </Columns>
              </Box>
              <Box
                paddingRight="5"
                paddingBottom="5"
                paddingLeft="5"
                borderBottom="divider"
              >
                <Text as="p" variant="bodyMd">
                  You can use sales reports to see information about your
                  customers’ orders based on criteria such as sales over time,
                  by channel, or by staff.
                </Text>
              </Box>
              <Box padding="5" borderBottom="divider">
                <AlphaStack spacing="1">
                  <Text as="h3" variant="headingSm">
                    Total Sales Breakdown
                  </Text>
                  <ResourceList
                    resourceName={{singular: 'sale', plural: 'sales'}}
                    items={[
                      {
                        sales: 'Orders',
                        amount: 'USD$0.00',
                        url: 'reports/orders',
                      },
                      {
                        sales: 'Returns',
                        amount: '-USD$250.00',
                        url: 'reports/returns',
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
                </AlphaStack>
              </Box>
              <Box
                padding="5"
                borderBottom="divider"
                background="surface-subdued"
              >
                <AlphaStack spacing="1">
                  <Text as="h3" variant="headingSm">
                    Deactivated reports
                  </Text>
                  <List>
                    <List.Item>Payouts</List.Item>
                    <List.Item>Total Sales By Channel</List.Item>
                  </List>
                </AlphaStack>
              </Box>
              <Box padding="5">
                <AlphaStack spacing="1">
                  <Text as="h3" variant="headingSm">
                    Note
                  </Text>
                  <Text as="p" variant="bodyMd">
                    The sales reports are available only if your store is on the
                    Shopify plan or higher.
                  </Text>
                </AlphaStack>
              </Box>
              <Box paddingRight="5" paddingBottom="4" paddingLeft="5">
                <Inline align="end" spacing="2">
                  <Button>Dismiss</Button>
                  <Button primary>Export Report</Button>
                </Inline>
              </Box>
            </AlphaCard>
          </AlphaStack>
        </Columns>
      </AlphaStack>
    </Page>
  );
}
