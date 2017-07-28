---
name: Tabs
tags:
  - layout
  - navigate
  - organize
category: Navigation
---

# Tabs
Use to alternate among related views within the same context.

**Problem**

Merchants benefit from several different views into the same or closely related content to accomplish different tasks. They also need to be able to navigate to sub-views inside their current view.

**Solution**

Tabs are a way to show related subsections of interface in relation to each other and allow merchants to move easily between them.

---

## Best practices

Tabs should:

- Represent the same kind of content, such as a list-view with different filters applied. Don’t use tabs to group content that is dissimilar.
- Only be active one at a time.
- Not force merchants to jump back and forth to do a single task. A merchant should be able to complete their work and find what they need under each tab.
- Not be used for primary navigation.

---

## Content guidelines

### Tabs

Tabs should:

- Be clearly labeled to help differentiate the different sections beneath them.
- Have short and scannable labels, generally kept to single word.
- Relate to the section of Shopify they’re on. Imagine the page section title is an invisible noun after the tab. For example, the tabs for the orders section are:

  * All
  * Open
  * Unfulfilled
  * Unpaid

The tabs for the gift cards section are:

  * All
  * New
  * Partially used
  * Used
  * Disabled

And for the customers section, the tabs are:

  * All
  * New
  * Returning
  * Abandoned checkouts
  * Email subscribers

Where possible, follow this pattern when writing tabs.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children* | React.ReactNode | Content to display in tabs |
| selected* | number | Index of selected tab |
| tabs* | TabDescriptor[] | List of tabs |
| fitted | boolean | Fit tabs to container |
| onSelect | function(selectedTabIndex: number) | Callback when tab is selected |

## Examples

### Default tabs

Use for most cases, especially when the number of tabs may be more than three.

```jsx
<Tabs
  selected={0}
  tabs={[
    {
      id: 'all-customers',
      title: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content',
    },
    {
      id: 'accepts-marketing',
      title: 'Accepts marketing',
      panelID: 'accepts-marketing-content',
    },
    {
      id: 'repeat-customers',
      title: 'Repeat customers',
      panelID: 'repeat-customers-content',
    },
    {
      id: 'prospects',
      title: 'Prospects',
      panelID: 'prospects-content',
    }
  ]}
/>
```

### Fitted tabs

Use when tabs contain a few (2 or 3) items within a narrow column.

```jsx
<Tabs
  fitted
  selected={0}
  tabs={[
    {
      id: 'all-customers',
      title: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content',
    },
    {
      id: 'accepts-marketing',
      title: 'Accepts marketing',
      panelID: 'accepts-marketing-content',
    }
  ]}
/>
```
