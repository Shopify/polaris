---
name: Media card
category: Structure
keywords:
  - MediaCard
  - actionable
  - updates
  - new features
  - Media card
  - image card
  - feature card
  - card with thumbnail
  - thumbnail card
---

# Media card

Media cards provide a consistent layout to present visual information to merchants. Visual media is used to provide additional context to the written information it's paired with.

---

## Best practices

Media cards should:

- Provide merchants with a clear call to action.
- Always pair text with a visual component, for example, body text paired with an image, video, etc.
- Use media to enhance the written content. The written content should be able to stand alone without an explanation from the paired media.
- Show targeted content toward specific audiences to maximize relevance.
- Be dismissable.

---

## Content guidelines

- Don’t use media cards as advertisements for your feature. Instead they should educate the merchant about how to accomplish tasks related to the section they’re in.

### Title

Media card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

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

---

## Examples

### Basic media card

Use to surface educational information about a feature or opportunity.

```jsx
<MediaCard
  title="Getting Started"
  primaryAction={{
    content: 'Learn about getting started',
    onAction: () => {},
  }}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
    }}
    src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</MediaCard>
```

### Basic media card with small visual

Use when there are limited vertical space, or when the card should be less prominent.

```jsx
<MediaCard
  title="Getting Started"
  primaryAction={{
    content: 'Learn about getting started',
    onAction: () => {},
  }}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
  size="small"
>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
    }}
    src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</MediaCard>
```

### Media card with secondary action

Use when there are two distinct actions merchants can take on the information in the card.

```jsx
<MediaCard
  title="Get closer to launching your store"
  primaryAction={{
    content: 'Add a product',
    onAction: () => {},
  }}
  secondaryAction={{
    content: 'Learn more',
    onAction: () => {},
  }}
  description="Start your business with eye-catching inventory."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{objectFit: 'cover', objectPosition: 'center'}}
    src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</MediaCard>
```

### Video card

Use to provide a consistent layout for contextual learning content. Use to wrap thumbnails of educational videos about Shopify features in context.

```jsx
<MediaCard
  title="Turn your side-project into a business"
  primaryAction={{
    content: 'Learn more',
    onAction: () => {},
  }}
  description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</MediaCard>
```

### Portrait video card

Use when vertical screen space is not limited or when the video card is the page’s primary content. For example, in an empty state.

```jsx
<MediaCard
  portrait
  title="Turn your side-project into a business"
  primaryAction={{
    content: 'Learn more',
    onAction: () => {},
  }}
  description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
  />
</MediaCard>
```

---

## Related components

- To create a video card, [use the video thumbnail component](https://polaris.shopify.com/components/images-and-icons/video-thumbnail)
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

The required `title` prop gives the media card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.

Use [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the media card is clear to all merchants, including those with issues related to reading and language.

<!-- /content-for -->
