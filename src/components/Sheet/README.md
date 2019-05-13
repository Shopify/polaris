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

## Required components

The sheet component must be wrapped in the [frame](/components/structure/frame) component.

---

## Use in an embedded application

Use of the sheet component in an embedded application is not currently supported. If this is a feature you would like to see supported by Shopify App Bridge, let us know in the [forums](https://community.shopify.com/c/Shopify-APIs-SDKs/bd-p/shopify-apis-and-technology).

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
class SheetExample extends React.Component {
  state = {
    sheetActive: true,
    title: 'Big yellow socks',
    description:
      "They're big, yellow socks. What more could you possibly want from socks? These socks will change your life.\n\nThey're made from light, hand-loomed cotton that's so soft, you'll feel like you are walking on a cloud.",
    salesChannels: [
      {value: 'onlineStore', label: 'Online Store'},
      {value: 'facebook', label: 'Facebook'},
      {value: 'googleShopping', label: 'Google shopping'},
      {value: 'facebookMarketing', label: 'Facebook Marketing'},
    ],
    selected: [],
  };

  render() {
    const {
      state: {sheetActive, title, description, salesChannels, selected},
      handleCloseSheet,
      handleOpenSheet,
      handleChange,
      handleToggleSheet,
      hasSelectedSalesChannels,
      selectedSalesChannels,
    } = this;

    const theme = {
      colors: {
        topBar: {
          background: '#357997',
        },
      },
      logo: {
        width: 124,
        topBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        url: 'http://jadedpixel.com',
        accessibilityLabel: 'Jaded Pixel',
      },
    };

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
        <Button onClick={handleToggleSheet}>Manage sales channels</Button>
      </div>
    );

    const salesChannelAction = hasSelectedSalesChannels
      ? [
          {
            onAction: handleOpenSheet,
            content: 'Manage sales channels',
          },
        ]
      : null;

    return (
      <div style={{maxHeight: '640px', overflow: 'visible'}}>
        <AppProvider theme={theme}>
          <Frame topBar={<TopBar />}>
            <Page singleColumn title="Big yellow socks">
              <Card sectioned>
                <FormLayout>
                  <TextField
                    label="Title"
                    onChange={handleChange('title')}
                    value={title}
                    readOnly
                  />
                  <TextField
                    label="Description"
                    onChange={handleChange('description')}
                    value={description}
                    multiline
                  />
                </FormLayout>
              </Card>
              <Card
                sectioned
                subdued
                title="Product availability"
                actions={salesChannelAction}
              >
                {salesChannelsCardMarkup}
              </Card>
              <Sheet open={sheetActive} onClose={handleCloseSheet}>
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
                      icon="cancel"
                      onClick={handleCloseSheet}
                      plain
                    />
                  </div>
                  <Scrollable style={{padding: '1.6rem', height: '100%'}}>
                    <ChoiceList
                      name="salesChannelsList"
                      choices={salesChannels}
                      selected={selected}
                      allowMultiple
                      onChange={handleChange('selected')}
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
                    <Button onClick={handleCloseSheet}>Cancel</Button>
                    <Button primary onClick={handleCloseSheet}>
                      Done
                    </Button>
                  </div>
                </div>
              </Sheet>
            </Page>
          </Frame>
        </AppProvider>
      </div>
    );
  }

  handleOpenSheet = () => {
    this.setState({sheetActive: true});
  };

  handleCloseSheet = () => {
    this.setState({sheetActive: false});
  };

  handleToggleSheet = () => {
    const {
      state: {sheetActive},
      handleCloseSheet,
      handleOpenSheet,
    } = this;

    sheetActive ? handleCloseSheet() : handleOpenSheet();
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

  get hasSelectedSalesChannels() {
    return this.selectedSalesChannels.length > 0;
  }

  get selectedSalesChannels() {
    const {salesChannels, selected} = this.state;

    return selected.map((key) => {
      return salesChannels.reduce((accumulator, current) => {
        accumulator[current.value] = current.label;
        return accumulator;
      }, {})[key];
    });
  }
}
```

---

## Related components

- To offer an action before merchants can go to the next step in the flow, use the [modal component](/components/overlays/modal)
- To present a small amount of content or a menu of actions in a non-blocking overlay, use the [popover component](/components/overlays/popover)
