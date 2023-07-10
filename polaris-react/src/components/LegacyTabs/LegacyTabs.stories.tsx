import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  LegacyCard,
  LegacyTabs,
  Text,
  VerticalStack,
} from '@shopify/polaris';

export default {
  component: LegacyTabs,
} as ComponentMeta<typeof LegacyTabs>;

export function All() {
  return (
    <VerticalStack gap="8">
      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          Default
        </Text>
        <Default />
      </VerticalStack>

      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          With URL tabs
        </Text>
        <WithUrlTabs />
      </VerticalStack>

      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          Fitted
        </Text>
        <Fitted />
      </VerticalStack>

      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          With badge content
        </Text>
        <WithBadgeContent />
      </VerticalStack>

      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          With custom disclosure
        </Text>
        <WithCustomDisclosure />
      </VerticalStack>
    </VerticalStack>
  );
}

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
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </LegacyTabs>
  );
}

export function WithUrlTabs() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-2',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-2',
      url: '#',
    },
    {
      id: 'accepts-marketing-2',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-2',
      url: '#',
    },
    {
      id: 'repeat-customers-2',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-2',
      url: '#',
    },
    {
      id: 'prospects-2',
      content: 'Prospects',
      panelID: 'prospects-content-2',
      url: '#',
    },
  ];

  return (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </LegacyTabs>
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
      panelID: 'accepts-marketing-fitted-Ccontent-3',
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
      id: 'all-customers-fitted-4',
      content: (
        <span>
          All <Badge status="new">10+</Badge>
        </span>
      ),
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-4',
    },
    {
      id: 'accepts-marketing-fitted-4',
      content: (
        <span>
          Accepts marketing <Badge status="new">4</Badge>
        </span>
      ),
      panelID: 'accepts-marketing-fitted-content-4',
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
      id: 'all-customers-5',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-5',
    },
    {
      id: 'accepts-marketing-5',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-5',
    },
    {
      id: 'repeat-customers-5',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-5',
    },
    {
      id: 'prospects-5',
      content: 'Prospects',
      panelID: 'prospects-content-5',
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
