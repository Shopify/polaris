import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import ComponentsPage from "../../../components/ComponentsPage";
import { getComponentCategories, slugify } from "../../../utils/various";

interface Props {
  category: string;
}

const Components: NextPage<Props> = ({ category }) => (
  <ComponentsPage category={category} />
);

export const getStaticProps: GetStaticProps<
  Props,
  { category: string }
> = async (context) => {
  if (context.params?.category) {
    const matchingCategory = getComponentCategories().find(
      (category) => slugify(category) === context.params?.category
    );

    if (matchingCategory) {
      const props: Props = {
        category: matchingCategory,
      };

      return { props };
    }
  }
  throw new Error();
};

export const getStaticPaths: GetStaticPaths = async () => {
  let categories: { category: string; url: string }[] =
    getComponentCategories().map((category) => ({
      category: slugify(category),
      url: `/components/${category}`,
    }));

  const paths = categories.map(({ category, url }) => {
    return { params: { category } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
