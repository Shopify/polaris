---
name: Pagination
category: Navigation
keywords:
  - lists
  - detail
  - page
  - pager
  - previous
  - next
  - navigation between pages
  - page arrows
  - list navigation
  - list arrows
  - list pagination
  - list pages
  - previous next buttons
  - previous buttons
  - next buttons
---

# Pagination

Use pagination to allow navigation between pages that represent an ordered collection of items.

---

## Best practices

Pagination should:

- Be placed at the bottom of a long list that has been split up into pages
- Navigate to the previous and next set of items in a paged list
- Be placed in the page header on detail pages (e.g. detail page for a product or order)
- Navigate to the previous and next object of the same type (e.g. product or order) on a detail page
- Hint when the merchants is at the first or the last page by disabling the corresponding button

---

## Content guidelines

There are no editable content elements that are specific to the pagination component.

---

## Examples

### Default pagination

Use for pagination at the bottom of lists.

```jsx
<Pagination
  hasPrevious
  onPrevious={() => {
    console.log('Previous');
  }}
  hasNext
  onNext={() => {
    console.log('Next');
  }}
/>
```

### Pagination with keyboard navigation

Use for keyboard navigation.

```jsx
<div style={{height: '100px'}}>
  <Pagination
    hasPrevious
    previousKeys={[74]}
    previousTooltip="j"
    onPrevious={() => {
      console.log('Previous');
    }}
    hasNext
    nextKeys={[75]}
    nextTooltip="k"
    onNext={() => {
      console.log('Next');
    }}
  />
</div>
```

---

## Related components

- To create stand-alone navigational links or calls to action, [use the button component](/components/actions/button)
- To embed actions or pathways to more information within a sentence, [use the link component](/components/navigation/link)
