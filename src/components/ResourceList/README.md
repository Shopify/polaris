---
name: Resource list
category: Lists and tables
keywords:
  - ResourceList
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

# Resource list

A resource list displays a collection of objects of the same type, like products or customers. The main job of a resource list is to help merchants find an object and navigate to a full-page representation of it.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Resource list anatomy, showing filters, header, and items](/public_images/resource-list/anatomy-wide@2x.png)

</div>

Resource lists can also:

- Support [customized list items](#study-custom-item)
- Include [bulk actions](#study-bulk-actions) so merchants can act on multiple objects at once
- Support [sorting](#study-sorting) and filtering [filtering](#study-filtering) of long lists
- Be paired with [pagination](#study-pagination) to make long lists digestible

---

## Examples

### Simple resource list

A resource list with simple items and no bulk actions, sorting, or filtering. See the [case study below](#study) for implementation details.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ]}
    renderItem={(item) => {
      const {id, url, name, location} = item;
      const media = <Avatar customer size="medium" name={name} />;

      return (
        <ResourceList.Item
          id={id}
          url={url}
          media={media}
          accessibilityLabel={`View details for ${name}`}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceList.Item>
      );
    }}
  />
</Card>
```

### Resource list with bulk actions

Allows merchants to select items and perform an action on the selection. See [the bulk actions section of the case study](#study-bulk-actions) for implementation details.

```jsx
class ResourceListExample extends React.Component {
  state = {
    selectedItems: [],
  };

  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];

    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          selectedItems={this.state.selectedItems}
          onSelectionChange={this.handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
        />
      </Card>
    );
  }
}
```

### Resource list with loading state

Notifies merchants that list items are being processed.

```jsx
class ResourceListExample extends React.Component {
  state = {
    selectedItems: [],
  };

  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];

    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          selectedItems={this.state.selectedItems}
          onSelectionChange={this.handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          loading={true}
        />
      </Card>
    );
  }
}
```

### Resource list with sorting

Allows merchants to change the way the list is sorted by selecting one of several options from a [Select](/components/forms/select) control. See the [the sorting section of the case study](#study-sorting) for implementation details.

```jsx
class ResourceListExample extends React.Component {
  state = {
    sortValue: 'DATE_MODIFIED_DESC',
  };

  handleSortChange = (sortValue) => {
    this.setState({sortValue});
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          sortValue={this.state.sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
          ]}
          onSortChange={(selected) => {
            this.setState({sortValue: selected});
            console.log(`Sort option changed to ${selected}.`);
          }}
        />
      </Card>
    );
  }
}
```

### Resource list with alternate tool

Allows merchants to add an alternate tool in the current sort option location when sort may not be the most relevant action for the current list.

```jsx
class ResourceListExample extends React.Component {
  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'Customer',
      plural: 'Customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    return (
      <Card>
        <ResourceList
          items={items}
          renderItem={this.renderItem}
          resourceName={resourceName}
          alternateTool={<Button>Email customers</Button>}
        />
      </Card>
    );
  }
}
```

### Resource list with filtering

Allows merchants to narrow the resource list to a subset of the original items. See the [filter control subcomponent](#subcomponent-filter-control) and the [filtering section of the case study](#study-filtering) for implementation details.

```jsx
class ResourceListExample extends React.Component {
  state = {
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
  };

  handleSearchChange = (searchValue) => {
    this.setState({searchValue});
  };

  handleFiltersChange = (appliedFilters) => {
    this.setState({appliedFilters});
  };

  renderItem = (item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item id={id} url={url} media={media}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
      },
    ];

    const filters = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ];

    const filterControl = (
      <ResourceList.FilterControl
        filters={filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        additionalAction={{
          content: 'Save',
          onAction: () => console.log('New filter saved'),
        }}
      />
    );

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          filterControl={filterControl}
        />
      </Card>
    );
  }
}
```

### Resource list with item shortcut actions

Shortcut actions are intended to provide quick access to popular actions from the resource’s details page. They are shown when the mouse is hovered over the list item, and are not shown on small screen devices, so the action must also be accessible in another way. See the [Adding shortcut actions to resource list items section of the case study](#study-custom-item-shortcut-actions) for implementation details.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        latestOrderUrl: 'orders/1456',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
    ]}
    renderItem={(item) => {
      const {id, url, name, location, latestOrderUrl} = item;
      const media = <Avatar customer size="medium" name={name} />;
      const shortcutActions = latestOrderUrl
        ? [{content: 'View latest order', url: latestOrderUrl}]
        : null;

      return (
        <ResourceList.Item
          id={id}
          url={url}
          media={media}
          accessibilityLabel={`View details for ${name}`}
          shortcutActions={shortcutActions}
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceList.Item>
      );
    }}
  />
</Card>
```

### Resource list with persistent item shortcut actions

Use persistent shortcut actions in rare cases when the action cannot be made available on the item’s details page. Persistent shortcut actions roll up into an overflow menu on small screens.

```jsx
<Card>
  <ResourceList
    resourceName={{singular: 'customer', plural: 'customers'}}
    items={[
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        latestOrderUrl: 'orders/1456',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
    ]}
    renderItem={(item) => {
      const {id, url, name, location, latestOrderUrl} = item;
      const media = <Avatar customer size="medium" name={name} />;
      const shortcutActions = latestOrderUrl
        ? [{content: 'View latest order', url: latestOrderUrl}]
        : null;

      return (
        <ResourceList.Item
          id={id}
          url={url}
          media={media}
          accessibilityLabel={`View details for ${name}`}
          shortcutActions={shortcutActions}
          persistActions
        >
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceList.Item>
      );
    }}
  />
</Card>
```

### Resource list with all of its elements

Use as a broad example that includes most props available to resource list.

```jsx
class ResourceListExample extends React.Component {
  state = {
    selectedItems: [],
    sortValue: 'DATE_MODIFIED_DESC',
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
  };
  handleSearchChange = (searchValue) => {
    this.setState({searchValue});
  };
  handleFiltersChange = (appliedFilters) => {
    this.setState({appliedFilters});
  };
  handleSortChange = (sortValue) => {
    this.setState({sortValue});
  };
  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  renderItem = (item) => {
    const {id, url, name, location, latestOrderUrl} = item;
    const media = <Avatar customer size="medium" name={name} />;
    const shortcutActions = latestOrderUrl
      ? [{content: 'View latest order', url: latestOrderUrl}]
      : null;
    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  };
  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };
    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        latestOrderUrl: 'orders/1456',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
    ];
    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];
    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];
    const filters = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ];
    const filterControl = (
      <ResourceList.FilterControl
        filters={filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        additionalAction={{
          content: 'Save',
          onAction: () => console.log('New filter saved'),
        }}
      />
    );
    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          selectedItems={this.state.selectedItems}
          onSelectionChange={this.handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          sortValue={this.state.sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
          ]}
          onSortChange={(selected) => {
            this.setState({sortValue: selected});
            console.log(`Sort option changed to ${selected}.`);
          }}
          filterControl={filterControl}
        />
      </Card>
    );
  }
}
```

---

## Build

Using a resource list in a project involves combining the following components and subcomponents:

