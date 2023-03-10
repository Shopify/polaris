import {
  Card,
  Popover,
  Button,
  ActionList,
  TextContainer,
  ResourceList,
  LegacyStack,
  List,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardExample() {
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
                <LegacyStack>
                  <LegacyStack.Item fill>{sales}</LegacyStack.Item>
                  <LegacyStack.Item>{amount}</LegacyStack.Item>
                </LegacyStack>
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

export default withPolarisExample(CardExample);
