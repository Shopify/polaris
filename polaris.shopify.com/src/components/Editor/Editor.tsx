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
import {
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
  PageMetaType,
  PageMeta,
  pageMetaTypes,
  tokenGroups,
  TokenGroup,
  Page,
  PolarisComponentLifecyclePhase,
  polarisComponentLifecyclePhases,
  Image as ImageType,
  ImageFile,
} from './types';
import {
  ActionList,
  AlphaCard,
  AppProvider,
  Banner,
  Button,
  ButtonGroup,
  Checkbox,
  DropZone,
  FormLayout,
  Layout,
  List,
  Modal,
  Page as PolarisPage,
  PageActions,
  Popover,
  Select,
  Text,
  TextField,
  Tooltip,
} from '@shopify/polaris';
import {
  ArrowUpMinor,
  ArrowDownMinor,
  PlusMinor,
  DeleteMinor,
  ExternalMinor,
} from '@shopify/polaris-icons';
import enTranslations from '@shopify/polaris/locales/en.json';
import {className} from '../../utils/various';
import {
  getPageStack,
  getImageDimensions,
  getResolvedPage,
  getPageUrl,
} from './utils';
import {UploadImageResponse} from '../../../pages/api/editor/uploadImage';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {DeleteImageResponse} from '../../../pages/api/editor/deleteImage';

function assertUnreachable(_: never): never {
  throw new Error('assertUnreachable was called, which should never happen');
}

