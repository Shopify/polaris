---
title: Caption
description: Caption text size is smaller than the recommended size for general reading. On web, it should be used only in a graph or as a timestamp for a list item. On Android and iOS, it can also be used as help text or as other kinds of secondary text for list items.
category: Deprecated
keywords:
  - labels
  - text
  - microcopy
  - typographic
  - graph
  - timestamp
  - smaller text
  - smallest text
  - smaller than reading size text
  - time text
  - compact text
  - small text
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>
```

---

## Best practices

- Use for secondary labels in graphs and charts
- May be used for timestamps in lists of content
- Don’t use this component for other cases
- Don’t use this component for text longer than a few words
- Don’t use this component for aesthetic effect or to break from the standard text size

---

## Content guidelines

### Captions

Captions are primarily used in [data visualizations](https://polaris.shopify.com/design/data-visualizations). Stick to a few words and don’t use this component for complete sentences or longer content.

<!-- dodont -->

#### Do

- Use caption for labelling data visualizations
  ![Diagram of using captions to label graphs and other data content](/images/components/caption/do-use-caption-for-labeling-data-visualizations@2x.png)
- Received April 21, 2017

#### Don’t

- Order #1001 was received on April 21, 2017
- This is your recent activity

<!-- end -->

---

## Accessibility

Follow best practices for [data visualizations](https://polaris.shopify.com/design/data-visualizations) to ensure that the purpose of captions is clear to all merchants, including those with issues related to seeing or understanding data and complex information.
