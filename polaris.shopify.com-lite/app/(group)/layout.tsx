import '@/styles/globals.scss';
import {content} from '@/content';
import {getPageUrl} from '@/utils';
import {NavItems} from '@/types';
import Frame from '@/components/Frame';

async function getNavItems(): Promise<NavItems> {
  return content.pages
    .filter((page) => !page.hideInNav)
    .map((page) => {
      const {
        id,
        title,
        order,
        pageMeta,
        parentId,
        hasSeparatorInNav,
        hasNewBadge,
        slug,
      } = page;
      return {
        id,
        title,
        url: getPageUrl(content, page),
        order,
        pageMeta,
        parentId,
        hasSeparatorInNav,
        hasNewBadge,
        slug,
      };
    });
}

export default async function Layout({children}: {children: React.ReactNode}) {
  const navItems = await getNavItems();
  return <Frame navItems={navItems}>{children}</Frame>;
}
