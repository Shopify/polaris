---
name: Tabs
category: Navigation
platforms:
  - android
  - ios
  - web
keywords:
  - layout
  - navigate
  - organize
  - list views
  - list filters
  - fitted tabs
  - segmented controls
  - scrollable
---

# Tabs

Use to alternate among related views within the same context.

---

## Best practices

Tabs should:

- Represent the same kind of content, such as a list-view with different filters applied. Don’t use tabs to group content that is dissimilar.
- Only be active one at a time.
- Not force merchants to jump back and forth to do a single task. Merchants should be able to complete their work and find what they need under each tab.
- Not be used for primary navigation.

---

## Content guidelines

### Tabs

Tabs should:

- Be clearly labeled to help differentiate the different sections beneath them.
- Have short and scannable labels, generally kept to single word.
- Relate to the section of Shopify they’re on. Imagine the page section title is an invisible noun after the tab. For example, the tabs for the orders section are:

  - All
  - Open
  - Unfulfilled
  - Unpaid

The tabs for the gift cards section are:

- All
- New
- Partially used
- Used
- Disabled

And for the customers section, the tabs are:

- All
- New
- Returning
- Abandoned checkouts
- Email subscribers

Where possible, follow this pattern when writing tabs.

---

## Examples

### Default tabs

Use for most cases, especially when the number of tabs may be more than three.

```jsx
function TabsExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

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
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section>
      </Tabs>
    </Card>
  );
}
```

<!-- content-for: android -->

![Default tabs on Android](/public_images/components/Tabs/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default tabs on iOS](/public_images/components/Tabs/ios/default@2x.png)

<!-- /content-for -->

### Fitted tabs

Use when tabs contain a few (2 or 3) items within a narrow column.

```jsx
function FittedTabsExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content',
    },
    {
      id: 'accepts-marketing-fitted',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-Ccontent',
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section>
      </Tabs>
    </Card>
  );
}
```

<!-- content-for: android -->

![Fixed tabs on Android](/public_images/components/Tabs/android/fixed@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

Also known as [Segmented controls](https://developer.apple.com/design/human-interface-guidelines/ios/controls/segmented-controls/) on iOS.

![Fixed tabs on iOS](/public_images/components/Tabs/ios/fixed@2x.png)

<!-- /content-for -->
