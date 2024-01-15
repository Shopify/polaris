import {
  List,
  Button,
  Page,
  LegacyCard,
  Sheet,
  Scrollable,
  ChoiceList,
  Text,
} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function SheetExample() {
  const [sheetActive, setSheetActive] = useState(true);

  const [salesChannels] = useState([
    {value: 'onlineStore', label: 'Online Store'},
    {value: 'facebook', label: 'Facebook'},
    {value: 'googleShopping', label: 'Google shopping'},
    {value: 'facebookMarketing', label: 'Facebook Marketing'},
  ]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    [],
  );
  const handleSelectedChange = useCallback(
    (value: string[]) => setSelected(value),
    [],
  );

  let selectedSalesChannels: {value: string; label: string}[] = [];
  selected.forEach((selection) => {
    salesChannels.forEach((channel) => {
      if (channel.value === selection) {
        selectedSalesChannels.push(channel);
      }
    });
  });

  const hasSelectedSalesChannels = selectedSalesChannels.length > 0;

  const salesChannelsCardMarkup = hasSelectedSalesChannels ? (
    <List>
      {selectedSalesChannels.map((channel, index) => (
        <List.Item key={index}>{channel.label}</List.Item>
      ))}
    </List>
  ) : (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <p>No sales channels selected</p>
      <Button onClick={toggleSheetActive}>Manage sales channels</Button>
    </div>
  );

  const salesChannelAction = hasSelectedSalesChannels
    ? [
        {
          onAction: toggleSheetActive,
          content: 'Manage sales channels',
        },
      ]
    : undefined;

  return (
    <Page narrowWidth>
      <LegacyCard
        sectioned
        subdued
        title="Product availability"
        actions={salesChannelAction}
      >
        {salesChannelsCardMarkup}
      </LegacyCard>
      <Sheet
        open={sheetActive}
        onClose={toggleSheetActive}
        accessibilityLabel="Manage sales channels"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              borderBottom: '1px solid #DFE3E8',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              width: '100%',
            }}
          >
            <Text variant="headingMd" as="h2">
              Manage sales channels
            </Text>
            <Button
              accessibilityLabel="Cancel"
              icon={XIcon}
              onClick={toggleSheetActive}
              variant="plain"
            />
          </div>
          <Scrollable style={{padding: '1rem', height: '100%'}}>
            <ChoiceList
              title="Select a sales channel"
              name="salesChannelsList"
              choices={salesChannels}
              selected={selected}
              titleHidden
              allowMultiple
              onChange={handleSelectedChange}
            />
          </Scrollable>
          <div
            style={{
              alignItems: 'center',
              borderTop: '1px solid #DFE3E8',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              width: '100%',
            }}
          >
            <Button onClick={toggleSheetActive}>Cancel</Button>
            <Button variant="primary" onClick={toggleSheetActive}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </Page>
  );
}

export default withPolarisExample(SheetExample);
