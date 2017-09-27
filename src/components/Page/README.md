---
name: Page
category: Structure
keywords:
  - page
  - view
  - title
  - titlebar
  - breadcrumbs
  - pagination
  - page with all header elements
  - page without primary action in header
  - page without pagination
  - full-wdith page
  - page with action groups
  - page with separator
  - outer wrapper
  - page actions
  - page layouts
---

# Page

Use to build the outer wrapper of a page, including the page title and associated actions.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

Merchants need a quick way to understand where they are, where they came from, and what they can do on a page in Shopify.

### Solution

Use the page component to provide the outer structure for a page, which creates consistent margins and supports the page title, breadcrumbs and page header actions.

---

## Best Practices

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

* Clear and predictable: merchants should be able to anticipate what will
happen when they click a page action. Never deceive a merchant by mislabeling an action.

* Action-led: they should always lead with a strong verb that encourages
action. To provide enough context to merchants, use the {verb}+{noun} format.

<!-- usagelist -->
#### Do
- Create order
- View in Postmates

#### Don’t
- Create
- Postmates deliveries
<!-- end -->

* Short: for secondary actions, when the noun represents the same object as the page itself, a verb alone may be used. If there is ambiguity (such as with the verb “Cancel”), always use the {verb}+{noun} format.

    In the context of the orders list page:

<!-- usagelist -->
#### Do
- Import
- Export

#### Don’t
- Import orders
- Export orders
<!-- end -->

* Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usageblock -->
#### Do
Add menu item

#### Don’t
Add a menu item
<!-- end -->


| Prop        | Type   | Description |
| ---         | ---    | --- |
| title*      | string | Page title, in large type |
| icon        | string | App icon, for pages that are part of Shopify apps |
| breadcrumbs | BreadcrumbProps['breadcrumbs'] | Collection of breadcrumbs |
| children    | React.ReactNode | The contents of the page |
| fullWidth   | boolean | Remove the normal max-width on the page |
| separator   | boolean | Adds a border to the bottom of the page header |
| secondaryActions | ComplexAction[] | Collection of secondary page-level actions |
| actionGroups   | ActionGroup[] | Collection of page-level groups of secondary actions |
| primaryAction | DisableableAction | Primary page-level action |
| pagination | PaginationDescriptor | Page-level pagination |


## Examples

### Page with all header elements

Use for detail pages, which should have pagination and breadcrumbs, and also often have several actions.

```jsx
<Page
  breadcrumbs={[
    {content: 'Products'}
  ]}
  title="Jar With Lock-Lid"
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[
    {content: 'Duplicate'},
    {content: 'View on your store'},
  ]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <p>Page content</p>
</Page>
```

### Page without primary action in header

Use when a primary action functions better as part of the page content instead of in the page header.

```jsx
<Page
  breadcrumbs={[
    {content: 'Orders'}
  ]}
  title="#1085"
  secondaryActions={[
    {content: 'Print'},
    {content: 'Unarchive'},
    {content: 'Cancel order'},
  ]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <Card sectioned title="Fulfill order">
    <Stack alignment="center">
      <Stack.Item fill><p>Buy postage and ship remaining 2 items</p></Stack.Item>
      <Button primary>Continue</Button>
    </Stack>
  </Card>
</Page>
```

### Page without pagination

Use when the page doesn’t represent a list of objects or a detail view for an object.

```jsx
<Page
  breadcrumbs={[
    {content: 'Settings'}
  ]}
  title="General"
  primaryAction={{content: 'Save'}}
>
  <p>Page content</p>
</Page>
```

### Full-width page

Use for layouts that benefit from more screen width, such as wide tables or lists.

```jsx
<Page
  fullWidth
  title="Orders"
  primaryAction={{content: 'Create order'}}
  secondaryActions={[
    {content: 'Export'},
  ]}
  pagination={{
    hasNext: true,
  }}
>
  <p>Wide page content</p>
</Page>
```

### Page with action groups

Use action groups for sets of actions that relate to one another, particularly when there are too many to display as secondary actions. Note that these groups will be further rolled up into a single action for smaller displays so that actions do not wrap or overflow the page bounds.

```jsx
<Page
  title="Products"
  actionGroups={[
    {
      title: 'Promote',
      actions: [
        {content: 'Share on Facebook', onAction: this.performFacebookShare}
      ],
    },
  ]}
>
  <p>Page content</p>
</Page>
```

### Page with separator

Use a separator for pages that have an [empty state](/components/structure/empty-state) as their only content, or that have an [annotated section](/components/structure/layout) as the first component on the page.

```jsx
<Page
  title="Settings"
  separator
>
  <Layout>
    <Layout.AnnotatedSection title="Store details">
      <p>Annotated section content</p>
    </Layout.AnnotatedSection>
  </Layout>
</Page>
```

---

## Related components

* To lay out the content within a page, [use the layout component](/components/structure/layout)
