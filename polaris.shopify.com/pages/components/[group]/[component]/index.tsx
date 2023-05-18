import fs from 'fs';
import globby from 'globby';
import path from 'path';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../../../src/components/ComponentExamples';
import type {ComponentExample} from '../../../../src/components/ComponentExamples';
import Longform from '../../../../src/components/Longform';
import Markdown from '../../../../src/components/Markdown';
import Page from '../../../../src/components/Page';
import {parseMarkdown} from '../../../../src/utils/markdown.mjs';
import {toPascalCase} from '../../../../src/utils/various';
import PageMeta from '../../../../src/components/PageMeta';
import {Status, FilteredTypes, AllTypes} from '../../../../src/types';
import StatusBanner from '../../../../src/components/StatusBanner';
import TipBanner from '../../../../src/components/TipBanner/TipBanner';
import PropsTable from '../../../../src/components/PropsTable';
import {getRelevantTypes} from '../../../../scripts/get-props/src/get-props';

interface MarkdownData {
  frontMatter: any;
  description: string;
  readme: string;
}

interface Props {
  examples: ComponentExample[];
  status?: Status;
  title: string;
  description: string;
  readme: {
    body: string;
    header: string;
  };
  componentProps: {
    name: string;
    propName: string;
    type: any;
  }[];
  type: FilteredTypes;
  editPageLinkPath: string;
  tip?: string;
}

const Components = ({
  examples,
  description,
  title,
  readme,
  status,
  componentProps,
  type,
  tip,
  editPageLinkPath,
}: Props) => {
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;

  const componentExamples = Boolean(examples.length) && (
    <ComponentExamples examples={examples} />
  );
  const propsTable =
    status?.value !== 'Deprecated' ? (
      <PropsTable componentName={title} componentProps={componentProps} />
    ) : null;

  return (
    <Page title={title} editPageLinkPath={editPageLinkPath} isContentPage>
      <PageMeta title={title} description={description} />

      <Longform>
        <Markdown>{description}</Markdown>
        {typedStatus && <StatusBanner status={typedStatus} />}
        {tip && (
          <TipBanner title="Tip">
            <Markdown>{tip}</Markdown>
          </TipBanner>
        )}
        {componentExamples}
      </Longform>
      {propsTable}

      <Longform firstParagraphIsLede={false}>
        <Markdown>{readme.body}</Markdown>
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
    const data: MarkdownData = parseMarkdown(componentMarkdown);

    const description = data.frontMatter.description;
    const body = data.readme;
    const tip = data.frontMatter.tip || '';

    const readme = {description, body};

    const examples = (data?.frontMatter?.examples || []).map(
      (example: ComponentExample) => {
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

        return {...example, code};
      },
    );

    const propsFilePath = path.resolve(process.cwd(), `.cache/props.json`);
    const fileContent = fs.readFileSync(propsFilePath, 'utf8');
    const allType: AllTypes = JSON.parse(fileContent);

    const componentDirName = toPascalCase(`${data.frontMatter.title} `);
    const propName = toPascalCase(`${data.frontMatter.title} Props`);
    let componentProps = [];

    let type = getRelevantTypes(
      allType,
      propName,
      `polaris-react/src/components/${componentDirName}/${componentDirName}.tsx`,
    );
    componentProps.push({propName, type, name: componentDirName});

    if (data.frontMatter.subcomponents) {
      const subComponentTypes = data.frontMatter.subcomponents.map(
        (subcomponent: string) => {
          const propName = toPascalCase(`${subcomponent} Props`);
          return {
            type: getRelevantTypes(
              allType,
              propName,
              `polaris-react/src/components/${componentDirName}/components/${subcomponent}.tsx`,
            ),
            name: subcomponent,
            propName,
          };
        },
      );
      componentProps.push(...subComponentTypes);
    }
    console.log(componentProps);

    const props: Props = {
      ...data.frontMatter,
      examples,
      tip,
      description,
      componentProps,
      readme,
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
