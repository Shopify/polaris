import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  Text,
  LegacyCard,
  DropZone,
  List,
  Page,
  BlockStack,
  Thumbnail,
  InlineStack,
} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';

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
      <BlockStack gap="400">
        {files.map((file, index) => (
          <InlineStack gap="400" align="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </InlineStack>
        ))}
      </BlockStack>
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
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
    <BlockStack gap="400">
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </BlockStack>
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
    <InlineStack gap="400">
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : NoteIcon
        }
      />
      <div>
        {file.name}{' '}
        <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text>
      </div>
    </InlineStack>
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
  );

  const uploadMessage = !uploadedFiles && <DropZone.FileUpload />;

  return (
    <Page
      backAction={{content: 'Products'}}
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
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
    <BlockStack gap="400">
      {errorMessage}
      <DropZone
        accept="image/svg+xml"
        type="image"
        errorOverlayText="File type must be .svg"
        onDrop={handleDropZoneDrop}
      >
        {uploadedFiles}
      </DropZone>
    </BlockStack>
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
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
    <BlockStack gap="400">
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Medium sized Drop zone
          </Text>
        </div>
        <div style={{width: 114, height: 114}}>
          <DropZone>
            <DropZone.FileUpload />
          </DropZone>
        </div>
      </BlockStack>
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Medium sized Drop zone with label and hint
          </Text>
        </div>
        <div style={{width: 140, height: 114}}>
          <DropZone label="Field label">
            <DropZone.FileUpload actionHint="Accepts .gif" />
          </DropZone>
        </div>
      </BlockStack>
    </BlockStack>
  );
}

export function SmallSized() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Small sized Drop zone (50px)
          </Text>
        </div>
        <div style={{width: 50, height: 50}}>
          <DropZone>
            <DropZone.FileUpload />
          </DropZone>
        </div>
        <div>
          <Text as="h2" variant="headingMd">
            Small sized Drop zone (40px)
          </Text>
        </div>
        <div style={{width: 40, height: 40}}>
          <DropZone>
            <DropZone.FileUpload />
          </DropZone>
        </div>
      </BlockStack>
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Small sized Drop zone without outline
          </Text>
        </div>
        <div style={{width: 40, height: 40}}>
          <DropZone outline={false}>
            <DropZone.FileUpload />
          </DropZone>
        </div>
      </BlockStack>
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Small sized Drop zone with error
          </Text>
          <Text as="p">Drag file in to see error state</Text>
        </div>
        <div style={{width: 40, height: 40}}>
          <DropZone error>
            <DropZone.FileUpload />
          </DropZone>
        </div>
      </BlockStack>
      <BlockStack gap="200">
        <div>
          <Text as="h2" variant="headingMd">
            Small sized Drop zone with disabled state
          </Text>
        </div>
        <div style={{width: 40, height: 40}}>
          <DropZone disabled>
            <DropZone.FileUpload />
          </DropZone>
        </div>
      </BlockStack>
    </BlockStack>
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
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
    <BlockStack gap="400">
      {files.map((file, index) => (
        <InlineStack gap="400" align="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
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

export function Error() {
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
      <BlockStack gap="400">
        {files.map((file, index) => (
          <InlineStack gap="400" align="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </InlineStack>
        ))}
      </BlockStack>
    </div>
  );

  return (
    <BlockStack gap="200">
      <div>
        <Text as="h2" variant="headingMd">
          Drop zone with error
        </Text>
        <Text as="p">Drag file in to see error state</Text>
      </div>
      <DropZone error onDrop={handleDropZoneDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
    </BlockStack>
  );
}

export function Disabled() {
  const handleDropZoneDrop = () => {
    // eslint-disable-next-line no-alert
    alert("this shouldn't be called");
  };

  return (
    <DropZone disabled onDrop={handleDropZoneDrop}>
      <DropZone.FileUpload />
    </DropZone>
  );
}
