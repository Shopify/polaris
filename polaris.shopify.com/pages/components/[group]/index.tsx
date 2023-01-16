import fs from 'fs';
import globby from 'globby';
import path from 'path';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';

interface FrontMatter {
  title: string;
  description: string;
}

interface Props {
  group: string;
  frontMatter: FrontMatter;
  readme: string;
}

export default function GroupPage({frontMatter, readme}: Props) {
  return (
    <div>
      <p>title: {frontMatter.title}</p>
      <p>description: {frontMatter.description}</p>
      <p>readme: {readme}</p>
    </div>
  );
}
export async function getStaticProps(context: {params: {group: string}}) {
  const relativeMdPath = `content/components/${context.params?.group}/index.md`;
  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(
      `content/components/${context.params.group}/index.md`,
      'utf-8',
    );

    const {frontMatter, readme} = parseMarkdown(componentMarkdown);

    return {
      props: {
        frontMatter,
        readme,
      },
    };
  } else {
    return {notFound: true};
  }
}

export const getStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/components/**/*.md');
  const paths = globby
    .sync(globPath)
    .map((path) => path.replace(`${process.cwd()}/content`, ''));

  const sections = paths.map((path) => path.split('/')[2]);

  return {
    paths: sections
      .filter((section, index) => sections.indexOf(section) === index)
      .map((section) => ({params: {group: section}})),
    fallback: false,
  };
};
