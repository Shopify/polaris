import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import glob from "glob";
import {
  getComponentNav,
  getTitleTagValue,
  slugify,
} from "../../utils/various";
import { NavItem } from "../../components/Nav/Nav";
import NavContentTOCLayout from "../../components/NavContentTOCLayout";

interface Props {
  name: string;
  readme: string;
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

export const getStaticProps: GetStaticProps<Props, { component: string }> =
  async (context) => {
    console.log(context);
    const componentSlug = context.params?.component;

    const componentMarkdown =
      fs.readFileSync(
        path.join(process.cwd(), `content/components/${componentSlug}.md`),
        "utf-8"
      );

    console.log(componentMarkdown);

    if (componentSlug) {
      // const componentMeta = components.find(
      //   ({ frontMatter }) => slugify(frontMatter.name) === slug
      // );

      // if (componentMeta) {
      //   const {
      //     frontMatter: { name },
      //   } = componentMeta;
      //   const componentReadme = readmes[name];
      //   if (componentReadme) {
      //     const props: Props = {
      //       name,
      //       readme: componentReadme,
      //     };

      //     return { props };
      //   }
      // }
      return {props:{}}
    }
    return { notFound: true };
  };

export const getStaticPaths: GetStaticPaths = async () => {
  const componentBasePath = path.resolve(process.cwd(), 'content/components');
  const paths = glob.sync(path.join(componentBasePath, '*.md')).map(fileName => {
    return fileName.replace(`${process.cwd()}/content`, "").replace('.md', '');
  });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
