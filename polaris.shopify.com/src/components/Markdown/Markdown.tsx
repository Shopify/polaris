import React, {
  cloneElement,
  useState,
  forwardRef,
  type ComponentProps,
} from 'react';
import {MDXRemote} from 'next-mdx-remote';
import {ClipboardMinor} from '@shopify/polaris-icons';

import styles from './Markdown.module.scss';
import Code, {InlineCode} from '../../components/Code';
import {Box, type WithAsProp} from '../../components/Box';
import {Stack} from '../../components/Stack';
import StatusBanner from '../../components/StatusBanner';
import TipBanner from '../../components/TipBanner';
import {Lede} from '../../components/Lede';
import {SideBySide} from './components/SideBySide';
import YoutubeVideo from '../YoutubeVideo';
import {DoDont} from './components/DoDont';
import {Heading} from '../../components/Heading';
import PatternsExample from '../../components/PatternsExample';
import RichCardGrid from '../RichCardGrid';
import Tooltip from '../Tooltip';
import Icon from '../Icon';
import {useCopyToClipboard} from '../../utils/hooks';
import {Variants} from '../PatternPage/PatternPage';

function Markdown(props: ComponentProps<typeof MDXRemote>) {
  // console.log('SCOPE', props.scope);
  return (
    <MDXRemote
      {...props}
      components={{
        h1: (props) => <HeadingWithCopyButton as="h1" {...props} />,
        h2: (props) => <HeadingWithCopyButton as="h2" {...props} />,
        h3: (props) => <HeadingWithCopyButton as="h3" {...props} />,
        h4: (props) => <HeadingWithCopyButton as="h4" {...props} />,
        h5: (props) => <HeadingWithCopyButton as="h5" {...props} />,
        h6: (props) => <HeadingWithCopyButton as="h6" {...props} />,
        ol: ({children}) => (
          <Stack as="ol" gap="2" className={[styles.List, styles.OrderedList]}>
            {children}
          </Stack>
        ),
        ul: ({children}) => (
          <Stack
            as="ul"
            className={[styles.List, styles.UnorderedList]}
            gap="2"
          >
            {children}
          </Stack>
        ),
        li: (props) => <Box as="li" className={styles.ListItem} {...props} />,
        p: (props) => <Box as="p" {...props} className={styles.Paragraph} />,
        hr: (props) => (
          <Box as="hr" {...props} className={styles.HorizontalRule} />
        ),
        strong: (props) => (
          <Box as="strong" {...props} className={styles.Strong} />
        ),
        img: ({src, alt, style}) =>
          src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              className={styles.Image}
              style={style}
            />
          ) : null,
        // `pre` is only for fenced code blocks, so we set the flag here which
        // is then passed to `code`
        pre: ({children}) =>
          cloneElement(
            React.Children.only(children) as React.ReactElement<any>,
            {fenced: true},
          ),
        // `code` could be an inline code element, or a fanced code block coming
        // from `pre`
        code: function MDXCode({
          children,
          className,
          // @ts-expect-error Unsure how to tell react-markdown this prop is
          // being injected by a plugin
          fenced,
          // @ts-expect-error Unsure how to tell react-markdown this prop is
          // being injected by a plugin
          meta,
        }) {
          let type,
            previewContext,
            sandboxContext,
            title,
            isCodeVisible,
            isActionsVisible;

          try {
            ({
              title,
              type,
              previewContext,
              sandboxContext,
              isCodeVisible,
              isActionsVisible,
            } = JSON.parse(meta ?? '{}'));
          } catch (error) {
            console.warn(`code block meta is not parsable JSON: ${meta}`);
          }

          const [showCode, setShowCode] = useState<boolean>(isCodeVisible);

          if (!fenced) {
            return (
              <InlineCode className={styles.InlineCode}>{children}</InlineCode>
            );
          }

          if (type === 'livePreview') {
            return (
              <PatternsExample
                example={{
                  code: (children as string) ?? '',
                  previewContext,
                  sandboxContext,
                }}
                isCodeVisible={showCode}
                isActionsVisible={isActionsVisible}
                onCodeVisibilityToggle={() => setShowCode(!showCode)}
                patternName={'Pattern Name'}
              />
            );
          }

          return (
            <Code
              code={{
                className,
                title: title ?? 'Example',
                code: (children as string)?.toString() ?? '',
              }}
            />
          );
        },
        table: (props) => (
          <Box className={styles.TableWrapper}>
            <Box as="table" {...props} className={styles.Table} />
          </Box>
        ),
        SideBySide,
        YoutubeVideo,
        DoDont,
        StatusBanner,
        TipBanner,
        Lede,
        RichCardGrid,
        Tip: ({children}) => (
          <div className="tip-banner">
            <div className="tip-banner__header">
              <div>
                <span className="Polaris-Icon Polaris-Icon--colorHighlight Polaris-Icon--applyColor">
                  <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden"></span>
                  <svg
                    viewBox="0 0 20 20"
                    className="Polaris-Icon__Svg"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-9 3a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0v2zm0-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
                    ></path>
                  </svg>
                </span>
              </div>{' '}
              <h4>Tip</h4>
            </div>
            {children}
          </div>
        ),
        ...props.components,
      }}
    />
  );
}

export const HeadingWithCopyButton = forwardRef(
  ({id, children, ...props}, ref) => {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://polaris.shopify.com';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const [copy, didJustCopy] = useCopyToClipboard(`${origin}${path}#${id}`);

    const copyButton =
      // remark-slug slugifies the header content before next-mdx-remote has a
      // chance to replace the global scope variables with their actual value,
      // resulting in an id of `frontmattertitle` for `# {frontmatter.title}`,
      // so we filter that case out here.
      !id || id.startsWith('frontmatter') ? null : (
        <Tooltip
          ariaLabel="Copy to clipboard"
          renderContent={() => <p>{didJustCopy ? 'Copied' : 'Copy'}</p>}
        >
          <button className={styles.MarkdownCopyButton} onClick={copy}>
            <Icon source={ClipboardMinor} width={16} height={16} />
          </button>
        </Tooltip>
      );

    return (
      <Heading
        as="h1"
        id={id}
        {...props}
        className={[styles.MarkdownHeading, styles[`Heading-${props.as}`]]}
        ref={ref}
      >
        {children}
        {copyButton}
      </Heading>
    );
  },
) as WithAsProp<{}, typeof Heading, 'h1'>;

HeadingWithCopyButton.displayName = 'Heading';

const patternComponents = {
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
    // @ts-expect-error Unsure how to tell react-markdown this prop is
    // being injected by a plugin
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
            code: (children as string) ?? '',
            previewContext,
            sandboxContext,
          }}
          isCodeVisible={showCode}
          onCodeVisibilityToggle={() => toggleCode(!showCode)}
          patternName={patternName ?? ''}
        />
      );
    }

    return <Code code={{title: '', code: (children as string) ?? ''}} />;
  },

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
  Variants: ({patternData}) => <Variants patternData={patternData} />,
};

export default Markdown;
