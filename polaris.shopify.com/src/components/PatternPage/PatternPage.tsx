import React, {useState, useEffect, type ComponentProps} from 'react';
import {Tab} from '@headlessui/react';
import Link from 'next/link';

import {useRouter} from 'next/router';

import type {
  PatternVariantFontMatter,
  PatternFrontMatter,
  SerializedMdx,
} from '../../types';
import PageMeta from '../PageMeta';
import {Stack} from '../Stack';
import {Box} from '../Box';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import Page from '../Page';
import styles from './PatternPage.module.scss';
import Markdown, {
  CodeVisibilityProvider,
  HeadingWithCopyButton,
} from '../Markdown';
import {SideBySide} from '../Markdown/components/SideBySide';

export type PatternMDX = SerializedMdx<
  Omit<PatternFrontMatter, 'variants'> & {
    variants: SerializedMdx<PatternVariantFontMatter>[];
  }
>;

export interface Props {
  pattern: PatternMDX;
}

interface VariantRendererProps {
  children: (
    _: Props['pattern']['frontmatter']['variants'][number],
  ) => JSX.Element;
  variants: Props['pattern']['frontmatter']['variants'];
}

const SingleVariant = ({children, variants}: VariantRendererProps) =>
  children(variants[0]);

const TabbedVariants = ({children, variants}: VariantRendererProps) => {
  const router = useRouter();
  let exampleIndex = variants.findIndex(
    ({frontmatter: {slug}}) => slug === router.query.slug?.[1],
  );

  if (exampleIndex === -1) {
    exampleIndex = 0;
  }

  return (
    <Tab.Group defaultIndex={0} selectedIndex={exampleIndex}>
      <div className={styles.TabGroup} data-selected={exampleIndex}>
        <Tab.List className={styles.TabList} id="examples">
          {variants.map((variant) => (
            <Tab
              as={Link}
              href={`/patterns/${router.query.slug?.[0]}/${variant.frontmatter.slug}`}
              shallow
              className={styles.Tab}
              key={`${variant.frontmatter.slug}-tab`}
            >
              <span>{variant.frontmatter.title}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {variants.map((variant) => (
            <Tab.Panel
              key={`${variant.frontmatter.slug}-panel`}
              className={styles.TabPanel}
            >
              {children(variant)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export const Variants = ({
  variants,
}: {
  variants: Props['pattern']['frontmatter']['variants'];
}) => {
  if (!variants?.length) {
    return null;
  }

  const Container = variants.length > 1 ? TabbedVariants : SingleVariant;

  return (
    <Container variants={variants}>
      {(variant) => (
        <Stack gap="800" className={styles.Variant}>
          <PatternMarkdown {...variant} />
        </Stack>
      )}
    </Container>
  );
};

const BaseMarkdown = (props: ComponentProps<typeof Markdown>) => {
  return (
    <Markdown
      {...props}
      // TODO: FIXME is this the correct scope to pass in?
      scope={{...props.scope, data: props.frontmatter}}
      components={{
        ...props.components,
        strong: ({children}) => (
          <Box
            as="strong"
            style={{
              // TODO: FIXME: Why does patterns page have a heavier weight for
              // strong text?
              fontWeight: 'var(--font-weight-700)',
              color: 'var(--text-strong)',
            }}
          >
            {children}
          </Box>
        ),
      }}
    />
  );
};

const defaultMdxComponents: React.ComponentProps<
  typeof Markdown
>['components'] = {
  Stack: ({gap, children}) => <Stack gap={gap}>{children}</Stack>,
  Hero: ({children}) => <Box className={styles.Hero}>{children}</Box>,
  HowItHelps: ({children}) => (
    <Stack gap="400" className={styles.HowItHelps}>
      {children}
    </Stack>
  ),
  Usage: ({children}) => (
    <Stack gap="400" className={styles.Usage}>
      {children}
    </Stack>
  ),
  UsefulToKnow: ({children}) => (
    <SideBySide className={styles.UsefulToKnow}>{children}</SideBySide>
  ),
  DefinitionTable: ({children}) => (
    <Box className={styles.DefinitionTable}>{children}</Box>
  ),
  p: ({children}) => <Box as="p">{children}</Box>,
  h2: ({children, id}) => (
    <HeadingWithCopyButton id={id} as="h2" className={[styles['Heading-h2']]}>
      {children}
    </HeadingWithCopyButton>
  ),
  h3: ({children, id}) => (
    <HeadingWithCopyButton id={id} as="h3" className={styles['Heading-h3']}>
      {children}
    </HeadingWithCopyButton>
  ),
  dl: ({children}) => (
    <Box as="dl" className={styles.DefinitionList}>
      {children}
    </Box>
  ),
};

const PatternMarkdown = (props: ComponentProps<typeof Markdown>) => (
  <BaseMarkdown
    {...props}
    components={{
      ...props.components,
      ...defaultMdxComponents,
      Variants,
    }}
  />
);

export default function PatternPage({pattern}: Props) {
  const [showCode, toggleCode] = useState(true);
  useEffect(() => {
    // When rendering a new pattern, default the code to visible.
    // However, when moving between variants within a pattern, retain the
    // current code toggle setting.
    toggleCode(true);
  }, [pattern.frontmatter]);

  return (
    <>
      <PageMeta
        title={pattern.frontmatter.title}
        description={pattern.frontmatter.description}
      />

      <Page isContentPage>
        <Stack gap="800" className="margin-considered-harmful">
          <Stack gap="400">
            <Heading as="h1">
              <Box className={styles.Heading}>{pattern.frontmatter.title}</Box>
            </Heading>
            <Lede className={styles.NoMargin}>{pattern.frontmatter.lede}</Lede>
            {pattern.frontmatter.githubDiscussionsLink ? (
              <p className={styles.InfoLine}>
                <Link
                  className={styles.InfoLineLink}
                  href={pattern.frontmatter.githubDiscussionsLink}
                >
                  Discuss on GitHub
                </Link>
              </p>
            ) : null}
          </Stack>
          <CodeVisibilityProvider
            showCode={showCode}
            setShowCode={(...args) => {
              toggleCode(...args);
            }}
          >
            <PatternMarkdown {...pattern} />
          </CodeVisibilityProvider>
        </Stack>
      </Page>
    </>
  );
}
