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
  - single-column page
  - page with action groups
  - page with separator
  - outer wrapper
  - page actions
  - page layouts
  - easdk
  - shopify app bridge
  - embedded app
  - android
  - ios
---

# Page

Use to build the outer wrapper of a page, including the page title and associated actions.

---

## Use in an embedded application

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the page component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

Note in the props table that a number of properties are only available in stand-alone applications, and won't work in an embedded context. Configure your application's icon and navigation in the [Shopify Partner Dashboard](https://partners.shopify.com) app setup section. To help visualize the page component in an embedded application, we've provided the following screenshot.

![Screenshot of page component in an embedded application](/public_images/embedded/page/page@2x.jpg)

```jsx
ReactDOM.render(
  <AppProvider apiKey="YOUR_API_KEY">
    <Page
      breadcrumbs={[{content: 'Products'}]}
      title="Product reviews"
      primaryAction={{
        content: 'Save',
        disabled: true,
      }}
      secondaryActions={[{content: 'Duplicate'}, {content: 'Upgrade'}]}
      actionGroups={[
        {
          title: 'Promote',
          actions: [
            {
              content: 'Share on Facebook',
              onAction: this.performFacebookShare,
            },
            {
              content: 'Share on Pinterest',
              onAction: this.performPinterestShare,
            },
          ],
        },
      ]}
    >
      <p>Page content</p>
    </Page>
  </AppProvider>,
);
```

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

## Examples

### Page with all header elements

<!-- content-for: web -->

Use for detail pages, which should have pagination and breadcrumbs, and also often have several actions.

```jsx
<Page
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="Jar With Lock-Lid"
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[{content: 'Duplicate'}, {content: 'View on your store'}]}
  pagination={{
    hasPrevious: true,
    hasNext: true,
  }}
>
  <p>Page content</p>
</Page>
```

<!-- /content-for -->

<!-- content-for: android -->

Use for detail pages, which should have breadcrumbs, and also often have several actions.

Use for building any page on Android.

![Page on Android](/public_images/components/Page/android/with-header@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

Use for detail pages, which should have breadcrumbs, and also often have several actions.

Use for building any page on iOS.

![Page on iOS](/public_images/components/Page/ios/with-header@2x.png)

<!-- /content-for -->

### Page without primary action in header

<!-- example-for: web -->

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

### Page with external link

<!-- example-for: web -->

Use when a secondary action links to another website. Actions marked external open in a new browser tab.

```jsx
<Page
  title="Jar With Lock-Lid"
  primaryAction={{content: 'Save', disabled: true}}
  secondaryActions={[
    {
      content: 'Promote',
      external: true,
      icon: 'external',
      url:
        'https://www.facebook.com/business/learn/facebook-page-build-audience',
    },
  ]}
>
  <p>Page Content</p>
</Page>
```

### Page without pagination

<!-- example-for: web -->

Use when the page doesn’t represent a list of objects or a detail view for an object.

```jsx
<Page
  breadcrumbs={[{content: 'Settings', url: '/settings'}]}
  title="General"
  primaryAction={{content: 'Save'}}
>
  <p>Page content</p>
</Page>
```

### Full-width page

<!-- example-for: web -->

Use for layouts that benefit from more screen width, such as wide tables or lists.

```jsx
<Page
  fullWidth
  title="Orders"
  primaryAction={{content: 'Create order'}}
  secondaryActions={[{content: 'Export'}]}
  pagination={{
    hasNext: true,
  }}
>
  <p>Wide page content</p>
</Page>
```

### Single-column page

<!-- example-for: web -->

Use a single column layout if the page supports a single unified task. When merchants must review the entire page contents to complete their goal, this layout helps focus their attention in a single path from top to bottom.

```jsx
<Page
  singleColumn
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

### Page with action groups

<!-- example-for: web -->

Use action groups for sets of actions that relate to one another, particularly when there are too many to display as secondary actions. Note that these groups will be further rolled up into a single action for smaller displays so that actions do not wrap or overflow the page bounds.

```jsx
<Page
  title="Products"
  actionGroups={[
    {
      title: 'Promote',
      actions: [{content: 'Share on Facebook', onAction: () => {}}],
    },
  ]}
>
  <p>Page content</p>
</Page>
```

### Page with separator

<!-- example-for: web -->

Use a separator for pages that have an [empty state](/components/structure/empty-state) as their only content, or that have an [annotated section](/components/structure/layout) as the first component on the page.

```jsx
<Page title="Settings" separator>
  <Layout>
    <Layout.AnnotatedSection title="Store details">
      <p>Annotated section content</p>
    </Layout.AnnotatedSection>
  </Layout>
</Page>
```

### Page with content after title (title metadata)

<!-- example-for: web -->

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
  <p>Page content</p>
</Page>
```

---

## Related components

- To lay out the content within a page, use the [layout component](/components/structure/layout)
- To add pagination within the context of a list or other page content, use the [pagination component](/components/navigation/pagination)
- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](/components/structure/page-actions)
- When you use the page component within an [embedded app](https://github.com/Shopify/polaris-react/blob/master/documentation/Embedded%20apps.md), the [app provider component](https://polaris.shopify.com/components/structure/app-provider) delegates rendering to the Shopify App Bridge
