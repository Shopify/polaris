import React, {Fragment, useState, useRef} from 'react';
import {Tab} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';
import remarkUnwrapImages from 'remark-unwrap-images';
import {useRouter} from 'next/router';

import StatusBadge from '../StatusBadge';
import InlinePill from '../InlinePill';
import {
  StatusName,
  PatternVariantFontMatter,
  PatternFrontMatter,
} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Box} from '../Box';
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

const SingleVariant = ({
  children,
  patternData: {variants},
}: VariantRendererProps) => children(variants[0]);

const TabbedVariants = (props: VariantRendererProps) => {
  const router = useRouter();
  const tabListRef = useRef<HTMLDivElement | null>(null);
  let exampleIndex = props.patternData.variants.findIndex(
    ({data: {slug}}) => slug === router.query.pattern?.[1],
  );

  if (exampleIndex === -1) {
    exampleIndex = 0;
  }

  const onTabChange = (index: number) => {
    router.push(
      `/patterns/${router.query.pattern?.[0]}/${props.patternData.variants[index].data.slug}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <Tab.Group
      defaultIndex={0}
      selectedIndex={exampleIndex}
      onChange={onTabChange}
    >
      <div className={styles.TabGroup} data-selected={exampleIndex}>
        <Tab.List ref={tabListRef}>
          <div className={styles.ExamplesList} id="examples">
            {props.patternData.variants.map((variant) => (
              <Tab
                key={`${variant.data.slug}-tab`}
                onFocus={() => {
                  if (!tabListRef.current) return;
                  tabListRef.current.scrollIntoView({
                    block: 'end',
                    inline: 'nearest',
                    behavior: 'smooth',
                  });
                }}
              >
                <span>{variant.data.title}</span>
              </Tab>
            ))}
          </div>
        </Tab.List>

        <Tab.Panels>
          {props.patternData.variants.map((variant) => (
            <Tab.Panel
              key={`${variant.data.slug}-panel`}
              className={styles.Panel}
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
          <VariantMarkdown
            patternName={`${props.patternData.title}${
              variant.data.title ? ` > ${variant.data.title}` : ''
            }`}
          >
            {variant.content}
          </VariantMarkdown>
        </Stack>
      )}
    </Container>
  );
};

const BaseMarkdown = ({
  children,
  components,
  mdxComponents,
}: {
  children: string;
  components?: React.ComponentProps<typeof Markdown>['components'];
  mdxComponents?: {[key: string]: React.ComponentType};
}) => (
  <Markdown
    remarkPlugins={[remarkUnwrapImages, remarkDefinitionList]}
    // @ts-expect-error incompatible type to remark-rehype in remark-definition-list package.
    remarkRehypeOptions={{handlers: defListHastHandlers}}
    components={{
      // @ts-expect-error react-markdown doesn't understand custom attributes
      div: ({as, ...props}) => {
        // poor man's MDX
        const Component = mdxComponents?.[as] ?? Box;
        return <Component {...props} />;
      },
      h1: (props) => <Heading as="h1" {...props} />,
      h2: (props) => <Heading as="h2" {...props} />,
      h3: (props) => <Heading as="h3" {...props} />,
      h4: (props) => <Heading as="h4" {...props} />,
      ol: (props) => (
        <Stack
          as="ol"
          gap="2"
          className={[styles.List, styles.OrderedList]}
          {...props}
        />
      ),
      ul: (props) => (
        <Stack
          as="ul"
          className={[styles.List, styles.UnorderedList]}
          gap="2"
          {...props}
        />
      ),
      li: (props) => <Row as="li" gap="2" {...props} />,
      dl: (props) => (
        <Box as="dl" className={styles.DefinitionList}>
          {props.children}
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
      ...components,
    }}
  >
    {children}
  </Markdown>
);

const PatternMarkdown = ({
  children,
  patternData,
}: {
  children: string;
  patternData: Props['data'];
}) => (
  <BaseMarkdown
    mdxComponents={{
      Variants: () => <Variants patternData={patternData} />,
    }}
  >
    {children}
  </BaseMarkdown>
);

const VariantMarkdown = ({
  children,
  patternName,
}: {
  children: string;
  patternName: string;
}) => {
  return (
    <BaseMarkdown
      components={{
        // We're using table as a handy shortcut for rendering a CSS grid
        // But that grid is actually rendered as an unordered list of items!
        // Should probably just be MDX at this point...
        table: ({children}) => (
          <Box as="ul" className={styles.UsageGuidelinesGrid}>
            {children}
          </Box>
        ),
        // don't need this extra wrapping element, so pass it through
        tbody: ({children}) => <Fragment>{children}</Fragment>,
        // We don't use theads here
        thead: () => null,
        tr: (props) => (
          <Box as="li" className={styles.UsageGuidelinesRow}>
            {props.children}
          </Box>
        ),
        td: ({children, node}) =>
          node?.children?.[0].type === 'text' ? (
            <p>{children}</p>
          ) : (
            <Fragment>{children}</Fragment>
          ),
        code: function Code({
          inline,
          // @ts-expect-error Unsure how to tell react-markdown this prop is
          // being injected by a plugin
          meta,
          ...props
        }) {
          const [showCode, toggleCode] = useState(false);
          if (inline) {
            return <InlinePill {...props} />;
          }

          let context;

          if (meta) {
            try {
              ({context} = JSON.parse(meta));
            } catch (error) {
              console.warn(`code block meta is not parsable JSON: ${meta}`);
            }
          }

          return (
            <PatternsExample
              example={{
                code: (props.children?.[0] as string) ?? '',
                context,
              }}
              showCode={showCode}
              onCodeToggle={() => toggleCode((showCode) => !showCode)}
              patternName={patternName}
            />
          );
        },
      }}
      mdxComponents={{
        Hero: (props) => <Box {...props} className={styles.Hero} />,
        HowItHelps: (props) => (
          <Stack gap="4" {...props} className={styles.HowItHelps} />
        ),
        Usage: (props) => <Stack gap="4" {...props} className={styles.Usage} />,
        UsefulToKnow: (props) => (
          <Stack gap="4" {...props} className={styles.UsefulToKnow} />
        ),
        DefinitionTable: (props) => (
          <Box {...props} className={styles.DefinitionTable} />
        ),
      }}
    >
      {children}
    </BaseMarkdown>
  );
};

export default function PatternPage(props: Props) {
  return (
    <>
      <PageMeta title={props.data.title} description={props.data.description} />

      <Page showTOC={true}>
        <Stack gap="8" className={styles.Pattern}>
          <Stack gap="4">
            <Heading as="h1">
              <Row wrap gap="2" className={styles.Heading}>
                {props.data.title}{' '}
                {props.data.status?.value === 'Beta' ? (
                  <StatusBadge status={{value: StatusName.Beta, message: ''}} />
                ) : null}
              </Row>
            </Heading>
            <Lede>{props.data.description}</Lede>
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
          <PatternMarkdown patternData={props.data}>
            {props.content}
          </PatternMarkdown>
        </Stack>
      </Page>
    </>
  );
}