- ResourceList
- [ResourceList.Item](#subcomponent-item) or a [customized list item](#study-custom-item)
- [ResourceList.FilterControl](#subcomponent-filter-control) (optional)
- Pagination component (optional)

<!-- hint -->

The resource list component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.

<!-- end -->

View the [case study](#study) for a walkthrough of how to use this component to build an list page for customers.

---

## Purpose

Shopify is organized around objects that represent merchants businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.

### Problem

Take orders as an example. Merchants may have a lot of them. They need a way to scan their orders, see what state they’re in and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.

### Solution

Resource lists function as:

- A content format, presenting a set of individual resources in a compact form
- A system for taking action on one or more individual resources
- A way to navigate to an individual resource’s details page

Because a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Schematic showing content from a details page being surfaced on a resource list](/public_images/resource-list/list-surfacing-show@2x.png)

</div>

<!-- hint -->

#### Hint

#### A resource list isn’t a data table

On wide screens, a resource list often looks like a table, especially if some content is aligned in columns. Despite this, resource lists and data tables have different purposes.

A data table is a form of data visualization. It works best to present highly structured data for comparison and analysis.

If your use case is more about visualizing or analyzing data, use the [data table component](/components/lists-and-tables/data-table). If your use case is more about finding and taking action on objects, use a resource list.

<!-- end -->

---

## Best practices

Resource lists can live in many places in Shopify. You could include a short resource list in a card summarizing recent marketing activities. You could also dedicate an entire page to a resource list like Shopify’s main products list.

Resource lists should:

- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- [Customize the content and layout](#study-custom-item) of their list items to support merchants’ needs.
- Support [sorting](#study-sorting) if the list can be long, and especially if different merchant tasks benefit from different sort orders.
- Support [filtering](#study-filtering) if the list can be long.
- [Paginate](#study-pagination) when the current list contains more than 50 items.
- Use the [skeleton page](/components/feedback-indicators/skeleton-page) component on initial page load for the rest of the page if the loading prop is true and items are processing.

Resource lists can optionally:

- Provide [bulk actions](#study-bulk-actions) for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.

---

## Content guidelines

Resource lists should:

- Identify the type of resource, usually with a heading

  <!-- usagelist -->

  #### Do

  - Products
  - Showing 50 products

  #### Don’t

  - _No heading_

  <!-- end -->

- Indicate when not all members of a resource are being shown. For a card summarizing and linking to recently purchased products:

  <!-- usagelist -->

  #### Do

  - Popular products this week

  #### Don’t

  - Products

  <!-- end -->

- Follow the verb + noun formula for [bulk actions](#study-bulk-actions-content-guidelines)

- Follow the [content formula for sort options](#study-sorting-content-guidelines)

- Follow the [content guidelines for filter options and applied filters](#study-filtering-content-guidelines)

---

<a name="subcomponent-item"></a>

## Resource list item

The content of a resource list consists of resource list items. Each item summarizes an individual resource and should link to its details page.

Because the content of items depends on the type of resource and merchant tasks, resource list items are flexible.

See the case study section for [more about customizing and using resource list items](#study-custom-item).

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Resource list item anatomy, showing handle, media and details](/public_images/resource-list/item-anatomy-wide@2x.png)

</div>

<a name="subcomponent-item-examples"></a>

### Item examples

#### Simple resource list item

A basic resource list item with its details filled in at the point of use.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Blog post list item](/public_images/resource-list/item-example-simple@2x.png)

</div>

```jsx
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
  renderItem={(item) => {
    const {id, url, title, author} = item;
    const authorMarkup = author ? <div>by {author}</div> : null;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        accessibilityLabel={`View details for ${title}`}
      >
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        {authorMarkup}
      </ResourceList.Item>
    );
  }}
/>
```

#### Item with media

The media element can hold an [avatar](/components/images-and-icons/avatar), [thumbnail](/components/images-and-icons/thumbnail) or other small-format graphic.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example customer list item](/public_images/resource-list/item-example-media@2x.png)

</div>

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 145,
      url: 'customers/145',
      avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
      name: 'Yi So-Yeon',
      location: 'Gwangju, South Korea',
    },
  ]}
  renderItem={(item) => {
    const {id, url, avatarSource, name, location} = item;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={
          <Avatar customer size="medium" name={name} source={avatarSource} />
        }
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
/>
```

#### Item with shortcut actions

Shortcut actions present popular actions from the resource’s details page for easy access.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Shortcut actions are shown on hover](/public_images/resource-list/item-example-shortcuts@2x.png)

</div>

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 145,
      url: 'customers/145',
      avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
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
      <ResourceList.Item
        id={id}
        url={url}
        media={
          <Avatar customer size="medium" name={name} source={avatarSource} />
        }
        shortcutActions={shortcutActions}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
/>
```

<a name="subcomponent-item-props"></a>

### Item properties

| Prop                 | Type                       | Description                                                                        |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| id\*                 | string                     | Unique identifier for the item within the list                                     |
| url                  | string                     | URL for the resource’s details page (required unless \`onClick\` is provided)      |
| accessibilityLabel\* | string                     | Accessibility label for item link                                                  |
| ariaControls         | string                     | Id of the element the item onClick controls                                        |
| ariaExpanded         | string                     | Tells screen reader the controlled element is expanded                             |
| onClick              | function(id: string): void | Callback when clicked (required if \`url\` is omitted)                             |
| media                | React.reactNode            | Content for the media area at the left of the item, usually an Avatar or Thumbnail |
| children             | React.reactNode            | Content for the details area                                                       |
| shortcutActions      | DisableableAction[]        | 1 or 2 shortcut actions; must be available on the page linked to by \`url\`        |
| persistActions       | boolean                    | Makes the shortcut actions always visible                                          |

<a name="subcomponent-item-best-practices"></a>

### Item best practices

Resource list items should:

- Perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.
- Be tailored to the specific type of resource being displayed.
- Lay out the content effectively across all screen sizes.

Resource list items can optionally:

- Use [conditional content](#study-custom-item-conditional-content) to help merchants deal with items in unusual states
- Provide [shortcut actions](#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s details page

Read the [case study](#study-custom-item) to see how the best practices are applied.

<a name="subcomponent-item-content-guidelines"></a>

### Item content guidelines

Resource list items should:

- Present the content merchants need to find the items they’re looking for.
- Support merchants’ tasks for the particular type of resource.
- Present content elements concisely. For example, add a label or clarifying phrase only when necessary.
- Avoid truncating content where possible.
- Avoid colons.
- [Conditional actions](#study-custom-item-conditional-content) should follow the verb + noun content formula for buttons.
- If a content value is empty, don’t use an em dash (“—”) like in a table. Instead, use a phrase like “No orders.”
- [Shortcut actions](#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.

See the [case study](#study-custom-item) for content guidelines in action.

---

<a name="subcomponent-filter-control"></a>

## Resource list filter control

Provides a default interface for adding and removing filters. Supports quick filtering using a text field. A more advanced filter builder can be accessed from a popover. Applied filters are represented as removeable tags.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Resource list with filter control](/public_images/resource-list/filter-control-anatomy@2x.png)

</div>

<a name="subcomponent-filter-control-examples"></a>

### Filter control examples

#### Resource list with filter control

Filter control showing a state with applied filters and an additional action (optional).

<div class="TypeContainerImage">

![Example filter control](/public_images/resource-list/filter-control-example@2x.png)

</div>

```jsx
<ResourceList
  resourceName={{singular: 'customer', plural: 'customers'}}
  items={[
    {
      id: 341,
      url: 'customers/341',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 256,
      url: 'customers/256',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ]}
  renderItem={(item) => {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    );
  }}
  filterControl={
    <ResourceList.FilterControl
      filters={[
        {
          key: 'orderCountFilter',
          label: 'Number of orders',
          operatorText: 'is greater than',
          type: FilterType.TextField,
        },
        {
          key: 'accountStatusFilter',
          label: 'Account status',
          operatorText: 'is',
          type: FilterType.Select,
          options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
        },
      ]}
      appliedFilters={[
        {
          key: 'orderCountFilter',
          value: '1',
          label: 'Has orders',
        },
        {
          key: 'accountStatusFilter',
          value: 'Enabled',
          label: 'Account enabled',
        },
      ]}
      onFiltersChange={(appliedFilters) => {
        console.log(
          `Applied filters changed to ${appliedFilters}.`,
          'Todo: use setState to apply this change.',
        );
      }}
      searchValue="USA"
      onSearchChange={(searchValue) => {
        console.log(
          `Search value changed to ${searchValue}.`,
          'Todo: use setState to apply this change.',
        );
      }}
      additionalAction={{
        content: 'Save',
        onAction: () => console.log('Todo: handle save filters.'),
      }}
    />
  }
/>
```

<a name="subcomponent-filter-control-props"></a>

### Filter control properties

| Prop            | Type                                            | Description                                     |
| --------------- | ----------------------------------------------- | ----------------------------------------------- |
| searchValue     | string                                          | Currently entered text in the search term field |
| appliedFilters  | AppliedFilter[]                                 | Collection of currently applied filters         |
| focused         | boolean                                         | Whether the search term field is focused        |
| filters         | Filter[]                                        | Available filters                               |
| onSearchBlur    | function(): void                                | Callback when the search term field is blurred  |
| onSearchChange  | function(searchvalue: string, id: string): void | Callback when the search term field is changed  |
| onFiltersChange | function(appliedFilters: AppliedFilter[]): void | Callback when the applied filters are changed   |

<a name="subcomponent-filter-control-best-practices"></a>

### Filter control best practices

A Resource list’s filter control should:

- Make filters available that make common merchant tasks easy. For example, provide the option for merchants to filter a customer’s list to email subscribers only. Don’t offer arbitrary filters.
- Show relevant results for a wide range of search inputs, including partial words. For example, if merchants type “unful” in the search field for an orders list, it should return all unfulfilled orders as a the result (as well as orders with this string elsewhere in Shopify, such as in an order note).

<a name="subcomponent-filter-control-content-guidelines"></a>

### Filter control content guidelines

Content for the filter control appears in two places: the filter builder and the removable tags that represent applied filters.

#### Filter builder content

The filter builder itself has three parts: the **label**, the **operator text**, and the **filter input**.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example filter builder in a popover](/public_images/resource-list/filter-control-filter-builder@2x.png)

</div>

In this example:

- “Account status” is the **label**
- “is” is the **operator text**
- “Enabled” is one of several options that make up the **filter input**

Here’s another example:

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Second filter builder example](/public_images/resource-list/filter-control-filter-builder-2@2x.png)

</div>

In this case, a the **filter input** is a text field, so you only need to consider copy for the **label**, “Number of orders” and **operator text**, “is greater than”.

- Filter label and filter input should follow the [select menu options guidelines](https://polaris.shopify.com/components/forms/select#section-content-guidelines)
- Operator text should start with a lowercase letter
- All three content elements should form a sentence
- Operator text may be left out if the sentence reads more clearly without it

### Applied filter tags

<div class="TypeContainerImage">

![Example of applied filter tags](/public_images/resource-list/filter-control-filter-tags@2x.png)

</div>

The content that represents applied filter tags should use short, clear, non-technical labels.

<!-- usagelist -->

#### Do

- Has orders
- More than 10 orders

#### Don’t

- Number of orders is greater than 0
- order_count >= 10

<!-- end -->

---

## Related components

- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](/components/lists-and-tables/data-table)
- To display a simple list of related content, [use the list component](/components/lists-and-tables/list)

---

<a name="study"></a>

## Case study

To cover the resource list component in depth, we’ll create a customer list as an example. We’ll start by implementing a basic resoure list step by step. Then we’ll customize the built-in resource list item to better display our customers. Finally, we’ll add features to make the list more useful to merchants.

1.  [Development setup](#study-setup) (optional)
1.  [A basic resource list](#study-basic-list)
1.  [Building a reusable custom list item](#study-custom-item)
1.  [Adding bulk actions](#study-bulk-actions)
1.  [Adding sorting](#study-sorting)
1.  [Adding filtering](#study-filtering)
1.  [Adding pagination](#study-pagination)

You can also [jump straight to the end result](#study-end-result).

<a name="study-setup"></a>

### Development setup (optional)

If you want to follow along with the code, our setup will be based on Create React App. If you’ve never used Create React App, you can get started by using `npx` (npm 5.2+):

```bash
npx create-react-app my-app
cd my-app
npm start
```

Your browser will open to `localhost:3000` and update as you code. You can [learn more about Create React App on GitHub](https://github.com/facebook/create-react-app)

The main files in our project directory look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

We’ll open our `App.js` and replace it with this:

```jsx
import React, {Component} from 'react';

class App extends Component {
  render() {
    return <p>Hello world</p>;
  }
}

export default App;
```

You should now see “Hello World” in your browser.

Next, we need to add the React Polaris library to our project. We’ll install it using npm:

```bash
npm install @shopify/polaris --save
```

The last thing before we start building is to import the Polaris styles and the components we’ll need.

```jsx
import React, { Component } from 'react';
import {
  Page,
  Card,
  ResourceList,
  TextStyle,
  Avatar,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';
...
```

<a name="study-basic-list"></a>

### A basic resource list

Let’s start with some sample data. In a real app the customer data would come from an API endpoint or as part of the initial payload from the server.

```jsx
...
const customers = [
  {
    id: 341,
    url: 'customers/341',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
  },
  {
    id: 256,
    url: 'customers/256',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
  },
];
...
```

Notice that we’ve included an `id` for each customer. This should be a unique identifier from our database.

We also should make sure to sort our items in a way that makes sense to merchants. For this case study, let’s assume we’ve sorted this list by most recent update.

With our sample data in place we can now display a simple resource list:

```jsx
...
const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

class App extends Component {
  render() {
    return (
      <Page title="Customers">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={customers}
            renderItem={(item) => {
              const { id, url, name, location } = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
                  <h3><TextStyle variation="strong">{name}</TextStyle></h3>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </Page>
    );
  }
}
...
```

Let’s take a closer look this code.

Notice we’re providing a prop for the singular and plural name of our resource (“customers”). The resource list component will use these strings to build various pieces of content in the component, such as “Showing 50 customers”.

We’ve broken out our item renderer as a separate function to keep things clean.

Next, we’ll build is a customized resource list item.

<a name="study-custom-item"></a>

### Building a reusable custom list item

A list of orders is different than a list of products and is used by merchants differently. As a result, most resource lists benefit from careful choice of content and a customized layout. The best way to do this is to customize the built-in [resource list item](#subcomponent-item).

In this section, we’ll build a custom resource list item for customers:

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Preview of customer list item](/public_images/resource-list/study-list-item-preview@2x.png)

</div>

<!-- resources -->

#### Resources

##### Get the example code

- https://github.com/Shopify/polaris-resource-list-examples/tree/v0.1.0/src/components/CustomerListItem
- View example code for custom resource list items
- dev

<!-- end -->

<a name="subcomponent-custom-item-content"></a>

#### Defining the content

We’ll start by figuring out what information and actions merchants need when working with customers.

- What content is useful to describe the customer?
- What content do merchants need to find a specific customer?
- What content related to the customer will help merchants fulfill an order or make a sale?

The customer name is essential. Their physical location is helpful too, especially for merchants with retail stores or multiple locations. Since orders and customer loyalty are important, the customer’s total order count and total spent are also useful for customer loyalty purposes. Finally, we’ll include an avatar for demonstration purposes. Since customers may not have avatars, consider leaving this out.

This gives us the following content, ranked roughly by importance:

1.  Customer name
1.  Location
1.  Number of orders
1.  Total spent
1.  Avatar

##### Crafting the copy

Resource lists don’t have column headings, so care must be taken to avoid ambiguous copy.

1.  Start by listing out typical values for each piece of content. If the value alone speaks for itself we can use it as-is.

    <!-- usagelist -->

    #### Do

    - Adam West
    - Ottawa, Canada

    #### Don’t

    - 3
    - \$492.76

    <!-- end -->

2.  If a value alone is ambiguous, like the number of orders and total spent, add text to make it clear. When possible, use a short phrase rather than a label with a colon.

    <!-- usagelist -->

    #### Do

    - 3 orders

    #### Don’t

    - 3
    - Total orders: 3

    <!-- end -->

3.  If a content value is empty for a given item, use a phrase to describe the empty state. For a customer with no orders, use “No orders”. If the value is numeric, “0” may be used. Don’t indicated empty values with em dash (“—”).

    When a core content element is empty, show it grayed out using the subdued [text style](/components/titles-and-text/text-style) variation.

    <!-- usagelist -->

    #### Do

    - No orders
    - 0 orders

    #### Don’t

    - —

    <!-- end -->

##### Using badges as content

The [badge component](/components/images-and-icons/badge) calls strong attention to itself. Showing a badge on every item in a list will distract from the rest of the content.

Whenever possible, use badges conditionally, showing them only when there is an issue or something strongly notable about a particular resource.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of a badge highlighting open orders on an item](/public_images/resource-list/study-list-item-badges@2x.png)

</div>

##### Building it

We’ll start by creating a `src/components/CustomerListItem` directory and adding three files, `CustomerListItem.js`, `CustomerListItem.css`, and `index.js`:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    components/
      CustomerListItem/
        CustomerListItem.js
        CustomerListItem.css
        index.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

In `CustomerListItem.js`, we’ll add the following:

```jsx
// CustomerListItem.js
...
import React from 'react';
import {
  ResourceList,
  Avatar,
  TextStyle,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

export default function CustomerListItem(props) {
  const { id, url, name, location } = props;
  const media = <Avatar customer size="medium" name={name} />;

  return (
    <div className="CustomerListItem">
      <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
        <h3><TextStyle variation="strong">{name}</TextStyle></h3>
        <div>{location}</div>
      </ResourceList.Item>
    </div>
  );
}
...
```

This component is also a good example of [composition in React](https://reactjs.org/docs/composition-vs-inheritance.html#specialization). Notice that most of the code here is the same as what we had in our `App.js` before. However, now we can build a more specific API for our customer list item on top of the basic resource list item we had before.

Notice also that our component is just a regular JavaScript function. This type of component is called a [functional component](https://reactjs.org/docs/components-and-props.html#functional-and-class-components).

Now we’ll add a boilerplate index.js so we can use a more concise import path for it:

```jsx
// index.js
import CustomerListItem from './CustomerListItem';
export default CustomerListItem;
```

In our `App.js`, we can now import the component like so:

```jsx
// App.js
import CustomerListItem from './components/CustomerListItem';
```

And we can use it in place of our basic resource list item, replacing the entire function we’d passed to `renderItem` with a one-liner:

```jsx
renderItem={(customer) => <CustomerListItem {...customer} />}
```

Let’s also flesh out our sample data to match the content we decided to show in our customized resource list item:

```jsx
// App.js
...
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
  },
];
...
```

Now let’s come back to our customer list item and include the new content.

```jsx
// CustomerListItem.js
...
export default function CustomerListItem(props) {
  const {
    id,
    url,
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  return (
    <div className="CustomerListItem">
      <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
        <h3>{name}</h3>
        <div>{location}</div>
        <div>
          {orderCount} {orderCount === 1 ? 'order' : 'orders'}
        </div>
        <div>{totalSpent} spent</div>
      </ResourceList.Item>
    </div>
  );
}
```

It’s worth noting that we’re not really doing anything with `id` and `url` in this component. We’re just “forwarding” them on to `ResourceList.Item`. We can use the rest and spread operators to make this more resilient, so that `CustomerListItem` accepts any prop that `ResourceList.Item` does:

```jsx
...
export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    ...rest,
  } = props;

  const media = (
    <Avatar customer size="medium" name={name} source={avatarSource} />
  );

  return (
    <div className="CustomerListItem">
      <ResourceList.Item {...rest} media={media} accessibilityLabel={`View details for ${name}`}>
        ...
```

We now have our content in place, but it has no layout.

<a name="study-custom-item-layout"></a>

#### Laying out the content

When laying out details content:

- Place the most distinctive and relevant piece of content at the top left. Set it in bold using the strong [text style](/components/titles-and-text/text-style) variation.
- Arrange secondary content to the right, and if necessary, below.

To make use of the available space on wide screens, some content can be arranged in columns. Implementing this requires some care, since items aren’t aware of each other like in a data table. Column alignment works best for content that’s short and predictable in length.

Use the following guidelines:

- Estimate the maximum expected length of the content and add a buffer.
- Set this as the minimum width of the content element. Using a minimum width ensures that if content occasionally exceeds the expected width, it won’t break the layout.
- Choose the alignment of text within the container. Numbers should be right-aligned.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of column-aligned content](/public_images/resource-list/study-list-item-column-alignment@2x.png)

</div>

To accommodate smaller screen sizes, follow these guidelines:

- As screen size is reduced, alter the layout by stacking some content elements. Layout changes should happen at the same point for all items.
- As the layout stacks, remove column alignment and any minimum widths.
- On small screens, when multiple pieces of content fit on a single line, use a bullet character to separate them.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Preview of customer list item](/public_images/resource-list/study-list-item-content-stacking@2x.png)

</div>

When laying out media content:

- If the resource doesn’t have a visual representation, it can be left out.
- Alter size of the media content across screen sizes to improve content density and visual alignment.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of resizing media based on screen size](/public_images/resource-list/study-list-item-media-sizing@2x.png)

</div>

##### Building it

To handle the layout, we’ll need some class names and some wrapping markup.

```jsx
  ...
    <div className="CustomerListItem">
      <ResourceList.Item {...rest} media={media} accessibilityLabel={`View details for ${name}`}>
        <h3 className="CustomerListItem__Title">{name}</h3>
        <div className="CustomerListItem__Location">{location}</div>
        <div className="CustomerListItem__Orders">
          <div className="CustomerListItem__OrderCount">
            {orderCount} {orderCount === 1 ? 'order' : 'orders'}
          </div>
          <div className="CustomerListItem__TotalSpent">{totalSpent} spent</div>
        </div>
      </ResourceList.Item>
    </div>
  ...
```

And we’ll need to write some CSS. We can import our (so far empty) CSS file from our component.

```jsx
// CustomerListItem.js
import './CustomerListItem.css';
```

In the CSS itself, we’re going to start mobile first. We’ll open up the CSS file we just imported and write some styles for our content elements:

```css
.CustomerListItem {
}

.CustomerListItem__Title {
  font-weight: 600;
}

.CustomerListItem__Orders {
  display: flex;
  align-items: center;
}

.CustomerListItem__Orders > *:not(:first-child)::before {
  content: '•';
  margin: 0 4px;
  color: #919eab; /* ink, lightest */
}

.CustomerListItem__OrderCount {
  white-space: nowrap;
}

.CustomerListItem__TotalSpent {
  display: flex;
  min-width: 0;
  justify-content: flex-end;
}
```

Note that we’ve annotated the colors here to show that they correspond to the [Polaris color palette](https://polaris.shopify.com/design/colors#section-color-palette).

Now that we have our small screen layout, we can layer on the layouts for medium and wide screens. This requires some additional wrappers. With this extra markup, it’s a good time to split out some of this out to clean up the code:

```jsx
  ...
  const profile = (
    <div className="CustomerListItem__Profile">
      <h3 className="CustomerListItem__Title">{name}</h3>
      <div className="CustomerListItem__Location">{location}</div>
    </div>
  );

  const orders = (
    <div className="CustomerListItem__Orders">
      <div className="CustomerListItem__OrderCount">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'}
      </div>
      <div className="CustomerListItem__TotalSpent">
        {totalSpent} spent
      </div>
    </div>
  );

  return (
    <div className="CustomerListItem">
      <ResourceList.Item {...rest} media={media} accessibilityLabel={`View details for ${name}`}>
        <div className="CustomerListItem__Main">
          {profile}
          {orders}
        </div>
      </ResourceList.Item>
    </div>
  );
}
```

Now we can write our styles:

```css
... @media (min-width: 640px) {
  .CustomerListItem__Main {
    display: flex;
  }

  .CustomerListItem__Main > *:not(:last-child) {
    margin-right: 20px;
  }

  .CustomerListItem__Orders {
    flex: 1;
    justify-content: flex-end;
  }

  .CustomerListItem__Orders > *:not(:first-child)::before {
    display: none;
  }

  .CustomerListItem__OrderCount {
    min-width: 80px;
  }

  .CustomerListItem__TotalSpent {
    min-width: 168px;
  }
}

@media (min-width: 800px) {
  .CustomerListItem__Profile {
    display: flex;
    flex-wrap: wrap;
  }

  .CustomerListItem__Profile > *:not(:last-child) {
    margin-right: 12px;
  }
}
```

<a name="study-custom-item-conditional-content"></a>

#### Adding conditional content

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of conditionally showing customer notes](/public_images/resource-list/study-list-item-conditional-content@2x.png)

</div>

Usually each list item contains the same content elements. When a particular resource is in a noteworthy state, additional content can be shown even though it’s not displayed with other items. For example, merchants can add a customer note on the customer’s details page. This is information merchants took time to write down, so it’s worth surfacing in the list.

Unlike a customer’s name, we want to show this customer note only if it’s present. A good way to display conditional content in a resource list item is to use the exception list component (coming soon).

Actions can also be presented conditionally, based on the state of the item. For example, for customers that have an open order, we can highlight this and provide a link to those orders.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of conditionally showing a link to open orders](/public_images/resource-list/study-list-item-conditional-actions@2x.png)

</div>

##### Building it

To build this, we’ll add a couple new values to our data and accept them as props:

```jsx
// App.js
...
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
    openOrderCount: 2,
    openOrdersUrl: 'orders/1456',
  },
  ...
```

We’ll need to import some additional components from Polaris…

```jsx
  ...
  ExceptionList,
  Button,
} from '@shopify/polaris';
...
```

…and use them, along with our new data, to render an exception list and a button under the right conditions:

```jsx
...
export default function CustomerListItem(props) {
  const {
    avatarSource,
    name,
    location,
    orderCount = 0,
    totalSpent = '$0.00',
    note,
    openOrderCount,
    openOrdersUrl,
    ...rest,
  } = props;

  ...

  let exceptions = [];
  let conditionalAction = null;

  if (note) {
    exceptions.push({ icon: 'notes', summary: note });
  }

  if (openOrderCount !== undefined) {
    const label = openOrderCount === 1 ? 'order' : 'orders';
    const summary = `${openOrderCount} open ${label}`;
    exceptions.push({ status: 'warning', icon: 'alert', summary });
    conditionalAction = (
      <Button plain url={openOrdersUrl} external>
        View open orders
      </Button>
    );
  }

  const exceptionList = exceptions.length
    ? (
      <div className="CustomerListItem__Exceptions">
        <ExceptionList items={exceptions} />
      </div>
    )
    : null;

  const conditionalActions = conditionalAction
    ? (
      <div className="CustomerListItem__ConditionalActions">
        {conditionalAction}
      </div>
    )
    : null;

  return (
    <div className="CustomerListItem">
      <ResourceList.Item {...rest} media={media} accessibilityLabel={`View details for ${name}`}>
        <div className="CustomerListItem__Main">
          {profile}
          {orders}
        </div>
        {exceptionList}
        {conditionalActions}
      </ResourceList.Item>
    </div>
  );
}
```

We can finish this off with a couple of simple styles:

```css
/* CustomerListItem.css */
...
.CustomerListItem__TotalSpent {
  display: flex;
  min-width: 0;
  justify-content: flex-end;
}

.CustomerListItem__Exceptions {
  margin-top: 4px;
}

.CustomerListItem__ConditionalActions {
  margin-top: 4px;
}
...
```

<a name="study-custom-item-shortcut-actions"></a>

#### Adding shortcut actions to resource list items

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Example of a shortcut to a customer’s latest order](/public_images/resource-list/study-list-item-shortcut-actions@2x.png)

</div>

Occasionally a resource has an action that merchants use a lot. Fulfilling orders is a good example. This action is not only popular, it’s the most important action for open orders.

It makes sense to surface this key action from the details page on each list item, but adding this action to each item would be visually repetitive.

Shortcut actions resolve this. They provide a way to promote popular actions by showing them when merchants hover their mouse over a list item. As long as the shortcut action remains available on the resource’s details page, merchants using devices without a mouse can still access them.

Our customer list item can benefit from a shortcut action that lets merchants jump to a customer’s most recent order.

##### Best practices

Shortcut actions on resource list items must:

- Be present on the resource’s details page so they’re accessible without a mouse.

Shortcut actions should:

- Only be provided for actions that are part of a critical, common merchant task.
- Be available on every item in the list. If the state of a particular resource doesn’t permit the action, it can be left out.

##### Content guidelines

Shortcut actions should:

- Not include the noun from their label if the noun refers to the resource itself. For example, for a list of orders:

  <!-- usagelist -->

  #### Do

  - Start fulfilling

  #### Don’t

  - Start fulfilling order

  <!-- end -->

- Use the full verb + noun formula for actions that refer to another object.

  <!-- usagelist -->

  #### Do

  - View latest order

  #### Don’t

  - Latest order

  <!-- end -->

##### Building it

Shortcut actions can be defined as part of our custom list item, or we can leave it up to the developer using our component to define them for each list, just as they would using `ResourceList.Item`.

If we were to build a shortcut action into the custom item, we could offer merchants a link to the customer’s most recent order instead of conditional actions. We could add a prop to allow this:

```jsx
    ...
    openOrderCount,
    openOrdersUrl,
    latestOrderUrl,
    ...rest,
  } = props;

  ...

  const shortcutActions = openOrdersUrl
    ? [{ content: 'View latest order', url: openOrdersUrl }]
    : null;

  return (
    <div className="CustomerListItem">
      <ResourceList.Item
        {...rest}
        media={media}
        shortcutActions={shortcutActions}
        accessibilityLabel={`View details for ${name}`}
      >
      ...
```

With that, our custom list item is done.

<!-- resources -->

#### Resources

##### Get the example code

- https://github.com/Shopify/polaris-resource-list-examples/tree/v0.1.0/src/components/CustomerListItem
- View example code for custom resource list items
- dev

<!-- end -->

Now let’s save our merchants some time by using more features of the resource list component.

<a name="study-bulk-actions"></a>

### Adding bulk actions to a resource list

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Image showing bulk selection and actions](/public_images/resource-list/study-bulk-lead@2x.png)

</div>

Resource lists support optional bulk actions. These allow merchants to select items and perform an action on the selection.

Taking action on many items at once can save merchants a lot of time. However, it can also be difficult to undo. Merchants need to have a high degree of confidence that they aren’t making mistakes in bulk.

- Be deliberate about content elements shown on each list item. Make sure merchants have the content and context they need to be confident about taking action on many resources at once.
- Provide [conditional content](#study-custom-item-conditional-content) to make merchants aware when a resource is in a notable or exceptional state.

Because resource lists prioritize acting on individual items, selection checkboxes are hidden by default on small screens to save space for content. A bulk actions mode can be toggled on or off using a button that is made visible at these screen sizes.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Sequence showing bulk actions on a small device](/public_images/resource-list/study-bulk-narrow@2x.png)

</div>

Up to two frequently-used bulk actions may be visually promoted outside of the actions menu to improve ease of access and discoverability. On narrower screens, promoted actions move back into the actions menu, but always appear at the top of the list.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Promoted actions on wide and narrow screens](/public_images/resource-list/study-bulk-promoted@2x.png)

</div>

<a name="study-bulk-actions-best-practices"></a>

#### Best practices

Bulk actions are optional. If a resource list is always very short, or if there’s no action that makes sense for merchants to perform in bulk, don’t offer bulk actions.

When offering bulk actions, they should:

- Save merchants time (it makes sense to take the action on many resources at once)
- Warn merchants when a bulk action is irreversible using a confirmation modal
- Be shown as promoted bulk actions if they are frequently used
- Be shown in the in order they are most often used

<a name="study-bulk-actions-content-guidelines"></a>

#### Content guidelines

Be strategic about what type of buik actions you provide to merchants—ask yourself if they’ll save merchants time.

##### Button and menu item copy

Bulk action buttons and menu items should use the full verb + noun pattern.

<a name="study-bulk-actions-applying"></a>

#### Applying the guidelines

For our customers list, we’ve decided to offer the following bulk actions:

| Bulk action copy | Notes                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Edit customers   | Opens the bulk editor to allow mass edits. This will be a primary bulk action.              |
| Add tags         |                                                                                             |
| Remove tags      |                                                                                             |
| Delete customers | Should present a confirmation modal to ensure merchants really intend a bulk delete action. |

<a name="study-bulk-actions-building"></a>

#### Building it

We’ll start where we left off previously, with our items being rendered.

Now we’ll add the bulk actions. We’ll need to do several things to get this wired up:

1.  Define our bulk actions and pass them to the resource list
2.  Add a handler to respond when merchants begin making a bulk selection
3.  Add a way to keep track of which items have been selected and make sure our component knows, so it can display the change

The way we keep track of the current selection is with state.

```jsx
...
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  render() {
    const { selectedItems } = this.state;

    return (
      <ResourceList
        resourceName={resourceName}
        items={customers}
        renderItem={(customer) => <CustomerListItem {...customer} />}
        selectedItems={selectedItems}
        onSelectionChange={this.handleSelectionChange}
        promotedBulkActions={[
          { content: 'Edit customers' },
        ]}
        bulkActions={[
          { content: 'Add tags' },
          { content: 'Remove tags' },
          { content: 'Delete customers' },
        ]}
      />
    );
  }

  handleSelectionChange(selectedItems) {
    this.setState({ selectedItems });
  }
}
```

This allows merchants to make a selection and see the change. Next, we’ll wire up the bulk action buttons.

```jsx
...
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
  }

  render() {
    const { selectedItems } = this.state;

    return (
      <ResourceList
        ...
        promotedBulkActions={[
          { content: 'Edit customers', onAction: this.handleBulkEdit },
        ]}
        bulkActions={[
          { content: 'Add tags', onAction: this.handleBulkAddTags },
          { content: 'Remove tags', onAction: this.handleBulkRemoveTags },
          { content: 'Delete customers', onAction: this.handleBulkDelete },
        ]}
      />
    );
  }

  handleSelectionChange(selectedItems) {
    this.setState({ selectedItems });
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // A Flash message should be displayed to confirm that async process
    // has started.
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // Since this action destroys resources in bulk, show a
    // confirmation modal before completing the action.
  }
}
```

If you’re new to React or ES2015 you might be wondering about the lines in our constructor that re-assign our handlers. This is a pattern that ensures `this` in our callbacks is correctly bound to the instance. Doing so in the class constructor helps ensure good performance.

<a name="study-sorting"></a>

### Adding sorting to the list

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Detail of the resource list header showing the sort control](/public_images/resource-list/study-sort-control@2x.png)

</div>

When merchants sort a list of resources they’re changing the order of the entire set. This is different from filtering, which is when the list of resources is narrowed down to a subset of the original list.

Whether or not you provide sort options, resource lists should have a default sort order that makes sense to merchants and supports their most common tasks.

When you provide sort options to merchants, they’re presented using a [select component](/components/forms/select) placed in a standard position in the list header. Each option represents the content element to sort by and a sort direction (ascending or descending).

<a name="study-sorting-best-practices"></a>

#### Best practices

Sort options should:

- Be offered for long lists, especially paginated lists.
- Usually correspond to visible content elements in the list, but don’t have to.
- Avoid offering more than about 8 sort options. Use research to determine the most common ways merchants want to sort a particular list.

<a name="study-sorting-content-guidelines"></a>

#### Content guidelines

A sort order is always based on a content element, like the customer name or the number of orders. For now, let’s refer to this content element as the “sort basis”.

1.  The basic content formula for sort options is {sort direction} + {sort basis}.

    The sort direction should consist of words like “Most”/“Least”, “High”/“Low”, or “Newest”/“Oldest”.

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    Most spent<br/>
    Least spent

    #### Don’t

    _Sort by_<br/>
    High spend<br/>
    Low spend

    <!-- end -->

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    High conversion<br/>
    Low conversion

    #### Don’t

    _Sort by_<br/>
    Largest conversion<br/>
    Smallest conversion

    <!-- end -->

    The sort basis can consist of multiple words to avoid ambiguity.

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    Most online store visits

    #### Don’t

    _Sort by_<br/>
    Most visits

    <!-- end -->

    Avoid using multiple words for the sort direction. Adding “-est” may help.

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    Newest update<br/>
    Oldest update

    #### Don’t

    _Sort by_<br/>
    Most recent update<br/>
    Least recent update

    <!-- end -->

2.  If sorting alphabetically, the formula is slightly different. Indicate the sort direction with “A–Z” or “Z–A” at the end of the text, without parentheses. Note the use of an en dash without spaces on either side.

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    Product title A–Z<br/>
    Product title Z–A

    #### Don’t

    _Sort by_<br/>
    Product title (A - Z)<br/>
    Product title (Z - A)

    <!-- end -->

3.  Sometimes it doesn’t make sense to offer both sort directions, such as when sorting by overall relevance. It’s not a requirement to offer both directions. When offering a single sort direction, the sort direction text can be omitted from the formula.

    <!-- usageblock -->

    #### Do

    _Sort by_<br/>
    Relevance

    #### Don’t

    _Sort by_<br/>
    Most relevant<br/>
    Least relevant

    <!-- end -->

<a name="study-sorting-applying"></a>

#### Applying the guidelines

Based on merchant research and following the best practices and content guidelines, we’ve decided to offer the following options for our customer list:

| Sort option                           | Copy          |
| ------------------------------------- | ------------- |
| Date updated (newest first) _Default_ | Newest update |
| Date updated (oldest first)           | Oldest update |
| Lifetime spent (highest first)        | Most spent    |
| Order count (highest first)           | Most orders   |
| Customer last name (A–Z)              | Last name A–Z |
| Customer last name (Z–A)              | Last name Z–A |

<a name="study-sorting-building"></a>

#### Building it

We’ll start where we left off, with bulk actions in place. Remember that even before adding sort options, our customer data has already been sorted by most recent update, since this is most helpful to merchants.

As with bulk actions, there are broadly three parts to the implementation:

1.  Defining the sort options and passing them to our list
1.  Tracking the currently selected option in state and making sure our list receives the value in `render`
1.  Setting up a handler to respond to and update the state when merchants change the sort option

```jsx
...
const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
    }
    ...
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  render() {
    const {selectedItems, sortValue} = this.state;

    return (
      <ResourceList
        ...
        sortOptions={sortOptions}
        sortValue={sortValue}
        onSortChange={this.handleSortChange}
      />
    );
  }

  handleSortChange(sortValue) {
    this.setState({ sortValue });
  }

  handleSelectionChange(selectedItems) {
    this.setState({ selectedItems });
  }
  ...
```

We still have one issue though: our items haven’t been re-sorted. To do this, we’ll need to move the items into state. When our sort change handler is called, we’ll build a new array of options and update the items in state.

The actual logic used to build the new items array is dependent on your app, and so the implementation here has been left as a stub. However, it will likely involve fetching new item data from the server.

```jsx
...
const sortOptions = [
  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
  { label: 'Most spent', value: 'TOTAL_SPENT_DESC' },
  { label: 'Most orders', value: 'ORDER_COUNT_DESC' },
  { label: 'Last name A–Z', value: 'ALPHABETICAL_ASC' },
  { label: 'Last name Z–A', value: 'ALPHABETICAL_DESC' },
];

// Not implemented
function fetchCustomers() {
  return customers;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
    }

    ...
  }

  render() {
    const { items, selectedItems, sortValue } = this.state;

    return (
      <ResourceList
        ...
        items={items}
        ...
        sortOptions={sortOptions}
        sortValue={sortValue}
        onSortChange={this.handleSortChange}
      />
    );
  }

  handleSortChange(sortValue) {
    const items = fetchCustomers();
    this.setState({ items, sortValue });
  }
  …
```

<a name="study-filtering"></a>

### Adding filtering to the list

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Filter control example](/public_images/resource-list/filter-control-example@2x.png)

</div>

Filtering allows a resource list to be narrowed based on one or more criteria. The resource list component provides a standard filter control.

<a name="study-filtering-best-practices"></a>
<a name="study-filtering-content-guidelines"></a>

#### Best practices and content guidelines

For filtering guidelines, see the corresponding section under the resource list filter control subcomponent:

- [Resource list filter control best practices](#subcomponent-filter-control-best-practices)
- [Resource list filter control content guidelines](#subcomponent-filter-control-content-guidelines)

<a name="study-filtering-applying"></a>

#### Applying the guidelines

Based on merchant research and following the best practices and content guidelines, we’ve decided to offer the following filtering options:

| Filter label           | Operator text   | Filter input                                                                             |
| ---------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| Money spent            | is greater than | _TextField_                                                                              |
| Number of orders       | is greater than | _TextField_                                                                              |
| Order date             | is              | In the last week<br/>In the last month<br/>In the last three months<br/>In the last year |
| Is an email subscriber | &nbsp;          | Yes<br/>No                                                                               |
| Tagged with            | &nbsp;          | _Textfield_                                                                              |
| Located in             | country         | _Textfield_                                                                              |

<a name="study-filtering-building"></a>

#### Building it

We’ll start with the bulk actions and sorting we added previously and create an object representing the available filters.

```jsx
// App.js
...
const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText:'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText:'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: [
      'Yes',
      'No',
    ],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
  },
];
...
```

Resource list doesn’t accept these available filters directly. Instead, it delegates rendering of the filter control to a separate component. Here we’ll use the built-in [resource list filter control](#subcomponent-filter-control).

```jsx
  ...
  render() {
    return (
      <ResourceList
        ...
        onSortChange={this.handleSortChange}
        filterControl={
          <ResourceList.FilterControl
            filters={availableFilters}
          />
        }
      />
    );
  }
  ...
```

Next, we need to deal with state. We’ll add 2 new properties to our state object. One will handle the text input in the filter control’s search field. The other property will handle the rest of the filters. As we did in our sorting implementation, we’ll add handler methods that call `setState` to update the UI when merchants change the filters.

```jsx
...
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: '',
    }
    ...
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  render() {
    return (
      const {
        items,
        selectedItems,
        sortValue,
        appliedFilters,
        searchValue
      } = this.state;

      <ResourceList
        ...
        sortOptions={sortOptions}
        sortValue={sortValue}
        onSortChange={this.handleSortChange}
        filterControl={
          <ResourceList.FilterControl
            filters={availableFilters}
            appliedFilters={appliedFilters}
            onFiltersChange={this.handleFiltersChange}
            searchValue={searchValue}
            onSearchChange={this.handleSearchChange}
          />
        }
      />
    );
  }

  handleFiltersChange(appliedFilters) {
    const items = fetchCustomers();
    this.setState({ items, appliedFilters });
  }

  handleSearchChange(searchValue) {
    const items = fetchCustomers();
    this.setState({ items, searchValue });
  }
  ...
}
```

As with sorting, exactly how the new items array is generated depends on your application, and so the implementation here is left as a stub. However, it will likely involve fetching new item data from the server.

<a name="study-pagination"></a>

### Adding pagination to the list

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![A resource list with pagination](/public_images/resource-list/study-pagination@2x.png)

</div>

Resource lists can be long. To make the list digestible, it should be split into pages at 50 items or fewer. Use the [pagination component](/components/navigation/pagination) to allow navigation between pages.

Place the pagination immediate below the resource list.

Pagination interacts with bulk actions. When a resource list is paginated, the Select all control selects only the visible items. You can offer the option to select everything in the entire list.

<div class="TypeContainerImage TypeContainerImage--PageBackground">

![Selecting across pages in a paginated list](/public_images/resource-list/study-pagination-bulk@2x.png)

</div>

<a name="study-pagination-best-practices"></a>

#### Best practices for pagination

Resource lists should:

- Have a URL for each page.
- Be paginated when they have more than 50 items.
- Disable the pagination component’s previous (or next) button on the first (or last) page in the list.

Align the pagination controls to the left, or centered. The exact layout is flexible.

<a name="study-pagination-building"></a>

#### Building it

The first thing we’ll need to do is build a simple component to handle our pagination layout. Like our custom list item, we’ll add a component to our local components directory:

```
my-app/
  README.md
  node_modules/
  package.json
  src/
    components/
      CustomerListItem/
        CustomerListItem.jsx
        CustomerListItem.css
        index.js
      CustomerListFooter/
        CustomerListFooter.jsx
        CustomerListFooter.css
        index.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
