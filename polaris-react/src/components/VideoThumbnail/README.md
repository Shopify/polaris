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

Video thumbnails are a clickable placeholder image. When clicked, it opens a video player within a modal or full screen.

---

## Best practices

Video thumbnails should:

- Be used with a media card
- Use an image that communicates the subject of the video
- Include a video timestamp
- Capture an image from the video to give a preview of the video content
- Be cropped to a 16:9 aspect ratio
- Be centered on the subject and avoid cropping of important details, like a person’s head

---

## Examples

### Default

Use as a play button for a video player within a media card.

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
    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
```

### With progress

Use to indicate the video’s play progress in relation to its duration.

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
    videoProgress={45}
    showVideoProgress
    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
```

---

## Required components

- The video thumbnail should be wrapped in the [media card](https://polaris.shopify.com/components/media-card) component.

---

## Related components

- To present a small visual anchor for an object, [use the thumbnail component](https://polaris.shopify.com/components/thumbnail)

---

## Accessibility

Images included in video thumbnails are implemented as decorative background images so that they’re skipped by screen readers.

The play button is keyboard accessible and the `aria-label` includes a timestamp when the `videoLength` prop is set. For example, an 80 second video reads as “Play video of length 1 minute and 20 seconds”. If no `videoLength` prop is provided, the default label reads “Play video”.
