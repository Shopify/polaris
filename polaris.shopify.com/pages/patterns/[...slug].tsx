import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import fs from 'fs';
import path from 'path';
import {readdir} from 'fs/promises';
import {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import PatternPage from '../../src/components/PatternPage';
import type {Props, PatternMDX} from '../../src/components/PatternPage';
import ComingSoon from '../../src/components/ComingSoon';
import {PatternFrontMatter, PatternVariantFrontMatter} from '../../src/types';
import {serializeMdx} from '../../src/components/Markdown/serialize';

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
      const [variant] = await serializeMdx<PatternVariantFrontMatter>(
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

/**
 * A pattern with more than one variant has no page of its own — it forwards to
 * its first variant. That used to be a `redirect` from `getStaticProps`, which
 * `output: 'export'` can't do, so the root is exported as a page that forwards
 * on the client instead.
 */
type PageProps = Props | {redirectTo: string};

const isRedirect = (props: PageProps): props is {redirectTo: string} =>
  'redirectTo' in props;

export const getStaticProps: GetStaticProps<
  PageProps,
  {slug: string[]}
> = async ({params}) => {
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
      props: {
        redirectTo:
          pattern.frontmatter.variants[0].frontmatter.url ??
          `/patterns/${slug}`,
      },
    };
  }

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
          pattern.frontmatter.variants.map(({frontmatter: {url}}) => url),
        ) ||
        !isUnique(
          pattern.frontmatter.variants.map(({frontmatter: {title}}) => title),
        )
      ) {
        throw new Error('Variants must have unique title & url front matter');
      }

      // The pattern's root path is included so the export has somewhere to put
      // the forwarding page described above.
      return [
        {params: {slug: [slug]}},
        ...pattern.frontmatter.variants.map((variant) => ({
          params: {
            slug: (
              variant.frontmatter.url?.replace(/^\/?patterns\//, '') || slug
            ).split('/'),
          },
        })),
      ];
    }),
  );

  return {
    paths: paths.flat(),
    // Every pattern route is known at build time; `output: 'export'` has no
    // server to fall back to.
    fallback: false,
  };
};

const PatternRedirect = ({redirectTo}: {redirectTo: string}) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(redirectTo);
  }, [redirectTo, router]);

  return (
    <p>
      Redirecting to <Link href={redirectTo}>{redirectTo}</Link>&hellip;
    </p>
  );
};

const PatternsPage: NextPage<PageProps> = (props: PageProps) => {
  if (isRedirect(props)) return <PatternRedirect {...props} />;
  if (props.pattern.frontmatter.draft && process.env.NODE_ENV === 'production')
    return <ComingSoon />;
  return <PatternPage {...props} />;
};

export default PatternsPage;
