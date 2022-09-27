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
  description: string;
  items: FoundationsGridItemProps[];
}

export const getStaticPropsForFoundations = (category: string) => {
  const getStaticProps: GetStaticProps<FoundationsProps> = async () => {
    const markdownPath = path.resolve(
      process.cwd(),
      `content/${category}/index.md`,
    );
    const markdown = fs.readFileSync(markdownPath, 'utf-8');
    const {
      frontMatter: {description},
    }: MarkdownFile = parseMarkdown(markdown);

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
          const {frontMatter, readme}: MarkdownFile = parseMarkdown(markdown);
          const {title, description, order, icon} = frontMatter;

          const url = markdownFilePath
            .replace(`${process.cwd()}/content`, '')
            .replace('index.md', '');

          const headings = (readme.match(/\n## [^\n]+/gi) || []).map(
            (heading) => heading.replace(/^\n## /, '').trim(),
          );

          items.push({
            title: title,
            description: description || '',
            icon: icon || '',
            url,
            headings,
            order: !isNaN(parseInt(order)) ? order : 1000,
          });
        }
      });

    return {
      props: {
        title: uppercaseFirst(category),
        description: description || '',
        items,
      },
    };
  };

  return getStaticProps;
};
