---
name: Video thumbnail
category: Images and icons
keywords:
  - video
  - VideoThumbnail
  - updates
  - new features
  - video thumbnail
  - feature thumbnail
  - education
  - contextual learning system
---

# Video thumbnail

Video thumbnails provide consistent controls for video cards in the contextual learning system. When clicked, conditionally present a video player in the format of your choice. For example, within a modal or a full screen container.

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

### Basic video thumbnail

```jsx
<VideoThumbnail
  videoLength={80}
  thumbnailUrl="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
/>
```

---

## Related components

- To surface educational learning content in-context, [use the video card component](https://polaris.shopify.com/components/structure/video-card)
- To present a small visual anchor for an object, [use the thumbnail component](https://polaris.shopify.com/components/images-and-icons/thumbnail)

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

Images included in video thumbnails are implemented as decorative background images so that they’re skipped by screen readers.

The play button is keyboard accessible and the `aria-label` includes the video length when provided. For example, a video of length 1:20 is read as “Play video of length 1 minute and 20 seconds”. If no video length is provided, the default label reads “Play video”.

<!-- /content-for -->
