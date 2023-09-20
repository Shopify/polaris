import {
  Button,
  Modal,
  LegacyStack,
  DropZone,
  Checkbox,
  Frame,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SmallModalExample() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value: boolean) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          size="small"
          activator={activator}
          open={active}
          onClose={toggleActive}
          title="Import customers by CSV"
          primaryAction={{
            content: 'Import customers',
            onAction: toggleActive,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleActive,
            },
          ]}
        >
          <Modal.Section>
            <LegacyStack vertical>
              <DropZone
                accept=".csv"
                errorOverlayText="File type must be .csv"
                type="file"
                onDrop={() => {}}
              >
                <DropZone.FileUpload />
              </DropZone>
              <Checkbox
                checked={checked}
                label="Overwrite existing customers that have the same email or phone"
                onChange={handleCheckbox}
              />
            </LegacyStack>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

export default withPolarisExample(SmallModalExample);
