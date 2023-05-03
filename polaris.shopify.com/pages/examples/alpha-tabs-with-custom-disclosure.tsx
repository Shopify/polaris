import {LegacyCard, AlphaTabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TabsWithCustomDisclosureExample() {
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

export default withPolarisExample(TabsWithCustomDisclosureExample);
