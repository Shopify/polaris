import './globals.scss';
import {content} from '@/content';
import {getPageUrl} from '@/utils';
import {NavItems} from '@/types';
import Frame from '@/components/Frame';

export async function getNavItems(): Promise<NavItems> {
  return content.pages.map((page) => {
    const {id, title, order, pageMeta, parentId, hasSeparatorInNav} = page;
    return {
      id,
      title,
      url: getPageUrl(content, page),
      order,
      pageMeta,
      parentId,
      hasSeparatorInNav,
    };
  });
}

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await getNavItems();
  return <Frame navItems={navItems}>{children}</Frame>;
}
