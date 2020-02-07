---
name: Video thumbnail
category: Structure
keywords:
  - Videothumbnail
  - actionable
  - updates
  - new features
  - video thumbnail
  - feature thumbnail
  - video thumbnail url
  - video thumbnail length
  - video thumbnail accessibility label
  - video thumbnail onClick
---

# Video thumbnail

The Video thumbnail is used to surface a thumbnail image, play button icon, and timestamp for a
contextual video in the contextual learning system. This component is used when an implementer decides
that they would like to have a thumbnail visible to the user, and only when the user clicks the play button,
then they will surface their video player of choice in the format that they desire (modal, separate div, etc.).

---

## Best practices

- Use a thumbnail that helps to communicate the subject of the video or merchant benefit

---

## Content guidelines

### Thumbnail image

Thumbnail image should be:

- Relevant: should describe the video through the use of images or be an image of a section in the video
- Follow the 16:9 ratio, otherwise the image may appear cropped
- Avoid cropping the person’s head if the thumbnail shows a person

<!-- usagelist -->

#### Do

Have an image with a non-cropped head, clean aesthetic that matches shopify brand and is descriptive
of content

#### Don’t

Use a random, unintentional, blurry screenshot from the video

#### Do

Include a video timestamp

#### Don’t

Omit the timestamp

<!-- end -->

---

## Examples

### Default video thumbnail

```jsx
<VideoThumbnail
  videoLength={80}
  thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
/>
```

---

## Related components

- To group similar concepts and tasks together, [use the thumbnail component](https://polaris.shopify.com/components/structure/thumbnail)
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

Images included in video thumbnails are implemented as decorative images so that they’re skipped by screen readers.

The play button is screen-reader friendly. When tabbed onto by a screen-reader, a video of length 1:20 is read as “Play video of length 1 minute and 20 seconds”, and if no time is provided then the defaulted accessibilityLabel reads “Play video”.

<!-- /content-for -->
