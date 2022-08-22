import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AppProvider,
  Card,
  CustomProperties,
  List,
  TextContainer,
} from '@shopify/polaris';

export default {
  component: CustomProperties,
  args: {omitAppProvider: true},
} as ComponentMeta<typeof CustomProperties>;

export function RenderedByTheAppProvider() {
  return (
    <AppProvider i18n={{}}>
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
    </AppProvider>
  );
}

export function WithAColorSchemeRenderedByTheAppProvider() {
  return (
    <AppProvider i18n={{}} colorScheme="dark">
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
    </AppProvider>
  );
}

export function WithADifferentColorSchemeNestedWithinAnAppProvider() {
  return (
    <AppProvider i18n={{}}>
      <TextContainer>
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
        <CustomProperties colorScheme="dark">
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
        </CustomProperties>
      </TextContainer>
    </AppProvider>
  );
}
