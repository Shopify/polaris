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
}>({
  content: {
    pages: [],
    blocks: [],
    images: [],
  },
  setContent: () => undefined,
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
    }, 1000);
    return () => {
      if (persistToBackendTimer.current) {
        clearTimeout(persistToBackendTimer.current);
      }
    };
  }, [content]);

  function addPage() {
    const pageId = nanoid();

    const newPage: Page = {
      id: pageId,
      title: 'New page',
      parentId: null,
      order: 0,
    };

    setContent((content) => ({
      ...content,
      pages: [...content.pages, newPage],
    }));

    setEditedPageId(pageId);
  }

  return (
    <ContentContext.Provider value={{content, setContent}}>
      <div className={styles.Editor}>
        <div className={styles.Pages}>
          <button onClick={addPage}>Add page</button>
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

        <div className={styles.PageEditorWrapper}>
          {editedPageId && <PageEditor editedPageId={editedPageId} />}
        </div>
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
  const {content} = useContext(ContentContext);
  const childPages = content.pages
    .filter((page) => page.parentId === page.id)
    .sort((a, b) => a.order - b.order);
  return (
    <div>
      <button
        onClick={() => onPageClick(page.id)}
        aria-current={page.id === editedPageId}
      >
        {page.title}
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
  if (!editedPage) throw new Error('Page not found');

  function updatePage(newPage: Page) {
    setContent((content) => ({
      ...content,
      pages: content.pages.map((page) =>
        page.id === editedPageId ? newPage : page,
      ),
    }));
  }

  return (
    <div>
      <input
        type="text"
        value={editedPage.title}
        onChange={(evt) => updatePage({...editedPage, title: evt.target.value})}
      />
      <input
        min={0}
        type="number"
        value={editedPage.order}
        onChange={(evt) =>
          updatePage({...editedPage, order: parseInt(evt.target.value)})
        }
      />

      <BlockEditor pageId={editedPageId} parentBlockId={null} />
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
      return {
        ...content,
        blocks: sortedBlocks,
      };
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
    <>
      {blockTypes.map((blockType) => (
        <button key={blockType} onClick={() => addBlock(blockType)}>
          + {blockType}
        </button>
      ))}

      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block) => (
          <div key={block.id}>
            <button onClick={() => deleteBlock(block.id)}>—</button>
            <button onClick={() => moveBlock(block, 'up')}>&uarr;</button>
            <button onClick={() => moveBlock(block, 'down')}>&darr;</button>

            {block.order}
            {getBlockEditor(block)}
          </div>
        ))}
    </>
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
    <textarea
      onChange={(evt) => {
        onChange({...block, content: evt.target.value});
      }}
    >
      {block.content}
    </textarea>
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
      <textarea
        value={block.content}
        onChange={(evt) => onChange({...block, content: evt.target.value})}
      ></textarea>
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
    <textarea
      onChange={(evt) =>
        onChange({
          ...block,
          // TODO: Allow multiple javascript tabs. Switch to array structure.
          code: {javascript: {title: '', code: evt.target.value}},
        })
      }
      placeholder="JS, JSX, TS or TSX code"
    >
      {block.code.javascript.code}
    </textarea>
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
  const [uploadTarget, setUploadTarget] = useState<{
    id: string;
    scheme: ColorScheme;
  } | null>(null);

  function uploadImage() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
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
                if (image.id === uploadTarget?.id) {
                  const {fileName, width, height} = data;
                  return {
                    ...image,
                    variants: {
                      ...image.variants,
                      [uploadTarget.scheme]: {fileName, alt: '', width, height},
                    },
                  };
                }
                return image;
              }),
            ],
          }));
          fileInput.value = '';
          setUploadTarget(null);
        });
    }
  }

  function addImage() {
    setContent((content) => ({
      ...content,
      images: [...content.images, {id: nanoid(), variants: {}}],
    }));
  }

  const selectedImage = content.images.find((image) => image.id === imageId);
  const lightVariant = selectedImage?.variants[ColorScheme.Light];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Pick image</button>
      {lightVariant && (
        <Image
          src={`/uploads/${lightVariant.fileName}`}
          alt={lightVariant.alt}
          width={400}
          height={400}
        />
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Backdrop></Dialog.Backdrop>
        <Dialog.Panel className={styles.ImagePicker}>
          <button onClick={addImage}>Add image</button>

          {content.images.map((image) => (
            <div key={image.id}>
              {Object.values(ColorScheme).map((scheme) => {
                const variantImage = image.variants[scheme];
                if (variantImage) {
                  return (
                    <button
                      key={scheme}
                      onClick={() => {
                        onPick(image.id);
                        setIsOpen(false);
                      }}
                    >
                      <Image
                        src={`/uploads/${variantImage.fileName}`}
                        alt={variantImage.alt}
                        width={200}
                        height={200}
                      />
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={image.id}
                      onClick={() => setUploadTarget({id: image.id, scheme})}
                    >
                      Add {scheme} mode image
                    </button>
                  );
                }
              })}
            </div>
          ))}

          {uploadTarget && (
            <input
              type="file"
              multiple={true}
              id="file-input"
              onChange={uploadImage}
            />
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
