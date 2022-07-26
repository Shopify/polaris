---
name: Pagination
category: Navigation
keywords:
  - lists
  - detail
  - page
  - label
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

Use pagination to let merchants move through an ordered collection of items that has been split into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android, pagination uses infinite scrolling.

---

## Best practices

On all platforms, pagination should:

- Only be used for lists with more than 25 items

Web pagination should:

- Be placed at the bottom of a long list that has been split up into pages
- Pagination should navigate to the previous and next set of items in the paged list
- Hint when merchants are at the first or the last page by disabling the corresponding button

iOS and Android pagination should:

- Start loading items when merchants are close to the bottom, roughly 5 items from the end
- Show [a spinner](https://polaris.shopify.com/components/spinner) below the list to indicate that items have been requested

---

## Examples

### Default

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

### With keyboard navigation

Attach standard keyboard shortcuts to important pagination controls.

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

### With label

Add a label between navigation buttons to provide more context of the content being viewed by the user.

```jsx
<Pagination
  label="Results"
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

---

## Related components

- To see how pagination is used on a page, see the [page component](https://polaris.shopify.com/components/page)
- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](https://polaris.shopify.com/components/page-actions)
- The [resource list component](https://polaris.shopify.com/components/resource-list) is often combined with pagination to handle long lists of resources such as orders or customers
- To create stand-alone navigational links or calls to action, use the [button component](https://polaris.shopify.com/components/button)
- To embed actions or pathways to more information within a sentence, use the [link component](https://polaris.shopify.com/components/link)
