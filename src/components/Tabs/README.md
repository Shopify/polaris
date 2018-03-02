---
name: Tabs
category: Navigation
keywords:
  - layout
  - navigate
  - organize
  - list views
  - list filters
  - fitted tabs
---

# Tabs
Use to alternate among related views within the same context.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants benefit from several different views into the same or closely related content to accomplish different tasks. They also need to be able to navigate to sub-views inside their current view.

### Solution

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
class TabsExample extends React.Component {
  state = {
    selected: 0,
  };

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected: selectedTabIndex});
  }

  render() {
    const tabs = [
      {
        id: 'all-customers',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content',
      },
      {
        id: 'accepts-marketing',
        content: 'Accepts marketing',
        panelID: 'accepts-marketing-content',
      },
      {
        id: 'repeat-customers',
        content: 'Repeat customers',
        panelID: 'repeat-customers-content',
      },
      {
        id: 'prospects',
        content: 'Prospects',
        panelID: 'prospects-content',
      }
    ];

    return (
      <div style={{height: '130px'}}>
        <Tabs
          tabs={tabs}
          selected={this.state.selected}
          onSelect={this.handleTabChange}
        />
        <div style={{padding: '1.6rem'}}>
          <p>Tab {this.state.selected} selected</p>
        </div>
      </div>
    );
  }
}
```

### Fitted tabs

Use when tabs contain a few (2 or 3) items within a narrow column.

```jsx
class FittedTabsExample extends React.Component {
  state = {
    selected: 0,
  };

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected: selectedTabIndex});
  }

  render() {
    const tabs = [
      {
        id: 'all-customers',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content',
      },
      {
        id: 'accepts-marketing',
        content: 'Accepts marketing',
        panelID: 'accepts-marketing-content',
      }
    ];

    return (
      <div style={{height: '130px'}}>
        <Tabs
          tabs={tabs}
          selected={this.state.selected}
          onSelect={this.handleTabChange}
          fitted
        />
        <div style={{padding: '1.6rem'}}>
          <p>Tab {this.state.selected} selected</p>
        </div>
      </div>
    );
  }
}
```
