import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import glob from "glob";
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import {
  getComponentNav,
  getTitleTagValue,
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
    const componentSlug = context.params?.component;
    const mdFilePath = path.join(process.cwd(), `content/components/${componentSlug}.md`);

    if(fs.existsSync(mdFilePath)){
      const componentMarkdown =
      fs.readFileSync(
        path.join(process.cwd(), `content/components/${componentSlug}.md`),
        "utf-8"
      );

      console.log(componentMarkdown);

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
    } else {
      console.log('uh oh')
      return { notFound: true };
    }
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
