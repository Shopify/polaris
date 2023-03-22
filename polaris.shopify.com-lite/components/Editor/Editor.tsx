'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
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
  Content,
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
  DoDontBlock,
  TabbedContentBlock,
  ResolvedPage,
} from '@/types';
import {
  ActionList,
  AlphaCard,
  AppProvider,
  Banner,
  Button,
  ButtonGroup,
  Checkbox,
  FormLayout,
  Layout,
  Page as PolarisPage,
  PageActions,
  Popover,
  Select,
  Tabs,
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
import {arrayMoveImmutable, className} from '@/utils';
import {getBreadcrumbs, getResolvedPage, getPageUrl} from '@/utils';
import {useRouter, useSearchParams} from 'next/navigation';
import ImagePicker from './components/ImagePicker';

function assertUnreachable(_: never): never {
  throw new Error('assertUnreachable was called, which should never happen');
}

function getEmptyBlock(
  blockType: BlockType,
  parentBlockId: string | null,
  tabId: string | null,
): Block {
  const baseBlock: Omit<BaseBlock, 'blockType'> = {
    id: nanoid(),
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
        blocks: [],
      };
      return block;
    }

    case 'DoDont': {
      const block: DoDontBlock = {
        ...baseBlock,
        blockType,
        doMarkdown: '',
        dontMarkdown: '',
      };
      return block;
    }

    case 'TabbedContent': {
      const block: TabbedContentBlock = {
        ...baseBlock,
        blockType,
        tabs: [],
      };
      return block;
    }
  }

  return assertUnreachable(blockType);
}

