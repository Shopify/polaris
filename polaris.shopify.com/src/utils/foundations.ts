import {GetStaticProps} from 'next';
import {getPageUrl, getPageWithUrl} from '../components/Editor/utils';
import {FoundationsProps} from '../components/FoundationsPage/FoundationsPage';
import {content} from '../content';

export const getStaticPropsForFoundations = (category: string) => {
  const getStaticProps: GetStaticProps<FoundationsProps> = async () => {
    const {pages} = content;
    const page = pages.find((page) => page.slug === category);

    if (page) {
      const pageInfoWithUrl = getPageWithUrl(content, page);
      const items: FoundationsProps['items'] = pages
        .filter(({parentId}) => parentId === page.id)
        .map((page) => {
          if (page.pageMeta?.type !== 'foundations') {
            throw new Error('Invalid page type');
          }
          return {
            slug: page.slug,
            title: page.title,
            excerpt: page.excerpt,
            url: getPageUrl(content, page),
            order: page.order,
            icon: page.pageMeta.icon,
          };
        });

      return {
        props: {
          page: pageInfoWithUrl,
          items,
        },
      };
    } else {
      return {notFound: true};
    }
  };

  return getStaticProps;
};