```

```css
/* CustomerListFooter.css */
.CustomerListFooter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  border-top: 1px solid #dfe4e8; /* sky */
}
```

```jsx
// CustomerListFooter.js
import React from 'react';

import './CustomerListFooter.css';

export default function CustomerListFooter(props) {
  return <div className="CustomerListFooter">{props.children}</div>;
}
```

```jsx
// index.js
import CustomerListFooter from './CustomerListFooter';
export default CustomerListFooter;
```

Now we can use this component to add our pagination.

```jsx
import React from 'react';
import {
  Page,
  Card,
  ResourceList,
  Pagination,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';
import CustomerListFooter from './components/CustomerListFooter';

...

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: '',
      isFirstPage: true,
      isLastPage: false,
    }
    ...
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  render() {
    const {
      items,
      selectedItems,
      sortValue,
      appliedFilters,
      searchValue,
      isFirstPage,
      isLastPage,
    } = this.state;

    const paginationMarkup = items.length > 0
      ? (
        <CustomerListFooter>
          <Pagination
            hasPrevious={!isFirstPage}
            hasNext={!isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </CustomerListFooter>
      )
      : null;

    return (
      <ResourceList
        ...
      />

      {paginationMarkup}
    );
  }

  handlePreviousPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({ items, isFirstPage: true, isLastPage: false });
  }

  handleNextPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({ items, isFirstPage: false, isLastPage: true });
  }
  ...
