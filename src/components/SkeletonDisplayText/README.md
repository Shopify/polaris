---
name: Skeleton display text
category: Feedback indicators
keywords:
  - skeleton
  - loading
  - page
---

# Skeleton display text

Skeleton display text is used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

Things like slow internet connection, outdated hardware, and data fetching restrictions can create long wait times for merchants when loading data and UI.

### Solution

With skeleton display text we can create the illusion of faster load times by showing layouts and static content before the data from the request is returned.

---

## Best practices

Skeleton display text component should:

* Give merchants an indication of what the page content will be once loaded
* Use real content for display text that never changes

---

## Content guidelines

### Skeleton display text

Show static display text that that never changes on a page. For example, keep page titles, such as Products on the product index page, but use skeleton loading for page titles that change on the product show page.

<!-- usageblock -->

#### Do
Show actual display text for static content and use skeleton display text for dynamic content.
![Image showing skeleton display text for dynamic content](skeleton/do-show-display-text-for-static-content.png)

#### Don’t
Use skeleton display text for static content or placeholder content for dynamic content.
![Image showing skeleton display text for static content and placeholder text for dynamic content](skeleton/dont-use-skeleton-for-static-or-placeholder-content-for-dynamic.png)

<!-- end -->

<!-- usageblock -->

#### Do
Show skeleton display text for dynamic page titles.
<div class="TypographyUsageBlockImg">![Image showing skeleton display text for dynamic page title](skeleton/do-use-skeleton-for-dynamic-page-titles.png)</div>

<!-- end -->

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| size | enum['small', 'medium', 'large', 'extraLarge'] | Size of the text | medium

## Examples

### Medium and large display text

Use this component to represent medium and large display text such as large metrics on the reports index page, or for page titles.

```jsx
<SkeletonDisplayText size="medium" />
```

### Extra large display text

Use this component to represent extra large display text.

```jsx
<SkeletonDisplayText size="extraLarge" />
```

### Small display text

Use this component to represent small display text such as content headings.

```jsx
<SkeletonDisplayText size="small" />
```

---

## Related components

Use this component with [Skeleton page](/components/feedback-indicators/skeleton-page) and [Skeleton body text](/components/feedback-indicators/skeleton-body-text) to represent the content of a page before it’s loaded.
