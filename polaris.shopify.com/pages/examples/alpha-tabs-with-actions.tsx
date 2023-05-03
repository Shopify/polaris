import {AlphaTabs} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

type AlphaTabAction =
  | 'rename'
  | 'edit'
  | 'edit-columns'
  | 'duplicate'
  | 'delete';

function TabsWithActionsExample() {
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
              type: 'rename' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'duplicate' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'edit' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
            {
              type: 'delete' as AlphaTabAction,
              onAction: () => {},
              onPrimaryAction: () => {},
            },
          ],
  }));

  return (
    <AlphaTabs
      tabs={tabs as any}
      selected={selected}
      onSelect={handleTabChange}
      canCreateNewView
    />
  );
}

export default withPolarisExample(TabsWithActionsExample);
