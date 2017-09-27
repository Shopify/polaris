---
name: Popover
category: Overlays
keywords:
  - interactive
  - container
  - dropdown
  - drop down
  - drop-down
  - popover
  - pop over
  - menu
  - fly out
  - select
  - action list
  - menu
  - context menu
  - popover with form components
  - popover with action list
  - popover with content and actions
---

# Popover

Popovers are small overlays that open on demand, usually when the merchant clicks a button. They let merchants access supplementary content and actions without cluttering the page.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

There are lots of different paths a merchant can take and listing them all out in the interface would make the experience feel overwhelming and cluttered.

### Solution

Popovers allow merchants to expose and hide additional information and actions when they’re ready to explore them. Popovers show next to the button that triggers them, so they demand minimal shift in merchant attention.

---

## Best practices

Popovers should:

- Always show next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until the merchant hits the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button

---

## Content guidelines

### Popover content

If the menu items in a popover menu include a series of actions, each item should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive a merchant by mislabeling an action.

<!-- usagelist -->
#### Do
- Create order
- Buy shipping label

#### Don’t
- New order
- Buy
<!-- end -->

- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->
#### Do
- Rename
- Edit HTML
- Duplicate

#### Don’t
- HTML editing options
- File name changes
- Duplicate this order so that you can make edits, updates, or changes
<!-- end -->

- Be scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->
#### Do
Add menu item

#### Don’t
Add a menu item
<!-- end -->

If the menu items in a popover menu include a series of navigational links, each item should:

- Be concise but still give the merchant enough information so they can easily find and accurately navigate to the path they want.

<!-- usagelist -->
#### Do
- Online store
- Messenger
- Facebook
- Buy Button

#### Don’t
- Sales channel
<!-- end -->

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| children | React.ReactNode | The content to display inside the popover |
| fullWidth | boolean | If true, the popover will stretch to the full width of it's activator |
| preferredPosition | enum['above', 'below'] | The preferred direction to open the popover |
| active | boolean | Show or hide the Popover |
| activator | React.ReactElement | The element to activate the Popover |
| activatorWrapper | string | The element type to wrap the activator with |
| preventAutofocus | boolean | Prevent automatic focus of the first field on activation |
| sectioned | boolean | Automatically add wrap content in a section |
| onClose | function(source: React.ReactElement) | Callback when popover is closed |

## Examples

###  Popover with action list

Use when presenting a set of actions in a disclosable menu.

```jsx
<Popover
  active
  activator={<Button>More actions</Button>}
>
  <ActionList
    items={[
      {content: 'Import'},
      {content: 'Export'},
    ]}
  />
</Popover>
```


###  Popover with content and actions

Use to present a combination of content, instructions, and actions is a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming merchants.

```jsx
<Popover
  active
  activator={<Button>Sales channels</Button>}
>
  <Popover.Pane fixed>
    <Popover.Section>
      <p>Available sales channels</p>
    </Popover.Section>
  </Popover.Pane>
  <Popover.Pane>
    <ActionList
      items={[
        {content: 'Online store'},
        {content: 'Facebook'},
        {content: 'Shopify POS'},
      ]}
    />
  </Popover.Pane>
</Popover>
```

###  Popover with form components

Use to present secondary input tasks on demand.

```jsx
<Popover
  active
  activator={<Button>April 20–21, 2017</Button>}
  sectioned
>
  <FormLayout>
    <Select label="Date range" options={['Custom']} />

    <FormLayout.Group condensed>
      <TextField label="Starting" value="2017-04-20" />
      <TextField label="Ending" value="2017-04-21" />
    </FormLayout.Group>
  </FormLayout>
</Popover>
```

---

## Related components

* To put a list of actions in a popover, [use the action list component](/components/actions/action-list)
* To group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and take action on, [use the card component](/components/structure/card)
