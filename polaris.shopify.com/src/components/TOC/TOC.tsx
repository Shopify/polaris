import {useEffect, useState} from 'react';
import {TOCItem} from '../../utils/hooks';
import {className} from '../../utils/various';
import styles from './TOC.module.scss';

interface Props {
  items: TOCItem[];
}

function getContentTopMargin(): number {
  const rootStyles = getComputedStyle(document.documentElement);
  const headerHeight = rootStyles.getPropertyValue('--header-height');
  const headerMargin = rootStyles.getPropertyValue('--header-margin');
  const headerThreshold = parseInt(headerHeight) + parseInt(headerMargin) + 1;
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
