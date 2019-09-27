---
name: Caption
category: Titles and text
platforms:
  - android
  - ios
  - web
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
  - android
  - ios
---

# Caption

Caption text size is smaller than the recommended size for general reading. On web, it should be used only in a graph or as a timestamp for a list item. On Android and iOS, it can also be used as help text or as other kinds of secondary text for list items.

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

<!-- usagelist -->

#### Do

- Use caption for labelling data visualizations
  ![Diagram of using captions to label graphs and other data content](/public_images/typography/display-styles/do-use-caption-for-labeling-data-visualizations@2x.png)
- Received April 21, 2017

#### Don’t

- Order #1001 was received on April 21, 2017
- This is your recent activity

<!-- end -->

---

## Examples

### Default caption

Use to provide details in situations where content is compact and space is tight.

```jsx
<List>
  <List.Item>
    Order #1001 <Caption>Received April 21, 2017</Caption>
  </List.Item>
  <List.Item>
    Order #1002 <Caption>Received April 22, 2017</Caption>
  </List.Item>
</List>
```

<!-- content-for: android -->

![Default caption](/public_images/components/Caption/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default caption](/public_images/components/Caption/ios/default@2x.png)

<!-- /content-for -->

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

Follow best practices for [data visualizations](https://polaris.shopify.com/design/data-visualizations) to ensure that the purpose of captions is clear to all merchants, including those with issues related to seeing or understanding data and complex information.

<!-- /content-for -->
