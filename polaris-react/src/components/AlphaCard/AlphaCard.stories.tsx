import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AlphaCard,
  Bleed,
  Box,
  Button,
  ButtonGroup,
  Columns,
  Divider,
  Inline,
  List,
  Text,
  VerticalStack,
} from '@shopify/polaris';

export default {
  component: AlphaCard,
} as ComponentMeta<typeof AlphaCard>;

export function Default() {
  return (
    <AlphaCard>
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
    <AlphaCard background="bg-subdued">
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
          View a summary of your online store's performance.
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

export function WithHeaderActions() {
  return (
    <AlphaCard>
      <VerticalStack gap="5">
        <Columns columns="1fr auto">
          <Text as="h2" variant="headingMd">
            Variants
          </Text>
          <ButtonGroup>
            <Button plain>Add tracking number</Button>
          </ButtonGroup>
        </Columns>
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
    <AlphaCard>
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>
        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h3" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>
        <Inline align="end">
          <ButtonGroup>
            <Button>Edit shipment</Button>
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </Inline>
      </VerticalStack>
    </AlphaCard>
  );
}

// add with multiple footer actions story

export function WithCustomFooterAction() {
  return (
    <AlphaCard>
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Secure your account with 2-step authentication
        </Text>
        <Text as="p" variant="bodyMd">
          Two-step authentication adds an extra layer of security when logging
          in to your account. A special code will be required each time you log
          in, ensuring only you can access your account.
        </Text>

        <Inline align="end">
          <ButtonGroup>
            <Button>Enable two-step authentication</Button>
            <Button plain>Learn more</Button>
          </ButtonGroup>
        </Inline>
      </VerticalStack>
    </AlphaCard>
  );
}

export function WithDestructiveFooterAction() {
  return (
    <AlphaCard>
      <VerticalStack gap="5">
        <Text as="h2" variant="headingMd">
          Shipment 1234
        </Text>

        <Box>
          <Box paddingBlockEnd="2">
            <Text as="h3" variant="bodyMd" fontWeight="bold">
              Items
            </Text>
          </Box>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </Box>

        <Inline align="end">
          <ButtonGroup>
            <Button destructive>Cancel shipment</Button>
            <Button primary>Add tracking number</Button>
          </ButtonGroup>
        </Inline>
      </VerticalStack>
    </AlphaCard>
  );
}
