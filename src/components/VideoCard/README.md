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
  - video card heading
  - video card body content
  - video card text
  - video card cta
  - video card call to action
  - video card button
  - video card with secondary cta
  - video card with secondary button
  - dismissible video card
  - card with thumbnail
  - thumbnail card
---

# Video card

Video cards are used to surface contextual videos and provide layouts and controls introduced
in the contextual learning system. This component makes presenting educational videos to merchants
more consistent, while providing the flexibility to configure a video player and its behaviour outside of the component.

---

## Best practices

Video cards should:

- Clearly articulate the benefit of the feature and what it does
- Provide merchants with a clear call to action
- Show targeted content toward specific user types where possible to maximize relevance and impact
- Use a thumbnail that helps to communicate the subject of the video or merchant benefit
- Can be displayed higher on the page in Empty States, but should be positioned at the bottom of the page
  in Non-Empty States to avoid getting in the way of a merchant task
- Video Cards should generally be dismissable
- Suggested Duration: Keep contextual learning videos generally short (1-5 mins)

---

## Content guidelines

- Do not use video cards as advertisements for your feature. Instead they should educate the merchant about how to
  accomplish tasks related to the section they’re in.

### Title

Video card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

### Body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants
  what actions are available to them (especially something new). Don’t use
  permissive language like “you can”.

<!-- usagelist -->

#### Do

Get performance data for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

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

### Character Limits

- Single Line Headline approx 14 characters
- Two Line Headline approx 28 characters
- Body 50 characters
- CTA 14 characters

---

## Examples

### Portrait video card

Use to help merchants know what clear, single action to take in the section the video card is displayed.

```jsx
<VideoCard
  title="Getting Started"
  primaryActions={[
    {
      content: 'Learn about getting started and more',
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

Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.

```jsx
<VideoCard
  title="Getting Started"
  primaryActions={[
    {
      content: 'Learn about getting started and more',
      onAction: () => {},
    },
    {
      content: 'Click here',
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

### Landscape video card

Use when you would like to surface a video card but not take up too much screen space or push critical content below the fold.

```jsx
<VideoCard
  title="Getting Started"
  primaryActions={[
    {
      content: 'Learn about getting started and more',
      onAction: () => {},
    },
  ]}
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
