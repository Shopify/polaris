---
name: Modal
category: Overlays
keywords:
  - modal
  - src
  - open
  - title
  - width
  - height
  - primary action
  - secondary action
  - footer
  - instant
  - sectioned
  - large
  - limit height
  - loading
  - outer wrapper
  - iframe
  - overlay
  - easdk
  - embedded app
---

# Modal

Modals are overlays that prevent merchants from interacting with the rest of the application until a specific action is taken. They can be disruptive because they require merchants to take an action before they can continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.

---

## Content guidelines

### Title

Titles should be:

* Informative and descriptive
  * They should label the type of content grouped in the modal
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep headings to single sentence and avoid using punctuation such as periods, commas, or semicolons
  * Avoid articles (the, a, an) in [microcopy headings](/content/grammar-and-mechanics#section-headings-and-subheadings) to keep content short and actionable
  * Written in sentence case (first word capitalized, the rest is lowercase)

<!-- usagelist -->

#### Do

Edit email address

#### Don’t

Edit the email address for this order

<!-- end -->

### Body content

Body content should be:

* Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

Notification emails will be sent to this address.

#### Don’t

You can edit the email address where emails will be sent.

<!-- end -->

* Structured for merchant success: always put the most critical information first.
* Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Primary and secondary actions

Actions should be:

* Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->

#### Do

* Create order
* Buy shipping label

#### Don’t

* New order
* Buy

<!-- end -->

* Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

* Activate Apple Pay
* View shipping settings

#### Don’t

* Try Apple Pay
* View your settings

<!-- end -->

* Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

### Footer

Body content should be:

* Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

Notification emails will be sent to this address.

#### Don’t

You can edit the email address where emails will be sent.

<!-- end -->

* Structured for merchant success: always put the most critical information first.
* Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

## Examples

### Basic modal

A basic modal

```jsx
class ModalExample extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}
```

### Modal with primary action

Use to let merchants take a key action

```jsx
const DISCOUNT_LINK = 'https://polaris.shopify.com/';

class ModalExample extends React.Component {
  state = {
    active: false,
  };

  node = null;

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.toggleModal}>Open</Button>
        <Modal
          open={active}
          onClose={this.toggleModal}
          title="Get a shareable link"
          primaryAction={{
            content: 'Close',
            onAction: this.toggleModal,
          }}
        >
          <Modal.Section>
            <Stack>
              <Stack.Item>
                <TextContainer>
                  <p>
                    You can share this discount link with your customers via
                    email or social media. Your discount will be automatically
                    applied at checkout.
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item fill>
                <TextField
                  ref={this.bindNode}
                  label=""
                  onFocus={this.handleFocus}
                  value={DISCOUNT_LINK}
                  onChange={() => {}}
                />
              </Stack.Item>
              <Stack.Item>
                <Button primary onClick={this.handleClick}>
                  Copy link
                </Button>
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleClick = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.focus();
  };

  handleFocus = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.select();
    document.execCommand('copy');
  };

  toggleModal = () => {
    this.setState(({active}) => ({active: !active}));
  };

  bindNode = (node) => {
    if (node == null) {
      return;
    }
    this.node = node;
  };
}
```

### Modal with primary and secondary actions

Use to let merchants take key actions at the bottom of the modal.

```jsx
const CURRENT_PAGE = 'current_page';
const ALL_CUSTOMERS = 'all_customers';
const SELECTED_CUSTOMERS = 'selected_customers';
const CSV_EXCEL = 'csv_excel';
const CSV_PLAIN = 'csv_plain';

class ModalExample extends React.Component {
  state = {
    active: false,
    selectedExport: [],
    selectedExportAs: [],
  };

  render() {
    const {active, selectedExport, selectedExportAs} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleModalChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleClose}
          title="Export customers"
          primaryAction={{
            content: 'Export customers',
            onAction: this.handleClose,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: this.handleClose,
            },
          ]}
        >
          <Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <ChoiceList
                  title={'Export'}
                  choices={[
                    {label: 'Current page', value: CURRENT_PAGE},
                    {label: 'All customers', value: ALL_CUSTOMERS},
                    {label: 'Selected customers', value: SELECTED_CUSTOMERS},
                  ]}
                  selected={selectedExport}
                  onChange={this.handleCheckboxChange('selectedExport')}
                />
              </Stack.Item>
              <Stack.Item>
                <ChoiceList
                  title={'Export as'}
                  choices={[
                    {
                      label:
                        'CSV for Excel, Numbers, or other spreadsheet programs',
                      value: CSV_EXCEL,
                    },
                    {label: 'Plain CSV file', value: CSV_PLAIN},
                  ]}
                  selected={selectedExportAs}
                  onChange={this.handleCheckboxChange('selectedExportAs')}
                />
              </Stack.Item>
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleModalChange = () => {
    this.setState(({active}) => ({active: !active}));
  };

  handleClose = () => {
    this.setState(({active}) => ({
      active: !active,
      selectedExport: [],
      selectedExportAs: [],
    }));
  };

  handleCheckboxChange = (key) => {
    return (value) => this.setState({[key]: value});
  };
}
```

### Large modal

Use when you need to increase your modal width

```jsx
class ModalExample extends React.Component {
  state = {
    active: false,
    checked: false,
  };

  render() {
    const {active, checked} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          large
          open={active}
          onClose={this.handleChange}
          title="Import customers by CSV"
          primaryAction={{
            content: 'Import customers',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: this.handleChange,
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
                onChange={this.handleCheckbox}
              />
            </Stack>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };

  handleCheckbox = (value) => {
    this.setState({checked: value});
  };
}
```

---

## Related components

* To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](/components/behavior/collapsible) to expand content in place within the page
* To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](/components/popover)
* To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](/components/feedback-indicators/banner)
