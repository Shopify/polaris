import React, {useState, createContext, useContext, useEffect} from 'react';
import Link from 'next/link';

import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';

import {visit} from 'unist-util-visit';
import type {Node, Parent} from 'unist-util-visit';
import type {Plugin} from 'unified';

import InlinePill from '../InlinePill';
import {PatternFrontMatter} from '../../types';
import PageMeta from '../PageMeta';
import {Stack} from '../Stack';
import {Box} from '../Box';
import Code from '../Code';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import PatternsExample from '../PatternsExample';
import Page from '../Page';
import styles from './PatternPage.module.scss';
import Markdown from '../Markdown';
import {SideBySide} from '../Markdown/components';

export interface Props {
  data: PatternFrontMatter;
  content: string;
}

interface VariantRendererProps {
  children: (_: Props['data']) => JSX.Element;
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
    remarkPlugins={[codeAsContext, remarkDefinitionList]}
    remarkRehypeOptions={{handlers: defListHastHandlers}}
    mdxComponents={mdxComponents}
    components={{
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
    <SideBySide className={styles.UsefulToKnow}>{children}</SideBySide>
  ),
  DefinitionTable: ({children}) => (
    <Box className={styles.DefinitionTable}>{children}</Box>
  ),
};

const PatternMarkdown = ({
  children,
  patternName,
}: {
  children: string;
  patternData: Props['data'];
  patternName?: string;
}) => (
  <BaseMarkdown
    patternName={patternName ?? ''}
    mdxComponents={defaultMdxComponents}
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