export const ContentContext = createContext<{
  content: Content;
  setContent: Dispatch<SetStateAction<Content>>;
  addPage: (parent: string | null) => void;
  movePage: (page: Page, direction: 'up' | 'down') => void;
  deletePage: (page: Page) => void;
}>({
  content: {
    pages: [],
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
      fetch(`/editor/save`, {
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
      layout: 'blocks',
      blocks: [],
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
  if (!editedPage) {
    return <p>Page not found</p>;
  }

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
                    prefix={`${getBreadcrumbs(content, editedPage)
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

                  <Select
                    label="Layout"
                    options={[
                      {
                        value: 'blocks',
                        label: 'Blocks',
                      },
                      {
                        value: 'listing',
                        label: 'Sub page listing',
                      },
                      {
                        value: 'custom',
                        label: 'Custom next.js layout',
                      },
                    ]}
                    value={editedPage.layout}
                    onChange={(layout: Page['layout']) =>
                      updatePage({...editedPage, layout})
                    }
                  />

                  {editedPage.layout === 'custom' && (
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
  tabId,
}: {
  pageId: string;
  parentBlockId: string | null;
  tabId: string | null;
}) {
  const {content} = useContext(ContentContext);

  const page = content.pages.find((page) => page.id === pageId);
  if (!page) throw new Error('Page not found');
  const resolvedPage = getResolvedPage(content, page);

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
  const {setContent} = useContext(ContentContext);

  function deleteBlock(
    blockId: string,
    pageId: string,
    parentBlockId: string | null,
    tabId: string | null,
  ) {
    if (tabId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.map((block) => {
                if (block.blockType === 'TabbedContent') {
                  return {
                    ...block,
                    tabs: block.tabs.map((tab) => {
                      if (tab.id === tabId) {
                        return {
                          ...tab,
                          blocks: tab.blocks.filter(
                            (block) => block.id !== blockId,
                          ),
                        };
                      }
                      return tab;
                    }),
                  };
                }
                return block;
              }),
            };
          }
          return page;
        }),
      }));
    } else if (parentBlockId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.map((block) => {
                if (block.id === parentBlockId) {
                  if (block.blockType === 'ProgressiveDisclosure') {
                    return {
                      ...block,
                      blocks: block.blocks.filter(
                        (block) => block.id !== blockId,
                      ),
                    };
                  } else if (block.blockType === 'TabbedContent') {
                    if (block.id === parentBlockId) {
                      return {
                        ...block,
                        tabs: block.tabs.map((tab) => ({
                          ...tab,
                          blocks: tab.blocks.filter(
                            (block) => block.id !== blockId,
                          ),
                        })),
                      };
                    }
                  }
                }
                return block;
              }),
            };
          }
          return page;
        }),
      }));
    } else if (pageId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.filter((block) => block.id !== blockId),
            };
          }
          return page;
        }),
      }));
    }

    // TODO: Don't allow removal of blocks with children
  }

  function moveBlock(
    pageId: string,
    parentBlockId: string | null,
    tabId: string | null,
    fromIndex: number,
    toIndex: number,
  ) {
    if (tabId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.map((block) => {
                if (block.blockType === 'TabbedContent') {
                  return {
                    ...block,
                    tabs: block.tabs.map((tab) => {
                      if (tab.id === tabId) {
                        return {
                          ...tab,
                          blocks: arrayMoveImmutable(
                            tab.blocks,
                            fromIndex,
                            toIndex,
                          ),
                        };
                      }
                      return tab;
                    }),
                  };
                }
                return block;
              }),
            };
          }
          return page;
        }),
      }));
    } else if (parentBlockId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.map((block) => {
                if (block.id === parentBlockId) {
                  if (block.blockType === 'ProgressiveDisclosure') {
                    return {
                      ...block,
                      blocks: arrayMoveImmutable(
                        block.blocks,
                        fromIndex,
                        toIndex,
                      ),
                    };
                  } else if (block.blockType === 'TabbedContent') {
                    if (block.id === parentBlockId) {
                      return {
                        ...block,
                        tabs: block.tabs.map((tab) => ({
                          ...tab,
                          blocks: arrayMoveImmutable(
                            tab.blocks,
                            fromIndex,
                            toIndex,
                          ),
                        })),
                      };
                    }
                  }
                }
                return block;
              }),
            };
          }
          return page;
        }),
      }));
    } else if (pageId) {
      setContent((content) => ({
        ...content,
        pages: content.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: arrayMoveImmutable(page.blocks, fromIndex, toIndex),
            };
          }
          return page;
        }),
      }));
    }
  }

  const handleBlockChange = useCallback(
    (newBlock: Block) => {
      if (tabId) {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.blockType === 'TabbedContent') {
                    return {
                      ...block,
                      tabs: block.tabs.map((tab) => {
                        if (tab.id === tabId) {
                          return {
                            ...tab,
                            blocks: tab.blocks.map((block) => {
                              if (block.id === newBlock.id) {
                                return newBlock;
                              }
                              return block;
                            }),
                          };
                        }
                        return tab;
                      }),
                    };
                  }
                  return block;
                }),
              };
            }
            return page;
          }),
        }));
      } else if (parentBlockId) {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id === parentBlockId) {
                    if (block.blockType === 'ProgressiveDisclosure') {
                      return {
                        ...block,
                        blocks: block.blocks.map((block) => {
                          if (block.id === newBlock.id) {
                            return newBlock;
                          }
                          return block;
                        }),
                      };
                    } else if (block.blockType === 'TabbedContent') {
                      if (block.id === parentBlockId) {
                        return {
                          ...block,
                          tabs: block.tabs.map((tab) => ({
                            ...tab,
                            blocks: tab.blocks.map((block) => {
                              if (block.id === newBlock.id) {
                                return newBlock;
                              }
                              return block;
                            }),
                          })),
                        };
                      }
                    }
                  }
                  return block;
                }),
              };
            }
            return page;
          }),
        }));
      } else if (pageId) {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id === newBlock.id) {
                    return newBlock;
                  }
                  return block;
                }),
              };
            }
            return page;
          }),
        }));
      }
    },
    [tabId, parentBlockId, pageId],
  );

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

  // pageId,
  // block,
  // parentBlockId,
  // tabId,
  // isFirst,
  // isLast,

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
                moveBlock(pageId, parentBlockId, tabId, index, index - 1)
              }
              aria-label="Move block up"
              disabled={isFirst}
            ></Button>
            <Button
              plain
              icon={ArrowDownMinor}
              size="slim"
              onClick={() =>
                moveBlock(pageId, parentBlockId, tabId, index, index - 1)
              }
              aria-label="Move block down"
              disabled={isLast}
            ></Button>
            <Button
              plain
              icon={DeleteMinor}
              size="slim"
              onClick={() =>
                deleteBlock(block.id, pageId, parentBlockId, tabId)
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
  const {setContent} = useContext(ContentContext);
  const [adderIsVisible, setAdderIsVisible] = useState(false);

  const addBlock = useCallback(
    (blockType: BlockType) => {
      let newBlock: Block = getEmptyBlock(blockType, parentBlockId, tabId);

      if (tabId) {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (
                    block.id === parentBlockId &&
                    block.blockType === 'TabbedContent'
                  ) {
                    return {
                      ...block,
                      tabs: block.tabs.map((tab) => {
                        if (tab.id === tabId) {
                          return {
                            ...tab,
                            blocks: [
                              ...tab.blocks.slice(0, index),
                              newBlock,
                              ...tab.blocks.slice(index),
                            ],
                          };
                        }
                        return tab;
                      }),
                    };
                  }
                  return block;
                }),
              };
            }
            return page;
          }),
        }));
      } else if (parentBlockId) {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: page.blocks.map((block) => {
                  if (block.id === parentBlockId) {
                    if (block.blockType === 'ProgressiveDisclosure') {
                      return {
                        ...block,
                        blocks: [
                          ...block.blocks.slice(0, index),
                          newBlock,
                          ...block.blocks.slice(index),
                        ],
                      };
                    }
                  }
                  return block;
                }),
              };
            }
            return page;
          }),
        }));
      } else {
        setContent((content) => ({
          ...content,
          pages: content.pages.map((page) => {
            if (page.id === pageId) {
              return {
                ...page,
                blocks: [
                  ...page.blocks.slice(0, index),
                  newBlock,
                  ...page.blocks.slice(index),
                ],
              };
            }
            return page;
          }),
        }));
      }
    },
    [tabId, parentBlockId, pageId, index],
  );

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
              addBlock(blockType);
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

      <BlockList pageId={pageId} parentBlockId={block.id} tabId={null} />
    </div>
  );
}

function DoDontEditor({block, onChange}: BlockEditorProps<DoDontBlock>) {
  return (
    <div>
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
    </div>
  );
}

function TabbedContentEditor({
  pageId,
  block,
  onChange,
}: BlockEditorProps<TabbedContentBlock> & {pageId: string}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const addTab = () => {
    onChange({
      ...block,
      tabs: [
        ...block.tabs,
        {
          id: nanoid(),
          label: 'New tab',
          blocks: [],
        },
      ],
    });
  };

  const deleteTab = (index: number) => {
    onChange({
      ...block,
      tabs: block.tabs.filter((_, i) => i !== index),
    });
  };

  const selectedTab = block.tabs[selectedTabIndex];

  return (
    <div>
      <button onClick={addTab}>+</button>

      <Tabs
        tabs={block.tabs.map((tab) => ({
          id: tab.id,
          content: tab.label,
        }))}
        selected={selectedTabIndex}
        onSelect={(index) => setSelectedTabIndex(index)}
      >
        {selectedTab && (
          <FormLayout>
            <TextField
              type="text"
              label="Tab label"
              value={selectedTab.label}
              onChange={(label) => {
                onChange({
                  ...block,
                  tabs: block.tabs.map((tab, i) =>
                    i === selectedTabIndex ? {...tab, label} : tab,
                  ),
                });
              }}
              autoComplete="off"
            />

            <BlockList
              pageId={pageId}
              parentBlockId={block.id}
              tabId={selectedTab.id}
            />

            <Button
              destructive
              onClick={() => deleteTab(selectedTabIndex)}
              outline
            >
              Delete tab
            </Button>
          </FormLayout>
        )}
      </Tabs>
    </div>
  );
}
