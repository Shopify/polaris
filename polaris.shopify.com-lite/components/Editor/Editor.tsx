'use client';

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
} from 'react';
import {nanoid} from 'nanoid';
import styles from './Editor.module.scss';
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
  blockTypes,
  ProgressiveDisclosureBlock,
  PageMetaType,
  PageMeta,
  pageMetaTypes,
  Page,
  PolarisComponentLifecyclePhase,
  polarisComponentLifecyclePhases,
  DoDontBlock,
  TabbedContentBlock,
  CodeBlockLanguage,
  codeBlockLanguages,
  State,
  Image as ImageType,
} from '@/types';
import {
  ActionList,
  AlphaCard,
  AlphaStack,
  AppProvider,
  Button,
  ButtonGroup,
  Checkbox,
  FormLayout,
  InlineError,
  Layout,
  Modal,
  Page as PolarisPage,
  PageActions,
  Popover,
  Select,
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
import {assertUnreachable, className, getImageDimensions} from '@/utils';
import {getBreadcrumbs, getResolvedPage, getPageUrl} from '@/utils';
import {useRouter, useSearchParams} from 'next/navigation';
import reducer, {getNiceNameForBlockType} from './reducer';
import {Action} from './types';
import Image from 'next/image';
import {Tabs, Tab} from '../Tabs';

export const ContentContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: {pages: []},
  dispatch: () => undefined,
});

