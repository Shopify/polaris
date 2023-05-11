import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {readdir} from 'fs/promises';

import PatternPage from '../../src/components/PatternPage';
import type {Props} from '../../src/components/PatternPage';
import ComingSoon from '../../src/components/ComingSoon';
import {PatternFrontMatter} from '../../src/types';

const getDirectories = async (source: string) =>
  (await readdir(source, {withFileTypes: true}))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const readFrontMatter = (filePath: string): {[key: string]: any} => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  return {data, content};
};

const patternsContentAbsoluteDir = path.resolve(
  process.cwd(),
  `content/patterns`,
);

const loadPatternAndVariants = (slug: string): Props => {
  let markdownFilePath = path.resolve(patternsContentAbsoluteDir, `${slug}.md`);

  const {data, content} = readFrontMatter(markdownFilePath) as {
    data: PatternFrontMatter;
    content: string;
  };

  return {
    data,
    content,
  };
};

export const getStaticProps: GetStaticProps<Props, {pattern: string}> = async ({
  params,
}) => {
  const pattern = params?.pattern;
  if (!pattern) {
    throw new Error('Expected params.pattern to be defined (as string[])');
  }

  let data, content;

  try {
    ({data, content} = loadPatternAndVariants(pattern));
  } catch (error) {
    console.error(error);
    // Fail gracefully
    return {notFound: true};
  }

  // Hitting the root pattern page when theres more than one variant redirects
  // to the first variant

  return {
    props: {
      data: {
        ...data,
        draft: data.draft || false,
      },
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{slug: string[]}> = async () => {
  const paths = (await getDirectories(patternsContentAbsoluteDir)).flatMap(
    (slug) => {
      if (!slug) {
        throw new Error('');
      }

      return [{params: {slug: [slug]}}];
    },
  );

  return {
    paths,
    // We have some redirects that have to happen in a node server, not at
    // pre-render time, so we need to "fallback" here.
    fallback: 'blocking',
  };
};

const PatternsPage: NextPage<Props> = (props: Props) => {
  if (props.data.draft && process.env.NODE_ENV === 'production')
    return <ComingSoon />;
  return <PatternPage {...props} />;
};

export default PatternsPage;
