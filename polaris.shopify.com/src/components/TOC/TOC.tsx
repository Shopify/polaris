import {useEffect, useRef, useState} from 'react';
import {Box} from '../Box';
import {TOCItem} from '../../utils/hooks';
import {className as classNames} from '../../utils/various';
import styles from './TOC.module.scss';
import {motion, AnimatePresence} from 'framer-motion';

interface Props {
  items: TOCItem[];
  collapsibleTOC?: boolean;
}

function getContentTopMargin(): number {
  const rootStyles = getComputedStyle(document.documentElement);
  const headerHeight = rootStyles.getPropertyValue('--header-height');
  const headerThreshold = parseInt(headerHeight);
  return headerThreshold;
}

function scanPageForCurrentHeading(): string | void {
  const contentTopMargin = getContentTopMargin();
  const headings = document.querySelectorAll('#main h2, #main h3');
  let currentHeading: Element | null = null;

  // Scan the headings from the bottom. The heading that comes first
  // after the "content top margin" is the current heading.
  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i];
    const {top} = heading.getBoundingClientRect();
    currentHeading = heading;
    if (top < contentTopMargin) {
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

function TOC({items, collapsibleTOC = false}: Props) {
  const isNested = !!items.find((item) => item.children.length > 0);
  const [idOfCurrentHeading, setIdOfCurrentHeading] = useState<string>();
  const temporarilyIgnoreScrolling = useRef(false);
  const lastScrollY = useRef(0);

  const [manuallyExpandedSections, setManuallyExpandedSections] = useState<{
    [id: string]: boolean;
  }>({});

  const manuallyToggleSection = (id: string, expanded: boolean) => {
    setManuallyExpandedSections({
      ...manuallyExpandedSections,
      [id]: expanded,
    });
  };

  function waitForScrollToStop() {
    function checkIfStillScrolling() {
      if (lastScrollY.current !== window.scrollY) {
        // Don't check too often (e.g. using animationFrame)
        // because the scrollY diff between frames might be
        // less than 1 if rounded.
        setTimeout(checkIfStillScrolling, 100);
      } else {
        temporarilyIgnoreScrolling.current = false;
      }
      lastScrollY.current = window.scrollY;
    }
    // Give browser some time to start scrolling
    setTimeout(checkIfStillScrolling, 100);
  }

  function scrollIntoView(id: string) {
    setIdOfCurrentHeading(id);
    const contentTopMargin = getContentTopMargin();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const {top: distanceFromViewportTop} = targetEl.getBoundingClientRect();
      let newScrollY =
        window.scrollY + distanceFromViewportTop - contentTopMargin + 1;

      const isAlmostAtTheTopOfThePage = newScrollY < contentTopMargin * 1.25;
      if (isAlmostAtTheTopOfThePage) {
        newScrollY = 0;
      }

      history.pushState({}, '', `#${id}`);

      temporarilyIgnoreScrolling.current = true;
      window.scrollTo({top: newScrollY, behavior: 'smooth'});
      waitForScrollToStop();
    }
  }

  function detectCurrentHeading() {
    if (temporarilyIgnoreScrolling.current) return;
    const id = scanPageForCurrentHeading();
    if (id) {
      setIdOfCurrentHeading(id);
    }
  }

  function detectLinkVisibility(linkElement: HTMLAnchorElement) {
    if (!linkElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log({entry});
        if (!entry.isIntersecting) {
          // scroll.
          console.log('not intersecting');
          return;
        } else {
          console.log('intersecting');
          return;
        }
      });
      observer.disconnect();
    });

    observer.observe(linkElement);
  }

  useEffect(() => {
    detectCurrentHeading();
    window.addEventListener('scroll', detectCurrentHeading);
    return () => window.removeEventListener('scroll', detectCurrentHeading);
  }, []);

  if (idOfCurrentHeading) {
    const currentHeadingLinkElement = document.getElementById(
      `${idOfCurrentHeading}-link`,
    );
    detectLinkVisibility(currentHeadingLinkElement);
  }

  useEffect(() => detectCurrentHeading(), [items]);

  const Link = ({
    toId,
    linkText,
    collapsibleButton,
  }: {
    toId: string;
    linkText: string;
    collapsibleButton?: React.ReactNode;
  }) => {
    const activeLink = toId === idOfCurrentHeading;
    const className = classNames(styles.Link, activeLink && styles.active);

    return (
      <a
        id={`${toId}-link`}
        className={className}
        href={`#${toId}`}
        onClick={(evt) => {
          scrollIntoView(toId);
          evt.preventDefault();
        }}
      >
        <span
          className={classNames(
            Boolean(collapsibleButton) && styles.TOCItemMaxWidth,
          )}
        >
          {linkText}
        </span>
        {collapsibleButton}
      </a>
    );
  };

  return (
    <div className={classNames(styles.TOC, isNested && styles.isNested)}>
      <ul>
        <Box
          style={{
            paddingInlineStart: 'var(--p-space-200)',
            paddingInlineEnd: 'var(--p-space-200)',
            paddingBlockEnd: 'var(--p-space-200)',
          }}
        >
          <h2 className={styles.Header}>On this page</h2>
        </Box>
        {items.map(({title, id, children}) => {
          const isExpanded = manuallyExpandedSections[id] === true;
          const tocAriaId = `toc-${id}`;

          return (
            <li key={title} className={styles.Item}>
              <Link
                toId={id}
                linkText={title}
                collapsibleButton={
                  children.length > 0 && collapsibleTOC ? (
                    <button
                      className={styles.Toggle}
                      onClick={(evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        manuallyToggleSection(id, !isExpanded);
                      }}
                      aria-label="Toggle section"
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? tocAriaId : undefined}
                    />
                  ) : null
                }
              />
              <AnimatePresence initial={false}>
                {children.length > 0 && (isExpanded || !collapsibleTOC) && (
                  <motion.ul
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, scale: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{ease: 'easeInOut', duration: 0.15}}
                    id={tocAriaId}
                  >
                    {children.map((child) => {
                      return (
                        <li key={child.title}>
                          <Link toId={child.id} linkText={child.title} />
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TOC;
