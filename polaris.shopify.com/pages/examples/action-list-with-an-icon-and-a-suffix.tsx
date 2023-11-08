import {Button, Popover, ActionList, Icon} from '@shopify/polaris';
import {ImportMinor, TickSmallMinor, ExportMinor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ActionListWithSuffixExample() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '200px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              active: true,
              content: 'Import file',
              icon: ImportMinor,
              suffix: <Icon source={TickSmallMinor} />,
            },
            {content: 'Export file', icon: ExportMinor},
          ]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(ActionListWithSuffixExample);
