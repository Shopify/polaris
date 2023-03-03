import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {readdir} from 'fs/promises';

import PatternPage from '../../src/components/PatternPage';
import type {Props} from '../../src/components/PatternPage';
import ComingSoon from '../../src/components/ComingSoon';
import {PatternFrontMatter, PatternVariantFontMatter} from '../../src/types';

const getDirectories = async (source: string) =>
  (await readdir(source, {withFileTypes: true}))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const readFrontMatter = (filePath: string): {[key: string]: any} => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const {data, content} = matter(fileContent);
  return {data, content};
};

const isUnique = (arr: any[]) => arr.length === Array.from(new Set(arr)).length;

const patternsContentAbsoluteDir = path.resolve(
  process.cwd(),
  `content/patterns`,
);

const loadPatternAndVariants = (slug: string): Props => {
  const markdownFilePath = path.resolve(
    patternsContentAbsoluteDir,
    `${slug}/index.md`,
  );

  const {data, content} = readFrontMatter(markdownFilePath) as {
    data: PatternFrontMatter;
    content: string;
  };

  return {
    data: {
      ...data,
      variants: (data.variants || []).map((variantPath) => {
        const variantAbsolutePath = path.resolve(
          patternsContentAbsoluteDir,
          `${slug}/${variantPath}`,
        );
        return readFrontMatter(variantAbsolutePath) as {
          data: PatternVariantFontMatter;
          content: string;
        };
      }),
    },
    content,
  };
};

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const pattern = params?.slug;
  if (!pattern) {
    throw new Error('Expected params.pattern to be defined (as string[])');
  }

  if (pattern.length > 2) {
    // Only handle /[slug] & /[slug]/[variant]
    return {notFound: true};
  }

  const slug = pattern[0];
  const variant = pattern[1];
  let data, content;

  try {
    ({data, content} = loadPatternAndVariants(slug));
  } catch (error) {
    console.error(error);
    // Fail gracefully
    return {notFound: true};
  }

  // Hitting the root pattern page when theres more than one variant redirects
  // to the first variant
  if (data.variants.length > 1 && !variant) {
    return {
      redirect: {
        destination: `/patterns/${slug}/${data.variants[0].data.slug}`,
        permanent: false,
      },
    };
  }

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
      const {data} = loadPatternAndVariants(slug);

      // When there's zero or 1 variant, it's just the pattern path, no variant
      // slug
      if (data.variants.length < 2) {
        return [{params: {slug: [slug]}}];
      }

      // title and slug are required and must be unique when multiple variants
      // are specified
      if (
        !isUnique(data.variants.map(({data: {slug}}) => slug)) ||
        !isUnique(data.variants.map(({data: {title}}) => title))
      ) {
        throw new Error('Variants must have unique title & slug front matter');
      }

      // Note that we do not provide the pattern's root path here; we need it to
      // trigger a redirect in getStaticProps, but that can't be done at build
      // time. The later "fallback: 'blocking'" will ensure if that route is hit,
      // it'll be running getStaticProps in a node process where it CAN perform
      // a redirect.
      return data.variants.map((variant) => ({
        params: {slug: [slug, variant.data.slug as string]},
      }));
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
