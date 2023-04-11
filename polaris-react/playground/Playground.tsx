import React from 'react';

import {
  Page,
  AlphaStack,
  Card,
  AlphaCard,
  Columns,
  Text,
  List,
  ButtonGroup,
  Divider,
  Box,
  Inline,
  Popover,
  Button,
  ActionList,
  LegacyStack,
  Bleed,
} from '../src';
import {useToggle} from '../src/utilities/use-toggle';
import {useI18n} from '../src/utilities/i18n';

export function Playground() {
  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen,
  } = useToggle(false);

  let secondaryFooterActionsDisclosureText = null;

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <AlphaStack gap="5">
        {/* with header actions */}
        <Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
          <p>
            Add variants if this product comes in multiple versions, like
            different sizes or colors.
          </p>
        </Card>
        {/* with header actions */}
        <AlphaCard>
          <AlphaStack gap="5">
            <Columns columns="1fr auto">
              <Text as="h2" variant="headingMd">
                Variants
              </Text>
              <ButtonGroup>
                <Button plain>Add variant</Button>
              </ButtonGroup>
            </Columns>
            <Text as="p" variant="bodyMd">
              Add variants if this product comes in multiple versions, like
              different sizes or colors.
            </Text>
          </AlphaStack>
        </AlphaCard>

        {/* with footer actions */}
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
        {/* with footer actions */}
        <AlphaCard>
          <AlphaStack gap="5">
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
            <Inline align="end">
              <ButtonGroup>
                <Button>Edit shipment</Button>
                <Button primary>Add tracking number</Button>
              </ButtonGroup>
            </Inline>
          </AlphaStack>
        </AlphaCard>

        {/* with multiple footer actions */}
        <Card
          title="Shipment 1234"
          secondaryFooterActions={[
            {content: 'Cancel shipment', destructive: true},
            {content: 'Add another shipment', disabled: true},
          ]}
          primaryFooterAction={{content: 'Add tracking number'}}
        >
          <Card.Section title="Items">
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </Card.Section>
        </Card>
        {/* with multiple footer actions */}
        <AlphaCard>
          <AlphaStack gap="5">
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
            <Inline align="end">
              <ButtonGroup>
                {/* TODO: Move to util */}
                <Popover
                  active={secondaryActionsPopoverOpen}
                  activator={
                    <Button
                      disclosure
                      onClick={toggleSecondaryActionsPopoverOpen}
                    >
                      {secondaryFooterActionsDisclosureText ||
                        i18n.translate('Polaris.Common.more')}
                    </Button>
                  }
                  onClose={toggleSecondaryActionsPopoverOpen}
                >
                  <ActionList
                    items={[
                      {content: 'Cancel shipment', destructive: true},
                      {content: 'Add another shipment', disabled: true},
                    ]}
                  />
                </Popover>
                <Button primary>Add tracking number</Button>
              </ButtonGroup>
            </Inline>
          </AlphaStack>
        </AlphaCard>

        {/* with custom footer actions */}
        <Card title="Secure your account with 2-step authentication">
          <Card.Section>
            <LegacyStack spacing="loose" vertical>
              <p>
                Two-step authentication adds an extra layer of security when
                logging in to your account. A special code will be required each
                time you log in, ensuring only you can access your account.
              </p>
              <LegacyStack distribution="trailing">
                <ButtonGroup>
                  <Button>Enable two-step authentication</Button>
                  <Button plain>Learn more</Button>
                </ButtonGroup>
              </LegacyStack>
            </LegacyStack>
          </Card.Section>
        </Card>

        <AlphaCard>
          <AlphaStack gap="5">
            <Text as="h2" variant="headingMd">
              Secure your account with 2-step authentication
            </Text>
            <Text as="p" variant="bodyMd">
              Two-step authentication adds an extra layer of security when
              logging in to your account. A special code will be required each
              time you log in, ensuring only you can access your account.
            </Text>

            <Inline align="end">
              <ButtonGroup>
                <Button>Enable two-step authentication</Button>
                <Button plain>Learn more</Button>
              </ButtonGroup>
            </Inline>
          </AlphaStack>
        </AlphaCard>

        {/* with destructive footer actions */}
        <Card
          title="Shipment 1234"
          secondaryFooterActions={[
            {content: 'Cancel shipment', destructive: true},
          ]}
          primaryFooterAction={{content: 'Add tracking number'}}
        >
          <Card.Section title="Items">
            <List>
              <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
              <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
            </List>
          </Card.Section>
        </Card>

        {/* with destructive footer actions */}
        <AlphaCard>
          <AlphaStack gap="5">
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

            <Inline align="end">
              <ButtonGroup>
                <Button destructive>Cancel shipment</Button>
                <Button primary>Add tracking number</Button>
              </ButtonGroup>
            </Inline>
          </AlphaStack>
        </AlphaCard>

        {/* with multiple sections */}
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
        {/* with multiple sections */}
        <AlphaCard roundedAbove="sm">
          <AlphaStack gap="5">
            <Text as="h2" variant="headingMd">
              Online store dashboard
            </Text>
            <Text as="p" variant="bodyMd">
              View a summary of your online store's performance.
            </Text>
            <Bleed marginInline={{xs: '4', sm: '5'}}>
              <Divider />
              <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
                <AlphaStack gap="2">
                  <Text as="p" variant="bodyMd">
                    View a summary of your online store’s performance, including
                    sales, visitors, top products, and referrals.
                  </Text>
                </AlphaStack>
              </Box>
            </Bleed>
          </AlphaStack>
        </AlphaCard>

        {/* with multiple titled sections */}
        <Card title="Online store dashboard">
          <Card.Section title="Reports">
            <p>View a summary of your online store’s performance.</p>
          </Card.Section>

          <Card.Section title="Summary">
            <p>
              View a summary of your online store’s performance, including
              sales, visitors, top products, and referrals.
            </p>
          </Card.Section>
        </Card>
        {/* with multiple titled sections */}
        <AlphaCard roundedAbove="sm">
          <AlphaStack gap="5">
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
                <AlphaStack gap="2">
                  <Text as="h3" variant="headingSm">
                    Summary
                  </Text>
                  <Text as="p" variant="bodyMd">
                    View a summary of your online store’s performance, including
                    sales, visitors, top products, and referrals.
                  </Text>
                </AlphaStack>
              </Box>
            </Bleed>
          </AlphaStack>
        </AlphaCard>

        {/* with sections and actions */}
        <Card title="Customer">
          <Card.Section>
            <p>John Smith</p>
          </Card.Section>
          <Card.Section
            title="Contact Information"
            actions={[{content: 'Edit'}]}
          >
            <p>john.smith@example.com</p>
          </Card.Section>
        </Card>
        {/* with sections and actions */}
        <AlphaCard roundedAbove="sm">
          <AlphaStack gap="5">
            <Text as="h2" variant="headingMd">
              Customer
            </Text>
            <Text as="p" variant="bodyMd">
              John Smith
            </Text>
            <Bleed marginInline={{xs: '4', sm: '5'}}>
              <Divider />
              <Box padding={{xs: '4', sm: '5'}} paddingBlockEnd="0">
                {/* <AlphaStack gap="2"> */}
                <Box>
                  <Box paddingBlockEnd="2">
                    <Columns columns="1fr auto">
                      <Text as="h3" variant="headingSm">
                        Contact Information
                      </Text>
                      <ButtonGroup>
                        <Button plain>Edit</Button>
                      </ButtonGroup>
                    </Columns>
                  </Box>
                  <Text as="p" variant="bodyMd">
                    john.smith@example.com
                  </Text>
                </Box>
                {/* </AlphaStack> */}
              </Box>
            </Bleed>
          </AlphaStack>
        </AlphaCard>
      </AlphaStack>
    </Page>
  );
}
