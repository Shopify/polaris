import React, {PureComponent, Children, createRef} from 'react';
import {themeDefault} from '@shopify/polaris-tokens';

import {findFirstKeyboardFocusableNode} from '../../../../utilities/focus';
import {classNames, variationName} from '../../../../utilities/css';
import {
  isElementOfType,
  wrapWithComponent,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {overlay} from '../../../shared';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';
import {KeypressListener} from '../../../KeypressListener';
import {PositionedOverlay} from '../../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../../PositionedOverlay';
import {Pane} from '../Pane';
import type {PaneProps} from '../Pane';
import styles from '../../Popover.module.css';
import {PortalsManagerContext} from '../../../../utilities/portals';
import type {PortalsContainerElement} from '../../../../utilities/portals';

export enum PopoverCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface PopoverOverlayProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluidContent?: boolean;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  preferInputActivator?: PositionedOverlayProps['preferInputActivator'];
  sectioned?: boolean;
  fixed?: boolean;
  hideOnPrint?: boolean;
  onClose(source: PopoverCloseSource): void;
  autofocusTarget?: PopoverAutofocusTarget;
  preventCloseOnChildOverlayClick?: boolean;
  captureOverscroll?: boolean;
}

interface State {
  transitionStatus: TransitionStatus;
}

export class PopoverOverlay extends PureComponent<PopoverOverlayProps, State> {
  static contextType = PortalsManagerContext;
  context!: React.ContextType<typeof PortalsManagerContext>;

  state: State = {
    transitionStatus: this.props.active
      ? TransitionStatus.Entering
      : TransitionStatus.Exited,
  };

  private contentNode = createRef<HTMLDivElement>();
  private enteringTimer?: number;
  private overlayRef: React.RefObject<PositionedOverlay>;

