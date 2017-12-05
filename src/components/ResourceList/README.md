---
name: Resource list
category: Lists
keywords:
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

# Resource List

Resource lists show a collection of objects of the same type in a list, such as a list of products. Resource lists are made up of individual resource items. Each item provides a summary of the object and normally links to a detail page.

---

## Resource list details

Resource items contain 3 main elements: attributes, exceptions, and secondary
actions:

* Attributes are the consistent pieces of content that merchants need to see on
each resource item. The standard resource item takes three text attributes and
a status badge.
* Exceptions are a list of out-of-the-ordinary states or attributes. Use them
to bring awareness to important information at the level of the list view.
Merchants should still navigate to a detail page get full context and actually
deal with any issues.
* Secondary actions allow merchants to perform up to two actions on the object
directly from the list, without navigating to a detail page.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants want to find a particular object, such as an order, among other similar objects. Once they locate the object, they need to be able to view it in more detail or take quick actions on it such as marking it as archived or fulfilled.

### Solution

Resource lists group similar types of objects into a list. Merchants can click or tap on list items to view more details. Optionally, actions from the detail view can also be made available to merchants at the list level as shortcuts.

---

## Best practices

Resource lists should:

* Present objects of the same type

Resource list items should:

* Provide enough attributes to identify a particular item among the others.
* Link to a detail page for the item.
* Present a status badge only when the object state requires action. Don’t show a status badge if the object has a “normal” status. For example, show a status badge of Hidden only on unpublished blog posts.
* Only use subdued text for empty attributes (e.g. “No supplier”, “No expected date”) or on timestamps.
* Surface key exceptions on items at the level of the list view. Merchants should still navigate to a detail page for full context and to act on exceptional circumstances.
* Only provide secondary actions if they represent common actions. Don’t provide more than two secondary actions.
* If a detail page can’t be provided:
    * Make sure secondary actions are set to be persistent so the actions are available to people on mobile devices.
    * Don’t show any exceptions.

---

## Content guidelines

### Attributes

Attributes should:

- Be as short as possible.

On a list of orders, the order number alone provides enough context.

<!-- usagelist -->
#### Do
- #1234

#### Don’t
- Order number #1234
<!-- end -->

- Use additional text to clarify their meaning when their value isn’t obvious on its own.

On a list of gift cards with an initial value and a balance:

<!-- usagelist -->
#### Do
- Value $200.00<br />Balance $128.34

#### Don’t
- $200.00<br />$128.34
<!-- end -->

On a list of blog posts:

<!-- usagelist -->
#### Do
- by John Doe

#### Don’t
- John Doe
<!-- end -->

- When adding additional text to clarify what an attribute means, don’t use colons if the text is equally clear without. Only use a colon when necessary.

<!-- usagelist -->
#### Do
- By John Doe

#### Don’t
- Author: John Doe
<!-- end -->

<!-- usagelist -->
#### Do
- Category: News

#### Don’t
- Category News
- News category
<!-- end -->

### Exceptions

Each exception entry is composed of a short title and an optional description.

Exception titles should:

- Be short and convey the key information about the exception (e.g.“High fraud risk”, “Not published on 2 channels”).

Exception descriptions should:

- Provide additional detail and are truncated on small screens.
- Separate lists of phrases with commas (e.g. “Suspicious bank, high order value, unverified shipping
address”).

### Secondary actions

Secondary actions should:

- Follow the same guidelines as [the button component](/components/actions/button).
- Use a single verb as their label, since the object on which they act should be the list item itself (e.g. “Edit”, “Delete”). Secondary actions should use the {noun} + {verb} format when necessary to avoid ambiguity (e.g. “View listing”).


| Prop | Type | Description |
| --- | --- | --- |
| items* | any[] | Item data; each item is passed to renderItem |
| renderItem* | function | Function to render each item |
| idForItem | function | Function to generate unique identifier for each item passed |


## Examples

### Simple resource list

Can be used to display a list of simple resources.

```jsx
<ResourceList
  items={[
    {
      url: '#',
      attributeOne: 'How to Get Value from Wireframes',
      attributeTwo: 'by Jonathan Mangrove',
      attributeThree: <TextStyle variation="subdued">Today, 7:14pm</TextStyle>,
    },
    {
      url: '#',
      attributeOne: 'Test blog post',
      attributeTwo: 'by Jonathan Mangrove',
      attributeThree: <TextStyle variation="subdued">Jan 14, 2016, 8:24am</TextStyle>,
      badges: [
        {content: 'Hidden'},
      ],
    },
  ]}
  renderItem={(item, index) => {
    return <ResourceList.Item key={index} {...item} />;
  }}
/>
```

### Products list

Can be used to display a list of products.

```jsx
<ResourceList
  items={[
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: 'Accessory by Marcuse',
      attributeThree: '12 in stock',
    },
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: 'Accessory by Marcuse',
      attributeThree: '11 in stock for 4 variants',
      exceptions: [
        {
          status: 'warning',
          title: 'Not published to 2 channels',
          description: 'Content didn’t meet requirements for: Facebook, Amazon'
        },
        {
          status: 'warning',
          title: 'Missing weights on 1 variant',
          description: 'Calculated shipping rates won’t be accurate'
        },
      ]
    },
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: 'Accessory by Marcuse',
      attributeThree: '43 in stock for 3 variants',
    },
  ]}
  renderItem={(item, index) => {
    return <ResourceList.Item key={index} {...item} />;
  }}
/>
```

### Product listings list (for channels)

Can be used to display product listings in a Shopify sales channel.

```jsx
<ResourceList
  items={[
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: <TextStyle variation="subdued">No variants</TextStyle>,
      actions: [{content: 'View listing'}],
      persistActions: true,
    },
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: '4 variants',
      attributeThree: <TextStyle variation="subdued">Not listed</TextStyle>,
      badges: [
        {
          status: 'warning',
          content: 'Needs review',
        }
      ],
    },
    {
      url: '#',
      media: <Thumbnail source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" />,
      attributeOne: 'Elegant necklace',
      attributeTwo: '3 variants',
      actions: [{content: 'View listing'}],
      persistActions: true,
    },
  ]}
  renderItem={(item, index) => {
    return <ResourceList.Item key={index} {...item} />;
  }}
/>
```

---

## Related components

* To display a list of checkboxes or radio buttons, [use the choice list component](/components/forms/choice-list)
* To display a simple list of related content, [use the list component](/components/lists/list)
* When text labels for each item are useful for describing the content, [use the description list component](/components/lists/description-list)
