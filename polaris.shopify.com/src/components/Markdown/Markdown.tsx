import React, {cloneElement, useState, type ComponentProps} from 'react';
import {MDXRemote} from 'next-mdx-remote';

import styles from './Markdown.module.scss';
import Code, {InlineCode} from '../../components/Code';
import {Box} from '../../components/Box';
import {Stack} from '../../components/Stack';
import StatusBanner from '../../components/StatusBanner';
import {Lede} from '../../components/Lede';
import UpdateBanner from '../../components/UpdateBanner';
import {SideBySide} from './components/SideBySide';
import {DoDont} from './components/DoDont';
import {Heading} from '../../components/Heading';
import PatternsExample from '../../components/PatternsExample';
import WhatsNewListing from '../WhatsNewListing';

function Markdown(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{
        h1: ({id, children}) => (
          <Heading as="h1" id={id} className={styles.Heading1}>
            {children}
          </Heading>
        ),
        h2: ({id, children}) => (
          <Heading as="h2" id={id} className={styles.Heading2}>
            {children}
          </Heading>
        ),
        h3: ({id, children}) => (
          <Heading as="h3" id={id} className={styles.Heading3}>
            {children}
          </Heading>
        ),
        h4: ({id, children}) => (
          <Heading as="h4" id={id} className={styles.Heading4}>
            {children}
          </Heading>
        ),
        h5: ({id, children}) => (
          <Heading as="h5" id={id} className={styles.Heading5}>
            {children}
          </Heading>
        ),
        h6: ({id, children}) => (
          <Heading as="h6" id={id} className={styles.Heading5}>
            {children}
          </Heading>
        ),
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
        DoDont,
        StatusBanner,
        UpdateBanner,
        Lede,
        WhatsNewListing: ({posts}) => <WhatsNewListing posts={posts} />,
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

interface HeadingWithCopyButtonProps {
  id: string;
  level: number;
  children: React.ReactNode;
}

function HeadingWithCopyButton({
  id,
  level,
  children,
}: HeadingWithCopyButtonProps) {
  const Element = `h${level}` as 'h2' | 'h3';
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://polaris.shopify.com';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const [copy, didJustCopy] = useCopyToClipboard(`${origin}${path}#${id}`);

  return (
    <Element id={id} className={styles.MarkdownHeading}>
      {children}
      <Tooltip
        ariaLabel="Copy to clipboard"
        renderContent={() => <p>{didJustCopy ? 'Copied' : 'Copy'}</p>}
      >
        <button className={styles.MarkdownCopyButton} onClick={copy}>
          <Icon source={ClipboardMinor} width={16} height={16} />
        </button>
      </Tooltip>
    </Element>
  );
}

export default Markdown;
