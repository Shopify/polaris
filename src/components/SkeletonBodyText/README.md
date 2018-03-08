---
name: Skeleton body text
category: Feedback indicators
keywords:
  - SkeletonBodyText
  - skeleton
  - loading
  - page
---

# Skeleton body text

Skeleton body text is used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Things like slow internet connection, outdated hardware, and data fetching restrictions can create long wait times for merchants when loading data and UI.

### Solution

With skeleton loading we can create the illusion of faster load times by showing layouts and static content before the data from the request is returned.

---

## Best practices

Skeleton body text component should:

* Be used with [Skeleton page](/components/feedback-indicators/skeleton-page) when page content loads all at once. Together, these components give merchants an indication of what the page layout will be once loaded.
* Be used on its own, inside any content container component (like a [card](/components/structure/card)), and when content loads after the main page load.
* Try to match the number of lines to the content being loaded so it gives an accurate representation.

---

## Content guidelines

### Skeleton body text

Show static content that never changes on a page and use skeleton loading for dynamic content. Skeleton body text can sometimes be used to represent non-typographic content such as forms. Don’t use placeholder content that will change when the page fully loads.

<!-- usageblock -->

#### Do
Use skeleton body text for dynamic content.
![Image showing skeleton body text for dynamic content](skeleton/do-use-skeleton-body-for-dynamic-content.png)

#### Don’t
Use skeleton body text for static content or use placeholder content for dynamic content.
![Image showing skeleton body text for static content](skeleton/dont-use-skeleton-body-for-static-or-placeholder-for-dynamic-text.png)

<!-- end -->

## Examples

### Default paragraph

Use this component to represent a block of content being loaded. For example, you could use it to represent an entire product description card on the product page.

```jsx
<SkeletonBodyText />
```

### Single line content

Use this component to represent a short, single line of text, like a timestamp.

```jsx
<SkeletonBodyText lines={1} />
```

---

## Related components

* Use this component with [Skeleton page](/components/feedback-indicators/skeleton-page) and [Skeleton display text](/components/feedback-indicators/skeleton-display-text) to represent the content of a page while it’s loading.
* When giving feedback for in-context operations, use [Progress bar](/components/feedback-indicators/progress-bar) or [Spinner](/components/feedback-indicators/spinner) component.
