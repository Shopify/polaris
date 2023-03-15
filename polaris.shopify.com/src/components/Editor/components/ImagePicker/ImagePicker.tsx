import {
  Button,
  DropZone,
  FormLayout,
  List,
  Modal,
  Text,
  TextField,
} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';
import {nanoid} from 'nanoid';
import Image from 'next/image';
import Link from 'next/link';
import {useContext, useRef, useState} from 'react';
import {DeleteImageResponse} from '../../../../../pages/api/editor/deleteImage';
import {UploadImageResponse} from '../../../../../pages/api/editor/uploadImage';
import {ContentContext} from '../../Editor';
import {ColorScheme, ImageFile, Image as ImageType} from '../../types';
import {getImageDimensions, getPageUrl} from '../../utils';
import styles from './ImagePicker.module.scss';

const ACCEPTED_FILES = 'image/jpeg, image/png, image/svg, image/gif';

function ImagePicker({
  imageId,
  onPick,
}: {
  imageId: string | null;
  onPick: (imageId: string) => void;
}) {
  const {content, setContent} = useContext(ContentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  async function uploadImage(files: File[]): Promise<ImageFile | null> {
    const formData = new FormData();
    files.forEach((file) => formData.append('multipleFiles', file));

    return fetch('/api/editor/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data: UploadImageResponse) => {
        if (data.status === 'success') {
          return data.image;
        } else {
          return null;
        }
      });
  }

  function setAltAttribute(imageId: string, alt: string) {
    setContent((content) => ({
      ...content,
      images: [
        ...content.images.map((image) => {
          if (image.id === imageId) {
            return {
              ...image,
              alt: {
                [ColorScheme.Light]: alt,
                [ColorScheme.Dark]: alt,
              },
            };
          }
          return image;
        }),
      ],
    }));
  }

  function addImageAndUpload(files: File[]) {
    if (files) {
      uploadImage(files).then((image) => {
        if (image) {
          const newImage: ImageType = {
            id: nanoid(),
            alt: {light: '', dark: ''},
            variants: {[ColorScheme.Light]: image},
          };
          setContent((content) => ({
            ...content,
            images: [...content.images, newImage],
          }));
        } else {
          alert('Failed to upload image');
        }
      });
    }
  }

  async function replaceImage(
    imageToReplace: ImageType,
    colorScheme: ColorScheme,
    files: File[],
  ) {
    const variant = imageToReplace.variants[colorScheme];
    if (!variant) {
      throw new Error('Variant does not exist');
    }
    await deleteImageFile(variant);
    const uploadedImage = await uploadImage(files);
    if (uploadedImage) {
      setContent((content) => ({
        ...content,
        images: [
          ...content.images.map((image) => {
            if (image.id === imageToReplace.id) {
              return {
                ...image,
                variants: {
                  ...image.variants,
                  [colorScheme]: uploadedImage,
                },
              };
            }
            return image;
          }),
        ],
      }));
    } else {
      alert('Failed to replace image');
    }
  }

  function handleOnDrop(
    imageId: string,
    colorScheme: ColorScheme,
    files: File[],
  ) {
    uploadImage(Array.from(files)).then((uploadedImage) => {
      setContent((content) => ({
        ...content,
        images: [
          ...content.images.map((image) => {
            if (image.id === imageId) {
              return {
                ...image,
                variants: {
                  ...image.variants,
                  [colorScheme]: uploadedImage,
                },
              };
            }
            return image;
          }),
        ],
      }));
    });
  }

  async function deleteImageFile(
    imageFile: ImageFile,
  ): Promise<DeleteImageResponse> {
    return fetch(`/api/editor/deleteImage`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fileName: imageFile.fileName}),
    })
      .then((res) => res.json())
      .then((data) => data as DeleteImageResponse);
  }

  async function removeDarkModeImage(id: string) {
    const image = content.images.find((image) => image.id === id);
    if (image) {
      const imageFile = image.variants['dark'];
      if (imageFile) {
        const data = await deleteImageFile(imageFile);
        if (data.status === 'success') {
          setContent((content) => ({
            ...content,
            images: [
              ...content.images.map((image) => {
                if (image.id === id) {
                  return {
                    ...image,
                    variants: {
                      ...image.variants,
                      [ColorScheme.Dark]: undefined,
                    },
                  };
                }
                return image;
              }),
            ],
          }));
        } else {
          alert('Failed to delete image');
        }
      }
    }
  }

  const selectedImage = content.images.find((image) => image.id === imageId);
  const lightVariant = selectedImage?.variants[ColorScheme.Light];
  const inspectedImage = content.images.find(({id}) => id === selectedImageId);
  const blocksIdsUsingImage = content.blocks
    .filter((block) => {
      switch (block.blockType) {
        case 'Image':
          return block.imageId === imageId;
        case 'TextImage':
          return block.imageId === imageId;
      }
      return false;
    })
    .map((block) => block.id);

  const pagesUsingSelectedImage = content.pages.filter((page) => {
    if (page.thumbnailImageId === selectedImageId) {
      return true;
    }
    let matchInBlocks = false;
    page.blockIds.forEach((blockId) => {
      if (blocksIdsUsingImage.includes(blockId)) {
        matchInBlocks = true;
      }
    });
    return matchInBlocks;
  });

  return (
    <>
      {lightVariant && (
        <Image
          src={`/uploads/${lightVariant.fileName}`}
          alt={selectedImage.alt[ColorScheme.Light]}
          {...getImageDimensions(
            {width: lightVariant.width, height: lightVariant.height},
            300,
          )}
        />
      )}

      <Modal
        activator={
          <Button onClick={() => setIsOpen(true)}>
            {imageId ? 'Replace image' : 'Choose an image'}
          </Button>
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={imageId ? 'Replace image' : 'Choose an image'}
        primaryAction={{
          content: 'Pick image',
          onAction: () => {
            if (inspectedImage) {
              onPick(inspectedImage.id);
              setIsOpen(false);
            }
          },
          disabled: !inspectedImage,
        }}
        large={true}
      >
        <Modal.Section flush={true}>
          <div className={styles.ImagePicker}>
            <div className={styles.Browser}>
              <UploadButton
                className={styles.AddImageButton}
                onChange={addImageAndUpload}
                accept={ACCEPTED_FILES}
              >
                <p>Add image</p>
              </UploadButton>
              <div className={styles.Images}>
                {content.images.map((image) => (
                  <button
                    className={styles.Image}
                    onClick={() => setSelectedImageId(image.id)}
                    key={image.id}
                  >
                    {Object.values(ColorScheme).map((scheme) => {
                      const variantImage = image.variants[scheme];
                      if (variantImage) {
                        return (
                          <Image
                            key={scheme}
                            src={`/uploads/${variantImage.fileName}`}
                            alt={image.alt[scheme] || ''}
                            width={200}
                            height={200}
                          />
                        );
                      } else {
                        return (
                          <div
                            className={styles.ImagePlaceholder}
                            key={`${image.id}-${scheme}`}
                          ></div>
                        );
                      }
                    })}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.Inspector}>
              {inspectedImage && (
                <>
                  <FormLayout>
                    <TextField
                      type="text"
                      value={inspectedImage.alt.light}
                      onChange={(alt) =>
                        setAltAttribute(inspectedImage.id, alt)
                      }
                      label="Alt attribute"
                      autoComplete="off"
                    />
                    {Object.values(ColorScheme).map((scheme) => {
                      const variantImage = inspectedImage.variants[scheme];
                      const indicator = (
                        <span className={styles.ColorSchemeIndicator}>
                          {scheme === 'light'
                            ? '☀️ Light mode'
                            : '🌙 Dark mode'}
                        </span>
                      );
                      if (variantImage) {
                        return (
                          <div className={styles.ImagePreview} key={scheme}>
                            {indicator}
                            <Image
                              src={`/uploads/${variantImage.fileName}`}
                              alt={inspectedImage.alt[scheme] || ''}
                              {...getImageDimensions(
                                {
                                  width: variantImage.width,
                                  height: variantImage.height,
                                },
                                400,
                              )}
                            />
                            <div className={styles.ImageActions}>
                              {scheme === ColorScheme.Dark && (
                                <button
                                  className={styles.RemoveImageButton}
                                  onClick={() =>
                                    removeDarkModeImage(inspectedImage.id)
                                  }
                                >
                                  Remove
                                </button>
                              )}
                              <UploadButton
                                className={styles.ReplaceImageButton}
                                onChange={(files) =>
                                  replaceImage(inspectedImage, scheme, files)
                                }
                                accept={ACCEPTED_FILES}
                              >
                                Replace
                              </UploadButton>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <DropZone
                            key={`${inspectedImage.id}-${scheme}`}
                            onDrop={(_, acceptedFiles) =>
                              handleOnDrop(
                                inspectedImage.id,
                                scheme,
                                acceptedFiles,
                              )
                            }
                            accept={ACCEPTED_FILES}
                            allowMultiple={false}
                          >
                            <DropZone.FileUpload
                              actionTitle={`Add ${scheme} mode image`}
                            />
                          </DropZone>
                        );
                      }
                    })}

                    <Button
                      destructive
                      disabled={pagesUsingSelectedImage.length > 0}
                      outline={pagesUsingSelectedImage.length === 0}
                      onClick={() => alert('TODO: Delete image')}
                      icon={DeleteMinor}
                      fullWidth
                    >
                      Delete image
                    </Button>
                    {pagesUsingSelectedImage.length > 0 && (
                      <Text as="p" color="subdued" variant="bodySm">
                        {`The image can't be deleted while still being referenced by other pages. Remove the image from those pages before deleting it.`}
                      </Text>
                    )}

                    <Text as="h2" variant="headingMd">
                      Pages using this image
                    </Text>
                    <List type="bullet">
                      {pagesUsingSelectedImage.map((page) => (
                        <List.Item key={page.id}>
                          <Link href={getPageUrl(content, page)}>
                            {page.title}
                          </Link>
                        </List.Item>
                      ))}
                    </List>
                  </FormLayout>
                </>
              )}
            </div>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}

function UploadButton({
  onChange,
  className,
  accept,
  children,
}: {
  onChange: (files: File[]) => void;
  className: string;
  accept: string;
  children: React.ReactNode;
}) {
  const id = useRef(nanoid());

  return (
    <label className={className}>
      <input
        type="file"
        id={id.current}
        onChange={() => {
          const thisElement = document.getElementById(
            id.current,
          ) as HTMLInputElement;
          if (thisElement && thisElement.files) {
            onChange(Array.from(thisElement.files));
            thisElement.value = '';
          }
        }}
        accept={accept}
      />
      {children}
    </label>
  );
}

export default ImagePicker;
