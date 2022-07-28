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
---

# Drop zone

The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.

---

## Best practices

### Drop zone

Drop zones should:

- Inform merchants when the file(s) can’t be uploaded:
  - When possible, use validation errors on drag to detect and explain things like file size limits or file types accepted.
  - Use the [banner component](https://polaris.shopify.com/components/banner) with a critical status to communicate errors that happen on the server.
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

- Be displayed as a [banner](https://polaris.shopify.com/components/banner) with a critical status
- Show the name of the file(s) that were not uploaded successfully
- Describe why the file(s) couldn’t be uploaded and what merchants should change to upload their file successfully, as seen below

```
The following images couldn’t be uploaded:

* “keep-it-real.png” is too large. Try a file size less than 20MB.
* “realer-than-real.zip” is not supported. File type must be .gif, .jpg, .png or .svg.
* “so-so-real.png” was interrupted due to weak network connection, [retry upload](#)
```

---

## Examples

### Default

Use to allow merchants to upload files. They can drag and drop files into the dashed area, or upload traditionally by clicking the “Add file” button or anywhere inside the dashed area.

```jsx
function DropZoneExample() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '0'}}>
      <Stack vertical>
        {files.map((file, index) => (
          <Stack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                    window.URL.createObjectURL(file)
                  : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}
```

### With a label

Use to pair with a label for better accessibility.

```jsx
<DropZone label="Theme files">
  <DropZone.FileUpload />
</DropZone>
```

### With image file upload

Use for cases that accept image file formats.

```jsx
function DropZoneWithImageFileUpload() {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    [],
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </Stack>
  );
}
```

### With single file upload

Use to accept only one file.

```jsx
function DropZoneExample() {
  const [file, setFile] = useState();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFile((file) => acceptedFiles[0]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
              window.URL.createObjectURL(file)
            : NoteMinor
        }
      />
      <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  );

  return (
    <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
}
```

### With drop on page

Use to accept files for upload when dropped anywhere on the page.

```jsx
function DropZoneWithDropOnPageExample() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const uploadMessage = !uploadedFiles && <DropZone.FileUpload />;

  return (
    <Page
      breadcrumbs={[{content: 'Products'}]}
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <DropZone dropOnPage onDrop={handleDropZoneDrop}>
        {uploadedFiles}
        {uploadMessage}
      </DropZone>
    </Page>
  );
}
```

### Accepts only SVG files

Use to accept only SVG files.

```jsx
function DropZoneAcceptingSVGFilesExample() {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    [],
  );

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        accept="image/svg+xml"
        type="image"
        errorOverlayText="File type must be .svg"
        onDrop={handleDropZoneDrop}
      >
        {uploadedFiles}
      </DropZone>
    </Stack>
  );
}
```

### Nested

Use to allow merchants to upload files in a wider area than the visible drop zone.

```jsx
function NestedDropZoneExample() {
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback((dropFiles) => {
    setFiles((files) => [...files, dropFiles]);
  }, []);

  const handleDropZoneClick = useCallback(() => {}, []);

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <DropZone outline={false} onDrop={handleDrop}>
      <Card sectioned>
        <DropZone onClick={handleDropZoneClick}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </Card>
    </DropZone>
  );
}
```

### Medium-sized

Use for cases with limited space. To improve usability, nest medium-sized drop zone in a larger drop zone with no outline. See the nested dropzone example.

```jsx
<div style={{width: 114, height: 114}}>
  <DropZone>
    <DropZone.FileUpload />
  </DropZone>
</div>
```

### Small-sized

Use for cases with tight space constraints, such as variant thumbnails on the Product details page. To improve usability, nest small-sized drop zone in a larger drop zone with no outline. See the nested dropzone example.

```jsx
<div style={{width: 50, height: 50}}>
  <DropZone>
    <DropZone.FileUpload />
  </DropZone>
</div>
```

### With custom FileUpload text

Use for cases where you want the child contents of the dropzone to determine its height.

```jsx
function DropZoneExample() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
  );

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}
```

### With custom file dialog trigger

Use to trigger the file dialog from an action somewhere else on the page.

```jsx
function DropZoneWithCustomFileDialogExample() {
  const [files, setFiles] = useState([]);
  const [openFileDialog, setOpenFileDialog] = useState(false);

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    [],
  );
  const toggleOpenFileDialog = useCallback(
    () => setOpenFileDialog((openFileDialog) => !openFileDialog),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.indexOf(file.type) > -1
                ? // eslint-disable-next-line node/no-unsupported-features/node-builtins
                  window.URL.createObjectURL(file)
                : NoteMinor
            }
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Card
      sectioned
      title="Product Images"
      actions={[
        {
          content: 'Upload Image',
          onAction: toggleOpenFileDialog,
        },
      ]}
    >
      <DropZone
        openFileDialog={openFileDialog}
        onDrop={handleDropZoneDrop}
        onFileDialogClose={toggleOpenFileDialog}
      >
        {uploadedFiles}
      </DropZone>
    </Card>
  );
}
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

- To provide context to upload errors when they occur, use the [banner component](https://polaris.shopify.com/components/banner)
- To provide feedback during file upload, use the [spinner component](https://polaris.shopify.com/components/spinner)

---

## Accessibility

The drop zone component builds on the native HTML `<input type="upload">` element. It includes a visual`<button>` as well as a drag and drop area that can receive keyboard focus.

### Keyboard support

To upload a file with the keyboard, merchants can interact with the drag-and-drop region.

- To give the input keyboard focus, use the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- To activate the input, use the <kbd>enter</kbd>/<kbd>return</kbd> or <kbd>space</kbd> keys
