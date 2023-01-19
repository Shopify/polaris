import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import Page from '../../../../src/components/Page';
import Longform from '../../../../src/components/Longform';
import Markdown from '../../../../src/components/Markdown';
import PageMeta from '../../../../src/components/PageMeta';
import {parseMarkdown} from '../../../../src/utils/markdown.mjs';
import {MarkdownFile} from '../../../../src/types';

type CategoryMap = {
  conventions: string;
  colors: string;
  motion: string;
  typography: string;
  shape: string;
  spacing: string;
  depth: string;
  'media queries': string;
  'z-index': string;
  layout: string;
  legacy: string;
};

type Category = keyof CategoryMap;

const resourceLinks = {
  conventions: '',
  colors: 'Polaris [color tokens](/tokens/colors)',
  motion: 'Polaris [motion tokens](/tokens/motion)',
  typography:
    'the [text component](/components/text) or [font tokens](/tokens/font)',
  shape: 'Polaris [shape tokens](/tokens/shape)',
  spacing: 'Polaris [spacking tokens](/tokens/spacing)',
  depth: 'Polaris [depth tokens](/tokens/depth)',
  'media queries':
    'Polaris [breakpoint sass variables](/tokens/breakpoints#sass-variables)',
  'z-index': 'Polaris [z-index tokens](/tokens/z-index)',
  layout: 'Polaris [layout components](/components)',
  legacy: 'Polaris [components](/components) or [tokens](/tokens)',
};

interface Props {
  readme: MarkdownFile['readme'];
  title: string;
  description?: string;
  editPageLinkPath: string;
}

const StylelintRulePage: NextPage<Props> = ({
  readme,
  title,
  description,
  editPageLinkPath,
}: Props) => {
  return (
    <Page title={title} editPageLinkPath={editPageLinkPath}>
      <PageMeta title={title} description={description} />
      <Longform>
        {description ? <Markdown text={description} /> : null}
        <Markdown text={readme} />
      </Longform>
    </Page>
  );
};

function getPageContent(title: string, readme: MarkdownFile['readme']) {
  const category = title.split('/')[0] as Category;
  const categoryIs = `${category} ${category.slice(-1) === 's' ? 'are' : 'is'}`;
  const resourceText = resourceLinks[category]?.length
    ? [
        `Use ${resourceLinks[category]} instead of custom styles so that ${categoryIs} consistent across the Admin. This helps merchants have a coherent user experience and also ensures that ${categoryIs} in sync with the design system.`,
      ]
    : [];

  return [
    ...resourceText,
    readme,
    '## Contribute',
    '',
    `Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:`,
    '',
    '- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution',
    '- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion',
    '- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition',
    '',
    '## Ignore failure',
    '',
    `If styles are intentionally designed to diverge from Polaris and it isn't viable to contribute back to the design system, you can [ignore the failing rule](https://stylelint.io/user-guide/ignore-code/#within-files). Make sure to provide context as to why you are writing custom styles with a disable description.`,
    '',
    '```',
    '// stylelint-disable-next-line -- why custom styles are being used instead of Polaris',
    '```',
  ].join('\n');
}

export const getStaticProps: GetStaticProps<Props, {rule: string}> = async ({
  params,
}) => {
  const rule = params?.rule;
  const relativeMdPath = `content/tools/stylelint-polaris/rules/${rule}.md`;
  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);
  const editPageLinkPath = `/polaris.shopify.com/${relativeMdPath}`;

  if (fs.existsSync(mdFilePath)) {
    const markdown = fs.readFileSync(mdFilePath, 'utf-8');
    const {readme, frontMatter}: MarkdownFile = parseMarkdown(markdown);
    const {title, description} = frontMatter;
    const props: Props = {
      title,
      description: description || null,
      readme: getPageContent(title, readme),
      editPageLinkPath,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = [
    path.resolve(process.cwd(), 'content/tools/stylelint-polaris/rules/*.md'),
  ];
  const paths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith('index.md'))
    .map((fileName: string) => {
      return fileName
        .replace(`${process.cwd()}/content`, '')
        .replace('.md', '');
    });

  return {
    paths,
    fallback: false,
  };
};

export default StylelintRulePage;
