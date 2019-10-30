---
name: Sheet
category: Overlays
platforms:
  - web
keywords:
  - sheet
  - modal
  - open
  - title
  - overlay
  - drawer
  - dialog
  - web
fullSizeExamples: true
---

# Sheet

A sheet is a large container that enters from the edge of the screen when triggered by the merchant. It’s used to provide merchants with actions and information contextual to the page. It doesn’t interrupt their flow like a modal.

---

## Accessibility

Sheets provide an opportunity to let merchants dig into more detail on their current task, or access information for their current task in a different way. Although merchants may be able to see content in the sheet and the main page content at the same time, they should only be expected to interact with one or the other at any given time.

### Keyboard support

- Use the `onClose` prop so that the sheet can be closed with the <kbd>esc</kbd> key as well as with button-based controls
- Use a button to open the sheet
- When the sheet opens, focus moves to it so merchants who rely on the keyboard and screen readers can access it
- Focus is kept in the sheet until it is dismissed
- When the sheet closes, focus moves back to the button that launched it

---

## Responsive behavior

At small screen sizes, the sheet component enters the page from the bottom of the screen. At larger screen sizes, the sheet component enters the page from the right side of the scren.

---

## Best practices

The sheet component should:

- Include a heading that summarizes the actions and information in the sheet, for example, More filters
- Be openable through clear actions, like a link or button
- Be close-able through clear actions, like Done, the [X] button, and the esc key
- Include information and actions contextual to the current task
- Not block merchants from completing their task, like a modal would
- Not open from within another sheet (only one sheet can be open at a time)
- Preserve its state—the settings and actions won’t reset when it’s closed

The sheet component is best used in cases where the merchant needs to see elements behind it, and for that reason it uses a transparent backdrop. The backdrop is a full screen overlay which closes its parent component when pressed.

---

## Examples

### Basic sheet

<!-- example-for: web -->

Use as the default option for a sheet.

```jsx
function SheetExample() {
  const [sheetActive, setSheetActive] = useState(true);
  const [title, setTitle] = useState('Big yellow socks');
  const [description, setDescription] = useState(
    "They’re big, yellow socks. What more could you possibly want from socks? These socks will change your life.\n\nThey’re made from light, hand-loomed cotton that’s so soft, you'll feel like you are walking on a cloud.",
  );
  const [salesChannels, setSalesChannels] = useState([
    {value: 'onlineStore', label: 'Online Store'},
    {value: 'facebook', label: 'Facebook'},
    {value: 'googleShopping', label: 'Google shopping'},
    {value: 'facebookMarketing', label: 'Facebook Marketing'},
  ]);
  const [selected, setSelected] = useState([]);

  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    [],
  );
  const handleSelectedChange = useCallback((value) => setSelected(value), []);
  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleDescriptionChange = useCallback(
    (value) => setDescription(value),
    [],
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
      <Sheet open={sheetActive} onClose={toggleSheetActive}>
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
              padding: '1.6rem',
              width: '100%',
            }}
          >
            <Heading>Manage sales channels</Heading>
            <Button
              accessibilityLabel="Cancel"
              icon={MobileCancelMajorMonotone}
              onClick={toggleSheetActive}
              plain
            />
          </div>
          <Scrollable style={{padding: '1.6rem', height: '100%'}}>
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
              padding: '1.6rem',
              width: '100%',
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
```

---

## Related components

- To offer an action before merchants can go to the next step in the flow, use the [modal component](https://polaris.shopify.com/components/overlays/modal)
- To present a small amount of content or a menu of actions in a non-blocking overlay, use the [popover component](https://polaris.shopify.com/components/overlays/popover)