function getEmptyBlock(
  blockType: BlockType,
  parentBlockId: string | null,
): Block {
  const baseBlock: Omit<BaseBlock, 'blockType'> = {
    id: nanoid(),
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
        title: '',
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
  let persistToBackendTimer = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editedPageId = searchParams?.get('page') || null;

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

    const parentPage =
      (parentId && content.pages.find((page) => page.id === parentId)) ||
      undefined;

    const siblings = content.pages.filter(
      (thisPage) => thisPage.parentId === parentId,
    );

    let pageMeta: PageMeta | null = null;
    let pageMetaType: PageMetaType | null = null;
    if (parentPage?.childPageMetaType) {
      pageMetaType = parentPage.childPageMetaType;
    }

    switch (pageMetaType) {
      case 'components':
        pageMeta = {
          type: 'components',
          examples: [],
          lifeCyclePhase: 'Alpha',
          lifeCycleNotice: '',
        };
        break;

      case 'patterns':
        pageMeta = {
          type: 'patterns',
        };
        break;

      case 'tokens': {
        pageMeta = {
          type: 'tokens',
          tokenGroup: tokenGroups[0],
        };
      }

      case null:
        break;

      default:
        assertUnreachable(pageMetaType);
    }

    const newPage: Page = {
      id: pageId,
      title: 'New page',
      slug: pageId,
      parentId,
      excerpt: '',
      order: siblings.length,
      useCustomLayout: false,
      blockIds: [],
      keywords: [],
      childPageMetaType: null,
      pageMeta,
      allowChildren: false,
      hideInNav: false,
      noIndex: false,
      hasSeparatorInNav: false,
      thumbnailImageId: null,
    };

    setContent((content) => ({
      ...content,
      pages: [...content.pages, newPage],
    }));

    router.replace(`/editor?page=${pageId}`);
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
      router.replace('/editor');
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
      <AppProvider i18n={enTranslations}>
        <div className={styles.Editor}>
          <div className={styles.PageNav}>
            <Button outline size="slim" onClick={() => addPage(null)}>
              Add top level page
            </Button>

            <ul>
              {content.pages
                .filter((page) => page.parentId === null)
                .sort((a, b) => a.order - b.order)
                .map((page) => (
                  <PageNavItem
                    key={page.id}
                    page={page}
                    onPageClick={(id) => router.replace(`/editor?page=${id}`)}
                    editedPageId={editedPageId}
                  />
                ))}
            </ul>
          </div>

          {editedPageId && <PageEditor editedPageId={editedPageId} />}

          {/* {editedPageId && (
            <iframe
              className={styles.SitePreview}
              src={`/editor-page?id=${editedPageId}`}
              width={500}
              height={500}
              title="Preview"
            />
          )} */}
        </div>
      </AppProvider>
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
  const {content, addPage} = useContext(ContentContext);
  const childPages = content.pages
    .filter((thisPage) => thisPage.parentId === page.id)
    .sort((a, b) => a.order - b.order);

  return (
    <li
      className={className(
        !page.parentId && page.hasSeparatorInNav && styles.withSeparator,
      )}
      aria-current={page.id === editedPageId}
    >
      <span>
        <button onClick={() => onPageClick(page.id)}>{page.title}</button>
        <Tooltip content="Add child page">
          {page.allowChildren && (
            <button
              onClick={() => addPage(page.id)}
              aria-label="Add child page"
            >
              +
            </button>
          )}
        </Tooltip>
      </span>

      {childPages && (
        <ul className={styles.ChildPages}>
          {childPages.map((childPage) => (
            <PageNavItem
              key={childPage.id}
              page={childPage}
              onPageClick={onPageClick}
              editedPageId={editedPageId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function PageEditor({editedPageId}: {editedPageId: string}) {
  const {content, setContent, movePage, deletePage} =
    useContext(ContentContext);
  const editedPage = content.pages.find((page) => page.id === editedPageId);
  if (!editedPage) throw new Error('Edited page not found');

  const childPages = content.pages.filter(
    ({parentId}) => parentId === editedPageId,
  );

  function updatePage(newPage: Page) {
    setContent((content) => ({
      ...content,
      pages: content.pages.map((page) =>
        page.id === editedPageId ? newPage : page,
      ),
    }));
  }

  return (
    <div className={styles.PageWrapper}>
      <PolarisPage
        title={editedPage.title}
        secondaryActions={[
          {
            content: 'Move up',
            onAction: () => movePage(editedPage, 'up'),
            icon: ArrowUpMinor,
            disabled: editedPage.order === 0,
          },
          {
            content: 'Move down',
            onAction: () => movePage(editedPage, 'down'),
            icon: ArrowDownMinor,
          },
          {
            content: 'Preview',
            icon: ExternalMinor,
            external: true,
            url: getPageUrl(content, editedPage),
          },
        ]}
      >
        <Layout>
          <Layout.Section>
            <div className={styles.PageEditor}>
              <AlphaCard>
                <FormLayout>
                  <TextField
                    type="text"
                    value={editedPage.title}
                    onChange={(title) => updatePage({...editedPage, title})}
                    label="Title"
                    autoComplete="off"
                  />

                  <TextField
                    type="text"
                    value={editedPage.slug}
                    onChange={(slug) =>
                      updatePage({
                        ...editedPage,
                        slug: slug
                          .toLowerCase()
                          .replace(/[_\s]+/g, '-')
                          .replace(/[^a-z-]+/g, ''),
                      })
                    }
                    label="Slug"
                    autoComplete="off"
                    prefix={`${getPageStack(content, editedPage)
                      .slice(0, -1)
                      .map(({slug}) => slug)
                      .join(' / ')} /`}
                    maxLength={40}
                    showCharacterCount
                  />

                  <TextField
                    type="text"
                    value={editedPage.excerpt}
                    onChange={(excerpt) => updatePage({...editedPage, excerpt})}
                    label="Excerpt"
                    helpText="The excerpt is used in overview pages and in search results."
                    multiline={true}
                    autoComplete="off"
                  />

                  <ImagePicker
                    imageId={editedPage.thumbnailImageId}
                    onPick={(thumbnailImageId) =>
                      updatePage({...editedPage, thumbnailImageId})
                    }
                  />

                  <Checkbox
                    label="Render with custom Next.js layout"
                    checked={editedPage.useCustomLayout}
                    onChange={(useCustomLayout) =>
                      updatePage({...editedPage, useCustomLayout})
                    }
                  />

                  {editedPage.useCustomLayout && (
                    <Banner
                      title="This page is using a custom layout"
                      action={{
                        content: 'Read Next.js docs',
                        url: 'https://beta.nextjs.org/docs/app-directory-roadmap',
                      }}
                      status="info"
                    >
                      <p>
                        You have to create a custom Next.js template for the
                        page to show up.
                      </p>
                    </Banner>
                  )}
                </FormLayout>
              </AlphaCard>

              {editedPage.pageMeta !== null && (
                <AlphaCard>
                  <PageMetaEditor page={editedPage} updatePage={updatePage} />
                </AlphaCard>
              )}

              {!editedPage.useCustomLayout && (
                <BlockList pageId={editedPageId} parentBlockId={null} />
              )}
            </div>

            <PageActions
              secondaryActions={[
                {
                  content: 'Delete page',
                  destructive: true,
                  onAction: () => deletePage(editedPage),
                  disabled: childPages.length > 0,
                },
              ]}
            />
          </Layout.Section>
          <Layout.Section secondary>
            <AlphaCard>
              <FormLayout>
                <Checkbox
                  checked={editedPage.hideInNav}
                  onChange={(hideInNav) =>
                    updatePage({...editedPage, hideInNav})
                  }
                  label="Hide in navigation"
                />

                <Checkbox
                  checked={editedPage.noIndex}
                  onChange={(noIndex) => updatePage({...editedPage, noIndex})}
                  label="Hide in search engines"
                />

                <Checkbox
                  checked={editedPage.allowChildren}
                  onChange={(allowChildren) =>
                    updatePage({...editedPage, allowChildren})
                  }
                  label="Page can have children"
                />

                {editedPage.parentId === null &&
                  editedPage.hideInNav === false && (
                    <Checkbox
                      checked={editedPage.hasSeparatorInNav}
                      onChange={(hasSeparatorInNav) =>
                        updatePage({...editedPage, hasSeparatorInNav})
                      }
                      label="Add separator in navigation"
                    />
                  )}

                {editedPage.allowChildren && (
                  <Select
                    label="Child page type"
                    helpText={
                      <p>
                        {`Forces all children to contain the same type of meta data. This value can't be changed when the page already has
                    children.`}
                      </p>
                    }
                    options={[
                      {label: 'None', value: 'null'},
                      ...pageMetaTypes.map((type) => ({
                        label: type,
                        value: type,
                      })),
                    ]}
                    onChange={(value) => {
                      const childPageMetaType = (
                        value === 'null' ? null : value
                      ) as PageMetaType | null;
                      updatePage({...editedPage, childPageMetaType});
                    }}
                    value={editedPage.childPageMetaType || 'null'}
                    disabled={childPages.length > 0}
                  />
                )}
              </FormLayout>
            </AlphaCard>
          </Layout.Section>
        </Layout>
      </PolarisPage>
    </div>
  );
}

function PageMetaEditor({
  page,
  updatePage,
}: {
  page: Page;
  updatePage: (page: Page) => void;
}) {
  const {pageMeta} = page;

  if (!pageMeta) return null;

  function updateMeta(newMeta: PageMeta) {
    updatePage({...page, pageMeta: newMeta});
  }

  switch (pageMeta.type) {
    case 'components':
      return (
        <>
          <Select
            label="Lifecycle phase"
            options={[
              ...polarisComponentLifecyclePhases.map((groupName) => ({
                label: groupName,
                value: groupName,
              })),
            ]}
            onChange={(value) => {
              const lifeCyclePhase = value as PolarisComponentLifecyclePhase;
              updateMeta({...pageMeta, lifeCyclePhase});
            }}
            value={pageMeta.lifeCyclePhase}
          />

          <TextField
            type="text"
            multiline={true}
            value={pageMeta.lifeCycleNotice}
            onChange={(lifeCycleNotice) =>
              updateMeta({...pageMeta, lifeCycleNotice})
            }
            label="Lifecycle message"
            helpText="Displayed in the banner at the top of the component page"
            autoComplete="off"
          />
        </>
      );
      break;

    case 'patterns':
      return null;

    case 'tokens':
      return (
        <Select
          label="Token type"
          options={[
            ...tokenGroups.map((groupName) => ({
              label: groupName,
              value: groupName,
            })),
          ]}
          onChange={(value) => {
            const tokenGroup = value as TokenGroup;
            updateMeta({...pageMeta, tokenGroup});
          }}
          value={pageMeta.tokenGroup}
        />
      );
  }

  assertUnreachable(pageMeta);
}

function BlockList({
  pageId,
  parentBlockId,
}: {
  pageId: string;
  parentBlockId: string | null;
}) {
  const {content} = useContext(ContentContext);

  const page = content.pages.find((page) => page.id === pageId);
  if (!page) throw new Error('Page not found');
  const resolvedPage = getResolvedPage(content, page, true);
  const blocks = resolvedPage.blocks
    .filter((block) => block.parentBlockId === parentBlockId)
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className={styles.BlockList}>
        <BlockAdder pageId={pageId} parentBlockId={parentBlockId} order={0} />

        {blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            pageId={pageId}
            block={block}
            parentBlockId={parentBlockId}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function BlockEditor({
  pageId,
  block,
  parentBlockId,
  isFirst,
  isLast,
}: {
  pageId: string;
  block: Block;
  parentBlockId: string | null;
  isFirst: boolean;
  isLast: boolean;
}) {
  const {setContent} = useContext(ContentContext);

  function deleteBlock(blockId: string) {
    setContent((content) =>
      sortBlocks({
        ...content,
        blocks: content.blocks.filter((block) => block.id !== blockId),
      }),
    );
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

      const sortedContent = sortBlocks({
        ...content,
        blocks: newBlocks,
      });

      return sortedContent;
    });
  }

  function handleBlockChange(updatedBlock: Block) {
    setContent((content) => ({
      ...content,
      blocks: content.blocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block,
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
      <AlphaCard key={block.id}>
        <div className={styles.BlockActions}>
          {block.order}
          <ButtonGroup>
            <Button
              plain
              icon={DeleteMinor}
              size="slim"
              onClick={() => deleteBlock(block.id)}
              aria-label="Delete block"
            ></Button>
            <Button
              plain
              icon={ArrowUpMinor}
              size="slim"
              onClick={() => moveBlock(block, 'up')}
              aria-label="Move block up"
              disabled={isFirst}
            ></Button>
            <Button
              plain
              icon={ArrowDownMinor}
              size="slim"
              onClick={() => moveBlock(block, 'down')}
              aria-label="Move block down"
              disabled={isLast}
            ></Button>
          </ButtonGroup>
        </div>

        {getBlockEditor(block)}
      </AlphaCard>

      <BlockAdder
        pageId={pageId}
        parentBlockId={parentBlockId}
        order={block.order + 1}
      />
    </>
  );
}

function sortBlocks(content: Content): Content {
  const delimiter = '$';

  let groups: {
    [hash: string]: Block[];
  } = {};

  const getHash = (pageId: string, block: Block) =>
    `${pageId}${delimiter}${block.parentBlockId || 'null'}`;

  content.pages.forEach(({id, blockIds}) => {
    blockIds.forEach((blockId) => {
      const block = content.blocks.find((block) => block.id === blockId);
      if (block) {
        const hash = getHash(id, block);
        groups[hash] = [...(groups[hash] || []), block];
      }
    });
  });

  Object.keys(groups).forEach((hash) => {
    groups[hash] = groups[hash]
      .sort((a, b) => a.order - b.order)
      .map((block, index) => ({...block, order: index}));
  });

  let sortedBlocks: Block[] = [];

  Object.keys(groups).forEach(
    (hash) => (sortedBlocks = [...sortedBlocks, ...groups[hash]]),
  );

  return {...content, blocks: sortedBlocks};
}

function BlockAdder({
  pageId,
  parentBlockId,
  order,
}: {
  pageId: string;
  parentBlockId: string | null;
  order: number;
}) {
  const {setContent} = useContext(ContentContext);
  const [adderIsVisible, setAdderIsVisible] = useState(false);

  function addBlock(blockType: BlockType, order: number) {
    let newBlock: Block = {
      ...getEmptyBlock(blockType, parentBlockId),
      // -0.5 squeezes the block in between the indented order
      // and the previous one. The sorting function will then
      // clean up the order values.
      order: order - 0.5,
    };

    setContent((content) => {
      return sortBlocks({
        ...content,
        pages: [
          ...content.pages.map((page) =>
            page.id === pageId
              ? {...page, blockIds: [...page.blockIds, newBlock.id]}
              : page,
          ),
        ],
        blocks: [...content.blocks, newBlock],
      });
    });
  }

  return (
    <Popover
      active={adderIsVisible}
      activator={
        <div className={styles.BlockAdder}>
          <Button
            onClick={() => setAdderIsVisible(true)}
            icon={PlusMinor}
            plain
          ></Button>
        </div>
      }
      autofocusTarget="first-node"
      onClose={() => setAdderIsVisible(false)}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          ...blockTypes.map((blockType) => ({
            content: blockType,
            onAction: () => {
              addBlock(blockType, order);
              setAdderIsVisible(false);
            },
            icon: PlusMinor,
          })),
        ]}
      />
    </Popover>
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
    <TextField
      type="text"
      multiline={true}
      value={block.content}
      onChange={(content) => onChange({...block, content})}
      label="Markdown content"
      autoComplete="off"
      placeholder={`# Heading

Lorem ipsum dolor...`}
    />
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
      <TextField
        type="text"
        multiline={true}
        value={block.content}
        onChange={(content) => onChange({...block, content})}
        label="Markdown content"
        autoComplete="off"
      />

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
    <TextField
      type="text"
      value={block.youtubeUrl}
      onChange={(youtubeUrl) => onChange({...block, youtubeUrl})}
      label="Youtube video URL"
      autoComplete="off"
      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    />
  );
}

function SandboxEmbedEditor({
  block,
  onChange,
}: BlockEditorProps<SandboxEmbedBlock>) {
  return (
    <TextField
      type="text"
      value={block.embedUrl}
      onChange={(embedUrl) => onChange({...block, embedUrl})}
      label="Sandbox embed URL"
      autoComplete="off"
    />
  );
}

function CodeEditor({block, onChange}: BlockEditorProps<CodeBlock>) {
  // We only support javascript for now. The data structure is extensible
  // so that we can add more language down the road if we like.
  return (
    <TextField
      type="text"
      multiline={true}
      value={block.code.javascript.code}
      onChange={(code) => {
        onChange({
          ...block,
          // TODO: Allow multiple javascript tabs. Switch to array structure.
          code: {javascript: {title: '', code}},
        });
      }}
      label="Code"
      autoComplete="off"
    />
  );
}

function ProgressiveDisclosureEditor({
  block,
  onChange,
  pageId,
}: BlockEditorProps<ProgressiveDisclosureBlock> & {pageId: string}) {
  return (
    <div>
      <TextField
        type="text"
        value={block.title}
        onChange={(title) => onChange({...block, title})}
        label="Text to show when collapsed"
        autoComplete="off"
      />

      <BlockList pageId={pageId} parentBlockId={block.id} />
    </div>
  );
}

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
            200,
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
                                <p>Replace</p>
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
                      onClick={() => alert('TODO: Delete image')}
                      icon={DeleteMinor}
                      fullWidth
                      outline
                    >
                      Delete image
                    </Button>
                    {pagesUsingSelectedImage.length > 0 && (
                      <Text as="p" color="subdued" variant="bodySm">
                        {`The image can't be deleted while still being referenced by other pages. Remove the image from those pages before deleting it.`}
                      </Text>
                    )}
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
