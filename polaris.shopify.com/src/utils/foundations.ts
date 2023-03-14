import {GetStaticProps} from 'next';
import {getResolvedPage} from '../components/Editor/utils';
import {FoundationsProps} from '../components/FoundationsPage/FoundationsPage';
import {content} from '../content';

export const getStaticPropsForFoundations = (category: string) => {
  const getStaticProps: GetStaticProps<FoundationsProps> = async () => {
    const {pages} = content;
    const page = pages.find(
      (page) => page.parentId === null && page.slug === category,
    );

    if (page) {
      const resolvedPage = getResolvedPage(content, page, true);
      const items: FoundationsProps['items'] = pages
        .filter(({parentId}) => parentId === page.id)
        .map((page) => getResolvedPage(content, page));

      return {
        props: {page: resolvedPage, items},
      };
    } else {
      return {notFound: true};
    }
  };

  return getStaticProps;
};
