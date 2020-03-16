---
name: Resource item
category: Lists and tables
keywords:
  - ResourceItem
  - resource item
  - collections
  - items
  - objects
  - list of products
  - list of orders
  - product lists
  - order lists
  - collections lists
  - collection lists
  - list of collections
  - product listings list
  - channel lists
  - resource list attributes
  - list attributes
  - exceptions list
  - list secondary actions
  - secondary actions in a list
  - list of resources
---

# Resource item

Resource items represent specific objects within a collection, such as products or orders. They provide contextual information on the resource type and link to the object’s detail page.

---

## Examples

### Simple resource item

A basic resource item with its details filled in at the point of use.

```jsx
function ResourceItemExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'blog post', plural: 'blog posts'}}
        items={[
          {
            id: 6,
            url: 'posts/6',
            title: 'How To Get Value From Wireframes',
            author: 'Jonathan Mangrove',
          },
        ]}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const {id, url, title, author} = item;
          const authorMarkup = author ? <div>by {author}</div> : null;
          return (
            <ResourceItem
              id={id}
              url={url}
              accessibilityLabel={`View details for ${title}`}
              name={title}
            >
              <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
              {authorMarkup}
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}
```

### Item with media

The media element can hold an [avatar](https://polaris.shopify.com/components/images-and-icons/avatar), [thumbnail](https://polaris.shopify.com/components/images-and-icons/thumbnail), or other small-format graphic.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 145,
        url: 'customers/145',
        avatarSource:
          'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
        name: 'Yi So-Yeon',
        location: 'Gwangju, South Korea',
      },
    ]}
    renderItem={(item) => {
      const {id, url, avatarSource, name, location} = item;

      return (
        <ResourceItem
          id={id}
          url={url}
          media={
            <Avatar customer size="medium" name={name} source={avatarSource} />
          }
          accessibilityLabel={`View details for ${name}`}
          name={name}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceItem>
      );
    }}
  />
</Card>
```

### Item with shortcut actions

Shortcut actions present popular actions from the resource’s details page for easy access. A shortcut action should be available on every item in the list.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 145,
        url: 'customers/145',
        avatarSource:
          'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
        name: 'Yi So-Yeon',
        location: 'Gwangju, South Korea',
        latestOrderUrl: 'orders/1456',
      },
    ]}
    renderItem={(item) => {
      const {id, url, avatarSource, name, location, latestOrderUrl} = item;
      const shortcutActions = latestOrderUrl
        ? [{content: 'View latest order', url: latestOrderUrl}]
        : null;

      return (
        <ResourceItem
          id={id}
          url={url}
          media={
            <Avatar customer size="medium" name={name} source={avatarSource} />
          }
          shortcutActions={shortcutActions}
          accessibilityLabel={`View details for ${name}`}
          name={name}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceItem>
      );
    }}
  />
</Card>
```

### Item with vertical alignment

Use to adjust the vertical alignment of item content.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 145,
        url: 'customers/145',
        avatarSource:
          'https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746',
        name: 'Yi So-Yeon',
        location: 'Gwangju, South Korea',
        lastOrder: 'Emerald Silk Gown',
      },
    ]}
    renderItem={(item) => {
      const {id, url, avatarSource, name, location, lastOrder} = item;
      return (
        <ResourceItem
          verticalAlignment="center"
          id={id}
          url={url}
          media={
            <Avatar customer size="medium" name={name} source={avatarSource} />
          }
          accessibilityLabel={`View details for ${name}`}
          name={name}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
          <div>{lastOrder}</div>
        </ResourceItem>
      );
    }}
  />
</Card>
```

---

## Required components

The resource item component must be wrapped in the [resource list](https://polaris.shopify.com/components/lists-and-tables/resource-list) component.

---

## Accessibility

Resource items function as links to the full-page representations of the items. Each item should have a unique `name` prop. For each `ResourceItem`, the `accessibilityLabel` prop should be used to give the link a unique `aria-label` value. The `aria-label` value should convey the link’s purpose, using the `name` value. Merchants who use screen readers or other text to speech tools should be able to easily distinguish each link from the others.

When adding custom content to resource items, ensure that all text is available to all users and that all custom controls have a unique accessible name to help users understand what will happen when the control is activated.

### Keyboard

Links can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key by default.

If you add custom controls to resource items, then make sure that the controls:

- Can be used with the keyboard
- Receive keyboard focus in a logical order
- Display a visible focus indicator

---

## Best practices

Resource items should:

- Be tailored to the specific type of context being displayed.
- Perform an action when clicked. The action should navigate to the resource’s details page or provide more detail about the item.

Resource items can optionally:

- Provide [shortcut actions](https://polaris.shopify.com/components/lists-and-tables/resource-list#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s details page.

---

## Content guidelines

Resource items should:

- Present the information that merchants need to find the items that they’re looking for.
- Support merchant tasks for the particular type of resource.
- Avoid colons.
- [Shortcut actions](https://polaris.shopify.com/components/lists-and-tables/resource-list#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.

---

## Related components

To display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists-and-tables/list).
