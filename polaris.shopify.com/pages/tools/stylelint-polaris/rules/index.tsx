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
import {
  serializeMdx,
  type SerializedMdxReturn,
} from '../../../../src/components/Markdown/serialize';

export interface RulesProps {
  title: string;
  description: string;
  mdx: SerializedMdxReturn[0];
}

const FoundationsCategory = ({title, description, mdx}: RulesProps) => {
  return (
    <>
      <PageMeta description={description} />
      <Page isContentPage>
        <Longform>
          <h1>{title}</h1>
          <p>{description}</p>
          <Markdown {...mdx} />
        </Longform>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<RulesProps> = async () => {
  const {title, description} = indexPageMetadata();
  const [mdx] = await serializeMdx(path.resolve(process.cwd(), rulesPath), {
    load: ruleListMarkdown,
  });

  return {
    props: {
      title,
      description,
      mdx,
    },
  };
};

const rulesPath = 'content/tools/stylelint-polaris/rules';

function indexPageMetadata() {
  const markdownPath = path.resolve(process.cwd(), `${rulesPath}/index.mdx`);
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  const {
    frontMatter: {title, description},
  }: MarkdownFile = parseMarkdown(markdown);

  return {title, description};
}

function ruleListMarkdown(directory: string): string {
  const globPath = [`${directory}/*.mdx`];
  const rulePagePaths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith(`${rulesPath}/index.mdx`));

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
        .replace(/\.mdx$/, '');

      const category = uppercaseFirst(title.split('/')[0]).replace(
        'Media-queries',
        'Media queries',
      );

      if (!(category in content)) {
        content[category] = ['', `## ${category}`, ''];
      }

      // Temporary removal of layout rules until it is re-enabled
      // https://github.com/Shopify/polaris/issues/8188
      if (
        title.includes('layout/declaration-property-value-disallowed-list') ||
        title.includes('layout/property-disallowed-list')
      ) {
        return;
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
