---
name: Video card
category: Structure
keywords:
  - VideoCard
  - actionable
  - updates
  - new features
  - video card
  - feature card
  - card with thumbnail
  - thumbnail card
---

# Video card

Video cards provide a consistent layout for contextual learning system content. Use to wrap thumbnails of educational videos about Shopify admin features in context.

---

## Best practices

Video cards should:

- Clearly articulate the benefit of the feature and what it does in the context of where it is managed
- Provide merchants with a clear call to action
- Show targeted content toward specific user types where possible to maximize relevance and impact
- Use a video player with a thumbnail that helps to communicate the subject of the video or merchant benefit
- Be positioned at the bottom of the page to avoid getting in the way of a merchant task, unless used within an empty state
- Be dismissable

---

## Content guidelines

- Do not use video cards as advertisements for your feature. Instead they should educate the merchant about how to accomplish tasks related to the section they’re in.

### Title

Video card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them, especially something new. Don’t use permissive language like “you can”.

<!-- usagelist -->

#### Do

Get performance data for all of your sales channels.

#### Don’t

Now you can get performance data for all of your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information
  first
- Clear: use the verb “need” to help merchants understand when they’re required
  to do something

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

### Call to action

Buttons should be:

Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.

<!-- usagelist -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages
  action. To provide enough context to merchants use the {verb}+{noun} format on
  buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

View shipping settings

#### Don’t

View your settings

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

### Thumbnail

- Relevant: should describe the video through the use of images or be an image of a section in the video
- Follow the 16:9 ratio, otherwise the image may appear cropped
- If the thumbnail shows a person, avoid cropping the person’s head off

---

## Examples

### Basic video card

Use to surface educational information about a feature or opportunity in the context of where it is managed.

```jsx
<VideoCard
  title="Getting Started"
  primaryAction={[
    {
      content: 'Learn about getting started',
      onAction: () => {},
    },
  ]}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
  portrait
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</VideoCard>
```

### Video card with secondary action

Use when there are two distinct actions merchants can take on the information in the video.

```jsx
<VideoCard
  title="Getting Started"
  primaryAction={{
    content: 'Learn about getting started',
    onAction: () => {},
  }}
  secondaryAction={{
    content: 'Click here',
    onAction: () => {},
  }}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</VideoCard>
```

### Portrait video card

Use when vertical screen space is not limited or when the video card comprises the page's primary content. For example, in an empty state.

```jsx
<VideoCard
  portrait
  title="Getting Started"
  primaryAction={{
    content: 'Learn about getting started',
    onAction: () => {},
  }}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</VideoCard>
```

---

## Related components

- To group similar concepts and tasks together, [use the card component](https://polaris.shopify.com/components/structure/card)
- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/structure/layout)
- To explain a feature that merchants haven’t tried yet, [use the empty state component](https://polaris.shopify.com/components/structure/empty-state)

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

The required `title` prop gives the video card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

Use [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the video card is clear to all merchants, including those with issues related to reading and language.

<!-- /content-for -->
