'use client';

import {Button, Popover, ActionList} from '@shopify/polaris';
import {
  ImportMinor,
  ExportMinor,
  EditMinor,
  DeleteMinor,
} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function SectionedActionListExample() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {content: 'Import file', icon: ImportMinor},
                {content: 'Export file', icon: ExportMinor},
              ],
            },
            {
              title: 'Bulk actions',
              items: [
                {content: 'Edit', icon: EditMinor},
                {content: 'Delete', icon: DeleteMinor},
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(SectionedActionListExample);
