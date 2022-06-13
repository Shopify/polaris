---
name: Skeleton page
category: Feedback indicators
releasedIn: 1.7.0
keywords:
  - SkeletonPage
  - skeleton
  - loading
  - page
examples:
  - fileName: skeleton-page-with-dynamic-content.tsx
    title: Page with dynamic content
    description: >-
      Use this component to compose a loading version of a page where the page
      title and header content are dynamic, meaning, the content changes.
  - fileName: skeleton-page-with-static-content.tsx
    title: Page with static content
    description: >-
      Use this component to compose a loading version of a page where the page
      title and header content are known and stay the same.
---

# Skeleton page

Skeleton page is used with other skeleton loading components to provide a low fidelity representation of the user interface (UI) before content appears on the page. It improves load times perceived by merchants.

---

## Best practices

Skeleton page component should:

- Be used for pages where all content loads at the same time.
- Give merchants an indication of what the page layout will be once loaded. Do this by mimicking its layout similarly to the state that will be loaded.

---

## Content guidelines

Show page titles that never change for a page. For example, keep the title “Products” on the product list page, but use skeleton loading for titles that change on the product details page. Don’t use placeholder content for titles that will change when the page fully loads.

Secondary actions are always represented with skeleton content. You can change the number of skeleton actions that best represent the number of actions once loaded.

<!-- usageblock -->

#### Do

Use skeleton loading for dynamic content, and use actual content for content that doesn’t change.

<div class="TypographyUsageBlockImg">

![Image showing skeleton loading for changing content](/public_images/skeleton/do-use-skeleton-for-changing-content@2x.png)

</div>

#### Don’t

Use placeholder content that will change when the page fully loads. This will confuse merchants and create a jumpy loading experience.

<div class="TypographyUsageBlockImg">

![Image showing placeholder content that will change](/public_images/skeleton/dont-use-placeholder-content-that-will-change@2x.png)

</div>

<!-- end -->

---

## Related components

- Use the [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/feedback-indicators/skeleton-display-text) components to represent blocks of content.
- When giving feedback for in-context operations, use [Progress bar](https://polaris.shopify.com/components/feedback-indicators/progress-bar) or [Spinner](https://polaris.shopify.com/components/feedback-indicators/spinner) component.
