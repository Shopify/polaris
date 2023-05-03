import {LegacyCard, AlphaTabs} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TabsDefaultExample() {
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

export default withPolarisExample(TabsDefaultExample);
