import globby from 'globby';
import path from 'path';
import fs from 'fs';
import {MarkdownFile} from '../types';
import {parseMarkdown} from './markdown.mjs';
import {slugify, uppercaseFirst} from './various';
import {GetStaticProps} from 'next';
import {FoundationsProps} from '../components/FoundationsPage/FoundationsPage';

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

    const globPath = [
      path.resolve(process.cwd(), `content/${category}/*.md`),
      path.resolve(process.cwd(), `content/${category}/*/index.md`),
    ];

    const itemPaths = globby
      .sync(globPath)
      .filter((path) => !path.endsWith(`content/${category}/index.md`));

    let items: FoundationsProps['items'] = [];

    itemPaths
      .filter((path) => !path.endsWith(`content/${category}/index.md`))
      .forEach((markdownFilePath) => {
        if (fs.existsSync(markdownFilePath)) {
          const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
          const {frontMatter, readme}: MarkdownFile = parseMarkdown(markdown);
          const {
            title,
            description,
            order,
            icon,
            url: frontMatterUrl,
          } = frontMatter;

          const url =
            frontMatterUrl ??
            markdownFilePath
              .replace(`${process.cwd()}/content`, '')
              .replace('/index', '')
              .replace(/\.md$/, '');

          const headings = (readme.match(/\n## [^\n]+/gi) || []).map(
            (heading) => heading.replace(/^\n## /, '').trim(),
          );
          const deepLinks = headings.map((heading) => ({
            url: `${url.replace(/\/$/, '')}#${slugify(heading)}`,
            text: heading,
          }));

          items.push({
            title,
            description: description || '',
            icon: icon || '',
            url,
            deepLinks,
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
