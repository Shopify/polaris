import {
  Content,
  Image,
  Page,
  PageWithBlocks,
  ResolvedPage,
  ResolvedPageWithBlocks,
} from './types';

export function getPageByPath(content: Content, path: string): Page | null {
  const page = content.pages.find((page) => getPageUrl(content, page) === path);
  return page || null;
}

export function getPageUrl(
  content: Content,
  page: Page | ResolvedPage,
): string {
  // TODO: Include leading slash
  const pageStack = getPageStack(content, page);
  return pageStack.map((page) => page.slug).join('/');
}

export function getResolvedPage(content: Content, page: Page): ResolvedPage {
  let images: Image[] = [];

  if (page.thumbnailImageId) {
    const thumbnailImage = content.images.find(
      (image) => image.id === page.thumbnailImageId,
    );
    if (thumbnailImage) {
      images = [thumbnailImage];
    }
  }

  return {
    ...page,
    url: getPageUrl(content, page),
    pageStack: getPageStack(content, page),
    images,
  };
}

export function getImageDimensions(
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

export function getUnresolvedPage(page: PageWithBlocks): Page {
  const pageInfo: Page = {
    id: page.id,
    title: page.title,
    excerpt: page.excerpt,
    slug: page.slug,
    parentId: page.parentId,
    order: page.order,
    useCustomLayout: page.useCustomLayout,
    keywords: page.keywords,
    childPageMetaType: page.childPageMetaType,
    pageMeta: page.pageMeta,
    allowChildren: page.allowChildren,
    hideInNav: page.hideInNav,
    noIndex: page.noIndex,
    hasSeparatorInNav: page.hasSeparatorInNav,
    thumbnailImageId: page.thumbnailImageId,
  };
  return pageInfo;
}

export function getResolvedPageWithBlocks(
  content: Content,
  page: Page,
): ResolvedPageWithBlocks {
  const resolvedPageInfo = getResolvedPage(content, page);
  const blocks = content.pages.find((p) => p.id === page.id)?.blocks;
  if (!blocks) {
    throw new Error(`No blocks found for page with id ${page.id}`);
  }
  return {
    ...resolvedPageInfo,
    blocks,
  };
}

export function getPageStack(content: Content, page: Page): Page[] {
  let parents: Page[] = [];

  function getParent(currentPage: Page): Page | undefined {
    if (currentPage.parentId) {
      const parent = content.pages.find(
        (page) => page.id === currentPage.parentId,
      );
      if (parent) {
        parents = [parent, ...parents];
        getParent(parent);
      }
    }
    return undefined;
  }

  getParent(page);
  parents.push(page);
  return parents;
}
