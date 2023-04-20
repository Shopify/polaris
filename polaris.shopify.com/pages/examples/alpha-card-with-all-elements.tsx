import React from 'react';
import {
  AlphaCard,
  Bleed,
  Box,
  Button,
  ButtonGroup,
  Divider,
  HorizontalGrid,
  HorizontalStack,
  LegacyStack,
  List,
  ResourceList,
  Text,
  VerticalStack,
  secondaryActionsFrom,
} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaCardWithAllElementsExample() {
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

export default withPolarisExample(AlphaCardWithAllElementsExample);
