import {
  Button,
  Modal,
  AlphaStack,
  Inline,
  Text,
  Link,
  Checkbox,
  DropZone,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function WithActionsAndCustomFooterContent() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        open
        activator={activator}
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
        footer={
          <Inline align="start">
            <Link>Need help importing customers?</Link>
          </Inline>
        }
      >
        <Modal.Section>
          <AlphaStack gap="5">
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
          </AlphaStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default withPolarisExample(WithActionsAndCustomFooterContent);
