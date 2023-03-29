import ReactMarkdown from 'react-markdown';
import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Code from '@/components/Code';
import Link from 'next/link';
import Pill from '../Pill';
import {pagesWithIcons} from '@/types';
import {HEADING_ANCHOR_LINK_TEXT} from '@/config';

interface Props {
  children: string;
  strip?: boolean;
}

function Markdown({strip, children: text}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, {tablePipeAlign: true}]]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={
        strip
          ? {
              br: () => <></>,
              hr: () => <></>,
              a: ({children}) => <>{children}</>,
            }
          : {
              h2: ({children, id}) => (
                <h2 id={id}>
                  {children}{' '}
                  <a data-anchor="true" href={`#${id}`}>
                    {HEADING_ANCHOR_LINK_TEXT}
                  </a>
                </h2>
              ),
              h3: ({children, id}) => (
                <h3 id={id}>
                  {children}{' '}
                  <a data-anchor="true" href={`#${id}`}>
                    {HEADING_ANCHOR_LINK_TEXT}
                  </a>
                </h3>
              ),
              img: ({src, alt, style}) =>
                src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={alt ?? ''} style={style} />
                ) : null,
              code: ({inline, children, className}) =>
                inline ? (
                  <code>{children}</code>
                ) : (
                  <Code
                    snippets={[
                      {
                        id: 'example',
                        label: 'Example',
                        language: 'typescript',
                        code: children.toString(),
                      },
                    ]}
                  />
                ),
              table: ({children}) => (
                <div className="table-wrapper">
                  <table>{children}</table>
                </div>
              ),
              br: () => <></>,
              hr: () => <></>,
              a: ({children, href}) => {
                if (href) {
                  const firstSegment = href
                    .replace('https://polaris.shopify.com', '')
                    .split('/')[1];
                  if (pagesWithIcons.includes(firstSegment)) {
                    return (
                      <Pill
                        href={href}
                        label={children.toString()}
                        style={firstSegment}
                      ></Pill>
                    );
                  }
                }
                return <Link href={href || ''}>{children}</Link>;
              },
            }
      }
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
