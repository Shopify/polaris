import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {LegacyCard, AlphaTabs, Box} from '@shopify/polaris';

export default {
  component: AlphaTabs,
} as ComponentMeta<typeof AlphaTabs>;

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
    <LegacyCard>
      <AlphaTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </AlphaTabs>
    </LegacyCard>
  );
}

export function Fitted() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
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
    <LegacyCard>
      <AlphaTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        fitted
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </AlphaTabs>
    </LegacyCard>
  );
}

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
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'duplicate',
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit',
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'delete',
              onAction: () => {},
              onPrimaryAction: () => {},
            },
          ],
  }));

  return (
    <AlphaTabs
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
    (selectedTabIndex) => setSelected(selectedTabIndex),
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
    <LegacyCard>
      <AlphaTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        fitted
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </AlphaTabs>
    </LegacyCard>
  );
}

export function WithCustomDisclosure() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
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
    <LegacyCard>
      <AlphaTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="Extra views"
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </AlphaTabs>
    </LegacyCard>
  );
}

export function OutsideOfCard() {
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
    <AlphaTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </AlphaTabs>
  );
}
