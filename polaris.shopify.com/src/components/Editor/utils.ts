import {Content, Page, PageInfo, PageInfoWithUrl, PageWithUrl} from './types';

export function getPageByPath(content: Content, path: string): Page | null {
  const page = content.pages.find((page) => getPageUrl(content, page) === path);
  return page || null;
}

export function getPageUrl(content: Content, page: Page | PageInfo): string {
  const pageStack = getPageStack(content, page);
  return pageStack.map((page) => page.slug).join('/');
}

export function getPageWithUrl(content: Content, page: Page): PageWithUrl {
  return {
    ...page,
    url: getPageUrl(content, page),
    pageStack: getPageStack(content, page),
  };
}

export function getPageInfoWithUrl(
  content: Content,
  pageInfo: PageInfo,
): PageInfoWithUrl {
  return {
    ...pageInfo,
    url: getPageUrl(content, pageInfo),
    pageStack: getPageStack(content, pageInfo),
  };
}

export function getPageInfo(page: Page): PageInfo {
  const pageInfo: PageInfo = {
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
  };
  return pageInfo;
}

export function getPageStack(content: Content, pageInfo: PageInfo): PageInfo[] {
  let parents: PageInfo[] = [];

  function getParent(currentPage: Page | PageInfo): Page | undefined {
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

  getParent(pageInfo);
  parents.push(pageInfo);
  return parents;
}