export default function Editor({initialContent}: {initialContent: State}) {
  const [state, dispatch] = useReducer(reducer, initialContent);
  let persistToBackendTimer = useRef<NodeJS.Timeout | null>(null);
  let isInitialLoad = useRef(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editedPageId = searchParams?.get('page') || null;

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (persistToBackendTimer.current) {
      clearTimeout(persistToBackendTimer.current);
    }
    persistToBackendTimer.current = setTimeout(() => {
      fetch(`/editor/save`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({state}),
      });
    }, 1500);
    return () => {
      if (persistToBackendTimer.current) {
        clearTimeout(persistToBackendTimer.current);
      }
    };
  }, [state]);

  return (
    <ContentContext.Provider value={{state, dispatch}}>
      <AppProvider i18n={enTranslations}>
        <div className={styles.Editor}>
          <div className={styles.PageNav}>
            <Button
              outline
              size="slim"
              onClick={() => {
                const id = nanoid();
                dispatch({type: 'ADD_PAGE', id, parentId: null});
                router.replace(`/editor?page=${id}`);
              }}
            >
              Add top level page
            </Button>

            <ul>
              {state.pages
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
  const {state, dispatch} = useContext(ContentContext);
  const childPages = state.pages
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
              onClick={() =>
                dispatch({type: 'ADD_PAGE', id: nanoid(), parentId: page.id})
              }
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
  const {state, dispatch} = useContext(ContentContext);
  const editedPage = state.pages.find((page) => page.id === editedPageId);
  const router = useRouter();
  if (!editedPage) return <p>Page not found</p>;

  const siblingPages = state.pages.filter(
    ({parentId}) => parentId === editedPage.parentId,
  );

  const childPages = state.pages.filter(
    ({parentId}) => parentId === editedPageId,
  );

  function updatePage(changedPage: Page) {
    dispatch({type: 'UPDATE_PAGE', changedPage});
  }

  function deletePage() {
    if (editedPage) {
      dispatch({type: 'DELETE_PAGE', page: editedPage});
      router.replace('/editor');
    }
  }

  return (
    <div className={styles.PageWrapper}>
      <PolarisPage
        title={editedPage.title}
        secondaryActions={[
          {
            content: 'Move up',
            onAction: () =>
              dispatch({type: 'MOVE_PAGE', page: editedPage, direction: 'up'}),
            icon: ArrowUpMinor,
            disabled: editedPage.order === 0,
          },
          {
            content: 'Move down',
            onAction: () =>
              dispatch({
                type: 'MOVE_PAGE',
                page: editedPage,
                direction: 'down',
              }),
            icon: ArrowDownMinor,
            disabled: editedPage.order === siblingPages.length - 1,
          },
          {
            content: 'Preview',
            icon: ExternalMinor,
            external: true,
            url: getPageUrl(state, editedPage),
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
                    prefix={`${getBreadcrumbs(state, editedPage)
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
                    image={editedPage.thumbnailImage}
                    onChange={(thumbnailImage) =>
                      updatePage({...editedPage, thumbnailImage})
                    }
                  />

                  <Select
                    label="Layout"
                    options={[
                      {value: 'blocks', label: 'Article'},
                      {value: 'listing', label: 'Overview page'},
                    ]}
                    value={editedPage.layout}
                    onChange={(layout: Page['layout']) =>
                      updatePage({...editedPage, layout})
                    }
                  />
                </FormLayout>
              </AlphaCard>

              {editedPage.pageMeta !== null && (
                <AlphaCard>
                  <PageMetaEditor page={editedPage} updatePage={updatePage} />
                </AlphaCard>
              )}

              {editedPage.layout !== 'listing' && (
                <BlockList
                  pageId={editedPageId}
                  parentBlockId={null}
                  tabId={null}
                />
              )}
            </div>

            <PageActions
              secondaryActions={[
                {
                  content: 'Delete page',
                  destructive: true,
                  onAction: deletePage,
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
      return null;
  }

  assertUnreachable(pageMeta);
}

function BlockList({
  pageId,
  parentBlockId,
  tabId,
}: {
  pageId: string;
  parentBlockId: string | null;
  tabId: string | null;
}) {
  const {state} = useContext(ContentContext);

  const page = state.pages.find((page) => page.id === pageId);
  if (!page) throw new Error('Page not found');
  const resolvedPage = getResolvedPage(state, page);

  let blocks = resolvedPage.blocks;
  if (parentBlockId) {
    const parentBlock = resolvedPage.blocks.find(
      (block) => block.id === parentBlockId,
    );
    if (!parentBlock) throw new Error('Parent block not found');
    if (parentBlock.blockType === 'ProgressiveDisclosure') {
      blocks = parentBlock.blocks;
    } else if (parentBlock.blockType === 'TabbedContent') {
      const tab = parentBlock.tabs.find((tab) => tab.id === tabId);
      if (!tab) throw new Error('Tab not found');
      blocks = tab.blocks;
    }
  }

  return (
    <div>
      <div className={styles.BlockList}>
        <BlockAdder
          pageId={pageId}
          parentBlockId={parentBlockId}
          tabId={tabId}
          index={0}
        />

        {blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            pageId={pageId}
            block={block}
            parentBlockId={parentBlockId}
            index={index}
            isFirst={index === 0}
            isLast={index === resolvedPage.blocks.length - 1}
            tabId={tabId}
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
  tabId,
  index,
  isFirst,
  isLast,
}: {
  pageId: string;
  block: Block;
  parentBlockId: string | null;
  tabId: string | null;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const {dispatch} = useContext(ContentContext);

  function handleBlockChange(newBlock: Block) {
    dispatch({
      type: 'UPDATE_BLOCK',
      newBlock,
      pageId,
      parentBlockId,
      tabId,
    });
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

      case 'DoDont':
        return <DoDontEditor block={block} onChange={handleBlockChange} />;

      case 'TabbedContent':
        return (
          <TabbedContentEditor
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
          <ButtonGroup>
            <Button
              plain
              icon={ArrowUpMinor}
              size="slim"
              onClick={() =>
                dispatch({
                  type: 'MOVE_BLOCK',
                  pageId,
                  parentBlockId,
                  tabId,
                  fromIndex: index,
                  toIndex: index - 1,
                })
              }
              aria-label="Move block up"
              disabled={isFirst}
            ></Button>
            <Button
              plain
              icon={ArrowDownMinor}
              size="slim"
              onClick={() =>
                dispatch({
                  type: 'MOVE_BLOCK',
                  pageId,
                  parentBlockId,
                  tabId,
                  fromIndex: index,
                  toIndex: index - 1,
                })
              }
              aria-label="Move block down"
              disabled={isLast}
            ></Button>
            <Button
              plain
              icon={DeleteMinor}
              size="slim"
              onClick={() =>
                dispatch({
                  type: 'DELETE_BLOCK',
                  blockId: block.id,
                  pageId,
                  parentBlockId,
                  tabId,
                })
              }
              aria-label="Delete block"
            ></Button>
          </ButtonGroup>
        </div>

        {getBlockEditor(block)}
      </AlphaCard>

      <BlockAdder
        pageId={pageId}
        parentBlockId={parentBlockId}
        tabId={tabId}
        index={index + 1}
      />
    </>
  );
}

function BlockAdder({
  pageId,
  parentBlockId,
  tabId,
  index,
}: {
  pageId: string;
  parentBlockId: string | null;
  tabId: string | null;
  index: number;
}) {
  const {dispatch} = useContext(ContentContext);
  const [adderIsVisible, setAdderIsVisible] = useState(false);

  return (
    <Popover
      active={adderIsVisible}
      activator={
        <div className={styles.BlockAdder}>
          <Button
            onClick={() => setAdderIsVisible(true)}
            icon={PlusMinor}
            size="slim"
          >
            Add block
          </Button>
        </div>
      }
      autofocusTarget="first-node"
      onClose={() => setAdderIsVisible(false)}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          ...blockTypes
            .filter((blockType) => {
              if (parentBlockId && blockType === 'TabbedContent') {
                return false;
              }
              return true;
            })
            .map((blockType) => ({
              content: getNiceNameForBlockType(blockType),
              onAction: () => {
                dispatch({
                  type: 'ADD_BLOCK',
                  blockType,
                  pageId,
                  tabId,
                  parentBlockId,
                  index,
                });
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
      maxHeight={800}
    />
  );
}

function ImageBlockEditor({block, onChange}: BlockEditorProps<ImageBlock>) {
  return (
    <ImagePicker
      image={block.image}
      onChange={(image) => onChange({...block, image})}
    />
  );
}

function TextImageEditor({block, onChange}: BlockEditorProps<TextImageBlock>) {
  return (
    <div className={styles.TextImageEditor}>
      <TextField
        type="text"
        multiline={true}
        value={block.content}
        onChange={(content) => onChange({...block, content})}
        label="Markdown content"
        autoComplete="off"
      />

      <ImagePicker
        image={block.image}
        onChange={(image) => onChange({...block, image})}
      />
    </div>
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

      <BlockList pageId={pageId} parentBlockId={block.id} tabId={null} />
    </div>
  );
}

function DoDontEditor({block, onChange}: BlockEditorProps<DoDontBlock>) {
  return (
    <FormLayout>
      <TextField
        type="text"
        value={block.doMarkdown}
        onChange={(doMarkdown) => onChange({...block, doMarkdown})}
        label="Do (markdown)"
        autoComplete="off"
        multiline={true}
      />

      <TextField
        type="text"
        value={block.dontMarkdown}
        onChange={(dontMarkdown) => onChange({...block, dontMarkdown})}
        label="Don't (markdown)"
        autoComplete="off"
        multiline={true}
      />
    </FormLayout>
  );
}

function CodeEditor({block, onChange}: BlockEditorProps<CodeBlock>) {
  const addTab = () =>
    onChange({
      ...block,
      snippets: [
        ...block.snippets,
        {id: nanoid(), label: 'New tab', code: '', language: 'typescript'},
      ],
    });

  const deleteTab = (id: string) =>
    onChange({
      ...block,
      snippets: block.snippets.filter((snippet) => snippet.id !== id),
    });

  return (
    <div>
      <Tabs
        tabs={block.snippets.map(({id, label}) => ({id, label}))}
        onAdd={addTab}
        boxed
      >
        {block.snippets.map((snippet) => (
          <Tab key={snippet.id}>
            <FormLayout>
              <TextField
                type="text"
                label="Snippet label"
                value={snippet.label}
                onChange={(label) => {
                  onChange({
                    ...block,
                    snippets: block.snippets.map((thisSnippet) =>
                      thisSnippet.id === snippet.id
                        ? {...thisSnippet, label}
                        : thisSnippet,
                    ),
                  });
                }}
                autoComplete="off"
              />

              <Select
                label="Language"
                options={codeBlockLanguages.map((language) => ({
                  label: language,
                  value: language,
                }))}
                value={snippet.language}
                onChange={(language) => {
                  const typedLanguage = language as CodeBlockLanguage;
                  onChange({
                    ...block,
                    snippets: block.snippets.map((thisSnippet) =>
                      thisSnippet.id === snippet.id
                        ? {...thisSnippet, language: typedLanguage}
                        : thisSnippet,
                    ),
                  });
                }}
              />

              <TextField
                type="text"
                label="Code"
                value={snippet.code}
                onChange={(code) => {
                  onChange({
                    ...block,
                    snippets: block.snippets.map((thisSnippet, i) =>
                      thisSnippet.id === snippet.id
                        ? {...thisSnippet, code}
                        : thisSnippet,
                    ),
                  });
                }}
                autoComplete="off"
                multiline={true}
              />

              {block.snippets.length > 1 && (
                <Button
                  destructive
                  onClick={() => deleteTab(snippet.id)}
                  outline
                >
                  Delete tab
                </Button>
              )}
            </FormLayout>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

function TabbedContentEditor({
  pageId,
  block,
  onChange,
}: BlockEditorProps<TabbedContentBlock> & {pageId: string}) {
  const addTab = () =>
    onChange({
      ...block,
      tabs: [...block.tabs, {id: nanoid(), label: 'New tab', blocks: []}],
    });

  const deleteTab = (id: string) =>
    onChange({...block, tabs: block.tabs.filter((tab) => tab.id !== id)});

  return (
    <div>
      <Tabs
        tabs={block.tabs.map(({id, label}) => ({id, label}))}
        onAdd={addTab}
        boxed
      >
        {block.tabs.map((tab) => (
          <Tab key={tab.id}>
            <FormLayout>
              <TextField
                type="text"
                label="Tab label"
                value={tab.label}
                onChange={(label) => {
                  onChange({
                    ...block,
                    tabs: block.tabs.map((thisTab) =>
                      thisTab.id === tab.id ? {...thisTab, label} : thisTab,
                    ),
                  });
                }}
                autoComplete="off"
              />

              <BlockList
                pageId={pageId}
                parentBlockId={block.id}
                tabId={tab.id}
              />

              <Button destructive onClick={() => deleteTab(tab.id)} outline>
                Delete tab
              </Button>
            </FormLayout>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

function ImagePicker({
  image,
  onChange,
}: {
  image: ImageType;
  onChange: (image: ImageType) => void;
}) {
  const [active, setIsActive] = useState(false);
  const [widthValue, setWidthValue] = useState(image.width.toString());
  const [heightValue, setHeightValue] = useState(image.height.toString());
  const imageIsValid =
    image.lightModeFilename && image.alt && image.width && image.height;
  const buttonId = useId();

  useEffect(() => {
    if (active) {
      setWidthValue(image.width.toString());
      setHeightValue(image.height.toString());
    }
  }, [active]);

  return (
    <Modal
      activator={
        <>
          {imageIsValid && (
            <Image
              src={`/images/${image.lightModeFilename}`}
              alt={image.alt}
              {...getImageDimensions(
                {width: image.width, height: image.height},
                200,
              )}
            />
          )}

          <AlphaStack inlineAlign="start" gap="2">
            <Button id={buttonId} onClick={() => setIsActive(true)}>
              {imageIsValid ? 'Replace' : 'Select'} image
            </Button>
            {!imageIsValid && (
              <InlineError
                message={'Missing required information'}
                fieldID={buttonId}
              />
            )}
          </AlphaStack>
        </>
      }
      open={active}
      onClose={() => setIsActive(false)}
      title="Reach more shoppers with Instagram product tags"
      primaryAction={{
        content: 'Close',
        onAction: () => setIsActive(false),
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="☀️ Light mode image filename"
            value={image.lightModeFilename}
            onChange={(lightModeFilename) =>
              onChange({...image, lightModeFilename})
            }
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="💡 Dark mode image filename"
            value={image.darkModeFilename}
            onChange={(darkModeFilename) =>
              onChange({...image, darkModeFilename})
            }
            autoComplete="off"
          />
          <TextField
            label="Alt attribute"
            value={image.alt}
            onChange={(alt) => onChange({...image, alt})}
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="Width (original file)"
            value={widthValue}
            onChange={(value) => setWidthValue(value)}
            onBlur={() => onChange({...image, width: parseInt(widthValue)})}
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="Height (original file)"
            value={heightValue}
            onChange={(value) => setHeightValue(value)}
            onBlur={() => onChange({...image, height: parseInt(heightValue)})}
            autoComplete="off"
            requiredIndicator={true}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}
