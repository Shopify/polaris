import {Button, Popover, ActionList} from '@shopify/polaris';
import {ArchiveIcon, DuplicateIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ActionListWithMediaExample() {
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
            {content: 'Duplicate', icon: DuplicateIcon},
            {content: 'Archive', icon: ArchiveIcon},
          ]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(ActionListWithMediaExample);
