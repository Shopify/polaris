import { Button, Modal, Stack, DropZone, Checkbox } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SmallModalExample() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{ height: "500px" }}>
      <Modal
        small
        activator={activator}
        open={active}
        onClose={toggleActive}
        title="Import customers by CSV"
        primaryAction={{
          content: "Import customers",
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
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
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default withPolarisExample(SmallModalExample);
