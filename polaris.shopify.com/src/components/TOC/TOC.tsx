import {useEffect, useRef, useState} from 'react';
import {Box} from '../Box';
import {TOCItem} from '../../utils/hooks';
import {className as classNames} from '../../utils/various';
import styles from './TOC.module.scss';

interface Props {
  items: TOCItem[];
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

function TOC({items}: Props) {
  const isNested = !!items.find((item) => item.children.length > 0);
  const [idOfCurrentHeading, setIdOfCurrentHeading] = useState<string>();
  const temporarilyIgnoreScrolling = useRef(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    detectCurrentHeading();
    window.addEventListener('scroll', detectCurrentHeading);
    return () => window.removeEventListener('scroll', detectCurrentHeading);
  }, []);

  useEffect(() => detectCurrentHeading(), [items]);

  const Link = ({toId, linkText}: {toId: string; linkText: string}) => {
    const activeLink = toId === idOfCurrentHeading;
    const className = classNames(styles.Link, activeLink && styles.active);

    return (
      <a
        className={className}
        href={`#${toId}`}
        onClick={(evt) => {
          scrollIntoView(toId);
          evt.preventDefault();
        }}
      >
        {linkText}
      </a>
    );
  };

  return (
    <div className={classNames(styles.TOC, isNested && styles.isNested)}>
      <ul>
        <Box
          style={{
            paddingInlineStart: 'var(--p-space-2)',
            paddingInlineEnd: 'var(--p-space-2)',
            paddingBlockEnd: 'var(--p-space-2)',
          }}
        >
          <h2 className={styles.Header}>On this page</h2>
        </Box>
        {items.map(({title, id, children}) => {
          return (
            <li key={title} className={styles.Item}>
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
