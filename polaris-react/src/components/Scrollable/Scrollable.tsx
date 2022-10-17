import React, {useEffect, useRef, useState, useCallback} from 'react';

import {debounce} from '../../utilities/debounce';
import {classNames} from '../../utilities/css';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {scrollable} from '../shared';

import {ScrollTo} from './components';
import {ScrollableContext} from './context';
import styles from './Scrollable.scss';

const MAX_SCROLL_HINT_DISTANCE = 100;
const LOW_RES_BUFFER = 2;

export interface ScrollableProps extends React.HTMLProps<HTMLDivElement> {
  /** Content to display in scrollable area */
  children?: React.ReactNode;
  /** Scroll content vertically
   * @default true
   * */
  vertical?: boolean;
  /** Scroll content horizontally
   * @default true
   * */
  horizontal?: boolean;
  /** Add a shadow when content is scrollable */
  shadow?: boolean;
  /** Slightly hints content upon mounting when scrollable */
  hint?: boolean;
  /** Adds a tabIndex to scrollable when children are not focusable */
  focusable?: boolean;
  /** Called when scrolled to the bottom of the scroll area */
  onScrolledToBottom?(): void;
}

export function Scrollable({
  children,
  className,
  horizontal = true,
  vertical = true,
  shadow,
  hint,
  focusable,
  onScrolledToBottom,
  ...rest
}: ScrollableProps) {
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);
  const stickyManager = useRef(new StickyManager());
  const scrollArea = useRef<HTMLDivElement>(null);
  const scrollTo = useCallback((scrollY: number) => {
    scrollArea.current?.scrollTo({top: scrollY, behavior: 'smooth'});
  }, []);

  useEffect(() => {
    if (hint) {
      performScrollHint(scrollArea.current);
    }
  }, [hint]);

  useEffect(() => {
    const currentScrollArea = scrollArea.current;

    if (!currentScrollArea) {
      return;
    }

    const handleScroll = () => {
      const {scrollTop, clientHeight, scrollHeight} = currentScrollArea;

      setBottomShadow(
        Boolean(shadow && !(scrollTop + clientHeight >= scrollHeight)),
      );
      setTopShadow(Boolean(shadow && scrollTop > 0));
    };

    const handleResize = debounce(handleScroll, 50, {trailing: true});

    stickyManager.current?.setContainer(currentScrollArea);
    currentScrollArea.addEventListener('scroll', handleScroll);
    globalThis.addEventListener('resize', handleResize);

    handleScroll();

    return () => {
      currentScrollArea.removeEventListener('scroll', handleScroll);
      globalThis.removeEventListener('resize', handleResize);
    };
  }, [shadow]);

  const finalClassName = classNames(
    className,
    styles.Scrollable,
    vertical && styles.vertical,
    horizontal && styles.horizontal,
    topShadow && styles.hasTopShadow,
    bottomShadow && styles.hasBottomShadow,
  );

  return (
    <ScrollableContext.Provider value={scrollTo}>
      <StickyManagerContext.Provider value={stickyManager.current}>
        <div
          className={finalClassName}
          {...scrollable.props}
          {...rest}
          ref={scrollArea}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={focusable ? 0 : undefined}
        >
          {children}
        </div>
      </StickyManagerContext.Provider>
    </ScrollableContext.Provider>
  );
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function performScrollHint(elem?: HTMLDivElement | null) {
  if (!elem || prefersReducedMotion()) {
    return;
  }

  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek =
    Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

  const goBackToTop = () => {
    if (elem.scrollTop >= distanceToPeek) {
      elem.removeEventListener('scroll', goBackToTop);
      elem.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({top: MAX_SCROLL_HINT_DISTANCE, behavior: 'smooth'});
}

Scrollable.ScrollTo = ScrollTo;

Scrollable.forNode = (node: HTMLElement): HTMLElement | Document => {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};
