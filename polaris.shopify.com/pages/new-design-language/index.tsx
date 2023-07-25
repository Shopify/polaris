import type {GetStaticProps} from 'next';
import fs from 'fs';
import path from 'path';
import Longform from '../../src/components/Longform';
import Markdown from '../../src/components/Markdown';
import Page from '../../src/components/Page';
import PageMeta from '../../src/components/PageMeta';
import {MarkdownFile} from '../../src/types';
import {parseMarkdown} from '../../src/utils/markdown.mjs';

interface ContentProps {
  title: string;
  description: string;
  content: string;
}

const NewDesignLanguage = (props: ContentProps) => {
  return (
    <>
      <PageMeta description={props.description} />
      <Page isContentPage>
        <Longform>
          <h1>{props.title}</h1>
          <Markdown>{props.description}</Markdown>
          <Markdown>{props.content}</Markdown>
        </Longform>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<ContentProps> = async () => {
  const markdownPath = path.resolve(
    process.cwd(),
    `content/new-design-language/index.md`,
  );
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  const {
    frontMatter: {title, description},
    readme: content,
  }: MarkdownFile = parseMarkdown(markdown);

  return {
    props: {
      title,
      description,
      content,
    },
  };
};

export default NewDesignLanguage;
