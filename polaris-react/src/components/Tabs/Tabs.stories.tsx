import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Tabs, BlockStack, LegacyCard, Text} from '@shopify/polaris';

export default {
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

export function All() {
  return (
    <BlockStack gap="500">
      <Default />
      <InsideOfACard />
      <Fitted />
      <WithActions />
      <WithBadgeContent />
      <WithCustomDisclosure />
      <WithReadOnly />
    </BlockStack>
  );
}
export function Default() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = (selectedTabIndex: number) =>
    setSelected(selectedTabIndex);

  const tabs = [
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ].map((item, index) => ({
    content: item,
    index,
    id: `${item.split(' ').join('-')}-${index}-default`,
  }));

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <Text as="p" variant="bodyMd">
          Tab {selected} selected
        </Text>
      </LegacyCard.Section>
    </Tabs>
  );
}

export function InsideOfACard() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = (selectedTabIndex: number) =>
    setSelected(selectedTabIndex);

  const tabs = [
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ].map((item, index) => ({
    content: item,
    index,
    id: `${item.split(' ').join('-')}-${index}-inside-of-a-card`,
  }));
  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}

export function Fitted() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content',
    },
    {
      id: 'accepts-marketing-fitted',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-content',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}

type AlphaTabAction =
  | 'rename'
  | 'edit'
  | 'edit-columns'
  | 'duplicate'
  | 'delete';

export function WithActions() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [selected, setSelected] = useState(0);

  const handleTabChange = (selectedTabIndex: number) =>
    setSelected(selectedTabIndex);

  const tabs = [
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
    'Returning customers',
    'New customers',
    'Abandoned checkouts',
    'Online store',
    'POS',
    'Facebook',
    'Instagram',
    'Twitter',
    'Pinterest',
    'Google',
    'Referral',
  ].map((item, index) => ({
    content: item,
    index,
    id: `${item.split(' ').join('-')}-${index}-with-actions`,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'duplicate' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit-columns' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'delete' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
          ],
  }));

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleTabChange}
      canCreateNewView
    />
  );
}

export function WithBadgeContent() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-with-badge',
      badge: '10+',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-with-badge-content',
    },
    {
      id: 'accepts-marketing-with-badge',
      badge: '4',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-with-badge-content',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}

export function WithCustomDisclosure() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-with-custom-disclosure',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-with-custom-disclosure-content',
    },
    {
      id: 'accepts-marketing-with-custom-disclosure',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-with-custom-disclosure-content',
    },
    {
      id: 'repeat-customers-with-custom-disclosure',
      content: 'Repeat customers',
      panelID: 'repeat-customers-with-custom-disclosure-content',
    },
    {
      id: 'prospects-with-custom-disclosure',
      content: 'Prospects',
      panelID: 'prospects-with-custom-disclosure-content',
    },
    {
      id: 'opt-out-marketing-with-custom-disclosure',
      content: 'Opted out of marketing',
      panelID: 'opt-out-with-custom-disclosure-content',
    },
    {
      id: 'net-new-customers-with-custom-disclosure',
      content: 'Net new customers',
      panelID: 'net-new-customers-with-custom-disclosure-content',
    },
    {
      id: 'churned-customers-with-custom-disclosure',
      content: 'Churned customers',
      panelID: 'churned=customers-with-custom-disclosure-content',
    },
  ];

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="Extra views"
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}

export function WithReadOnly() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = (selectedTabIndex: number) =>
    setSelected(selectedTabIndex);

  const tabs = [
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ].map((item, index) => ({
    content: item,
    index,
    id: `${item.split(' ').join('-')}-${index}-with-readonly`,
    readonly: index === 1,
  }));
  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}
