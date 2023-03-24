'use client';

import {useEffect, useState} from 'react';
import {TOCItem} from '@/types';
import {className} from '@/utils';
import styles from './TOC.module.scss';

export const useTOC = (children: React.ReactNode) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    let tocNodes: TOCItem[] = [];
    let currentNode: TOCItem | null = null;

    window.requestAnimationFrame(() => {
      const headings =
        document.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]');
      headings.forEach((el, i) => {
        const id = el.getAttribute('id');
        if (typeof el.textContent === 'string' && id) {
          if (currentNode === null) {
            if (el.tagName === 'H2') {
              currentNode = {
                title: el.textContent,
                id,
                element: 'H2',
                children: [],
              };
            }
          } else {
            if (el.tagName === 'H2') {
              tocNodes.push(currentNode);
              currentNode = {
                title: el.textContent,
                id,
                element: 'H2',
                children: [],
              };
            } else if (el.tagName === 'H3') {
              if (currentNode.element === 'H2') {
                if (el.closest('.usage-list') === null) {
                  currentNode.children.push({
                    title: el.textContent,
                    id,
                    element: 'H3',
                    children: [],
                  });
                }
              }
            }
          }
          const isLastIterationOfLoop = i === headings.length - 1;
          if (isLastIterationOfLoop) {
            if (currentNode !== null) {
              tocNodes.push(currentNode);
            }
          }
        }
      });

      setToc(tocNodes);
    });
  }, [children]);

  return toc;
};

function scanPageForCurrentHeading(): string | void {
  // const contentTopMargin = getContentTopMargin();
  const contentTopMargin = 0;
  const headings = document.querySelectorAll('main h2, main h3');
  let currentHeading: Element | null = null;

  // Scan the headings from the bottom. The heading that comes first
  // after the "content top margin" is the current heading.
  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    const {top} = heading.getBoundingClientRect();
    currentHeading = heading;
    if (top <= contentTopMargin + 1) {
      break;
    }
  }

  if (!currentHeading && headings.length > 0) {
    currentHeading = headings[0];
  }

  if (currentHeading) {
    const id = currentHeading.getAttribute('id');
    if (id) {
      return id;
    }
  }
}

interface Props {
  pageId: string;
}

function TOC({pageId}: Props) {
  const items = useTOC(pageId);
  const isNested = !!items.find((item) => item.children.length > 0);
  const [idOfCurrentHeading, setIdOfCurrentHeading] = useState<string>();

  function detectCurrentHeading() {
    const id = scanPageForCurrentHeading();
    if (id) {
      setIdOfCurrentHeading(id);
    }
  }

  useEffect(() => {
    detectCurrentHeading();
    window.addEventListener('scroll', detectCurrentHeading);
    return () => window.removeEventListener('scroll', detectCurrentHeading);
  }, []);

  useEffect(() => detectCurrentHeading(), [items]);

  const Link = ({toId, linkText}: {toId: string; linkText: string}) => (
    <a href={`#${toId}`} data-is-current={toId === idOfCurrentHeading}>
      {linkText}
    </a>
  );

  if (items.length < 2) return null;

  return (
    <div className={className(styles.TOC, isNested && styles.isNested)}>
      <ul>
        {items.map(({title, id, children}) => {
          return (
            <li key={title}>
              <Link toId={id} linkText={title} />
              {children.length > 0 && (
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.title}>
                        <Link toId={child.id} linkText={child.title} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TOC;
