---
name: Page
category: Structure
platforms:
  - android
  - ios
  - web
keywords:
  - page
  - breadcrumbs
  - view
  - title
  - titlebar
  - breadcrumbs
  - pagination
  - page with all header elements
  - page without primary action in header
  - page without pagination
  - full-width page
  - narrow-width page
  - page with action groups
  - outer wrapper
  - page actions
  - page layouts
  - android
  - ios
---

# Page

Use to build the outer wrapper of a page, including the page title and associated actions.

---

## Best practices

The page component should:

- Always provide a title for the page header.
- Always provide breadcrumbs when a page has a parent page.
- Be organized around a primary activity. If that primary activity is a single action, provide it as a primary button in the page header.
- Provide other page-level actions as secondary actions in the page header.
- When the page represents an object of a certain type, provide pagination links to the previous and next object of the same type.

---

## Content guidelines

### Title

Titles should:

- Describe the page in as few words as possible.
- Be the name of the object type (pluralized) when the page is a list of objects. For a list of orders, the page title should be “Orders”.
- Not be truncated.

### App icon

App icons should:

- Provide their app icon
- Only be provided for pages that are part of a Shopify app

### Breadcrumbs

The content of each breadcrumb link should be the title of the page to which it links.

### Page header actions

Page header action labels should be:

- Clear and predictable: merchants should be able to anticipate what will
  happen when they click a page action. Never deceive merchants by mislabeling an action.

- Action-led: they should always lead with a strong verb that encourages
  action. To provide enough context to merchants, use the {verb}+{noun} format.

<!-- usagelist -->

#### Do

- Create order
- View in Postmates

#### Don’t

- Create
- Postmates deliveries

<!-- end -->

- Short: for secondary actions, when the noun represents the same object as the page itself, a verb alone may be used. If there is ambiguity (such as with the verb “Cancel”), always use the {verb}+{noun} format.

  In the context of the orders list page:

<!-- usagelist -->

#### Do

- Import
- Export

#### Don’t

- Import orders
- Export orders

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usageblock -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

---

## Related components

- To lay out the content within a page, use the [layout component](https://polaris.shopify.com/components/structure/layout)
- To add pagination within the context of a list or other page content, use the [pagination component](https://polaris.shopify.com/components/navigation/pagination)
- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](https://polaris.shopify.com/components/structure/page-actions)