```

If we want to allow selecting all items across all pages in our paginated resource list, we can enable this interaction with the `hasMoreItems` boolean prop.

```jsx
      ...
      <ResourceList
        ...
        filterControl={
          <ResourceList.FilterControl
            ...
          />
        }
        hasMoreItems
      />
```

<a name="study-end-result"></a>

### End result

And with that, our resource list UI is complete. Here is our finished code:

```jsx
// App.js
import React, {Component} from 'react';
import {
  Page,
  Card,
  ResourceList,
  FilterType,
  Pagination,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import CustomerListItem from './components/CustomerListItem';
import CustomerListFooter from './components/CustomerListFooter';

const resourceName = {
  singular: 'customer',
  plural: 'customers',
};

// This would normally come from an API request
const customers = [
  {
    id: 341,
    url: 'customers/341',
    avatarSource: 'https://avatars.io/twitter/maejemison',
    name: 'Mae Jemison',
    location: 'Decatur, USA',
    orderCount: 5,
    totalSpent: '$497.76',
    note: 'This customer is awesome! Make sure to treat them right',
    openOrderCount: 2,
    openOrdersUrl: 'http://google.com',
  },
  {
    id: 256,
    url: 'customers/256',
    avatarSource: 'https://avatars.io/twitter/Astro_Ellen',
    name: 'Ellen Ochoa',
    location: 'Los Angeles, USA',
    orderCount: 1,
    totalSpent: '$48.28',
  },
  {
    id: 145,
    url: 'customers/145',
    avatarSource: 'https://avatars.io/twitter/Astro_Soyeon',
    name: 'Yi So-Yeon',
    location: 'Gwangju, South Korea',
    orderCount: 2,
    totalSpent: '$73.98',
  },
];

const sortOptions = [
  {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
  {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
  {label: 'Most spent', value: 'TOTAL_SPENT_DESC'},
  {label: 'Most orders', value: 'ORDER_COUNT_DESC'},
  {label: 'Last name A–Z', value: 'ALPHABETICAL_ASC'},
  {label: 'Last name Z–A', value: 'ALPHABETICAL_DESC'},
];

const availableFilters = [
  {
    key: 'spentFilter',
    label: 'Money spent',
    operatorText: 'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderCountFilter',
    label: 'Number of orders',
    operatorText: 'is greater than',
    type: FilterType.TextField,
  },
  {
    key: 'orderDateFilter',
    label: 'Order date',
    operatorText: 'is',
    type: FilterType.Select,
    options: [
      'In the last week',
      'In the last month',
      'In the last three months',
      'In the last year',
    ],
  },
  {
    key: 'emailSubscriberFilter',
    label: 'Is an email subscriber',
    type: FilterType.Select,
    options: ['Yes', 'No'],
  },
  {
    key: 'tagsFilter',
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'locationFilter',
    label: 'Located in',
    operatorText: 'country',
    type: FilterType.Select,
  },
];

// Not implemented
function fetchCustomers(options) {
  return customers;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: customers,
      selectedItems: [],
      sortValue: 'DATE_MODIFIED_DESC',
      appliedFilters: [],
      searchValue: '',
      isFirstPage: true,
      isLastPage: false,
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleBulkEdit = this.handleBulkEdit.bind(this);
    this.handleBulkAddTags = this.handleBulkAddTags.bind(this);
    this.handleBulkRemoveTags = this.handleBulkRemoveTags.bind(this);
    this.handleBulkDelete = this.handleBulkDelete.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleSaveFilters = this.handleSaveFilters.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  render() {
    const {
      items,
      selectedItems,
      sortValue,
      appliedFilters,
      searchValue,
      isFirstPage,
      isLastPage,
    } = this.state;

    const paginationMarkup =
      items.length > 0 ? (
        <CustomerListFooter>
          <Pagination
            hasPrevious={!isFirstPage}
            hasNext={!isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </CustomerListFooter>
      ) : null;

    return (
      <Page title="Customers">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={items}
            renderItem={(customer) => <CustomerListItem {...customer} />}
            selectedItems={selectedItems}
            onSelectionChange={this.handleSelectionChange}
            promotedBulkActions={[
              {content: 'Edit customers', onAction: this.handleBulkEdit},
            ]}
            bulkActions={[
              {content: 'Add tags', onAction: this.handleBulkAddTags},
              {content: 'Remove tags', onAction: this.handleBulkRemoveTags},
              {content: 'Delete customers', onAction: this.handleBulkDelete},
            ]}
            sortOptions={sortOptions}
            sortValue={sortValue}
            onSortChange={this.handleSortChange}
            filterControl={
              <ResourceList.FilterControl
                filters={availableFilters}
                appliedFilters={appliedFilters}
                onFiltersChange={this.handleFiltersChange}
                searchValue={searchValue}
                onSearchChange={this.handleSearchChange}
                additionalAction={{
                  content: 'Save',
                  onAction: this.handleSaveFilters,
                }}
              />
            }
            hasMoreItems
          />

          {paginationMarkup}
        </Card>
      </Page>
    );
  }

  handlePreviousPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: true, isLastPage: false});
  }

  handleNextPage() {
    const items = fetchCustomers();
    // Todo: figure out how to determine if items represent
    // first or last page.
    this.setState({items, isFirstPage: false, isLastPage: true});
  }

  handleFiltersChange(appliedFilters) {
    const items = fetchCustomers();
    this.setState({items, appliedFilters});
  }

  handleSearchChange(searchValue) {
    const items = fetchCustomers();
    this.setState({items, searchValue});
  }

  handleSortChange(sortValue) {
    const items = fetchCustomers();
    this.setState({items, sortValue});
  }

  handleSelectionChange(selectedItems) {
    this.setState({selectedItems});
  }

  handleBulkEdit() {
    console.log('Opening bulk editor…');
  }

  handleBulkAddTags() {
    console.log('Asynchronously adding tags to customers…');
    // A Flash message should be displayed to confirm that async process
    // has started.
  }

  handleBulkRemoveTags() {
    console.log('Removing tags from customers…');
  }

  handleBulkDelete() {
    console.log('Handling bulk customer deletion…');
    // Since this action destroys resources in bulk, show a
    // confirmation modal (“Are you sure you want to delete {n}
    // customers”) before completing the action.
  }

  handleSaveFilters() {
    console.log('Saving current filters…');
  }
}

export default App;
```

---

## Accessibility

<!-- content-for: web -->

Use the resource list component to let merchants access and manage a list of items. To present a list of items in a tabular format for merchants to analyze, use the [data table component](https://polaris.shopify.com/components/lists-and-tables/data-table) instead.

### Structure

To show the relationships between items in the list, the resource list component produces a list wrapper (`<ul>`) and list items (`<li>`). This structure allows merchants who use screen readers to:

- Identify how many items are in the current resource list view
- Know that all of the list items go together

### Bulk actions

A resource list with bulk actions includes checkboxes that merchants can use to select all items or individual items. The component generates a unique `id` for each checkbox `<input>`, and each `<input>` is given a visually hidden label that leverages the `accessibilityLabel` for the item.

If some but not all items are checked, then the bulk checkbox uses `aria-checked="mixed"` to convey the partially selected state.

### Sorting and filtering

When merchants use sorting and filtering controls to update items in the list, the update is conveyed to screen readers with an `aria-live="polite"` attribute on the list.

### Navigation

Primarily, items in a resource list function as links to the full-page representations of the items. Each item should have a unique `name` prop. For each `ResourceList.Item`, the `accessibilityLabel` prop should be used to give the link a unique `aria-label`. The `aria-label` should convey the link’s purpose, using the `name` value. Merchants who use screen readers should be able to easily distinguish each link from the others.

### Keyboard

Keyboard users expect to give controls in the resource list keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards).

- Links can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key by default
- Checkboxes can be checked and unchecked with the <kbd>space</kbd> key by default
- Buttons added with other configurations can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key by default

If you add custom list items with additional controls or an alternate tool, then ensure that the controls:

- Can be used with the keyboard
- Receive keyboard focus in a logical order
- Display a visible focus indicator

<!-- /content-for -->
