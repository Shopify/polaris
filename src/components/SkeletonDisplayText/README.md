---
name: Skeleton display text
category: Feedback indicators
releasedIn: 1.7.0
keywords:
  - SkeletonDisplayText
  - skeleton
  - loading
  - page
---

# Skeleton display text

Skeleton display text is used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.

---

## Best practices

Skeleton display text component should:

- Give merchants an indication of what the page content will be once loaded
- Use real content for display text that never changes

---

## Content guidelines

### Skeleton display text

Show static display text that that never changes on a page. For example, keep page titles, such as Products on the product list page, but use skeleton loading for page titles that change on the product details page.

<!-- usageblock -->

#### Do

Show actual display text for static content and use skeleton display text for dynamic content.
![Image showing skeleton display text for dynamic content](/public_images/skeleton/do-show-display-text-for-static-content@2x.png)

#### Don’t

Use skeleton display text for static content or placeholder content for dynamic content.
![Image showing skeleton display text for static content and placeholder text for dynamic content](/public_images/skeleton/dont-use-skeleton-for-static-or-placeholder-content-for-dynamic@2x.png)

<!-- end -->

<!-- usageblock -->

#### Do

Show skeleton display text for dynamic page titles.

<div class="TypographyUsageBlockImg">

![Image showing skeleton display text for dynamic page title](/public_images/skeleton/do-use-skeleton-for-dynamic-page-titles@2x.png)

</div>

<!-- end -->

---

## Examples

### Medium and large display text

Use this component to represent medium and large display text such as large metrics on the reports list page, or for page titles.

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

- Use this component with [Skeleton page](https://polaris.shopify.com/components/feedback-indicators/skeleton-page) and [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) to represent the content of a page before it’s loaded.
- When giving feedback for in-context operations, use [Progress bar](https://polaris.shopify.com/components/feedback-indicators/progress-bar) or [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner) component.
