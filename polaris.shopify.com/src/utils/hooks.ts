import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { slugify } from "./various";

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
  name: string;
  element: "H2" | "H3";
  children: TOCItem[];
};

export const useTOC = (children: React.ReactNode) => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    let tocNodes: TOCItem[] = [];
    let currentNode: TOCItem | null = null;

    const headings = document.querySelectorAll<HTMLHeadingElement>("h2,h3");
    headings.forEach((el, i) => {
      if (currentNode === null) {
        if (el.tagName === "H2") {
          if (typeof el.textContent === "string") {
            currentNode = {
              name: el.textContent,
              element: "H2",
              children: [],
            };
          }
        }
      } else {
        if (el.tagName === "H2") {
          if (typeof el.textContent === "string") {
            tocNodes.push(currentNode);
            currentNode = {
              name: el.textContent,
              element: "H2",
              children: [],
            };
          }
        } else if (el.tagName === "H3") {
          if (typeof el.textContent === "string") {
            if (currentNode.element === "H2") {
              if (el.closest(".usage-list") === null) {
                currentNode.children.push({
                  name: el.textContent,
                  element: "H3",
                  children: [],
                });
              }
            }
          }
        }
        if (i === headings.length - 1) {
          tocNodes.push(currentNode);
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
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(media);

      setIsActive(mediaQueryList.matches);

      const listener = (evt: MediaQueryListEvent) => {
        setIsActive(evt.matches);
      };

      mediaQueryList.addEventListener("change", listener);

      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    }
  }, [media]);

  return isActive;
}
