import fs from 'fs';
import path from 'path';
import globby from 'globby';
import {GetStaticPaths, GetStaticProps} from 'next';
import FoundationsIndexPage from '../../../src/components/FoundationsIndexPage';
import {FoundationsGridItemProps} from '../../../src/components/FoundationsGrid/FoundationsGrid';
import {MarkdownFile} from '../../../src/types';
import {parseMarkdown} from '../../../src/utils/markdown.mjs';
import {uppercaseFirst} from '../../../src/utils/various';

interface Props {
  title: string;
  items: FoundationsGridItemProps[];
}

const FoundationsCategory = ({title, items}: Props) => {
  return <FoundationsIndexPage title={title} items={items} />;
};

export const getStaticProps: GetStaticProps<
  Props,
  {category: string}
> = async ({params}) => {
  const filePattern = path.resolve(
    process.cwd(),
    `content/foundations/${params?.category || ''}/**/index.md`,
  );

  let items: Props['items'] = [];

  const markdownFilePaths = await globby(filePattern);

  markdownFilePaths.forEach((markdownFilePath) => {
    if (fs.existsSync(markdownFilePath)) {
      const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
      const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
      const {title, description} = frontMatter;

      const url = markdownFilePath
        .replace(`${process.cwd()}/content`, '')
        .replace('index.md', '');

      items.push({
        title: title,
        category: params?.category || '',
        description: description,
        icon: frontMatter.icon,
        url,
      });
    }
  });

  return {
    props: {
      title: params?.category ? uppercaseFirst(params.category) : '',
      items,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const subDirectories = fs.readdirSync(`${process.cwd()}/content/foundations`);
  const paths = subDirectories.map((dir: string) => `/foundations/${dir}`);

  return {
    paths,
    fallback: false,
  };
};

export default FoundationsCategory;
