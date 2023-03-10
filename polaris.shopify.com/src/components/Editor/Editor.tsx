'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {nanoid} from 'nanoid';
import styles from './Editor.module.scss';
import Image from 'next/image';
import {Dialog} from '@headlessui/react';
import {
  Page,
  BaseBlock,
  Block,
  BlockType,
  MarkdownBlock,
  ImageBlock,
  YoutubeVideoBlock,
  SandboxEmbedBlock,
  CodeBlock,
  TextImageBlock,
  Content,
  ColorScheme,
  blockTypes,
  ProgressiveDisclosureBlock,
} from './types';
import TextareaAutosize from 'react-textarea-autosize';

function assertUnreachable(_: never): never {
  throw new Error("Didn't expect to get here");
}

function getEmptyBlock(
  blockType: BlockType,
  pageId: string,
  parentBlockId: string | null,
): Block {
  const baseBlock: Omit<BaseBlock, 'blockType'> = {
    id: nanoid(),
    pageId,
    order: 0,
    parentBlockId,
  };

  switch (blockType) {
    case 'Markdown': {
      const block: MarkdownBlock = {...baseBlock, blockType, content: ''};
      return block;
    }

    case 'Image': {
      const block: ImageBlock = {...baseBlock, blockType, imageId: null};
      return block;
    }

    case 'YoutubeVideo': {
      const block: YoutubeVideoBlock = {
        ...baseBlock,
        blockType,
        youtubeUrl: '',
      };
      return block;
    }

    case 'SandboxEmbed': {
      const block: SandboxEmbedBlock = {...baseBlock, blockType, embedUrl: ''};
      return block;
    }

    case 'Code': {
      const block: CodeBlock = {
        ...baseBlock,
        blockType,
        code: {javascript: {title: 'Example', code: ''}},
      };
      return block;
    }

    case 'TextImage': {
      const block: TextImageBlock = {
        ...baseBlock,
        blockType,
        content: '',
        imageId: null,
      };
      return block;
    }

    case 'ProgressiveDisclosure': {
      const block: ProgressiveDisclosureBlock = {
        ...baseBlock,
        blockType,
        title: 'Expand me',
      };
      return block;
    }
  }

  return assertUnreachable(blockType);
}

const ContentContext = createContext<{
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
  addPage: (parent: string | null) => void;
  movePage: (page: Page, direction: 'up' | 'down') => void;
  deletePage: (page: Page) => void;
}>({
  content: {
    pages: [],
    blocks: [],
    images: [],
  },
  setContent: () => undefined,
  addPage: () => undefined,
  movePage: () => undefined,
  deletePage: () => undefined,
});

export default function Editor({initialContent}: {initialContent: Content}) {
  const [content, setContent] = useState<Content>(initialContent);
  const [editedPageId, setEditedPageId] = useState<string | null>(null);
  let persistToBackendTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (persistToBackendTimer.current) {
      clearTimeout(persistToBackendTimer.current);
    }
    persistToBackendTimer.current = setTimeout(() => {
      fetch(`/api/editor/save`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content}),
      });
    }, 1500);
    return () => {
      if (persistToBackendTimer.current) {
        clearTimeout(persistToBackendTimer.current);
      }
    };
  }, [content]);

  function addPage(parentId: string | null) {
    const pageId = nanoid();

    const siblings = content.pages.filter(
      (thisPage) => thisPage.parentId === parentId,
    );

    const newPage: Page = {
      id: pageId,
      title: 'New page',
      slug: pageId,
      parentId,
      order: siblings.length,
      rendering: 'blocks',
    };

    setContent((content) => ({
      ...content,
      pages: [...content.pages, newPage],
    }));

    setEditedPageId(pageId);
  }

  function sortPages(pages: Page[], parentId: string | null) {
    let index = -1;
    return pages
      .sort((a, b) => a.order - b.order)
      .map((thisPage) => {
        if (thisPage.parentId === parentId) {
          index++;
          return {...thisPage, order: index};
        }
        return thisPage;
      });
  }

  function movePage(page: Page, direction: 'up' | 'down') {
    const indexDiff = direction === 'up' ? -1.5 : 1.5;
    setContent((content) => {
      const newPages = [...content.pages].map((thisPage) => {
        return thisPage.id === page.id
          ? {...thisPage, order: thisPage.order + indexDiff}
          : thisPage;
      });
      const sortedPages = sortPages(newPages, page.parentId);
      return {...content, pages: sortedPages};
    });
  }

  function deletePage(page: Page) {
    if (editedPageId === page.id) {
      setEditedPageId(null);
    }
    setContent((content) => {
      const childPages = content.pages.filter(
        ({parentId}) => parentId === page.id,
      );
      if (childPages.length > 0) {
        throw new Error('Cannot delete page with child pages');
      }
      const newPages = content.pages.filter(({id}) => id !== page.id);
      const sortedPages = sortPages(newPages, page.parentId);

      return {
        ...content,
        pages: sortedPages,
      };
    });
  }

  return (
    <ContentContext.Provider
      value={{content, setContent, addPage, movePage, deletePage}}
    >
      <div className={styles.Editor}>
        <div className={styles.Pages}>
          <button onClick={() => addPage(null)}>Add page</button>
          {content.pages
            .filter((page) => page.parentId === null)
            .sort((a, b) => a.order - b.order)
            .map((page) => (
              <PageNavItem
                key={page.id}
                page={page}
                onPageClick={(id) => setEditedPageId(id)}
                editedPageId={editedPageId}
              />
            ))}
        </div>

        {editedPageId && <PageEditor editedPageId={editedPageId} />}

        {editedPageId && (
          <iframe
            className={styles.SitePreview}
            src={`/editor-page?id=${editedPageId}`}
            width={500}
            height={500}
            title="Preview"
          />
        )}
      </div>
    </ContentContext.Provider>
  );
}

