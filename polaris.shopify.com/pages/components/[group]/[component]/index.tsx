import fs from 'fs';
import globby from 'globby';
import path from 'path';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../../../src/components/ComponentExamples';
import type {
  ComponentExample,
  ComponentExampleSerialized,
} from '../../../../src/components/ComponentExamples';
import Longform from '../../../../src/components/Longform';
import {
  serializeMdx,
  type SerializedMdx,
} from '../../../../src/components/Markdown/serialize';
import Markdown from '../../../../src/components/Markdown';
import Page from '../../../../src/components/Page';
import {toPascalCase} from '../../../../src/utils/various';
import PageMeta from '../../../../src/components/PageMeta';
import {Status, FilteredTypes, AllTypes} from '../../../../src/types';
import PropsTable from '../../../../src/components/PropsTable';
import {getRelevantTypes} from '../../../../scripts/get-props/src/get-props';
import StatusBanner from '../../../../src/components/StatusBanner';

interface FrontMatter {
  status?: Status;
  title: string;
  examples: ComponentExample[];
  description: string;
}

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  descriptionMdx: SerializedMdx | null;
  examples: ComponentExampleSerialized[];
  type: FilteredTypes;
  editPageLinkPath: string;
}

interface Props {
  editPageLinkPath: string;
}

const Components = ({
  examples,
  mdx,
  descriptionMdx,
  type,
  editPageLinkPath,
  typedStatus,
}: Props) => {
  const componentExamples = Boolean(examples.length) && (
    <ComponentExamples examples={examples} />
  );

  const propsTable =
    type && mdx?.frontmatter?.status?.value !== 'Deprecated' ? (
      <PropsTable componentName={mdx.frontmatter.title} types={type} />
    ) : null;

  return (
    <Page
      title={mdx.frontmatter.title}
      editPageLinkPath={editPageLinkPath}
      isContentPage
    >
      <PageMeta
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
      />

      <Longform>
        {descriptionMdx ? <Markdown {...descriptionMdx} /> : null}
        {typedStatus && (
          <StatusBanner status={typedStatus}>
            {typedStatus.message}
          </StatusBanner>
        )}
        {componentExamples}
      </Longform>

      {propsTable}

      <Longform firstParagraphIsLede={false}>
        <Markdown {...mdx} />
      </Longform>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  {component: string; group: string}
> = async (context) => {
  const componentSlug = context.params?.component;
  const groupSlug = context.params?.group;
  const relativeMdPath = `content/components/${groupSlug}/${componentSlug}.md`;

  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);
  const editPageLinkPath = `polaris.shopify.com/${relativeMdPath}`;

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(mdFilePath, 'utf-8');

    const [mdx] = await serializeMdx<FrontMatter>(componentMarkdown);

    let descriptionMdx: SerializedMdx | null = null;

    if (mdx.frontmatter.description) {
      [descriptionMdx] = await serializeMdx(mdx.frontmatter.description);
    }

    const examples: Array<ComponentExampleSerialized> = await Promise.all(
      (mdx.frontmatter.examples || []).map(
        async (example: ComponentExample) => {
          const examplePath = path.resolve(
            process.cwd(),
            `pages/examples/${example.fileName}`,
          );
          let code = '';

          if (fs.existsSync(examplePath)) {
            code = fs.readFileSync(examplePath, 'utf-8');
            code = code
              .split('\n')
              .filter((line) => !line.includes('withPolarisExample'))
              .join('\n');
          }

          const [description] = await serializeMdx(example.description);

          return {...example, description, code};
        },
      ),
    );

    const propsFilePath = path.resolve(process.cwd(), `.cache/props.json`);
    const fileContent = fs.readFileSync(propsFilePath, 'utf8');
    const allType: AllTypes = JSON.parse(fileContent);

    const componentDirName = toPascalCase(`${mdx.frontmatter.title} `);
    const propName = toPascalCase(`${mdx.frontmatter.title} Props`);

    let type = getRelevantTypes(
      allType,
      propName,
      `polaris-react/src/components/${componentDirName}/${componentDirName}.tsx`,
      mdx.frontmatter.status?.value || '',
    );

    let typedStatus = null;

    if (mdx.frontmatter.status?.value) {
      const [message] = await serializeMdx(mdx.frontmatter.status.message);
      typedStatus = {
        value: mdx.frontmatter.status.value.toLowerCase() as Status['value'],
        mdx: message,
      };
    }

    const props: Props = {
      mdx,
      typedStatus,
      examples,
      descriptionMdx,
      type,
      editPageLinkPath,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/components/**/*.md');
  const paths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith('index.md'))
    .map((path) =>
      path.replace(`${process.cwd()}/content`, '').replace('.md', ''),
    );

  return {
    paths,
    fallback: false,
  };
};

export default Components;
