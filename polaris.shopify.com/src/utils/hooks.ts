import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {ParsedUrlQueryInput} from 'querystring';

const COPY_TO_CLIPBOARD_TIMEOUT = 2000;

export const useCopyToClipboard = (stringToCopy: string) => {
  const [didJustCopy, setDidJustCopy] = useState(false);

  const copy = () => {
    if (!didJustCopy) {
      setDidJustCopy(true);
      if (navigator) {
        navigator.clipboard.writeText(stringToCopy);
      }
      const timer = setTimeout(() => {
        setDidJustCopy(false);
      }, COPY_TO_CLIPBOARD_TIMEOUT);
      return () => clearTimeout(timer);
    }
  };

  return [copy, didJustCopy] as const;
};

export type TOCItem = {
  title: string;
  element: 'H2' | 'H3';
  id: string;
  children: TOCItem[];
};

export const useTOC = (children: React.ReactNode) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    let tocNodes: TOCItem[] = [];
    let currentNode: TOCItem | null = null;

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
  }, [children]);

  return [toc];
};

export function useMedia(media: string): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(media);

      setIsActive(mediaQueryList.matches);

      const listener = (evt: MediaQueryListEvent) => {
        setIsActive(evt.matches);
      };

      mediaQueryList.addEventListener('change', listener);

      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
  }, [media]);

  return isActive;
}

export function useQueryParams() {
  const router = useRouter();

  const setQueryParams = (queryParams: ParsedUrlQueryInput) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...queryParams,
        },
      },
      undefined,
      {shallow: true},
    );
  };

  return {
    routerIsReady: router.isReady,
    currentParams: {...router.query},
    setQueryParams,
  };
}
