import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  Text,
  LegacyCard,
  DropZone,
  List,
  Page,
  AlphaStack,
  Thumbnail,
  Inline,
} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';

export default {
  component: DropZone,
} as ComponentMeta<typeof DropZone>;

export function Default() {
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
      <AlphaStack gap="4">
        {files.map((file, index) => (
          <Inline align="center" key={index}>
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
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </Inline>
        ))}
      </AlphaStack>
    </div>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export function WithALabel() {
  return (
    <DropZone label="Theme files">
      <DropZone.FileUpload />
    </DropZone>
  );
}

export function WithImageFileUpload() {
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
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
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
    <AlphaStack gap="4" fullWidth>
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </AlphaStack>
  );
}

export function WithSingleFileUpload() {
  const [file, setFile] = useState();

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFile((file) => acceptedFiles[0]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Inline>
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
        {file.name}{' '}
        <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text>
      </div>
    </Inline>
  );

  return (
    <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
      {uploadedFile}
      {fileUpload}
    </DropZone>
  );
}

export function WithDropOnPage() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (dropFiles, _acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...dropFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const uploadedFiles = files.length > 0 && (
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
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
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
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

export function AcceptsOnlySVGFiles() {
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
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
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
    <AlphaStack gap="4" fullWidth>
      {errorMessage}
      <DropZone
        accept="image/svg+xml"
        type="image"
        errorOverlayText="File type must be .svg"
        onDrop={handleDropZoneDrop}
      >
        {uploadedFiles}
      </DropZone>
    </AlphaStack>
  );
}

export function Nested() {
  const [files, setFiles] = useState([]);

  const handleDrop = useCallback((dropFiles) => {
    setFiles((files) => [...files, dropFiles]);
  }, []);

  const handleDropZoneClick = useCallback(() => {}, []);

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
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
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
  );

  return (
    <DropZone outline={false} onDrop={handleDrop}>
      <LegacyCard sectioned>
        <DropZone onClick={handleDropZoneClick}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </LegacyCard>
    </DropZone>
  );
}

export function MediumSized() {
  return (
    <div style={{width: 114, height: 114}}>
      <DropZone>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  );
}

export function SmallSized() {
  return (
    <div style={{width: 50, height: 50}}>
      <DropZone>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  );
}

export function WithCustomFileUploadText() {
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
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
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
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export function WithCustomFileDialogTrigger() {
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
    <AlphaStack gap="4">
      {files.map((file, index) => (
        <Inline align="center" key={index}>
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
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </Inline>
      ))}
    </AlphaStack>
  );

  return (
    <LegacyCard
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
    </LegacyCard>
  );
}
