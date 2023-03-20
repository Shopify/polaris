import React, {type ComponentProps} from 'react';
import {MDXRemote} from 'next-mdx-remote';

import styles from './Markdown.module.scss';
import Code from '../Code';
import StatusBanner from '../../components/StatusBanner';
import {Lede} from '../../components/Lede';
import UpdateBanner from '../../components/UpdateBanner';
import {SideBySide} from './components/SideBySide';
import {DoDont} from './components/DoDont';
import {Heading} from '../../components/Heading';

function Markdown(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{
        h1: ({id, children}) => (
          <Heading as="h1" id={id}>
            {children}
          </Heading>
        ),
        h2: ({id, children}) => (
          <Heading as="h2" id={id}>
            {children}
          </Heading>
        ),
        h3: ({id, children}) => (
          <Heading as="h3" id={id}>
            {children}
          </Heading>
        ),
        h4: ({id, children}) => (
          <Heading as="h4" id={id}>
            {children}
          </Heading>
        ),
        h5: ({id, children}) => (
          <Heading as="h5" id={id}>
            {children}
          </Heading>
        ),
        h5: ({id, children}) => (
          <Heading as="h5" id={id}>
            {children}
          </Heading>
        ),
        img: ({src, alt}) =>
          src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ''} className={styles.MarkdownImage} />
          ) : null,
        pre: ({children, className}) => (
          <Code
            code={{
              className,
              title: 'Example',
              code: children?.toString() ?? '',
            }}
          />
        ),
        table: ({children}) => (
          <div className="table-wrapper">
            <table>{children}</table>
          </div>
        ),
        SideBySide,
        DoDont,
        StatusBanner,
        UpdateBanner,
        Lede,
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

export default Markdown;
