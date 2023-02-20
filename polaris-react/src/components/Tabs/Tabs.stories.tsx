import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {LegacyCard, Tabs, Box} from '@shopify/polaris';

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
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
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
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
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
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
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
      <Box padding="2">
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}
          disclosureText="Extra views"
        >
          <LegacyCard.Section title={tabs[selected].content}>
            <p>Tab {selected} selected</p>
          </LegacyCard.Section>
        </Tabs>
      </Box>
    </LegacyCard>
  );
}

// const Template: StoryFn<TabsProps> = (args) => {
//   const [selected, setSelected] = useState(0);

//   const handleTabChange = (selectedTabIndex: number) =>
//     setSelected(selectedTabIndex);

//   const items: TabsProps['items'] = [
//     'All',
//     'Unpaid',
//     'Open',
//     'Closed',
//     'Local delivery',
//     'Local pickup',
//   ].map((item, index) => ({
//     name: item,
//     onAction: action(`Clicked ${item}`),
//     index,
//     id: `${item}-${index}`,
//     permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
//     onTogglePopover: jest.fn(),
//     onToggleModal: jest.fn(),
//   }));

//   return (
//     <Container>
//       <Tabs
//         {...args}
//         items={items}
//         selected={selected}
//         onSelect={handleTabChange}
//       />
//     </Container>
//   );
// };

// export const Basic = Template.bind({});

// Basic.args = {
//   disabled: false,
//   showNewTab: false,
// };

// const ManyTemplate: StoryFn<TabsProps> = (args) => {
//   const [selected, setSelected] = useState(0);

//   const handleTabChange = (selectedTabIndex: number) =>
//     setSelected(selectedTabIndex);

//   const items: TabsProps['items'] = [
//     'All',
//     'Unpaid',
//     'Open',
//     'Closed',
//     'Local delivery',
//     'Local pickup',
//     'Aardvark',
//     'Bluebird',
//     'Chameleon',
//     'Dormouse',
//     'Elephant',
//     'Flying frog',
//     'Groundhog',
//     'Hedgehog',
//     'Impala',
//     'Jackal',
//     'Kangaroo',
//     'Lemur',
//     'Mongoose',
//     'Narwhal',
//     'Ocelot',
//     'Penguin',
//     'Quail',
//     'Rabbit',
//     'Salamander',
//     'Tortoise',
//     'Uakari',
//     'Vulture',
//     'Wallaby',
//     'Xerus',
//     'Yak',
//     'Zebra',
//   ].map((item, index) => ({
//     name: item,
//     onAction: () => {
//       console.log('clicked', item);
//     },
//     index,
//     id: `${item}-${index}`,
//     permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
//     onToggleModal: jest.fn(),
//     onTogglePopover: jest.fn(),
//   }));

//   return (
//     <Container>
//       <Tabs
//         {...args}
//         items={items}
//         selected={selected}
//         onSelect={handleTabChange}
//       />
//     </Container>
//   );
// };

// export const ManyButtons = ManyTemplate.bind({});

// ManyButtons.args = {
//   disabled: false,
//   showNewTab: false,
// };

// export const DisabledWithTooltip = Template.bind({});

// DisabledWithTooltip.args = {
//   disabled: true,
//   disabledTooltipMessage: 'These buttons are disabled',
// };
