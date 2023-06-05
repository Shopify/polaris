import React, {useCallback, useState} from 'react';

import type {TabProps} from '../src';
import {
  Page,
  Text,
  HorizontalStack,
  VerticalStack,
  IndexFilters,
  Filters,
  Tabs,
  Card,
  Layout,
} from '../src';

export function Playground() {
  return (
    <Page title="Experimental index table">
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <VerticalStack gap="4">
              <Text as="h2" variant="headingSm">
                Tabs
              </Text>

              <TabNav />
            </VerticalStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingSm">
              Filters
            </Text>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingSm">
              IndexFilters
            </Text>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingSm">
              IndexTable
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function TabNav() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string) => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (name) => {
                await sleep(1);
                duplicateView(name);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      canCreateNewView
      onCreateNewView={onCreateNewView}
    >
      <VerticalStack gap="4">
        <Text as="h2" variant="headingMd">
          {tabs[selected].content}
        </Text>

        <Text as="p" variant="bodyMd">
          Tab {selected} selected
        </Text>
      </VerticalStack>
    </Tabs>
  );
}
