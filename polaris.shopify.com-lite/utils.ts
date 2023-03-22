import {
  Content,
  Image,
  Page,
  ResolvedPage,
  ResolvedPageWithoutBlocks,
} from './types';

export function getPageByPath(content: Content, path: string): Page | null {
  const page = content.pages.find((page) => getPageUrl(content, page) === path);
  return page || null;
}

export function getPageById(content: Content, id: string): Page | null {
  const page = content.pages.find((page) => page.id === id);
  return page || null;
}

export function getPageUrl(
  content: Content,
  page: Page | ResolvedPage,
): string {
  // TODO: Include leading slash
  const breadcrumbs = getBreadcrumbs(content, page);
  return breadcrumbs.map(({slug}) => slug).join('/');
}

export function getResolvedPage(content: Content, page: Page): ResolvedPage;
export function getResolvedPage(
  content: Content,
  page: Page,
  removeBlocks: true,
): ResolvedPageWithoutBlocks;

export function getResolvedPage(
  content: Content,
  page: Page,
  removeBlocks?: true,
): ResolvedPage | ResolvedPageWithoutBlocks {
  let images: Image[] = [];

  if (page.thumbnailImageId) {
    const thumbnailImage = content.images.find(
      (image) => image.id === page.thumbnailImageId,
    );
    if (thumbnailImage) {
      images = [thumbnailImage];
    }
  }

  // TODO: Make recursive
  page.blocks.forEach((block) => {
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
    breadcrumbs: getBreadcrumbs(content, page),
    images,
  };

  if (removeBlocks) {
    const {blocks, ...pageWithoutBlocks} = resolvedPage;
    const resolvedPageWithoutBlocks: ResolvedPageWithoutBlocks = {
      ...pageWithoutBlocks,
    };
    return resolvedPageWithoutBlocks;
  }

  return resolvedPage;
}

export function getImageDimensions(
  dimensions: {width: number; height: number},
  maxWidth: number,
): {
  width: number;
  height: number;
} {
  const round = (num: number) => Math.round(num * 1000) / 1000;
  const ratio = dimensions.width / dimensions.height;
  const height = round(maxWidth / ratio);

  return {
    width: maxWidth,
    height,
  };
}

export function getBreadcrumbs(
  content: Content,
  page: Page,
): ResolvedPage['breadcrumbs'] {
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
  const breadcrumbs: ResolvedPage['breadcrumbs'] = parents.map(
    ({id, title, slug}) => ({id, title, slug}),
  );
  return breadcrumbs;
}

type ValueOrArray<T> = T | ValueOrArray<T>[];
export type ClassName = ValueOrArray<string | boolean | null | undefined>;

export const className = (...classNames: ClassName[]): string => {
  return classNames
    .filter((c) => Boolean(c))
    .flatMap((c) => (Array.isArray(c) ? className(...c) : c))
    .join(' ');
};

export const toPascalCase = (str: string): string =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('');

function arrayMoveMutable<T>(
  array: Array<T>,
  fromIndex: number,
  toIndex: number,
) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable<T>(
  array: Array<T>,
  fromIndex: number,
  toIndex: number,
) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}

export function uppercaseFirst(string: string): string {
  return string[0].toUpperCase() + string.slice(1);
}
