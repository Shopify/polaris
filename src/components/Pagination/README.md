---
name: Pagination
tags:
  - lists
  - detail
  - page
  - pager
  - previous
  - next
category: Navigation
---

# Pagination

Use pagination to allow navigation between pages that represent an ordered collection of items.

**Problem**

Long pages or lists of information can be overwhelming and hard to navigate. Alternatively, it can be a convenience to jump between objects related to each other in a sequence.

**Solution**

Pagination helps to break up long sections of information. Alternatively, pagination provides a shortcut to navigate between pages when they represent items within a collection.

> **Not what you're looking for?**
> * To create stand-alone navigational links or calls to action, [use the button component](/components/actions/button).
> * To embed actions or pathways to more information within a sentence, [use the link component](/components/navigation/link).

---

## Best practices

Pagination should:

* Be placed at the bottom of a long list that has been split up into pages
* Navigate to the previous and next set of items in a paged list
* Be placed in the page header on detail pages (e.g. detail page for a product or order)
* Navigate to the previous and next object of the same type (e.g. product or order) on a detail page
* Hint when the merchants is at the first or the last page by disabling the corresponding button

---

## Content guidelines

There are no editable content elements that are specific to the pagination component.


| Prop | Type | Description |
| ---- | ---- | ----------- |
| nextUrl | string | The URL of the next page |
| previousUrl | string | The URL of the previous page |
| hasNext | boolean | Whether there is a next page to show |
| hasPrevious | boolean | Whether there is a previous page to show |
| onNext | function | Callback when next button is clicked |
| onPrevious | function | Callback when previous button is clicked |


## Examples

### List pagination

Use for pagination at the bottom of lists.

```jsx
<Pagination
  hasPrevious
  onPrevious={() => {console.log('Previous')}}
  hasNext
  onNext={() => {console.log('Next')}} />
```

### Page header pagination

Use for pagination between detail pages, such as orders or products.

```jsx
<Page
  title="Jar With Lock-Lid"
  breadcrumbs={[
    {content: 'Products'},
  ]}
  primaryAction={{content: 'Save', disabled: true}}
  pagination={{
    hasPrevious: true,
    onPrevious: () => {console.log('Previous')},
    hasNext: true,
    onNext: () => {console.log('Next')},
  }}
>
  <p>Page content</p>
</Page>
```
