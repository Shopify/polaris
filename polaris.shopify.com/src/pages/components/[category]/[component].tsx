import type { ReactElement, ReactNode } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Longform from "../../../components/Longform";
import Markdown from "../../../components/Markdown";
import components from "../../../data/components.json";
import {
  getComponentCategories,
  getComponentNav,
  getTitleTagValue,
  slugify,
} from "../../../utils/various";
import fs from "fs";
import path from "path";
import { NavItem } from "../../../components/Nav/Nav";
import NavContentTOCLayout from "../../../components/NavContentTOCLayout";
import LeftNavWithTOCLayout from '../../../components/LeftNavWithTOCLayout'

interface Props {
  name: string;
  readme: string;
}

const navItems: NavItem[] = getComponentNav();


type NextPageWithLayout = NextPage & Props & {
  getLayout?: (page: ReactElement) => ReactNode
}

const ComponentsTwo: NextPageWithLayout = ({ name, readme }) => {
  const navItems: NavItem[] = getComponentNav();

  return (
    <>
      <Head>
        <title>{getTitleTagValue(name)}</title>
      </Head>

      {name && (
          <Longform>
            <h1>{name}</h1>
          </Longform>
        )}
        <Longform>
          <Markdown text={readme} skipH1 />
        </Longform>
    </>
  );
};



ComponentsTwo.getLayout = function getLayout(page: ReactElement) {
  const { readme } = page.props
  return (
    <LeftNavWithTOCLayout navItems={navItems} content={readme}>
      {page}
    </LeftNavWithTOCLayout>
  )
}


const Components: NextPage<Props> = ({ name, readme }) => {
  const navItems: NavItem[] = getComponentNav();

  return (
    <>
      <Head>
        <title>{getTitleTagValue(name)}</title>
      </Head>

      <NavContentTOCLayout
        navItems={navItems}
        title={name}
        showTOC={true}
        content={readme}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const componentParam = context.params?.component;

  let readmes = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src/data/components.readme.json"),
      "utf-8"
    )
  );

  if (componentParam) {
    const slug = slugify(componentParam);
    const componentMeta = components.find(
      ({ frontMatter }) => slugify(frontMatter.name) === slug
    );

    if (componentMeta) {
      const {
        frontMatter: { name },
      } = componentMeta;
      const componentReadme = readmes[name];
      if (componentReadme) {
        const props: Props = {
          name,
          readme: componentReadme,
        };

        return { props };
      }
    }
  }
  return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = components.map(({ frontMatter: { name, category } }) => {
    return {
      params: { category: slugify(category), component: slugify(name) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ComponentsTwo;
