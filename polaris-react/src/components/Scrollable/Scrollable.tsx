import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  NamedExoticComponent,
} from 'react';

import {debounce} from '../../utilities/debounce';
import {classNames} from '../../utilities/css';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {scrollable} from '../shared';
import {useLazyRef} from '../../utilities/use-lazy-ref';
import {useComponentDidMount} from '../../utilities/use-component-did-mount';

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

export interface ScrollToOptions {
  behavior?: 'instant' | 'smooth' | 'auto';
}

export interface ScrollableRef {
  scrollTo: (scrollY: number, options: ScrollToOptions) => void;
}

export const Scrollable = forwardRef<ScrollableRef, ScrollableProps>(
  (
    {
      children,
      className,
      horizontal = true,
      vertical = true,
      shadow,
      hint,
      focusable,
      onScrolledToBottom,
      ...rest
    }: ScrollableProps,
    forwardedRef,
  ) => {
    const [topShadow, setTopShadow] = useState(false);
    const [bottomShadow, setBottomShadow] = useState(false);
    const stickyManager = useLazyRef(() => new StickyManager());
    const scrollArea = useRef<HTMLDivElement>(null);

    const scrollTo = useCallback(
      (scrollY: number, options: ScrollToOptions = {}) => {
        const optionsBehavior = options.behavior || 'smooth';
        const behavior = prefersReducedMotion() ? 'auto' : optionsBehavior;
        // @ts-expect-error TS removed "instant" option but browsers support it.
        scrollArea.current?.scrollTo({top: scrollY, behavior});
      },
      [],
    );

    const defaultRef = useRef();
    useImperativeHandle(forwardedRef || defaultRef, () => ({scrollTo}));

    const handleScroll = useCallback(() => {
      const currentScrollArea = scrollArea.current;

      if (!currentScrollArea) {
        return;
      }

      requestAnimationFrame(() => {
        const {scrollTop, clientHeight, scrollHeight} = currentScrollArea;
        const canScroll = Boolean(scrollHeight > clientHeight);
        const isBelowTopOfScroll = Boolean(scrollTop > 0);
        const isAtBottomOfScroll = Boolean(
          scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER,
        );

        setTopShadow(isBelowTopOfScroll);
        setBottomShadow(!isAtBottomOfScroll);

        if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
          onScrolledToBottom();
        }
      });
    }, [onScrolledToBottom]);

    useComponentDidMount(() => {
      handleScroll();

      if (hint) {
        requestAnimationFrame(() => performScrollHint(scrollArea.current));
      }
    });

    useEffect(() => {
      const currentScrollArea = scrollArea.current;

      if (!currentScrollArea) {
        return;
      }

      const handleResize = debounce(handleScroll, 50, {trailing: true});

      stickyManager.current?.setContainer(currentScrollArea);
      currentScrollArea.addEventListener('scroll', handleScroll);
      globalThis.addEventListener('resize', handleResize);

      return () => {
        currentScrollArea.removeEventListener('scroll', handleScroll);
        globalThis.removeEventListener('resize', handleResize);
      };
    }, [stickyManager, handleScroll]);

    const finalClassName = classNames(
      className,
      styles.Scrollable,
      vertical && styles.vertical,
      horizontal && styles.horizontal,
      shadow && topShadow && styles.hasTopShadow,
      shadow && bottomShadow && styles.hasBottomShadow,
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
  },
) as NamedExoticComponent<ScrollableProps> & {
  ScrollTo: typeof ScrollTo;
  forNode: typeof forNode;
};

Scrollable.displayName = 'Scrollable';

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
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener('scroll', goBackToTop);
        elem.scrollTo({top: 0, behavior: 'smooth'});
      }
    });
  };

  elem.addEventListener('scroll', goBackToTop);
  elem.scrollTo({top: MAX_SCROLL_HINT_DISTANCE, behavior: 'smooth'});
}

const forNode = (node: HTMLElement): HTMLElement | Document => {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};

Scrollable.ScrollTo = ScrollTo;
Scrollable.forNode = forNode;
