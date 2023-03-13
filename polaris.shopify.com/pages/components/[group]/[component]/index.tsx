import fs from 'fs';
import globby from 'globby';
import path from 'path';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../../../src/components/ComponentExamples';
import type {ResolvedComponentExample} from '../../../../src/components/ComponentExamples';
import Longform from '../../../../src/components/Longform';
import Markdown from '../../../../src/components/Markdown';
import Page from '../../../../src/components/Page';
import {toPascalCase} from '../../../../src/utils/various';
import PageMeta from '../../../../src/components/PageMeta';
import {Status, FilteredTypes, AllTypes} from '../../../../src/types';
import StatusBanner from '../../../../src/components/StatusBanner';
import UpdateBanner from '../../../../src/components/UpdateBanner';
import PropsTable from '../../../../src/components/PropsTable';
import {getRelevantTypes} from '../../../../scripts/get-props/src/get-props';
import {content} from '../../../../src/content';
import {
  getPageByPath,
  getPageStack,
} from '../../../../src/components/Editor/Editor';
import {Page as PageType} from '../../../../src/components/Editor/types';
import EditorRenderer from '../../../../src/components/EditorRenderer';

interface Props {
  page: PageType;
  examples: ResolvedComponentExample[];
  filteredTypes: FilteredTypes;
}

const Components = ({page, examples, filteredTypes}: Props) => {
  // const typedStatus: Status | undefined = status
  //   ? {
  //       value: status.value.toLowerCase() as Status['value'],
  //       message: status.message,
  //     }
  //   : undefined;

  const componentExamples = Boolean(examples.length) && (
    <ComponentExamples examples={examples} />
  );
  // const propsTable =
  //   type && status?.value !== 'Deprecated' ? (
  //     <PropsTable componentName={title} types={type} />
  //   ) : null;
  const propsTable = (
    <PropsTable types={filteredTypes} componentName={page.title} />
  );

  return (
    <>
      {componentExamples}

      {propsTable}

      <EditorRenderer page={page} />
    </>
    //     <Page title={title} editPageLinkPath={editPageLinkPath} isContentPage>
    //       <PageMeta title={title} description={description} />

    //       <Longform>
    //         <Markdown>{description}</Markdown>
    //         {typedStatus && <StatusBanner status={typedStatus} />}
    //         {updateBannerMessage && <UpdateBanner message={updateBannerMessage} />}
    //         {componentExamples}
    //       </Longform>

    // {/*
    //       {/*
    //       <Longform firstParagraphIsLede={false}>
    //         <Markdown>{readme.body}</Markdown>
    //       </Longform> */} */}
    //     </Page>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  {component: string; group: string}
> = async (context) => {
  const componentSlug = context.params?.component;
  const groupSlug = context.params?.group;

  const page = getPageByPath(
    content,
    `components/${groupSlug}/${componentSlug}`,
  );

  if (page && page.pageMeta?.type === 'components') {
    const examples = page.pageMeta.examples.map((example) => {
      const examplePath = path.resolve(
        process.cwd(),
        `app/examples/${example.fileName.replace('.tsx', '')}/page.tsx`,
      );
      let code = '';

      if (fs.existsSync(examplePath)) {
        code = fs.readFileSync(examplePath, 'utf-8');
        code = code
          .split('\n')
          .filter((line) => !line.includes('withPolarisExample'))
          .join('\n');
      }

      code = code.replace("'use client';\n\n", '');

      return {...example, code};
    });

    const propsFilePath = path.resolve(process.cwd(), `.cache/props.json`);
    const fileContent = fs.readFileSync(propsFilePath, 'utf8');
    const allTypes: AllTypes = JSON.parse(fileContent);

    const componentDirName = toPascalCase(`${page.title} `);
    const propName = toPascalCase(`${page.title} Props`);

    let filteredTypes = getRelevantTypes(
      allTypes,
      propName,
      `polaris-react/src/components/${componentDirName}/${componentDirName}.tsx`,
    );

    const props: Props = {
      page,
      examples,
      filteredTypes,
    };

    return {props};
  } else {
    return {notFound: true};
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = content.pages
    .filter((page) => !page.useCustomLayout)
    .map((page) => getPageStack(content, page))
    .filter(
      (pageStack) =>
        pageStack.length === 3 && pageStack[0].slug === 'components',
    )
    .map((pageStack) => ({
      params: {
        group: pageStack[1].slug,
        component: pageStack[2].slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export default Components;
