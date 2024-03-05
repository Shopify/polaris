import {
  BlockStack,
  DropZone,
  Icon,
  InlineStack,
  Modal,
  Thumbnail,
  UnstyledButton,
  Text,
} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import type {MouseEvent, KeyboardEvent} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ImageAddIcon, NoteIcon} from '@shopify/polaris-icons';

function WithCustomModalAndDragAndDropOnlyExample() {
  const [files, setFiles] = useState<File[]>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const handleDrop = useCallback((dropFiles: File[]) => {
    setFiles((files) => [...files, ...dropFiles]);
  }, []);

  const handleOpenModal = useCallback(
    () =>
      setActiveModal((activeModal) => {
        console.log(activeModal);
        return !activeModal;
      }),
    [],
  );

  const handleOpenModalFromChildElement = useCallback(
    () =>
      (event: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        setActiveModal((activeModal) => !activeModal);
      },
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const fileUpload = !files.length && (
    <UnstyledButton
      onClick={handleOpenModalFromChildElement}
      style={{width: 40, height: 40, border: 0, cursor: 'pointer'}}
      accessibilityLabel="Upload image for product Green T-shirt size Small"
    >
      <Icon source={ImageAddIcon} tone="interactive" />
    </UnstyledButton>
  );

  const uploadImageModal = (
    <div style={{height: '500px'}}>
      <Modal
        size="small"
        open={activeModal}
        onClose={handleOpenModal}
        title="Upload images from store gallery"
        primaryAction={{
          content: 'Save',
          onAction: handleOpenModal,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleOpenModal,
          },
        ]}
      >
        <Modal.Section>
          <DropZone onDrop={() => {}}>
            <DropZone.FileUpload />
          </DropZone>
        </Modal.Section>
      </Modal>
    </div>
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
        </InlineStack>
      ))}
    </BlockStack>
  );

  return (
    <BlockStack gap="200">
      <Text as="h2" variant="headingMd">
        Small sized Drop zone that functions as a drop zone when using a mouse
        and has a customized modal that opens when clicked. When navigating with
        a keyboard, the child element serves as the modal activator and provides
        accessibility and custom desight features.
      </Text>
      <div style={{width: 40, height: 40}}>
        <DropZone onDrop={handleDrop} onClick={handleOpenModal} dragAndDropOnly>
          <BlockStack align="center" inlineAlign="center" gap="400">
            {uploadedFiles}
            {fileUpload}
          </BlockStack>
        </DropZone>
      </div>
      {uploadImageModal}
    </BlockStack>
  );
}

export default withPolarisExample(WithCustomModalAndDragAndDropOnlyExample);
