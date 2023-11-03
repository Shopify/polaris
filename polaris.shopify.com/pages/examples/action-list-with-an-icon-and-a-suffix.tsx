import {Button, Popover, ActionList, Icon} from '@shopify/polaris';
import {Import, TickSmall, Export} from '@shopify/polaris-icons';
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
              icon: Import,
              suffix: <Icon source={TickSmall} />,
            },
            {content: 'Export file', icon: Export},
          ]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(ActionListWithSuffixExample);
