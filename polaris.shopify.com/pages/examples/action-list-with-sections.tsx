import {Button, Popover, ActionList} from '@shopify/polaris';
import {
  ImportIcon,
  ExportIcon,
  EditIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

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
                {content: 'Import file', icon: ImportIcon},
                {content: 'Export file', icon: ExportIcon},
              ],
            },
            {
              title: 'Bulk actions',
              items: [
                {content: 'Edit', icon: EditIcon},
                {content: 'Delete', icon: DeleteIcon, destructive: true},
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}

export default withPolarisExample(SectionedActionListExample);
