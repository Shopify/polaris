import type {GetStaticProps} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';
import Longform from '../../../../src/components/Longform';
import Markdown from '../../../../src/components/Markdown';
import Page from '../../../../src/components/Page';
import PageMeta from '../../../../src/components/PageMeta';
import {uppercaseFirst} from '../../../../src/utils/various';
import {MarkdownFile} from '../../../../src/types';
import {parseMarkdown} from '../../../../src/utils/markdown.mjs';

export interface RulesProps {
  title: string;
  description: string;
  content: string;
}

const FoundationsCategory = ({title, description, content}: RulesProps) => {
  return (
    <>
      <PageMeta description={description} />
      <Page>
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
          <Markdown text={content} />
        </Longform>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<RulesProps> = async () => {
  const {title, description} = indexPageMetadata();
  const content = ruleListMarkdown();

  return {
    props: {
      title,
      description,
      content,
    },
  };
};

const rulesPath = 'content/tools/stylelint-polaris/rules';

function indexPageMetadata() {
  const markdownPath = path.resolve(process.cwd(), `${rulesPath}/index.md`);
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  const {
    frontMatter: {title, description},
  }: MarkdownFile = parseMarkdown(markdown);

  return {title, description};
}

function ruleListMarkdown(): string {
  const globPath = [path.resolve(process.cwd(), `${rulesPath}/*.md`)];
  const rulePagePaths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith(`${rulesPath}/index.md`));

  const content: {[key: string]: string[]} = {};
  rulePagePaths.forEach((markdownFilePath) => {
    if (fs.existsSync(markdownFilePath)) {
      const markdown = fs.readFileSync(markdownFilePath, 'utf-8');
      const {
        frontMatter: {title, description},
      }: MarkdownFile = parseMarkdown(markdown);

      const url = markdownFilePath
        .replace(`${process.cwd()}/content`, '')
        .replace('/index', '')
        .replace(/\.md$/, '');

      const category = uppercaseFirst(title.split('/')[0]).replace(
        'Media-queries',
        'Media queries',
      );

      if (!(category in content)) {
        content[category] = ['', `## ${category}`, ''];
      }

      content[category].push(`- [${title}](${url}): ${description}`);
    }
  });

  const ruleList: string[] = Object.keys(content).reduce(
    (prev: string[], key: string) => [...prev, ...content[key]],
    [],
  );

  return ruleList.join('\n');
}

export default FoundationsCategory;
