import fs from 'fs';
import path from 'path';
import type {GetStaticPaths, GetStaticProps} from 'next';
import ComponentExamples from '../../../../src/components/ComponentExamples';
import Page from '../../../../src/components/Page';
import {toPascalCase} from '../../../../src/utils/various';
import {FilteredTypes, AllTypes} from '../../../../src/types';
import PropsTable from '../../../../src/components/PropsTable';
import {getRelevantTypes} from '../../../../scripts/get-props/src/get-props';
import {content} from '../../../../src/content';
import {
  getPageByPath,
  getPageStack,
  getPageWithUrl,
} from '../../../../src/components/Editor/utils';
import {PageWithUrl} from '../../../../src/components/Editor/types';
import EditorRenderer from '../../../../src/components/EditorRenderer';
import {ResolvedComponentExample} from '../../../../src/components/ComponentExamples/ComponentExamples';

interface Props {
  page: PageWithUrl;
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
    <Page page={page}>
      {componentExamples}
      {propsTable}
      <EditorRenderer page={page} />
    </Page>
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
    const pageWithUrl = getPageWithUrl(content, page);

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
      page: pageWithUrl,
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
