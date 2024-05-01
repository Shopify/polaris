import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  Badge,
  LegacyCard,
  LegacyTabs,
  Text,
  BlockStack,
} from '@shopify/polaris';

export default {
  component: LegacyTabs,
} as Meta<typeof LegacyTabs>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="800">
        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Default
          </Text>
          <Default.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With URL tabs
          </Text>
          <WithUrlTabs.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Fitted
          </Text>
          <Fitted.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With badge content
          </Text>
          <WithBadgeContent.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With custom disclosure
          </Text>
          <WithCustomDisclosure.render />
        </BlockStack>
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
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
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </LegacyTabs>
    );
  },
};

export const WithUrlTabs = {
  render() {
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
          <Text as="p" variant="bodyMd">
            Tab {selected} selected
          </Text>
        </LegacyCard.Section>
      </LegacyTabs>
    );
  },
};

export const Fitted = {
  render() {
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
            <Text as="p" variant="bodyMd">
              Tab {selected} selected
            </Text>
          </LegacyCard.Section>
        </LegacyTabs>
      </LegacyCard>
    );
  },
};

export const WithBadgeContent = {
  render() {
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
            All <Badge tone="new">10+</Badge>
          </span>
        ),
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-fitted-content-4',
      },
      {
        id: 'accepts-marketing-fitted-4',
        content: (
          <span>
            Accepts marketing <Badge tone="new">4</Badge>
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
            <Text as="p" variant="bodyMd">
              Tab {selected} selected
            </Text>
          </LegacyCard.Section>
        </LegacyTabs>
      </LegacyCard>
    );
  },
};

export const WithCustomDisclosure = {
  render() {
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
            <Text as="p" variant="bodyMd">
              Tab {selected} selected
            </Text>
          </LegacyCard.Section>
        </LegacyTabs>
      </LegacyCard>
    );
  },
};
