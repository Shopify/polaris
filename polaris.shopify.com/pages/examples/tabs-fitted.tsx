import {Card, Tabs} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function FittedTabsExample() {
  const [selected, setSelected] = useState(0);

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
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={setSelected} fitted>
        <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section>
      </Tabs>
    </Card>
  );
}

export default withPolarisExample(FittedTabsExample);
