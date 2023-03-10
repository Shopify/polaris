import React, {useState, createContext, useContext, useEffect} from 'react';
import {Tab} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';
import remarkUnwrapImages from 'remark-unwrap-images';
import {useRouter} from 'next/router';
import {visit} from 'unist-util-visit';
import type {Node, Parent} from 'unist-util-visit';
import type {Plugin} from 'unified';

import InlinePill from '../InlinePill';
import {PatternVariantFontMatter, PatternFrontMatter} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Box} from '../Box';
import Code from '../Code';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import PatternsExample from '../PatternsExample';
import Page from '../Page';
import styles from './PatternPage.module.scss';
import Markdown from '../Markdown';

export interface Props {
  data: Omit<PatternFrontMatter, 'variants'> & {
    variants: {
      data: PatternVariantFontMatter;
      content: string;
    }[];
  };
  content: string;
}

interface VariantRendererProps {
  children: (_: Props['data']['variants'][number]) => JSX.Element;
  patternData: Props['data'];
}

const CodeVisibilityContext = createContext<[boolean, (arg: boolean) => any]>([
  false,
  () => {},
]);

function codeAsContext(): Plugin {
  return (tree) => {
    // Gather up all the code elements
    const codes: {
      node: Node;
      parent: Parent;
      index: number;
      meta: Record<string, any>;
    }[] = [];
    visit(tree, 'code', (node, index, parent) => {
      if (node.meta) {
        try {
          codes.push({
            node,
            index: index!,
            parent,
            meta: JSON.parse(node.meta),
          });
        } catch (error) {
          // Just ignore this block
        }
      }
    });

    // Iterate over all the code elements, matching wrappers with ids
    codes
      // Ignore anything which doesn't self-identify as wrapping another
      .filter(
        ({meta}) =>
          ['previewContext', 'sandboxContext'].includes(meta.type) && meta.for,
      )
      // sort descending so when we splice these nodes out of their parents, all
      // following indexes are still valid
      .sort((a, b) => b.index - a.index)
      .forEach(({node, meta, index, parent}) => {
        if (meta.for === meta.id) {
          console.warn(
            `Code block specifies { for: "${meta.for}", id: "${meta.id}" }, which would cause an infinite loop.`,
          );
          return;
        }

        const forCode = codes.find(
          (otherNode) => otherNode.meta.id === meta.for,
        );

        if (!forCode) {
          console.warn(
            `Code block specifies { for: "${meta.for}" }, but could not find matching { id: "${meta.for}" }`,
          );
          return;
        }

        // @ts-expect-error Yes, it does exist Typescript. Shhhhh
        forCode.meta[meta.type] = node.value;

        // Delete this code block from the tree
        parent.children.splice(index, 1);
      });

    // For all the code blocks who might now be wrapped, re-encode the modified
    // meta and stick it back on the node
    codes
      .filter(({meta}) => meta.id)
      .forEach(({node, meta}) => {
        // @ts-expect-error Yes, it does exist Typescript. Shhhhh
        node.meta = JSON.stringify(meta);
      });
  };
}

const SingleVariant = ({
  children,
  patternData: {variants},
}: VariantRendererProps) => children(variants[0]);

