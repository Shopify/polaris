import fs from 'fs';
import globby from 'globby';
import path from 'path';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../src/components/ComponentExamples';
import type {ComponentExample} from '../../src/components/ComponentExamples';
import Longform from '../../src/components/Longform';
import Markdown from '../../src/components/Markdown';
import type {NavItem} from '../../src/components/Nav';
import Layout from '../../src/components/Layout';
import {parseMarkdown} from '../../src/utils/markdown.mjs';
import {getComponentNav} from '../../src/utils/various';
import PageMeta from '../../src/components/PageMeta';
import {Status, TypeDataTree, TypeDataTreeWithPaths} from '../../src/types';
import StatusBanner from '../../src/components/StatusBanner';
import PropsTable from '../../src/components/PropsTable';
import {getRelevantTypeData} from '../../scripts/get-props/src/get-props';

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
  typeData: TypeDataTree;
}

const Components = ({
  examples,
  description,
  title,
  readme,
  status,
  typeData,
}: Props) => {
  const navItems: NavItem[] = getComponentNav();
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status['value'],
        message: status.message,
      }
    : undefined;

  return (
    <Layout width="narrow" navItems={navItems} title={title}>
      <PageMeta title={title} description={description} />

      <Longform>
        <Markdown text={description} />
        {typedStatus && <StatusBanner status={typedStatus} />}
        <ComponentExamples examples={examples} />
      </Longform>

      {typeData && <PropsTable allTypeData={typeData} componentName={title} />}

      <Longform firstParagraphIsLede={false}>
        <Markdown text={readme.body} />
      </Longform>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  {component: string}
> = async (context) => {
  const componentSlug = context.params?.component;
  const mdFilePath = path.resolve(
    process.cwd(),
    `content/components/${componentSlug}/index.md`,
  );

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(mdFilePath, 'utf-8');
    const data: MarkdownData = parseMarkdown(componentMarkdown);

    const description = data.frontMatter.description;
    const body = data.readme;

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

    const propsFilePath = path.resolve(process.cwd(), `src/data/props.json`);
    const fileContent = fs.readFileSync(propsFilePath, 'utf8');
    const allTypeData: TypeDataTreeWithPaths = JSON.parse(fileContent);

    let toPascalCase = (s: string) => {
      return s
        .replace(/(\w)(\w*)/g, function (_, g1, g2) {
          return g1.toUpperCase() + g2.toLowerCase();
        })
        .replace(/\s/g, '');
    };

    const componentDirName = toPascalCase(`${data.frontMatter.title} `);
    const propName = toPascalCase(`${data.frontMatter.title} Props`);

    let typeData = getRelevantTypeData(
      allTypeData,
      propName,
      `polaris-react/src/components/${componentDirName}/${componentDirName}.tsx`,
    );

    const props: Props = {
      ...data.frontMatter,
      examples,
      description,
      readme,
      typeData,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const globPath = path.resolve(process.cwd(), 'content/components/*/*.md');
  const paths = globby.sync(globPath).map((fileName: string) => {
    return fileName
      .replace(`${process.cwd()}/content`, '')
      .replace('/index.md', '');
  });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
