import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, LegacyCard, LegacyTabs} from '@shopify/polaris';

export default {
  component: LegacyTabs,
} as ComponentMeta<typeof LegacyTabs>;

export function Default() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <LegacyCard>
      <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </LegacyTabs>
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
      id: 'all-customers-fitted-2',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'accepts-marketing-fitted-2',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-Ccontent-2',
    },
  ];

  return (
    <LegacyCard>
      <LegacyTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        fitted
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </LegacyTabs>
    </LegacyCard>
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
      content: (
        <span>
          All <Badge status="new">10+</Badge>
        </span>
      ),
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: (
        <span>
          Accepts marketing <Badge status="new">4</Badge>
        </span>
      ),
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <LegacyCard>
      <LegacyTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        fitted
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </LegacyTabs>
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
  ];

  return (
    <LegacyCard>
      <LegacyTabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="More views"
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </LegacyTabs>
    </LegacyCard>
  );
}
