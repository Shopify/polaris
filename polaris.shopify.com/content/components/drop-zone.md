---
name: Drop zone
category: Actions
keywords:
  - upload
  - image upload
  - file upload
  - drag
  - drop
  - area
  - drop area
  - file dialog
  - upload placeholder
  - drop placeholder
examples:
  - fileName: drop-zone-with-file-upload.tsx
    title: Drop zone with file upload
    description: >-
      Use to allow merchants to upload files. They can drag and drop files into
      the dashed area, or upload traditionally by clicking the “Add file” button
      or anywhere inside the dashed area.
  - fileName: drop-zone-with-a-label.tsx
    title: Drop zone with a label
    description: Use to pair with a label for better accessibility.
  - fileName: drop-zone-with-image-file-upload.tsx
    title: Drop zone with image file upload
    description: Use for cases that accept image file formats.
  - fileName: drop-zone-with-single-file-upload.tsx
    title: Drop zone with single file upload
    description: Use to accept only one file.
  - fileName: drop-zone-with-drop-on-page.tsx
    title: Drop zone with drop on page
    description: Use to accept files for upload when dropped anywhere on the page.
  - fileName: drop-zone-accepts-only-svg-files.tsx
    title: Drop zone accepts only SVG files
    description: Use to accept only SVG files.
  - fileName: drop-zone-nested.tsx
    title: Nested drop zone
    description: >-
      Use to allow merchants to upload files in a wider area than the visible
      drop zone.
  - fileName: drop-zone-medium-sized.tsx
    title: Medium-sized drop zone
    description: >-
      Use for cases with limited space. To improve usability, nest medium-sized
      drop zone in a larger drop zone with no outline. See the nested dropzone
      example.
  - fileName: drop-zone-small-sized.tsx
    title: Small-sized drop zone
    description: >-
      Use for cases with tight space constraints, such as variant thumbnails on
      the Product details page. To improve usability, nest small-sized drop zone
      in a larger drop zone with no outline. See the nested dropzone example.
  - fileName: drop-zone-with-custom-file-upload-text.tsx
    title: Drop zone with custom FileUpload text
    description: >-
      Use for cases where you want the child contents of the dropzone to
      determine its height.
  - fileName: drop-zone-with-custom-file-dialog-trigger.tsx
    title: Drop zone with custom file dialog trigger
    description: Use to trigger the file dialog from an action somewhere else on the page.
---

# Drop zone

The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.

---

## Best practices

### Drop zone

Drop zones should:

- Inform merchants when the file(s) can’t be uploaded:
  - When possible, use validation errors on drag to detect and explain things like file size limits or file types accepted.
  - Use the [banner component](https://polaris.shopify.com/components/feedback-indicators/banner) with a critical status to communicate errors that happen on the server.
- Provide feedback once the file(s) have been dropped and uploading begins.
- For convenience, allow files to be dropped anywhere on the page by enabling `dropOnPage`.
- Provide a file upload button to allow merchants to select files for upload in a traditional way. Do this by using the `DropZone.FileUpload` subcomponent.

### Validation errors

The drop zone component validates file type by default. File types you wish to accept can be defined by editing the `accept` property. This component also accepts custom validations using the `customValidator` property. When validation fails, the component sets itself to error mode.

---

## Content guidelines

### Client-side validation error messages

Client-side validation errors give instant feedback.

Validation error messages should be:

- Explicit: help merchants understand why their file can’t be uploaded and what they should change to successfully upload their file
- In sentence case: capitalize only the first word in the message
- Concise: use simple, clear language that can be read at a glance. For example:

`File size must be less than 20MB`

`File type must be .gif, .jpg, .png or .svg`

### Server-side upload error messages

Server-side upload errors give feedback after file submission.

Upload error messages should:

- Be displayed as a [banner](https://polaris.shopify.com/components/feedback-indicators/banner) with a critical status
- Show the name of the file(s) that were not uploaded successfully
- Describe why the file(s) couldn’t be uploaded and what merchants should change to upload their file successfully, as seen below

```
The following images couldn’t be uploaded:

* “keep-it-real.png” is too large. Try a file size less than 20MB.
* “realer-than-real.zip” is not supported. File type must be .gif, .jpg, .png or .svg.
* “so-so-real.png” was interrupted due to weak network connection, [retry upload](#)
```

---

## Drop zone file upload

Use file upload with the drop zone component to let merchants select files for upload in a traditional way.

### File upload properties

| Prop        | Type   | Description                        | Default                   |
| ----------- | ------ | ---------------------------------- | ------------------------- |
| actionTitle | string | String that appears in file upload | 'Add file'                |
| actionHint  | string | String that appears in file upload | 'or drop files to upload' |

---

## Related components

- To provide context to upload errors when they occur, use the [banner component](https://polaris.shopify.com/components/feedback-indicators/banner)
- To provide feedback during file upload, use the [spinner component](https://polaris.shopify.com/components/feedback-indicators/spinner)

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

The drop zone component builds on the native HTML `<input type="upload">` element. It includes a visual`<button>` as well as a drag and drop area that can receive keyboard focus.

### Keyboard support

To upload a file with the keyboard, merchants can interact with the drag-and-drop region.

- To give the input keyboard focus, use the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- To activate the input, use the <kbd>enter</kbd>/<kbd>return</kbd> or <kbd>space</kbd> keys

<!-- /content-for -->
