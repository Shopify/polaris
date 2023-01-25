import styles from './PatternPage.module.scss';
import React, {Fragment} from 'react';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';
import Image from 'next/image';
import Markdown from '../Markdown';
import {Stack} from '../Stack';
import {Box} from '../Box';
// @ts-expect-error Can't extract the special types out of react-markdown for
// some reason.
const isEmptyTr = ({node}) =>
  !Array.isArray(node.children) ||
  node.children.every(
    // @ts-expect-error Can't extract the special types out of react-markdown
    // for some reason.
    (child) => !Array.isArray(child.children) || child.children.length === 0,
  );

export const HowItHelps = ({children}: {children: string}) => (
  <Markdown
    remarkPlugins={[
      remarkUnwrapImages,
      remarkDefinitionList,
      remarkDirective,
      remarkDirectiveRehype,
    ]}
    // @ts-expect-error incompatible type to remark-rehype in remark-definition-list package.
    remarkRehypeOptions={{handlers: defListHastHandlers}}
    components={{
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      ol: (props) => <Stack as="ol" gap="2" {...props} />,
      li: (props) => <li {...props} />,
      dl: (props) => (
        <Box as="dl" className={styles.DefinitionList}>
          {props.children}
        </Box>
      ),
      dt: (props) => <dt>{props.children}</dt>,
      dd: (props) => <dd>{props.children}</dd>,
      // @ts-expect-error react-markdown doesn't know about the extra data
      customtable: ({children, ...props}) => {
        return <div className={styles.CustomTable}>{children}</div>;
      },
      strong: ({children}) => (
        <Box as="strong" style={{fontWeight: 'var(--font-weight-700)'}}>
          {children}
        </Box>
      ),
    }}
  >
    {children}
  </Markdown>
);

export const UsefulToKnow = ({children}: {children: string}) => (
  <Markdown
    remarkPlugins={[remarkUnwrapImages, remarkDirective, remarkDirectiveRehype]}
    components={{
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      ol: (props) => <Stack as="ol" gap="2" {...props} />,
      li: (props) => <li {...props} />,
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
      tr: (props) =>
        // remark-directive is inserting extra, blank trs for some reason
        isEmptyTr(props) ? null : (
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
      strong: ({children}) => (
        <Box as="strong" style={{fontWeight: 'var(--font-weight-700)'}}>
          {children}
        </Box>
      ),
    }}
  >
    {children}
  </Markdown>
);
