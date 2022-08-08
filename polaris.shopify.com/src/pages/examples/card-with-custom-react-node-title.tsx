import {Card, Stack, Icon, Subheading, List} from '@shopify/polaris';
import {ProductsMajor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Products">
      <Card.Section
        title={
          <Stack>
            <Icon source={ProductsMajor} />
            <Subheading>New Products</Subheading>
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

export default withPolarisExample(CardExample);
