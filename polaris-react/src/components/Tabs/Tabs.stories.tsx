import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Tabs,
  VerticalStack,
  HorizontalStack,
  Card,
  Text,
} from '@shopify/polaris';

export default {
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

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
    id: `${item}-${index}`,
  }));

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <HorizontalStack gap="4">
        <Text as="h2" variant="headingMd">
          {tabs[selected].content}
        </Text>

        <Text as="p" variant="bodyMd">
          Tab {selected} selected
        </Text>
      </HorizontalStack>
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
    id: `${item}-${index}`,
  }));
  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <HorizontalStack gap="4">
          <Text as="h2" variant="headingMd">
            {tabs[selected].content}
          </Text>

          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </HorizontalStack>
      </Tabs>
    </Card>
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
      id: 'all-customers-fitted-3',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <HorizontalStack gap="4">
          <Text as="h2" variant="headingMd">
            {tabs[selected].content}
          </Text>

          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </HorizontalStack>
      </Tabs>
    </Card>
  );
}

type TabAction = 'rename' | 'edit' | 'edit-columns' | 'duplicate' | 'delete';

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
    id: `${item}-${index}`,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'duplicate' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'delete' as TabAction,
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
      id: 'all-customers-fitted-3',
      badge: '10+',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      badge: '4',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <VerticalStack gap="4">
          <Text as="h2" variant="headingMd">
            {tabs[selected].content}
          </Text>

          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </VerticalStack>
      </Tabs>
    </Card>
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
      id: 'all-customers-4',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-4',
    },
    {
      id: 'accepts-marketing-4',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-4',
    },
    {
      id: 'repeat-customers-4',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-4',
    },
    {
      id: 'prospects-4',
      content: 'Prospects',
      panelID: 'prospects-content-4',
    },
    {
      id: 'opt-out-marketing-4',
      content: 'Opted out of marketing',
      panelID: 'opt-out-content-4',
    },
    {
      id: 'net-new-customers-4',
      content: 'Net new customers',
      panelID: 'net-new-customers-content-4',
    },
    {
      id: 'churned-customers-4',
      content: 'Churned customers',
      panelID: 'churned=customers-content-4',
    },
  ];

  return (
    <Card>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="Extra views"
      >
        <HorizontalStack gap="4">
          <Text as="h2" variant="headingMd">
            {tabs[selected].content}
          </Text>

          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </HorizontalStack>
      </Tabs>
    </Card>
  );
}

export function All() {
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
    badge: index % 2 === 0 ? index * 4 : undefined,
    id: `${item}-${index}`,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'duplicate' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'delete' as TabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
          ],
  }));

  return (
    <VerticalStack gap="5">
      <Card>
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          canCreateNewView
        />
      </Card>

      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        canCreateNewView
      />
    </VerticalStack>
  );
}
