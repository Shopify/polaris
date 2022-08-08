import {Card, List} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Deactivated staff accounts" sectioned subdued>
      <List>
        <List.Item>Felix Crafford</List.Item>
        <List.Item>Ezequiel Manno</List.Item>
      </List>
    </Card>
  );
}

export default withPolarisExample(CardExample);
