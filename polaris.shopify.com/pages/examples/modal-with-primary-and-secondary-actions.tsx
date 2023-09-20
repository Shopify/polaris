import {Button, Modal, LegacyStack, ChoiceList, Frame} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ModalWithPrimaryAndSecondaryActionsExample() {
  const CURRENT_PAGE = 'current_page';
  const ALL_CUSTOMERS = 'all_customers';
  const SELECTED_CUSTOMERS = 'selected_customers';
  const CSV_EXCEL = 'csv_excel';
  const CSV_PLAIN = 'csv_plain';

  const [active, setActive] = useState(true);
  const [selectedExport, setSelectedExport] = useState<string[]>([]);
  const [selectedExportAs, setSelectedExportAs] = useState<string[]>([]);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    handleSelectedExport([]);
    handleSelectedExportAs([]);
  };

  const handleSelectedExport = useCallback(
    (value: string[]) => setSelectedExport(value),
    [],
  );

  const handleSelectedExportAs = useCallback(
    (value: string[]) => setSelectedExportAs(value),
    [],
  );

  const activator = <Button onClick={handleModalChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          onClose={handleClose}
          title="Export customers"
          primaryAction={{
            content: 'Export customers',
            onAction: handleClose,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleClose,
            },
          ]}
        >
          <Modal.Section>
            <LegacyStack vertical>
              <LegacyStack.Item>
                <ChoiceList
                  title="Export"
                  choices={[
                    {label: 'Current page', value: CURRENT_PAGE},
                    {label: 'All customers', value: ALL_CUSTOMERS},
                    {label: 'Selected customers', value: SELECTED_CUSTOMERS},
                  ]}
                  selected={selectedExport}
                  onChange={handleSelectedExport}
                />
              </LegacyStack.Item>
              <LegacyStack.Item>
                <ChoiceList
                  title="Export as"
                  choices={[
                    {
                      label:
                        'CSV for Excel, Numbers, or other spreadsheet programs',
                      value: CSV_EXCEL,
                    },
                    {label: 'Plain CSV file', value: CSV_PLAIN},
                  ]}
                  selected={selectedExportAs}
                  onChange={handleSelectedExportAs}
                />
              </LegacyStack.Item>
            </LegacyStack>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

export default withPolarisExample(ModalWithPrimaryAndSecondaryActionsExample);
