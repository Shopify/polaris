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
  - tertiary action
  - destructive action
  - footer
  - instant
  - sectioned
  - large
  - small
  - limit height
  - loading
  - outer wrapper
  - iframe
  - overlay
  - dialog
  - alert
---

# Modal

Modals are overlays that require merchants to take an action before they can continue interacting with the rest of Shopify. They can be disruptive and should be used thoughtfully and sparingly.

---

## Best practices

Use modals for confirmations and conditional changes. They should be thought of as temporary and not be used for information or actions that need to live on in the UI in a persistent way. Don’t use modals to display complex forms or large amounts of information.

Modals should:

- Require that merchants take an action.
- Close when merchants press the `X` button, the `Cancel` button, the <kbd>Esc</kbd> key, or when merchants click or tap the area outside the modal.
- Not have more than two buttons (primary and secondary) at the bottom. This prevents unclear action hierarchy and crowding on mobile screens. Since modals are for focused tasks, they should have focused actions. In some cases however, a [tertiary action](#tertiary-actions) may be appropriate.

---

## Content guidelines

### Title

Modal titles should:

- Use a clear {verb}+{noun} question or statement
- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings)

<!-- dodont -->

#### Do

- Edit email address
- Delete customer?
- Discard unsaved changes?

#### Don’t

- Edit the email address for this order
- Are you sure you want to delete customer?
- Discard?

<!-- end -->

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- dodont -->

#### Do

- Notification emails will be sent to this address.
- This can’t be undone.

#### Don’t

- You can edit the email address where emails will be sent.
- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? You cannot reverse this.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- dodont -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Primary and secondary actions

Actions should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- dodont -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- dodont -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- dodont -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

### Tertiary actions

Tertiary actions should:

- Only be used when the action requires the context of the content in the modal
- Never be used to dismiss the modal

<!-- dodont -->

#### Do

- Use a plain button for a tertiary action if needed
  ![Screenshot of modal with a plain button as a tertiary action](/images/components/modal/do-use-plain-button-for-tertiary-action@2x.png)

#### Don’t

- Use a tertiary action for a destructive action
  ![Screenshot of modal with a destructive button as a tertiary action](/images/components/modal/dont-use-destructive-tertiary-action@2x.png)

<!-- end -->

### Footer

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- dodont -->

#### Do

- Notification emails will be sent to this address.

#### Don’t

- You can edit the email address where emails will be sent.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- dodont -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

---

## Examples

### Default

Use as the default option for a modal.

```jsx
function ModalExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
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
```

### With primary action

Use to let merchants take a key action.

```jsx
function ModalWithPrimaryActionExample() {
  const discountLink = 'https://polaris.shopify.com/';

  const [active, setActive] = useState(true);
  const node = useRef(null);

  const handleClick = useCallback(() => {
    node.current && node.current.input.focus();
  }, []);

  const handleFocus = useCallback(() => {
    if (node.current == null) {
      return;
    }
    node.current.input.select();
    document.execCommand('copy');
  }, []);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={toggleModal}
        title="Get a shareable link"
        primaryAction={{
          content: 'Close',
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
              <TextContainer>
                <p>
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
                </p>
              </TextContainer>
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                ref={node}
                label="Discount link"
                onFocus={handleFocus}
                value={discountLink}
                onChange={() => {}}
                autoComplete="off"
                connectedRight={
                  <Button primary onClick={handleClick}>
                    Copy link
                  </Button>
                }
              />
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
```

### With primary and secondary actions

Use to let merchants take key actions at the bottom of the modal.

