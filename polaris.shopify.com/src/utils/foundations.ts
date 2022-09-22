import globby from 'globby';
import path from 'path';
import fs from 'fs';
import {FoundationsGridItemProps} from '../components/FoundationsGrid/FoundationsGrid';
import {MarkdownFile} from '../types';
import {parseMarkdown} from './markdown.mjs';
import {uppercaseFirst} from './various';
import {GetStaticProps} from 'next';

export interface FoundationsProps {
  title: string;
  items: FoundationsGridItemProps[];
}

export const getStaticPropsForFoundations = (category: string) => {
  const getStaticProps: GetStaticProps<FoundationsProps> = async () => {
    const filePattern = path.resolve(
      process.cwd(),
      `content/${category}/**/index.md`,
    );

    let items: FoundationsProps['items'] = [];

    const markdownFilePaths = await globby(filePattern);

    markdownFilePaths
      .filter((path) => !path.endsWith(`content/${category}/index.md`))
      .forEach((markdownFilePath) => {
        if (fs.existsSync(markdownFilePath)) {
          const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
          const {frontMatter}: MarkdownFile = parseMarkdown(markdown);
          const {title, description} = frontMatter;

          const url = markdownFilePath
            .replace(`${process.cwd()}/content`, '')
            .replace('index.md', '');

          items.push({
            title: title,
            category: category,
            description: description || '',
            icon: frontMatter.icon || '',
            url,
          });
        }
      });

    return {
      props: {
        title: uppercaseFirst(category),
        items,
      },
    };
  };

  return getStaticProps;
};
