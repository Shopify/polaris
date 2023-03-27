import {nanoid} from 'nanoid';
import type {Action} from './types';
import {
  BaseBlock,
  Block,
  BlockType,
  CodeBlock,
  DoDontBlock,
  Image,
  ImageBlock,
  MarkdownBlock,
  Page,
  PageMeta,
  PageMetaType,
  ProgressiveDisclosureBlock,
  SandboxEmbedBlock,
  State,
  TabbedContentBlock,
  TextImageBlock,
  YoutubeVideoBlock,
} from '@/types';
import {arrayMoveImmutable, className, assertUnreachable} from '@/utils';

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_PAGE': {
      const parentPage =
        (action.parentId &&
          state.pages.find(({id}) => id === action.parentId)) ||
        undefined;

      const siblings = state.pages.filter(
        ({parentId}) => parentId === action.parentId,
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

        // TODO: Remove, not needed
        case 'patterns':
          pageMeta = {
            type: 'patterns',
          };
          break;

        // TODO: Remove, not needed
        case 'tokens': {
          pageMeta = {
            type: 'tokens',
          };
        }

        case null:
          break;

        default:
          assertUnreachable(pageMetaType);
      }

      const newPage: Page = {
        id: action.id,
        title: 'New page',
        slug: action.id,
        parentId: action.parentId,
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
        thumbnailImage: getEmptyImage(),
        hasNewBadge: false,
      };

      return {
        ...state,
        pages: [...state.pages, newPage],
      };
    }

    case 'MOVE_PAGE': {
      const indexDiff = action.direction === 'up' ? -1.5 : 1.5;
      const newPages = [...state.pages].map((thisPage) => {
        return thisPage.id === action.page.id
          ? {...thisPage, order: thisPage.order + indexDiff}
          : thisPage;
      });
      const sortedPages = sortPages(newPages, action.page.parentId);
      return {...state, pages: sortedPages};
    }

    case 'UPDATE_PAGE': {
      const {changedPage} = action;
      return {
        ...state,
        pages: state.pages.map((page) =>
          page.id === changedPage.id ? changedPage : page,
        ),
      };
    }

    case 'DELETE_PAGE': {
      const childPages = state.pages.filter(
        ({parentId}) => parentId === action.page.id,
      );
      if (childPages.length > 0) {
        throw new Error('Cannot delete page with child pages');
      }
      const newPages = state.pages.filter(({id}) => id !== action.page.id);
      const sortedPages = sortPages(newPages, action.page.parentId);

      return {...state, pages: sortedPages};
    }

    case 'ADD_BLOCK': {
      const {blockType, pageId, tabId, parentBlockId, index} = action;
      let newBlock: Block = getEmptyBlock(blockType, parentBlockId, tabId);

      if (tabId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      } else if (parentBlockId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      } else {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      }
    }

    case 'MOVE_BLOCK': {
      const {pageId, parentBlockId, tabId, fromIndex, toIndex} = action;

      if (tabId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      } else if (parentBlockId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      }

      return {
        ...state,
        pages: state.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: arrayMoveImmutable(page.blocks, fromIndex, toIndex),
            };
          }
          return page;
        }),
      };
    }

    case 'DELETE_BLOCK': {
      const {blockId, pageId, parentBlockId, tabId} = action;
      if (tabId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      } else if (parentBlockId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      }
      return {
        ...state,
        pages: state.pages.map((page) => {
          if (page.id === pageId) {
            return {
              ...page,
              blocks: page.blocks.filter((block) => block.id !== blockId),
            };
          }
          return page;
        }),
      };
    }

    case 'UPDATE_BLOCK': {
      const {pageId, tabId, parentBlockId, newBlock} = action;
      if (tabId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      } else if (parentBlockId) {
        return {
          ...state,
          pages: state.pages.map((page) => {
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
        };
      }
      return {
        ...state,
        pages: state.pages.map((page) => {
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
      };
    }
  }

  assertUnreachable(action);
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
      const block: ImageBlock = {
        ...baseBlock,
        blockType,
        image: getEmptyImage(),
      };
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
        snippets: [
          {
            id: nanoid(),
            label: 'New tab',
            language: 'typescript',
            code: '',
          },
        ],
      };
      return block;
    }

    case 'TextImage': {
      const block: TextImageBlock = {
        ...baseBlock,
        blockType,
        content: '',
        image: getEmptyImage(),
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

function sortPages(pages: Page[], parentId: string | null): Page[] {
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

function getEmptyImage(): Image {
  return {
    lightModeFilename: '',
    darkModeFilename: '',
    height: 0,
    width: 0,
    alt: '',
  };
}
