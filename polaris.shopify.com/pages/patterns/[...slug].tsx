import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import {readdir} from 'fs/promises';

import PatternPage from '../../src/components/PatternPage';
import type {Props, PatternMDX} from '../../src/components/PatternPage';
import ComingSoon from '../../src/components/ComingSoon';
import {PatternFrontMatter, PatternVariantFontMatter} from '../../src/types';
import {serializeMdx} from '../../src/components/Markdown/serialize.mts';

const getDirectories = async (source: string) =>
  (await readdir(source, {withFileTypes: true}))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const isUnique = (arr: any[]) => arr.length === Array.from(new Set(arr)).length;

const patternsContentAbsoluteDir = path.resolve(
  process.cwd(),
  `content/patterns`,
);

function load(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

async function loadPatternAndVariants(slug: string): Promise<PatternMDX> {
  const markdownFilePath = path.resolve(
    patternsContentAbsoluteDir,
    `${slug}/index.mdx`,
  );

  const [pattern] = await serializeMdx<PatternFrontMatter>(markdownFilePath, {
    load,
  });

  const variants = await Promise.all(
    (pattern.frontmatter.variants || []).map(async (variantPath) => {
      const variantAbsolutePath = path.resolve(
        patternsContentAbsoluteDir,
        `${slug}/${variantPath}`,
      );
      // TODO: Optimize this so we're only sending down the compiled MDX for
      // variants which we're actually viewing
      const [variant] = await serializeMdx<PatternVariantFontMatter>(
        variantAbsolutePath,
        {load},
      );
      return variant;
    }),
  );

  return {
    ...pattern,
    frontmatter: {
      ...pattern.frontmatter,
      variants,
    },
  };
}

export const getStaticProps: GetStaticProps<Props, {slug: string[]}> = async ({
  params,
}) => {
  const patternSlug = params?.slug;
  if (!patternSlug) {
    throw new Error('Expected params.pattern to be defined (as string[])');
  }

  if (patternSlug.length > 2) {
    // Only handle /[slug] & /[slug]/[variant]
    return {notFound: true};
  }

  const slug = patternSlug[0];
  const variant = patternSlug[1];
  let pattern: Awaited<ReturnType<typeof loadPatternAndVariants>>;

  try {
    pattern = await loadPatternAndVariants(slug);
  } catch (error) {
    console.error(error);
    // Fail gracefully
    return {notFound: true};
  }

  // Hitting the root pattern page when theres more than one variant redirects
  // to the first variant
  if (pattern.frontmatter.variants.length > 1 && !variant) {
    return {
      redirect: {
        destination: `/patterns/${slug}/${pattern.frontmatter.variants[0].frontmatter.slug}`,
        permanent: false,
      },
    };
  }

  // console.log('DATA VARIANTS', JSON.stringify(data.variants, null, 2));

  // console.log('DATA VARIANTS', JSON.stringify(data.variants, null, 2));

  // console.log('mdxVariants', JSON.stringify(mdxVariants, null, 2));
  // console.log('VARIANTS', JSON.stringify(mdxVariants, null, 2));
  // console.log('DATA.VARIANTS', JSON.stringify(data.variants, null, 2));

  return {
    props: {
      pattern: {
        ...pattern,
        frontmatter: {
          ...pattern.frontmatter,
          draft: pattern.frontmatter.draft || false,
        },
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<{slug: string[]}> = async () => {
  const directories = await getDirectories(patternsContentAbsoluteDir);

  const paths = await Promise.all(
    directories.map(async (slug) => {
      if (!slug) {
        throw new Error('');
      }
      const pattern = await loadPatternAndVariants(slug);

      // When there's zero or 1 variant, it's just the pattern path, no variant
      // slug
      if (pattern.frontmatter.variants.length < 2) {
        return [{params: {slug: [slug]}}];
      }

      // title and slug are required and must be unique when multiple variants
      // are specified
      if (
        !isUnique(
          pattern.frontmatter.variants.map(({frontmatter: {slug}}) => slug),
        ) ||
        !isUnique(
          pattern.frontmatter.variants.map(({frontmatter: {title}}) => title),
        )
      ) {
        throw new Error('Variants must have unique title & slug front matter');
      }

      // Note that we do not provide the pattern's root path here; we need it to
      // trigger a redirect in getStaticProps, but that can't be done at build
      // time. The later "fallback: 'blocking'" will ensure if that route is hit,
      // it'll be running getStaticProps in a node process where it CAN perform
      // a redirect.
      return pattern.frontmatter.variants.map((variant) => ({
        params: {slug: [slug, variant.frontmatter.slug as string]},
      }));
    }),
  );

  return {
    paths: paths.flat(),
    // We have some redirects that have to happen in a node server, not at
    // pre-render time, so we need to "fallback" here.
    fallback: 'blocking',
  };
};

const PatternsPage: NextPage<Props> = (props: Props) => {
  if (props.pattern.frontmatter.draft && process.env.NODE_ENV === 'production')
    return <ComingSoon />;
  return <PatternPage {...props} />;
};

export default PatternsPage;