function PageNavItem({
  page,
  onPageClick,
  editedPageId,
}: {
  page: Page;
  onPageClick: (pageId: string) => void;
  editedPageId: string | null;
}) {
  const {content, addPage, movePage, deletePage} = useContext(ContentContext);
  const childPages = content.pages
    .filter((thisPage) => thisPage.parentId === page.id)
    .sort((a, b) => a.order - b.order);

  return (
    <div style={{border: '1px solid red'}}>
      <button
        onClick={() => onPageClick(page.id)}
        aria-current={page.id === editedPageId}
      >
        {page.title}
      </button>
      <button onClick={() => addPage(page.id)}>Add child</button>
      <button onClick={() => movePage(page, 'up')}>&uarr;</button>
      <button onClick={() => movePage(page, 'down')}>&darr;</button>
      <button onClick={() => deletePage(page)} disabled={childPages.length > 0}>
        —
      </button>

      {childPages && (
        <div className={styles.ChildPages}>
          {childPages.map((childPage) => (
            <PageNavItem
              key={childPage.id}
              page={childPage}
              onPageClick={onPageClick}
              editedPageId={editedPageId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PageEditor({editedPageId}: {editedPageId: string}) {
  const {content, setContent} = useContext(ContentContext);
  const editedPage = content.pages.find((page) => page.id === editedPageId);
  if (!editedPage) throw new Error('Edited page not found');

  function updatePage(newPage: Page) {
    setContent((content) => ({
      ...content,
      pages: content.pages.map((page) =>
        page.id === editedPageId ? newPage : page,
      ),
    }));
  }

  return (
    <div className={styles.PageEditor}>
      <div className={styles.PageEditorInner}>
        <input
          type="text"
          value={editedPage.title}
          onChange={(evt) =>
            updatePage({...editedPage, title: evt.target.value})
          }
        />
        <input
          min={0}
          type="number"
          value={editedPage.order}
          onChange={(evt) =>
            updatePage({...editedPage, order: parseInt(evt.target.value)})
          }
        />
        <input
          type="string"
          value={editedPage.slug}
          onChange={(evt) =>
            updatePage({...editedPage, slug: evt.target.value})
          }
        />
        <label>
          <input
            type="checkbox"
            checked={editedPage.rendering === 'blocks'}
            onChange={(evt) =>
              updatePage({
                ...editedPage,
                rendering: evt.target.checked ? 'blocks' : 'custom',
              })
            }
          />
          Block based layout
        </label>

        {editedPage.rendering === 'custom' && (
          <p>
            This page is not using blocks. You should create a custom Next.js
            page so that something is rendered in its place.
          </p>
        )}

        {editedPage.rendering === 'blocks' && (
          <BlockEditor pageId={editedPageId} parentBlockId={null} />
        )}
      </div>
    </div>
  );
}

function BlockEditor({
  pageId,
  parentBlockId,
}: {
  pageId: string;
  parentBlockId: string | null;
}) {
  const {content, setContent} = useContext(ContentContext);

  const blocks = content.blocks.filter(
    (block) => block.pageId === pageId && block.parentBlockId === parentBlockId,
  );

  function addBlock(blockType: BlockType) {
    let block: Block = {
      ...getEmptyBlock(blockType, pageId, parentBlockId),
      order: blocks.length,
    };
    setContent(({blocks}) => ({...content, blocks: [...blocks, block]}));
  }

  function deleteBlock(blockId: string) {
    setContent(({blocks}) => ({
      ...content,
      blocks: blocks.filter((block) => block.id !== blockId),
    }));
    // TODO: Update order of blocks after delte
    // TODO: Don't allow removal of blocks with children
  }

  function moveBlock(block: Block, direction: 'up' | 'down') {
    const indexDiff = direction === 'up' ? -1.5 : 1.5;
    setContent((content) => {
      const newBlocks = [...content.blocks].map((thisBlock) => {
        return thisBlock.id === block.id
          ? {...thisBlock, order: thisBlock.order + indexDiff}
          : thisBlock;
      });
      let index = -1;
      const sortedBlocks = newBlocks
        .sort((a, b) => a.order - b.order)
        .map((thisBlock) => {
          if (
            thisBlock.pageId === block.pageId &&
            thisBlock.parentBlockId === block.parentBlockId
          ) {
            index++;
            return {...thisBlock, order: index};
          }
          return thisBlock;
        });
      return {...content, blocks: sortedBlocks};
    });
  }

  function handleBlockChange(updatedBlock: Block) {
    setContent((content) => ({
      ...content,
      blocks: content.blocks.map((currentBlock) =>
        currentBlock.id === updatedBlock.id ? updatedBlock : currentBlock,
      ),
    }));
  }

  const getBlockEditor = (block: Block) => {
    switch (block.blockType) {
      case 'Markdown':
        return (
          <MarkdownBlockEditor block={block} onChange={handleBlockChange} />
        );

      case 'Image':
        return <ImageBlockEditor block={block} onChange={handleBlockChange} />;

      case 'YoutubeVideo':
        return (
          <YoutubeVideoEditor block={block} onChange={handleBlockChange} />
        );

      case 'SandboxEmbed':
        return (
          <SandboxEmbedEditor block={block} onChange={handleBlockChange} />
        );

      case 'Code':
        return <CodeEditor block={block} onChange={handleBlockChange} />;

      case 'TextImage':
        return <TextImageEditor block={block} onChange={handleBlockChange} />;

      case 'ProgressiveDisclosure':
        return (
          <ProgressiveDisclosureEditor
            pageId={pageId}
            block={block}
            onChange={handleBlockChange}
          />
        );
    }

    assertUnreachable(block);
  };

  return (
    <div>
      {blockTypes.map((blockType) => (
        <button key={blockType} onClick={() => addBlock(blockType)}>
          + {blockType}
        </button>
      ))}

      <div className={styles.BlockEditor}>
        {blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <div key={block.id} className={styles.Block}>
              <div className={styles.BlockActions}>
                <button onClick={() => deleteBlock(block.id)}>—</button>
                <button onClick={() => moveBlock(block, 'up')}>&uarr;</button>
                <button onClick={() => moveBlock(block, 'down')}>&darr;</button>
              </div>

              {getBlockEditor(block)}
            </div>
          ))}
      </div>
    </div>
  );
}

interface BlockEditorProps<T extends Block> {
  block: T;
  onChange: (block: T) => void;
}

function MarkdownBlockEditor({
  block,
  onChange,
}: BlockEditorProps<MarkdownBlock>) {
  return (
    <TextareaAutosize
      onChange={(evt) => {
        onChange({...block, content: evt.target.value});
      }}
      minRows={5}
    >
      {block.content}
    </TextareaAutosize>
  );
}

function ImageBlockEditor({block, onChange}: BlockEditorProps<ImageBlock>) {
  return (
    <ImagePicker
      imageId={block.imageId}
      onPick={(imageId) => onChange({...block, imageId})}
    />
  );
}

function TextImageEditor({block, onChange}: BlockEditorProps<TextImageBlock>) {
  return (
    <>
      <TextareaAutosize
        value={block.content}
        onChange={(evt) => onChange({...block, content: evt.target.value})}
        minRows={5}
      ></TextareaAutosize>
      <ImagePicker
        imageId={block.imageId}
        onPick={(imageId) => onChange({...block, imageId})}
      />
    </>
  );
}

function YoutubeVideoEditor({
  block,
  onChange,
}: BlockEditorProps<YoutubeVideoBlock>) {
  return (
    <input
      type="text"
      value={block.youtubeUrl}
      onChange={(evt) => onChange({...block, youtubeUrl: evt.target.value})}
      placeholder="Youtube video URL"
    />
  );
}

function SandboxEmbedEditor({
  block,
  onChange,
}: BlockEditorProps<SandboxEmbedBlock>) {
  return (
    <input
      type="text"
      value={block.embedUrl}
      onChange={(evt) => onChange({...block, embedUrl: evt.target.value})}
      placeholder="Sandbox embed URL"
    />
  );
}

function CodeEditor({block, onChange}: BlockEditorProps<CodeBlock>) {
  // We only support javascript for now. The data structure is extensible
  // so that we can add more language down the road if we like.
  return (
    <TextareaAutosize
      onChange={(evt) =>
        onChange({
          ...block,
          // TODO: Allow multiple javascript tabs. Switch to array structure.
          code: {javascript: {title: '', code: evt.target.value}},
        })
      }
      placeholder="JS, JSX, TS or TSX code"
      minRows={10}
    >
      {block.code.javascript.code}
    </TextareaAutosize>
  );
}

function ProgressiveDisclosureEditor({
  block,
  onChange,
  pageId,
}: BlockEditorProps<ProgressiveDisclosureBlock> & {pageId: string}) {
  return (
    <div style={{padding: 20, border: '1px solid red'}}>
      <input
        type="text"
        value={block.title}
        onChange={(evt) => onChange({...block, title: evt.target.value})}
      />
      <BlockEditor pageId={pageId} parentBlockId={block.id} />
    </div>
  );
}

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

  function uploadImage(imageId: string, colorScheme: ColorScheme) {
    const fileInput = document.getElementById(
      `drop-zone-${imageId}-${colorScheme}`,
    ) as HTMLInputElement;

    if (fileInput && fileInput.files) {
      const formData = new FormData();
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('multipleFiles', fileInput.files[i]);
      }
      fetch('/api/editor/uploadImage', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setContent((content) => ({
            ...content,
            images: [
              ...content.images.map((image) => {
                if (image.id === imageId) {
                  const {fileName, width, height} = data;
                  return {
                    ...image,
                    variants: {
                      ...image.variants,
                      [colorScheme]: {fileName, alt: '', width, height},
                    },
                  };
                }
                return image;
              }),
            ],
          }));
          fileInput.value = '';
        });
    }
  }

  function addImage() {
    setContent((content) => ({
      ...content,
      images: [
        ...content.images,
        {id: nanoid(), alt: {light: '', dark: ''}, variants: {}},
      ],
    }));
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

  const selectedImage = content.images.find((image) => image.id === imageId);
  const lightVariant = selectedImage?.variants[ColorScheme.Light];
  const inspectedImage = content.images.find(({id}) => id === selectedImageId);

  function getImageDimensions(
    dimensions: {width: number; height: number},
    maxWidth: number,
  ): {
    width: number;
    height: number;
  } {
    const ratio = dimensions.width / dimensions.height;
    const height = maxWidth / ratio;

    return {
      width: maxWidth,
      height,
    };
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Pick image</button>
      {lightVariant && (
        <Image
          src={`/uploads/${lightVariant.fileName}`}
          alt={selectedImage.alt[ColorScheme.Light]}
          width={400}
          height={400}
        />
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Backdrop className={styles.Backdrop}></Dialog.Backdrop>
        <Dialog.Panel className={styles.ImagePicker}>
          <div className={styles.Browser}>
            <div className={styles.Images}>
              <button className={styles.AddImageButton} onClick={addImage}>
                Add image
              </button>

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
                          alt={image.alt[scheme]}
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
                <h2>{inspectedImage.id}</h2>
                <input
                  type="text"
                  value={inspectedImage.alt.light || ''}
                  onChange={(evt) =>
                    setAltAttribute(inspectedImage.id, evt.target.value)
                  }
                  title=""
                />
                {Object.values(ColorScheme).map((scheme) => {
                  const variantImage = inspectedImage.variants[scheme];
                  const indicator = (
                    <span className={styles.ColorSchemeIndicator}>
                      {scheme === 'light' ? '☀️ Light mode' : '🌙 Dark mode'}
                    </span>
                  );
                  if (variantImage) {
                    return (
                      <div className={styles.ImagePreview} key={scheme}>
                        {indicator}
                        <Image
                          src={`/uploads/${variantImage.fileName}`}
                          alt={inspectedImage.alt[scheme]}
                          {...getImageDimensions(
                            {
                              width: variantImage.width,
                              height: variantImage.height,
                            },
                            500,
                          )}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className={styles.DropZone}
                        key={`${inspectedImage.id}-${scheme}`}
                      >
                        {indicator}
                        <p>+</p>
                        <input
                          type="file"
                          id={`drop-zone-${inspectedImage.id}-${scheme}`}
                          onChange={() =>
                            uploadImage(inspectedImage.id, scheme)
                          }
                          title=""
                        />
                      </div>
                    );
                  }
                })}

                <button
                  onClick={() => {
                    onPick(inspectedImage.id);
                    setIsOpen(false);
                  }}
                >
                  Pick
                </button>
              </>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
