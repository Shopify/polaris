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
examples:
  - fileName: tabs-default.tsx
    title: Default tabs
    description: >-
      Use for most cases, especially when the number of tabs may be more than
      three.
  - fileName: tabs-fitted.tsx
    title: Fitted tabs
    description: >-
      Use when tabs contain a few (2 or 3) items within a narrow
      column.
  - fileName: tabs-with-badge-content.tsx
    title: Tabs with badge content
    description: Use to inform a piece of information about the tabs.
  - fileName: tabs-with-custom-disclosure.tsx
    title: Tabs with custom disclosure
    description: Use to provide information about the popover contents
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
