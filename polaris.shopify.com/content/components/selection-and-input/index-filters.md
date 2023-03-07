---
title: Index filters
description: IndexFilters is a composite component that combines the filtering, searching, and sorting functionality of an IndexTable, with view management for a particular index.
category: Selection and input
keywords:
  - filters
  - filtering
  - filter control
  - tabs
  - index
  - list filter
  - table
examples:
  - fileName: index-filters-default.tsx
    title: Default
  - fileName: index-filters-with-pinned-filters.tsx
    title: With pinned filters
  - fileName: index-filters-with-filtering-mode.tsx
    title: Filtering mode default
  - fileName: index-filters-disabled.tsx
    title: Disabled
---

Merchants use filters to:

- view different subsets of items in a list or table
- filter by typing into a text field
- filter by selecting filters or promoted filters

The way that merchants interact with filters depends on the components that you decide to incorporate. In its simplest form, filters includes a text field and a set of filters, which can be displayed in different ways. What the filters are and how they’re exposed to merchants is flexible.

Merchants use the view management functionality to:

- control which view is currently visible for an index table
- rename the current view of an index table
- duplicate the current view of an index table
- edit the current filters and search terms of an index table
- delete the current view of an index table
- create a new view for an index table

You have control over which actions can be performed on a view, and also the ability to create new views for a particular index table.

## Associated components

- Refer to the Filters component for more information about the implementation of filters.
- Refer to the Tabs component for more information about the implemenetation of the view management.

---

## Accessibility

The filters component relies on the accessibility features of multiple other components:

- [Text field](https://polaris.shopify.com/components/selection-and-input/text-field)
- [Button](https://polaris.shopify.com/components/actions/button)
- [Popover](https://polaris.shopify.com/components/overlays/popover)

### Maintain accessibility with custom features

Since custom HTML can be passed to the component for additional actions, ensure that the filtering system you build is accessible as a whole.

All merchants must:

- be able to identify and understand labels for all controls
- be notified of state changes
- be able to complete all actions with the keyboard

---

## Best practices

The filters component should:

- help reduce merchant effort by promoting the filtering categories that are most commonly used
- include no more than 2 or 3 promoted filters
- consider small screen sizes when designing the interface for each filter and the total number filters to include
- use children only for content that’s related or relevant to filtering

---

## Content guidelines

### Text field

The text field should be clearly labeled so it’s obvious to merchants what they should enter into the field.

<!-- dodont -->

#### Do

- Filter orders

#### Don’t

- Enter text here

<!-- end -->

### Filter badges

Use the name of the filter if the purpose of the name is clear on its own. For example, when you see a filter badge that reads **Fulfilled**, it’s intuitive that it falls under the Fulfillment status category.

<!-- dodont -->

#### Do

- Fulfilled, Unfulfilled

#### Don’t

- Fulfillment: Fulfilled, Unfulfilled

<!-- end -->

If the filter name is ambiguous on its own, add a descriptive word related to the status. For example, **Low** doesn’t make sense out of context. Add the word “risk” so that merchants know it’s from the Risk category.

<!-- dodont -->

#### Do

- High risk, Low risk

#### Don’t

- High, Low

<!-- end -->

Group tags from the same category together.

<!-- dodont -->

#### Do

- (Unfulfilled, Fulfilled)

#### Don’t

- (Unfulfilled) (fulfilled)

<!-- end -->

If all tag pills selected: truncate in the middle

<!-- dodont -->

#### Do

- Paid, par… unpaid

#### Don’t

- All payment status filters selected, Paid, unpa…

<!-- end -->