  constructor(props: PopoverOverlayProps) {
    super(props);
    this.overlayRef = createRef();
  }

  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }

  changeTransitionStatus(transitionStatus: TransitionStatus, cb?: () => void) {
    this.setState({transitionStatus}, cb);
    // Forcing a reflow to enable the animation
    this.contentNode.current &&
      this.contentNode.current.getBoundingClientRect();
  }

  componentDidMount() {
    if (this.props.active) {
      this.focusContent();

      this.changeTransitionStatus(TransitionStatus.Entered);
    }
  }

  componentDidUpdate(oldProps: PopoverOverlayProps) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entering, () => {
        this.clearTransitionTimeout();
        this.enteringTimer = window.setTimeout(() => {
          this.setState({transitionStatus: TransitionStatus.Entered});
          // Important: This will not update when the active theme changes.
          // Update this to `useTheme` once converted to a function component.
        }, parseInt(themeDefault.motion['motion-duration-100'], 10));
      });
    }

    if (!this.props.active && oldProps.active) {
      this.clearTransitionTimeout();
      this.setState({transitionStatus: TransitionStatus.Exited});
    }
  }

  componentWillUnmount() {
    this.clearTransitionTimeout();
  }

  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      preferInputActivator = true,
      fixed,
      zIndexOverride,
    } = this.props;
    const {transitionStatus} = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active) return null;

    const className = classNames(
      styles.PopoverOverlay,
      transitionStatus === TransitionStatus.Entering &&
        styles['PopoverOverlay-entering'],
      transitionStatus === TransitionStatus.Entered &&
        styles['PopoverOverlay-open'],
      transitionStatus === TransitionStatus.Exiting &&
        styles['PopoverOverlay-exiting'],
    );

    return (
      <PositionedOverlay
        ref={this.overlayRef}
        fullWidth={fullWidth}
        active={active}
        activator={activator}
        preferInputActivator={preferInputActivator}
        preferredPosition={preferredPosition}
        preferredAlignment={preferredAlignment}
        render={this.renderPopover.bind(this)}
        fixed={fixed}
        onScrollOut={this.handleScrollOut}
        classNames={className}
        zIndexOverride={zIndexOverride}
      />
    );
  }

  private clearTransitionTimeout() {
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }
  }

  private focusContent() {
    const {autofocusTarget = 'container'} = this.props;

    if (autofocusTarget === 'none' || this.contentNode == null) {
      return;
    }

    requestAnimationFrame(() => {
      if (this.contentNode.current == null) {
        return;
      }

      const focusableChild = findFirstKeyboardFocusableNode(
        this.contentNode.current,
      );

      if (focusableChild && autofocusTarget === 'first-node') {
        focusableChild.focus({
          preventScroll: process.env.NODE_ENV === 'development',
        });
      } else {
        this.contentNode.current.focus({
          preventScroll: process.env.NODE_ENV === 'development',
        });
      }
    });
  }

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderPopover: PositionedOverlayProps['render'] = (
    overlayDetails,
  ) => {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {
      id,
      children,
      sectioned,
      fullWidth,
      fullHeight,
      fluidContent,
      hideOnPrint,
      autofocusTarget,
      captureOverscroll,
    } = this.props;
    const isCovering = positioning === 'cover';
    const className = classNames(
      styles.Popover,
      measuring && styles.measuring,
      (fullWidth || isCovering) && styles.fullWidth,
      hideOnPrint && styles['PopoverOverlay-hideOnPrint'],
      positioning && styles[variationName('positioned', positioning)],
    );

    const contentStyles = measuring ? undefined : {height: desiredHeight};
    const contentClassNames = classNames(
      styles.Content,
      fullHeight && styles['Content-fullHeight'],
      fluidContent && styles['Content-fluidContent'],
    );

    return (
      <div className={className} {...overlay.props}>
        <EventListener event="click" handler={this.handleClick} />
        <EventListener event="touchstart" handler={this.handleClick} />
        <KeypressListener keyCode={Key.Escape} handler={this.handleEscape} />
        <div
          className={styles.FocusTracker}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={this.handleFocusFirstItem}
        />
        <div className={styles.ContentContainer}>
          <div
            id={id}
            tabIndex={autofocusTarget === 'none' ? undefined : -1}
            className={contentClassNames}
            style={contentStyles}
            ref={this.contentNode}
          >
            {renderPopoverContent(children, {captureOverscroll, sectioned})}
          </div>
        </div>
        <div
          className={styles.FocusTracker}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={this.handleFocusLastItem}
        />
      </div>
    );
  };

  private handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const {
      contentNode,
      props: {activator, onClose, preventCloseOnChildOverlayClick},
    } = this;
    const composedPath = event.composedPath();
    const wasDescendant = preventCloseOnChildOverlayClick
      ? wasPolarisPortalDescendant(composedPath, this.context!.container)
      : wasContentNodeDescendant(composedPath, contentNode);
    const isActivatorDescendant = nodeContainsDescendant(activator, target);
    if (
      wasDescendant ||
      isActivatorDescendant ||
      this.state.transitionStatus !== TransitionStatus.Entered
    ) {
      return;
    }

    onClose(PopoverCloseSource.Click);
  };

  private handleScrollOut = () => {
    this.props.onClose(PopoverCloseSource.ScrollOut);
  };

  private handleEscape = (event: Event) => {
    const target = event.target as HTMLElement;
    const {
      contentNode,
      props: {activator},
    } = this;
    const composedPath = event.composedPath();
    const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
    const isActivatorDescendant = nodeContainsDescendant(activator, target);

    if (wasDescendant || isActivatorDescendant) {
      this.props.onClose(PopoverCloseSource.EscapeKeypress);
    }
  };

  private handleFocusFirstItem = () => {
    this.props.onClose(PopoverCloseSource.FocusOut);
  };

  private handleFocusLastItem = () => {
    this.props.onClose(PopoverCloseSource.FocusOut);
  };
}

function renderPopoverContent(children: React.ReactNode, props: PaneProps) {
  const childrenArray = Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) {
    return childrenArray;
  }
  return wrapWithComponent(childrenArray, Pane, props);
}

export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}

function wasContentNodeDescendant(
  composedPath: readonly EventTarget[],
  contentNode: React.RefObject<HTMLDivElement>,
) {
  return (
    contentNode.current != null && composedPath.includes(contentNode.current)
  );
}

function wasPolarisPortalDescendant(
  composedPath: readonly EventTarget[],
  portalsContainerElement: PortalsContainerElement,
): boolean {
  return composedPath.some(
    (eventTarget) =>
      eventTarget instanceof Node &&
      portalsContainerElement?.contains(eventTarget),
  );
}
