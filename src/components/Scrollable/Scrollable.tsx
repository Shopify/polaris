import * as React from 'react';
import debounce from 'lodash/debounce';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {closest} from '@shopify/javascript-utilities/dom';
import {classNames} from '@shopify/react-utilities/styles';
import {withSticky, WithAppProviderProps} from '../AppProvider';
import {scrollable} from '../shared';
import {contextTypes} from './types';

import {ScrollTo} from './components';

import styles from './Scrollable.scss';

const MAX_SCROLL_DISTANCE = 100;
const DELTA_THRESHOLD = 0.2;
const DELTA_PERCENTAGE = 0.2;
const EVENTS_TO_LOCK = ['scroll', 'touchmove', 'wheel'];
const PREFERS_REDUCED_MOTION = prefersReducedMotion();

export interface Props extends React.HTMLProps<HTMLDivElement> {
  /** Content to display in scrollable area */
  children?: React.ReactNode;
  /** Scroll content vertically */
  vertical?: boolean;
  /** Scroll content horizontally */
  horizontal?: boolean;
  /** Add a shadow when content is scrollable */
  shadow?: boolean;
  /** Slightly hints content upon mounting when scrollable */
  hint?: boolean;
  /** Called when scrolled to the bottom of the scroll area */
  onScrolledToBottom?(): void;
}

export interface State {
  topShadow: boolean;
  bottomShadow: boolean;
  scrollPosition: number;
}

export interface Context {
  scrollToPosition(scrollY: number): void;
}

export type CombinedProps = Props & WithAppProviderProps;
class Scrollable extends React.Component<CombinedProps, State> {
  static childContextTypes = contextTypes;
  static ScrollTo = ScrollTo;

  static forNode(node: HTMLElement): HTMLElement | Document {
    return (
      (closest(node, scrollable.selector) as HTMLElement | null) || document
    );
  }

  state: State = {
    topShadow: false,
    bottomShadow: false,
    scrollPosition: 0,
  };

  private scrollArea: HTMLElement | null;

  private handleResize = debounce(
    () => {
      this.handleScroll();
    },
    50,
    {trailing: true},
  );

  getChildContext(): Context {
    return {
      scrollToPosition: this.scrollToPosition,
    };
  }

  componentDidMount() {
    const {polaris} = this.props;
    if (this.scrollArea == null) {
      return;
    }
    polaris.stickyManager.setContainer(this.scrollArea);
    addEventListener(this.scrollArea, 'scroll', () => {
      window.requestAnimationFrame(this.handleScroll);
    });
    addEventListener(window, 'resize', this.handleResize);
    window.requestAnimationFrame(() => {
      this.handleScroll();
      if (this.props.hint) {
        this.scrollHint();
      }
    });
  }

  componentWillUnmount() {
    const {polaris} = this.props;
    if (this.scrollArea == null) {
      return;
    }
    removeEventListener(this.scrollArea, 'scroll', this.handleScroll);
    removeEventListener(window, 'resize', this.handleResize);
    polaris.stickyManager.removeScrollListener();
  }

  componentDidUpdate() {
    const {scrollPosition} = this.state;
    if (scrollPosition && this.scrollArea && scrollPosition > 0) {
      this.scrollArea.scrollTop = scrollPosition;
    }
  }

  render() {
    const {topShadow, bottomShadow} = this.state;
    const {
      children,
      className,
      horizontal,
      vertical = true,
      shadow,
      hint,
      onScrolledToBottom,
      polaris,
      ...rest
    } = this.props;

    const finalClassName = classNames(
      className,
      styles.Scrollable,
      vertical && styles.vertical,
      horizontal && styles.horizontal,
      topShadow && styles.hasTopShadow,
      bottomShadow && styles.hasBottomShadow,
    );

    return (
      <div
        className={finalClassName}
        {...scrollable.props}
        {...rest}
        ref={this.setScrollArea}
      >
        {children}
      </div>
    );
  }

  private setScrollArea = (scrollArea: HTMLElement | null) => {
    this.scrollArea = scrollArea;
  };

  private handleScroll = () => {
    const {scrollArea} = this;
    const {shadow, onScrolledToBottom} = this.props;
    if (scrollArea == null) {
      return;
    }
    const {scrollTop, clientHeight, scrollHeight} = scrollArea;
    const shouldBottomShadow = Boolean(
      shadow && !(scrollTop + clientHeight >= scrollHeight),
    );
    const shouldTopShadow = Boolean(shadow && scrollTop > 0);

    const canScroll = scrollHeight > clientHeight;
    const hasScrolledToBottom = scrollHeight - scrollTop === clientHeight;

    if (canScroll && hasScrolledToBottom && onScrolledToBottom) {
      onScrolledToBottom();
    }

    this.setState({
      topShadow: shouldTopShadow,
      bottomShadow: shouldBottomShadow,
      scrollPosition: scrollTop,
    });
  };

  private scrollHint = () => {
    const {scrollArea} = this;
    if (scrollArea == null) {
      return;
    }
    const {clientHeight, scrollHeight} = scrollArea;
    if (
      PREFERS_REDUCED_MOTION ||
      this.state.scrollPosition > 0 ||
      scrollHeight <= clientHeight
    ) {
      return;
    }

    const scrollDistance = scrollHeight - clientHeight;
    this.toggleLock();
    this.setState(
      {
        scrollPosition:
          scrollDistance > MAX_SCROLL_DISTANCE
            ? MAX_SCROLL_DISTANCE
            : scrollDistance,
      },
      () => {
        window.requestAnimationFrame(this.scrollStep);
      },
    );
  };

  private scrollStep = () => {
    this.setState(
      ({scrollPosition}) => {
        const delta = scrollPosition * DELTA_PERCENTAGE;
        return {
          scrollPosition: delta < DELTA_THRESHOLD ? 0 : scrollPosition - delta,
        };
      },
      () => {
        if (this.state.scrollPosition > 0) {
          window.requestAnimationFrame(this.scrollStep);
        } else {
          this.toggleLock(false);
        }
      },
    );
  };

  private toggleLock(shouldLock = true) {
    const {scrollArea} = this;
    if (scrollArea == null) {
      return;
    }

    EVENTS_TO_LOCK.forEach((eventName) => {
      if (shouldLock) {
        addEventListener(scrollArea, eventName, prevent);
      } else {
        removeEventListener(scrollArea, eventName, prevent);
      }
    });
  }

  private scrollToPosition = (scrollY: number) => {
    this.setState({scrollPosition: scrollY});
  };
}

function prevent(evt: Event) {
  evt.preventDefault();
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

export default withSticky()(Scrollable);
