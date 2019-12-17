---
name: Page actions
category: Structure
keywords:
  - PageActions
  - bottom of page actions
  - bottom page actions
  - primary action
  - primary page actions
  - default page actions
  - save delete actions
  - save actions
  - delete actions
---

# Page actions

Page actions let merchants take key actions at the bottom of specific pages in the interface. This is important because sometimes the primary call to action is hard to access when merchants are at the bottom of a page.

---

## Best practices

Page actions should:

- Include a single primary action on the right. It should be the same as the primary action that shows in the title bar at the top of the page.
- Include a maximum of two secondary actions, but doesn’t have to include any secondary actions.

---

## Content guidelines

### Call to action buttons

Buttons should be:

- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

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

---

## Examples

### Default page actions

Used on a resource page (such as an individual order or product page) to let merchants take key actions at the bottom of the page. Usually, the primary action is Save and the secondary action is Delete.

```jsx
<PageActions
  primaryAction={{
    content: 'Save',
  }}
  secondaryActions={[
    {
      content: 'Delete',
      destructive: true,
    },
  ]}
/>
```

### Primary action only

Not all page actions require a secondary action.

```jsx
<PageActions
  primaryAction={{
    content: 'Save',
  }}
/>
```

---

## Related components

- To add actions to the top of a page, see the [page component’s](https://polaris.shopify.com/components/structure/page) action props
- To create a call to action within the context of other page content, use the [button component](https://polaris.shopify.com/components/actions/button)
- To let merchants move through a collection of items that spans multiple pages, see the [pagination component](https://polaris.shopify.com/components/navigation/pagination)