```jsx
function ModalWithPrimaryAndSecondaryActionsExample() {
  const currentPage = 'current_page';
  const allCustomers = 'all_customers';
  const selectedCustomers = 'selected_customers';
  const csvExcel = 'csv_excel';
  const csvPlain = 'csv_plain';

  const [active, setActive] = useState(true);
  const [selectedExport, setSelectedExport] = useState([]);
  const [selectedExportAs, setSelectedExportAs] = useState([]);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    handleSelectedExport([]);
    handleSelectedExportAs([]);
  };

  const handleSelectedExport = useCallback(
    (value) => setSelectedExport(value),
    [],
  );

  const handleSelectedExportAs = useCallback(
    (value) => setSelectedExportAs(value),
    [],
  );

  const activator = <Button onClick={handleModalChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
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
          <Stack vertical>
            <Stack.Item>
              <ChoiceList
                title="Export"
                choices={[
                  {label: 'Current page', value: currentPage},
                  {label: 'All customers', value: allCustomers},
                  {label: 'Selected customers', value: selectedCustomers},
                ]}
                selected={selectedExport}
                onChange={handleSelectedExport}
              />
            </Stack.Item>
            <Stack.Item>
              <ChoiceList
                title="Export as"
                choices={[
                  {
                    label:
                      'CSV for Excel, Numbers, or other spreadsheet programs',
                    value: csvExcel,
                  },
                  {label: 'Plain CSV file', value: csvPlain},
                ]}
                selected={selectedExportAs}
                onChange={handleSelectedExportAs}
              />
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
```

### Large

Use when you need to increase the width of your modal.

```jsx
function LargeModalExample() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        large
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
```

### Small

Use when you need to decrease the width of your modal.

```jsx
function SmallModalExample() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

  const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        small
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
```

### Without a title

A title is required for accessibility, but you may hide it.

```jsx
function ModalWithoutTitleExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        title="Reach more shoppers with Instagram product tags"
        titleHidden
        activator={activator}
        open={active}
        onClose={handleChange}
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section titleHidden>
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
```

### With scroll listener

Use to implement infinite scroll of modal content.

```jsx
function ModalWithScrollListenerExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleScrollBottom = useCallback(
    () => console.log('Scrolled to bottom'),
    [],
  );

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        title="Scrollable content"
        onClose={handleChange}
        onScrolledToBottom={handleScrollBottom}
      >
        {Array.from({length: 50}, (_, index) => (
          <Modal.Section key={index}>
            <TextContainer>
              <p>
                Item <a href="#Content">#{index}</a>
              </p>
            </TextContainer>
          </Modal.Section>
        ))}
      </Modal>
    </div>
  );
}
```

### With activator ref

Provide an activator ref when it’s more convenient than providing an element. This ensures proper focus management when closing the modal. See the [accessibility features of a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for more information regarding focus.

```jsx
function ModalExample() {
  const [active, setActive] = useState(true);

  const buttonRef = useRef(null);

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const activator = (
    <div ref={buttonRef}>
      <Button onClick={handleOpen}>Open</Button>
    </div>
  );

  return (
    <div style={{height: '500px'}}>
      {activator}
      <Modal
        activator={buttonRef}
        open={active}
        onClose={handleClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleClose,
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
```

### Without an activator prop

Use an external activator when technical limitations prevent you from passing the activator as an element or a ref. Make sure to focus the activator on close when choosing this approach. See the [accessibility features of a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for more information regarding focus.

```jsx
function ModalExample() {
  const [active, setActive] = useState(true);

  const button = useRef();

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => button.current.querySelector('button').focus());
  }, []);

  return (
    <div style={{height: '500px'}}>
      <div ref={button}>
        <Button onClick={handleOpen}>Open</Button>
      </div>
      <Modal
        instant
        open={active}
        onClose={handleClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleClose,
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
```

---

## Related components

- To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](https://polaris.shopify.com/components/collapsible) to expand content in place within the page
- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/banner)

---

## Accessibility

- Modals use ARIA `role=”dialog”` to convey to screen reader users that they work like native dialog windows.
- If you set the `title` prop to give the modal component a heading, then the `title` is used to label the dialog element with `aria-labelledby`. This helps to convey the purpose of the modal to screen reader users when it displays.
- After a modal is closed, in order to return focus to the button that launched it, pass the button to the modal as an `activator`.

### Keyboard support

- When a modal opens, focus moves automatically to the modal container so it can be accessed by keyboard users
- While the modal is open, keyboard focus shouldn’t leave the modal
- Merchants can dismiss the modal with the keyboard by activating the `X` button, the `Cancel` button if one is provided, or by pressing the <kbd>Esc</kbd> key
- After a modal is closed, focus returns to the button that launched it
