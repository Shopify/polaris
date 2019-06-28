import React, {createRef} from 'react';
import {nodeContainsDescendant} from '@shopify/javascript-utilities/dom';
import {write} from '@shopify/javascript-utilities/fastdom';
import {durationBase} from '@shopify/polaris-tokens';

import {classNames} from '../../../../utilities/css';
import {
  isElementOfType,
  wrapWithComponent,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {overlay} from '../../../shared';
import EventListener from '../../../EventListener';
import KeypressListener from '../../../KeypressListener';
import PositionedOverlay, {
  OverlayDetails,
  PreferredPosition,
  PreferredAlignment,
} from '../../../PositionedOverlay';

import Pane, {Props as PaneProps} from '../Pane';
import styles from '../../Popover.scss';

export enum CloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export interface Props {
  children?: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  preferredPosition?: PreferredPosition;
  preferredAlignment?: PreferredAlignment;
  active: boolean;
  id: string;
  activator: HTMLElement;
  preventAutofocus?: boolean;
  sectioned?: boolean;
  fixed?: boolean;
  onClose(source: CloseSource): void;
}

interface State {
  transitionStatus: TransitionStatus;
}

export default class PopoverOverlay extends React.PureComponent<Props, State> {
  state: State = {
    transitionStatus: this.props.active
      ? TransitionStatus.Entering
      : TransitionStatus.Exited,
  };

  private contentNode = createRef<HTMLDivElement>();

  changeTransitionStatus(transitionStatus: TransitionStatus, cb?: () => void) {
    requestAnimationFrame(() => {
      this.setState({transitionStatus}, cb);
    });
  }

  componentDidMount() {
    if (this.props.active) {
      this.focusContent();

      this.changeTransitionStatus(TransitionStatus.Entered);
    }
  }

  componentDidUpdate(oldProps: Props) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();

      this.changeTransitionStatus(TransitionStatus.Entered);
    }

    if (!this.props.active && oldProps.active) {
      this.changeTransitionStatus(TransitionStatus.Exiting, () => {
        setTimeout(() => {
          this.setState({transitionStatus: TransitionStatus.Exited});
        }, durationBase);
      });
    }
  }

  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
      preferredAlignment = 'center',
      fixed,
    } = this.props;
    const {transitionStatus} = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active) return null;

    const className = classNames(
      styles.PopoverOverlay,
      transitionStatus === TransitionStatus.Entered &&
        styles['PopoverOverlay-open'],
      transitionStatus === TransitionStatus.Exiting &&
        styles['PopoverOverlay-exiting'],
    );

    return (
      <div className={className}>
        <PositionedOverlay
          testID="positionedOverlay"
          fullWidth={fullWidth}
          active={active}
          activator={activator}
          preferredPosition={preferredPosition}
          preferredAlignment={preferredAlignment}
          render={this.renderPopover.bind(this)}
          fixed={fixed}
          onScrollOut={this.handleScrollOut}
        />
      </div>
    );
  }

  private focusContent() {
    if (this.props.preventAutofocus) {
      return;
    }
    if (this.contentNode == null) {
      return;
    }

    write(() => {
      if (this.contentNode.current == null) {
        return;
      }

      this.contentNode.current.focus();
    });
  }

  private renderPopover = (overlayDetails: OverlayDetails) => {
    const {measuring, desiredHeight, positioning} = overlayDetails;

    const {id, children, sectioned, fullWidth, fullHeight} = this.props;

    const className = classNames(
      styles.Popover,
      positioning === 'above' && styles.positionedAbove,
      fullWidth && styles.fullWidth,
      measuring && styles.measuring,
    );

    const contentStyles = measuring ? undefined : {height: desiredHeight};

    const contentClassNames = classNames(
      styles.Content,
      fullHeight && styles['Content-fullHeight'],
    );

    const content = (
      <div
        id={id}
        tabIndex={-1}
        className={contentClassNames}
        style={contentStyles}
        ref={this.contentNode}
      >
        {renderPopoverContent(children, {sectioned})}
      </div>
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
        <div className={styles.Wrapper}>{content}</div>
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
      props: {activator, onClose},
    } = this;
    const isDescendant =
      contentNode.current != null &&
      nodeContainsDescendant(contentNode.current, target);
    const isActivatorDescendant = nodeContainsDescendant(activator, target);
    if (
      isDescendant ||
      isActivatorDescendant ||
      this.state.transitionStatus !== TransitionStatus.Entered
    ) {
      return;
    }
    onClose(CloseSource.Click);
  };

  private handleScrollOut = () => {
    this.props.onClose(CloseSource.ScrollOut);
  };

  private handleEscape = () => {
    this.props.onClose(CloseSource.EscapeKeypress);
  };

  private handleFocusFirstItem = () => {
    this.props.onClose(CloseSource.FocusOut);
  };

  private handleFocusLastItem = () => {
    this.props.onClose(CloseSource.FocusOut);
  };
}

function renderPopoverContent(
  children: React.ReactNode,
  props?: Partial<PaneProps>,
) {
  const childrenArray = React.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) {
    return childrenArray;
  }
  return wrapWithComponent(childrenArray, Pane, props);
}
