---
name: Page
category: Structure
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

- Clear and predictable: merchants should be able to anticipate what will happen when they click a page action. Never deceive merchants by mislabeling an action.

- Action-led: they should always lead with a strong verb that encourages action. To provide enough context to merchants, use the {verb}+{noun} format.

<!-- dodont -->

#### Do

- Create order
- View in Postmates

#### Don’t

- Create
- Postmates deliveries

<!-- end -->

- Short: for secondary actions, when the noun represents the same object as the page itself, a verb alone may be used. If there is ambiguity (such as with the verb “Cancel”), always use the {verb}+{noun} format.

  In the context of the orders list page:

<!-- dodont -->

#### Do

- Import
- Export

#### Don’t

- Import orders
- Export orders

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- dodont -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

---

## Examples

### Default

Use for detail pages, which should have pagination and breadcrumbs, and also often have several actions.

```jsx
<Page
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="3/4 inch Leather pet collar"
  titleMetadata={<Badge status="success">Paid</Badge>}
  subtitle="Perfect for any pet"
  compactTitle
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[
    {
      content: 'Duplicate',
      accessibilityLabel: 'Secondary action label',
      onAction: () => alert('Duplicate action'),
    },
    {
      content: 'View on your store',
      onAction: () => alert('View on your store action'),
    },
  ]}
  actionGroups={[
    {
      title: 'Promote',
      accessibilityLabel: 'Action group label',
      actions: [
        {
          content: 'Share on Facebook',
          accessibilityLabel: 'Individual action label',
          onAction: () => alert('Share on Facebook action'),
        },
      ],
    },
  ]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### With custom primary action

Use to create a custom primary action.

```jsx
<Page
  breadcrumbs={[{content: 'Settings', url: '/settings'}]}
  title="General"
  primaryAction={
    <Button
      primary
      connectedDisclosure={{
        accessibilityLabel: 'Other save actions',
        actions: [{content: 'Save as new'}],
      }}
    >
      Save
    </Button>
  }
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### Without primary action in header

Use when a primary action functions better as part of the page content instead of in the page header.

```jsx
<Page
  breadcrumbs={[{content: 'Orders', url: '/orders'}]}
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
      <Stack.Item fill>
        <p>Buy postage and ship remaining 2 items</p>
      </Stack.Item>
      <Button primary>Continue</Button>
    </Stack>
  </Card>
</Page>
```

### With destructive secondary action

Used to visually indicate that the secondary page action is destructive.

```jsx
<Page
  title="General"
  secondaryActions={[{content: 'Delete', destructive: true}]}
>
  <p>Page content</p>
</Page>
```

### With custom secondary action

Use to create a custom secondary action.

```jsx
<Page
  title="General"
  secondaryActions={
    <Button
      connectedDisclosure={{
        accessibilityLabel: 'Other save actions',
        actions: [{content: 'Save as new'}],
      }}
    >
      Save
    </Button>
  }
>
  <p>Page content</p>
</Page>
```

### With subtitle

Use when the page title benefits from secondary content.

```jsx
<Page
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="Invoice"
  subtitle="Statement period: May 3, 2019 to June 2, 2019"
  secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### With external link

Use when a secondary action links to another website. Actions marked external open in a new browser tab.

```jsx
<Page
  title="Jar With Lock-Lid"
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[
    {
      content: 'Promote',
      external: true,
      icon: ExternalMinor,
      url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
    },
  ]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### Without pagination

Use when the page doesn’t represent a list of objects or a detail view for an object.

```jsx
<Page
  breadcrumbs={[{content: 'Settings', url: '/settings'}]}
  title="General"
  primaryAction={{content: 'Save'}}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### Full-width

Use for layouts that benefit from more screen width, such as wide tables or lists.

```jsx
<Page
  fullWidth
  title="Orders"
  primaryAction={{content: 'Create order', icon: PlusMinor}}
  secondaryActions={[{content: 'Export'}]}
  pagination={{
    hasNext: true,
  }}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### Narrow width

Use a narrow width layout if the page supports a single unified task. When merchants must review the entire page contents to complete their goal, this layout helps focus their attention in a single path from top to bottom.

```jsx
<Page
  narrowWidth
  breadcrumbs={[{content: 'Orders', url: '/orders'}]}
  title="Add payment method"
  primaryAction={{content: 'Save', disabled: true}}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
  <PageActions
    primaryAction={{content: 'Save', disabled: true}}
    secondaryActions={[{content: 'Delete'}]}
  />
</Page>
```

### With action groups

Use action groups for sets of actions that relate to one another, particularly when there are too many to display as secondary actions. Note that these groups will be further rolled up into a single action for smaller displays so that actions do not wrap or overflow the page bounds.

```jsx
<Page
  title="Products"
  actionGroups={[
    {
      title: 'Copy',
      onClick: (openActions) => {
        alert('Copy action');
        openActions();
      },
      actions: [{content: 'Copy to clipboard'}],
    },
    {
      title: 'Promote',
      disabled: true,
      actions: [{content: 'Share on Facebook'}],
    },
    {
      title: 'More actions',
      actions: [
        {content: 'Duplicate'},
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ],
    },
  ]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### With content after title

Title metadata appears immediately after the page’s title. Use it to communicate brief, important and non-interactive status information about an entire page.

```jsx
<Page
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="Jar With Lock-Lid"
  titleMetadata={<Badge status="attention">Verified</Badge>}
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[{content: 'Duplicate'}, {content: 'View on your store'}]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

### With divider

Use when the page needs visual separation between the page header and the content.

```jsx
<Page
  breadcrumbs={[{content: 'Settings', url: '/settings'}]}
  title="General"
  divider
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
```

---

## Related components

- To lay out the content within a page, use the [layout component](https://polaris.shopify.com/components/layout)
- To add pagination within the context of a list or other page content, use the [pagination component](https://polaris.shopify.com/components/pagination)
- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](https://polaris.shopify.com/components/page-actions)