const TabbedVariants = (props: VariantRendererProps) => {
  const router = useRouter();
  let exampleIndex = props.patternData.variants.findIndex(
    ({data: {slug}}) => slug === router.query.slug?.[1],
  );

  if (exampleIndex === -1) {
    exampleIndex = 0;
  }

  return (
    <Tab.Group defaultIndex={0} selectedIndex={exampleIndex}>
      <div className={styles.TabGroup} data-selected={exampleIndex}>
        <Tab.List className={styles.TabList} id="examples">
          {props.patternData.variants.map((variant) => (
            <Tab
              as={Link}
              href={`/patterns/${router.query.slug?.[0]}/${variant.data.slug}`}
              shallow
              className={styles.Tab}
              key={`${variant.data.slug}-tab`}
            >
              <span>{variant.data.title}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {props.patternData.variants.map((variant) => (
            <Tab.Panel
              key={`${variant.data.slug}-panel`}
              className={styles.TabPanel}
            >
              {props.children(variant)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

const Variants = (props: {patternData: Props['data']}) => {
  if (!props.patternData.variants?.length) {
    return null;
  }

  const Container =
    props.patternData.variants.length > 1 ? TabbedVariants : SingleVariant;

  return (
    <Container patternData={props.patternData}>
      {(variant) => (
        <Stack gap="8" className={styles.Variant}>
          <PatternMarkdown
            patternData={props.patternData}
            patternName={`${props.patternData.title}${
              variant.data.title ? ` > ${variant.data.title}` : ''
            }`}
          >
            {variant.content}
          </PatternMarkdown>
        </Stack>
      )}
    </Container>
  );
};

type MDXComponents = {
  [key: string]: React.ComponentType<
    React.PropsWithChildren<{[key: string]: any}>
  >;
};

const BaseMarkdown = ({
  children,
  components,
  mdxComponents,
  patternName,
}: {
  children: string;
  components?: React.ComponentProps<typeof Markdown>['components'];
  mdxComponents?: MDXComponents;
  patternName?: string;
}) => (
  <Markdown
    remarkPlugins={[codeAsContext, remarkUnwrapImages, remarkDefinitionList]}
    // @ts-expect-error incompatible type to remark-rehype in remark-definition-list package.
    remarkRehypeOptions={{handlers: defListHastHandlers}}
    components={{
      // @ts-expect-error react-markdown doesn't understand custom attributes
      div: ({as, ...props}) => {
        // poor man's MDX
        const Component = mdxComponents?.[as] ?? Box;
        return <Component {...props} />;
      },
      h1: ({children, id}) => (
        <Heading id={id} as="h1">
          {children}
        </Heading>
      ),
      h2: ({children, id}) => (
        <Heading id={id} as="h2">
          {children}
        </Heading>
      ),
      h3: ({children, id}) => (
        <Heading id={id} as="h3">
          {children}
        </Heading>
      ),
      h4: ({children, id}) => (
        <Heading id={id} as="h4">
          {children}
        </Heading>
      ),
      ol: ({children}) => (
        <Stack as="ol" gap="2" className={[styles.List, styles.OrderedList]}>
          {children}
        </Stack>
      ),
      ul: ({children}) => (
        <Stack as="ul" className={[styles.List, styles.UnorderedList]} gap="1">
          {children}
        </Stack>
      ),
      li: ({children, ordered, ...props}) => (
        <Row as="li" gap={ordered ? '2' : '0'} {...props}>
          <span>{children}</span>
        </Row>
      ),
      dl: ({children}) => (
        <Box as="dl" className={styles.DefinitionList}>
          {children}
        </Box>
      ),
      strong: ({children}) => (
        <Box as="strong" style={{fontWeight: 'var(--font-weight-700)'}}>
          {children}
        </Box>
      ),
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      code: function MdCode({
        inline,
        // @ts-expect-error Unsure how to tell react-markdown this prop is
        // being injected by a plugin
        meta,
        children,
      }) {
        const [showCode, toggleCode] = useContext(CodeVisibilityContext);

        if (inline) {
          return <InlinePill>{children}</InlinePill>;
        }

        let type, previewContext, sandboxContext;

        if (meta) {
          try {
            ({type, previewContext, sandboxContext} = JSON.parse(meta));
          } catch (error) {
            console.warn(`code block meta is not parsable JSON: ${meta}`);
          }
        }

        if (type === 'livePreview') {
          return (
            <PatternsExample
              example={{
                code: (children?.[0] as string) ?? '',
                previewContext,
                sandboxContext,
              }}
              showCode={showCode}
              onCodeToggle={() => toggleCode(!showCode)}
              patternName={patternName ?? ''}
            />
          );
        }

        return (
          <Code code={{title: '', code: (children?.[0] as string) ?? ''}} />
        );
      },
      ...components,
    }}
  >
    {children}
  </Markdown>
);

const defaultMdxComponents: MDXComponents = {
  Stack: ({gap, children}) => <Stack gap={gap}>{children}</Stack>,
  Hero: ({children}) => <Box className={styles.Hero}>{children}</Box>,
  HowItHelps: ({children}) => (
    <Stack gap="4" className={styles.HowItHelps}>
      {children}
    </Stack>
  ),
  Usage: ({children}) => (
    <Stack gap="4" className={styles.Usage}>
      {children}
    </Stack>
  ),
  UsefulToKnow: ({children}) => (
    <Stack gap="4" className={styles.UsefulToKnow}>
      {children}
    </Stack>
  ),
  DefinitionTable: ({children}) => (
    <Box className={styles.DefinitionTable}>{children}</Box>
  ),
};

const PatternMarkdown = ({
  children,
  patternData,
  patternName,
}: {
  children: string;
  patternData: Props['data'];
  patternName?: string;
}) => (
  <BaseMarkdown
    patternName={patternName ?? ''}
    mdxComponents={{
      ...defaultMdxComponents,
      Variants: () => <Variants patternData={patternData} />,
    }}
  >
    {children}
  </BaseMarkdown>
);

export default function PatternPage(props: Props) {
  const [showCode, toggleCode] = useState(true);
  useEffect(() => {
    // When rendering a new pattern, default the code to visible.
    // However, when moving between variants within a pattern, retain the
    // current code toggle setting.
    toggleCode(true);
  }, [props.content]);

  return (
    <>
      <PageMeta title={props.data.title} description={props.data.description} />

      <Page isContentPage>
        <Stack gap="8">
          <Stack gap="4">
            <Heading as="h1">
              <Box className={styles.Heading}>{props.data.title}</Box>
            </Heading>
            <Lede>{props.data.lede}</Lede>
            {props.data.githubDiscussionsLink ? (
              <p className={styles.InfoLine}>
                <Link
                  className={styles.InfoLineLink}
                  href={props.data.githubDiscussionsLink}
                >
                  Discuss on GitHub
                </Link>
              </p>
            ) : null}
          </Stack>
          <CodeVisibilityContext.Provider value={[showCode, toggleCode]}>
            <PatternMarkdown patternData={props.data}>
              {props.content}
            </PatternMarkdown>
          </CodeVisibilityContext.Provider>
        </Stack>
      </Page>
    </>
  );
}
