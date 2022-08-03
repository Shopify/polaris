import {
  List,
  Button,
  Page,
  Card,
  Sheet,
  Heading,
  Scrollable,
  ChoiceList,
} from "@shopify/polaris";
import { MobileCancelMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function SheetExample() {
  const [sheetActive, setSheetActive] = useState(true);
  const [title, setTitle] = useState("Big yellow socks");
  const [description, setDescription] = useState(
    "They’re big, yellow socks. What more could you possibly want from socks? These socks will change your life.\n\nThey’re made from light, hand-loomed cotton that’s so soft, you'll feel like you are walking on a cloud."
  );
  const [salesChannels, setSalesChannels] = useState([
    { value: "onlineStore", label: "Online Store" },
    { value: "facebook", label: "Facebook" },
    { value: "googleShopping", label: "Google shopping" },
    { value: "facebookMarketing", label: "Facebook Marketing" },
  ]);
  const [selected, setSelected] = useState([]);

  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    []
  );
  const handleSelectedChange = useCallback((value) => setSelected(value), []);
  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleDescriptionChange = useCallback(
    (value) => setDescription(value),
    []
  );

  const selectedSalesChannels = selected.map((key) => {
    return salesChannels.reduce((accumulator, current) => {
      accumulator[current.value] = current.label;
      return accumulator;
    }, {})[key];
  });
  const hasSelectedSalesChannels = selectedSalesChannels.length > 0;

  const salesChannelsCardMarkup = hasSelectedSalesChannels ? (
    <List>
      {selectedSalesChannels.map((channel, index) => (
        <List.Item key={index}>{channel}</List.Item>
      ))}
    </List>
  ) : (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
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
          content: "Manage sales channels",
        },
      ]
    : null;

  return (
    <Page narrowWidth>
      <Card
        sectioned
        subdued
        title="Product availability"
        actions={salesChannelAction}
      >
        {salesChannelsCardMarkup}
      </Card>
      <Sheet
        open={sheetActive}
        onClose={toggleSheetActive}
        accessibilityLabel="Manage sales channels"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              borderBottom: "1px solid #DFE3E8",
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              width: "100%",
            }}
          >
            <Heading>Manage sales channels</Heading>
            <Button
              accessibilityLabel="Cancel"
              icon={MobileCancelMajor}
              onClick={toggleSheetActive}
              plain
            />
          </div>
          <Scrollable style={{ padding: "1rem", height: "100%" }}>
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
              alignItems: "center",
              borderTop: "1px solid #DFE3E8",
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              width: "100%",
            }}
          >
            <Button onClick={toggleSheetActive}>Cancel</Button>
            <Button primary onClick={toggleSheetActive}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </Page>
  );
}

export default withPolarisExample(SheetExample);
