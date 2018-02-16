---
name: Skeleton page
category: Feedback indicators
keywords:
  - SkeletonPage
  - skeleton
  - loading
  - page
---

# Skeleton page

Skeleton page is used with other skeleton loading components to provide a low fidelity representation of the user interface (UI) before content appears on the page. It improves load times perceived by merchants.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Things like slow internet connection, outdated hardware, and data fetching restrictions can create long wait times for merchants when loading data and content in the UI.

### Solution

With skeleton loading we can create the illusion of faster load times by showing layouts and static content before the data from the request is returned to the UI.

---

## Best practices

Skeleton page component should:

* Be used for pages where all content loads at the same time.
* Give merchants an indication of what the page layout will be once loaded. Do this by mimicking its layout similarly to the state that will be loaded.

---

## Content guidelines

Show page titles that never change for a page. For example, keep Products on the product index page, but use skeleton loading for product titles that change on the product show page. Don’t use filler content for titles that will change when the page fully loads.

Secondary actions are always represented with skeleton content. You can change the number of skeleton actions that best represent the number of actions once loaded.

<!-- usageblock -->

#### Do
Use skeleton loading for dynamic content but keep unchanging content for static content.
<div class="TypographyUsageBlockImg">![Image showing skeleton loading for changing content](skeleton/do-use-skeleton-for-changing-content.png)</div>

#### Don’t
Use filler content that will change when the page fully loads.
<div class="TypographyUsageBlockImg">![Image showing filler content that will change](skeleton/dont-use-filler-content-that-will-change.png)</div>

<!-- end -->

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| title | string | Page title, in large type | Empty String |
| fullwidth | boolean | Remove the normal max-width on the page |
| secondaryActions | number | Number of secondary page-level actions to display |
| breadcrumbs | boolean | Shows a skeleton over the breadcrumb |

## Examples

### Page with dynamic content

Use this component to compose a loading version of a page where the page title and header content are dynamic, meaning, the content changes.

```jsx
<SkeletonPage secondaryActions={2}>
  <Layout>
    <Layout.Section>
      <Card sectioned>
        <SkeletonBodyText />
      </Card>
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
      <Card sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    </Layout.Section>
    <Layout.Section secondary>
      <Card>
        <Card.Section>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={2} />
          </TextContainer>
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={1} />
        </Card.Section>
      </Card>
      <Card subdued>
        <Card.Section>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={2} />
          </TextContainer>
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
      </Card>
    </Layout.Section>
  </Layout>
</SkeletonPage>
```

### Page with static content

Use this component to compose a loading version of a page where the page title and header content are known and stay the same.

```jsx
<SkeletonPage
  title="Products"
  secondaryActions={2}
>
  <Layout>
    <Layout.Section>
      <Card sectioned>
        <SkeletonBodyText />
      </Card>
      <Card
        sectioned
        title="Images"
      >
        <SkeletonBodyText />
      </Card>
      <Card
        sectioned
        title="Variants"
      >
        <SkeletonBodyText />
      </Card>
    </Layout.Section>
    <Layout.Section secondary>
      <Card
        title="Sales channels"
      >
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={1} />
        </Card.Section>
      </Card>
      <Card
        title="Organization"
        subdued
      >
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
        <Card.Section>
          <SkeletonBodyText lines={2} />
        </Card.Section>
      </Card>
    </Layout.Section>
  </Layout>
</SkeletonPage>
```

---

## Related components

* Use the [Skeleton body text](/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](/components/feedback-indicators/skeleton-display-text) components to represent blocks of content.
* When giving feedback for in-context operations, use [Progress bar](/components/feedback-indicators/progress-bar) or [Spinner](/components/feedback-indicators/spinner) component.
