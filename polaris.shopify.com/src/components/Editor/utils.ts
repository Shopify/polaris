import {
  Content,
  Image,
  Page,
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

export function getResolvedPage(content: Content, page: Page): ResolvedPage;
export function getResolvedPage(
  content: Content,
  page: Page,
  includeBlocks: true,
): ResolvedPageWithBlocks;

export function getResolvedPage(
  content: Content,
  page: Page,
  includeBlocks?: true,
): ResolvedPage | ResolvedPageWithBlocks {
  let images: Image[] = [];

  if (page.thumbnailImageId) {
    const thumbnailImage = content.images.find(
      (image) => image.id === page.thumbnailImageId,
    );
    if (thumbnailImage) {
      images = [thumbnailImage];
    }
  }

  content.blocks
    .filter((block) => page.blockIds.includes(block.id))
    .forEach((block) => {
      switch (block.blockType) {
        case 'Image': {
          const image = content.images.find(
            (image) => image.id === block.imageId,
          );
          if (image) {
            images.push(image);
          }
          break;
        }
        case 'TextImage': {
          const image = content.images.find(
            (image) => image.id === block.imageId,
          );
          if (image) {
            images.push(image);
          }
          break;
        }
      }
    });

  const resolvedPage: ResolvedPage = {
    ...page,
    url: getPageUrl(content, page),
    pageStack: getPageStack(content, page),
    images,
  };

  if (includeBlocks) {
    const blocks = content.blocks.filter((block) =>
      page.blockIds.includes(block.id),
    );
    const resolvedPageWithBlocks: ResolvedPageWithBlocks = {
      ...resolvedPage,
      blocks,
    };
    return resolvedPageWithBlocks;
  } else {
    return resolvedPage;
  }
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
