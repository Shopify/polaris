import fs from 'fs';
import globby from 'globby';
import path from 'path';
import {VFile} from 'vfile';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../../../src/components/ComponentExamples';
import type {
  ComponentExample,
  ComponentExampleSerialized,
} from '../../../../src/components/ComponentExamples';
import {serializeMdx} from '../../../../src/components/Markdown/serialize';
import Markdown from '../../../../src/components/Markdown';
import Page from '../../../../src/components/Page';
import {toPascalCase} from '../../../../src/utils/various';
import PageMeta from '../../../../src/components/PageMeta';
import type {
  Status,
  FilteredTypes,
  AllTypes,
  SerializedMdx,
} from '../../../../src/types';
import PropsTable from '../../../../src/components/PropsTable';
import {getRelevantTypes} from '../../../../scripts/get-props/src/get-props';

type FrontMatter = {
  status?: Status;
  title: string;
  examples: ComponentExample[];
  seoDescription?: string;
};

interface Props {
  mdx: SerializedMdx<FrontMatter>;
  seoDescription?: string;
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
  seoDescription,
  type,
  editPageLinkPath,
}: Props) => {
  return (
    <Page editPageLinkPath={editPageLinkPath} isContentPage>
      <PageMeta title={mdx.frontmatter.title} description={seoDescription} />

      <Markdown
        {...mdx}
        components={{
          Examples: () =>
            Boolean(examples.length) ? (
              <ComponentExamples
                examples={examples}
                componentTitle={mdx.frontmatter.title}
              />
            ) : null,
          Props: ({componentName}) =>
            type && mdx.frontmatter.status !== 'Deprecated' ? (
              <PropsTable componentName={componentName} types={type} />
            ) : null,
        }}
      />
    </Page>
  );
};

function load(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

export const getStaticProps: GetStaticProps<
  Props,
  {component: string; group: string}
> = async (context) => {
  const componentSlug = context.params?.component;
  const groupSlug = context.params?.group;
  const relativeMdPath = `content/components/${groupSlug}/${componentSlug}.mdx`;

  const mdFilePath = path.resolve(process.cwd(), relativeMdPath);
  const editPageLinkPath = `polaris.shopify.com/${relativeMdPath}`;

  if (fs.existsSync(mdFilePath)) {
    const [mdx, data] = await serializeMdx<FrontMatter>(mdFilePath, {load});

    const seoDescription =
      typeof mdx.frontmatter.seoDescription === 'string'
        ? mdx.frontmatter.seoDescription
        : (data.firstParagraph as string) ?? null;

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

          let description = null;

          if (example.description) {
            // Since this markdown didn't come from a real file, we use a VFile
            // instead
            [description] = await serializeMdx(new VFile(example.description));
          }

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
      mdx.frontmatter.status || '',
    );

    const props: Props = {
      mdx,
      examples,
      seoDescription,
      type,
      editPageLinkPath,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/components/**/*.mdx');
  const paths = globby
    .sync(globPath)
    .filter((path) => !path.endsWith('index.mdx'))
    .map((path) =>
      path.replace(`${process.cwd()}/content`, '').replace('.mdx', ''),
    );

  return {
    paths,
    fallback: false,
  };
};

export default Components;
