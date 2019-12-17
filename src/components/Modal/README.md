---
name: Modal
category: Overlays
platforms:
  - android
  - ios
  - web
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
  - limit height
  - loading
  - outer wrapper
  - iframe
  - overlay
  - dialog
  - alert
  - android
  - ios
---

# Modal

Modals are overlays that prevent merchants from interacting with the rest of the application until a specific action is taken. They can be disruptive because they require merchants to take an action before they can continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.

---

## Use in an embedded application (deprecated)

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the modal component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

In an embedded application context, not all documented properties are available. Some properties are only available in stand-alone applications.

Properties that are available only in a stand-alone context are documented as `(stand-alone app use only)`. For instance the `children` property is documented as `(stand-alone app use only)`.

The following example shows the modal component in an embedded application context:

```jsx
function EmbeddedAppModalExample() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalOpen(false), []);

  return (
    <AppProvider apiKey="YOUR_API_KEY" i18n={{}} shopOrigin="YOUR_SHOP_ORIGIN">
      <Modal
        src="https://my-app.com/upgrade-to-retail-package"
        open={modalOpen}
        title="Upgrade your Shopify POS with the Retail Package"
        primaryAction={{
          content: 'Add Retail Package',
          onAction: handleModalClose,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleModalClose,
          },
        ]}
        onClose={handleModalClose}
      />
    </AppProvider>
  );
}
```

#### Deprecation rationale

As of v3.17.0, using `Modal` in an embedded app is deprecated. Support for this will be removed in v5.0 as the underlying Shopify App Bridge library will be removed from Polaris React. Learn more about the [deprecation rationale](https://github.com/Shopify/polaris-react/issues/814). Use [`Modal`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/modal) from [`@shopify/app-bridge-react`](https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components) instead.

---

## Best practices

Use modals when merchants must complete an action before they can continue with the main workflow. Avoid using modals to display complex forms or large amounts of information.

Modals should:

- Require that merchants take an action.
- Close when merchants press the `X` button, the `Cancel` button, or the <kbd>Esc</kbd> key, not when merchants click or tap the area outside the modal.
- Not have more than two buttons (primary and secondary) at the bottom. This prevents unclear action hierarchy and crowding on mobile screens. Since modals are for focused tasks, they should have focused actions. In some cases however, a [tertiary action](#tertiary-actions) may be appropriate.

---

## Content guidelines

### Title

Modal titles should:

- Use a clear {verb}+{noun} question or statement
- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings)

<!-- usagelist -->

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

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.
- This can’t be undone.

#### Don’t

- You can edit the email address where emails will be sent.
- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? You cannot reverse this.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

### Primary and secondary actions

Actions should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Activate Apple Pay
- View shipping settings

#### Don’t

- Try Apple Pay
- View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

<a name="tertiary-actions"></a>

### Tertiary actions

Tertiary actions should:

- Only be used when the action requires the context of the content in the modal
- Never be used to dismiss the modal

<!-- usagelist -->

#### Do

- Use a plain button for a tertiary action if needed
  ![Screenshot of modal with a plain button as a tertiary action](/public_images/components/Modal/do-use-plain-button-for-tertiary-action@2x.png)

#### Don’t

- Use a tertiary action for a destructive action
  ![Screenshot of modal with a destructive button as a tertiary action](/public_images/components/Modal/dont-use-destructive-tertiary-action@2x.png)

<!-- end -->

### Footer

Body content should be:

- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".

<!-- usagelist -->

#### Do

- Notification emails will be sent to this address.

#### Don’t

- You can edit the email address where emails will be sent.

<!-- end -->

- Structured for merchant success: always put the most critical information first.
- Clear: use the verb “need” to help merchants understand when they’re required to do something.

<!-- usagelist -->

#### Do

- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.

#### Don’t

- To buy a shipping label, you must enter the total weight of your shipment, including packaging.

<!-- end -->

---

## Examples

### Basic modal

<!-- example-for: web -->

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

### Modal with primary action

Use to let merchants take a key action.

```jsx
function ModalWithPrimaryActionExample() {
  const DISCOUNT_LINK = 'https://polaris.shopify.com/';

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
                value={DISCOUNT_LINK}
                onChange={() => {}}
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

<!-- content-for: android -->

![Modal with primary action on Android](/public_images/components/Modal/android/information@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Modal with primary action on iOS](/public_images/components/Modal/ios/information@2x.png)

<!-- /content-for -->

### Modal with primary and secondary actions

Use to let merchants take key actions at the bottom of the modal.

```jsx
function ModalWithPrimaryAndSecondaryActionsExample() {
  const CURRENT_PAGE = 'current_page';
  const ALL_CUSTOMERS = 'all_customers';
  const SELECTED_CUSTOMERS = 'selected_customers';
  const CSV_EXCEL = 'csv_excel';
  const CSV_PLAIN = 'csv_plain';

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
                  {label: 'Current page', value: CURRENT_PAGE},
                  {label: 'All customers', value: ALL_CUSTOMERS},
                  {label: 'Selected customers', value: SELECTED_CUSTOMERS},
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
                    value: CSV_EXCEL,
                  },
                  {label: 'Plain CSV file', value: CSV_PLAIN},
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

<!-- content-for: android -->

![Modal with primary and secondary actions on Android](/public_images/components/Modal/android/basic@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Modal with primary and secondary actions on iOS](/public_images/components/Modal/ios/basic@2x.png)

<!-- /content-for -->

### Large modal

<!-- example-for: web -->

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

### Modal without a title

<!-- example-for: web -->

We recommend you add a title to your modal, but you may leave it blank.

```jsx
function ModalWithoutTitleExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
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

### Modal with scroll listener

<!-- example-for: web -->

Use to implement infinite scroll of modal content.

```jsx
function ModalWithScrollListenerExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleScrollBottom = useCallback(() => alert('Scrolled to bottom'), []);

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
              <p>Item #{index}</p>
            </TextContainer>
          </Modal.Section>
        ))}
      </Modal>
    </div>
  );
}
```

### External activator

<!-- example-for: web -->

Use an external activator when technical limitations prevent you from passing it as a prop. Make sure to focus the activator on close when choosing this approach.
See the [accessibility features of a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for more information regarding focus.

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

### Warning modal

<!-- example-for: android, ios -->

Use to make it clear to the merchant that the action is potentially dangerous. Only use this option when the merchant is about to perform an action that can’t be undone or is difficult to undo.

<!-- content-for: android -->

![Warning modal on Android](/public_images/components/Modal/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Warning modal on iOS](/public_images/components/Modal/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](https://polaris.shopify.com/components/behavior/collapsible) to expand content in place within the page
- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/popover)
- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/feedback-indicators/banner)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

- Modals use ARIA `role=”dialog”` to convey to screen reader users that they work like native dialog windows.
- If you set the `title` prop to give the modal component a heading, then the `title` is used to label the dialog element with `aria-labelledby`. This helps to convey the purpose of the modal to screen reader users when it displays.
- After a modal is closed, in order to return focus to the button that launched it, pass the button to the modal as an `activator`.

### Keyboard support

- When a modal opens, focus moves automatically to the modal container so it can be accessed by keyboard users
- While the modal is open, keyboard focus shouldn’t leave the modal
- Merchants can dismiss the modal with the keyboard by activating the `X` button, the `Cancel` button if one is provided, or by pressing the <kbd>Esc</kbd> key
- After a modal is closed, focus returns to the button that launched it

<!-- /content-for -->
