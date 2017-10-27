import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {nodeContainsDescendant} from '@shopify/javascript-utilities/dom';
import {write} from '@shopify/javascript-utilities/fastdom';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {classNames} from '@shopify/react-utilities/styles';
import {isElementOfType, wrapWithComponent} from '@shopify/react-utilities/components';
import {Transition} from 'react-transition-group';

import {Keys} from '../../types';
import {overlay} from '../shared';
import EventListener from '../EventListener';
import KeypressListener from '../KeypressListener';
import PositionedOverlay, {OverlayDetails, PreferredPosition} from '../PositionedOverlay';

import Pane, {Props as PaneProps} from './Pane';
import * as styles from './Popover.scss';

export enum CloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface Props {
  id: string,
  active: boolean,
  activator: HTMLElement,
  preventAutofocus?: boolean,
  sectioned?: boolean,
  fullWidth?: boolean,
  preferredPosition?: PreferredPosition,
  children?: React.ReactNode,
  onClose(source: CloseSource): void,
}

export default class PopoverOverlay extends React.PureComponent<Props, never> {
  private contentNode: HTMLElement | null;
  private transitionStatus: TransitionStatus;

  componentDidUpdate({active: wasActive}: Props) {
    const {active, preventAutofocus} = this.props;
    if (!active || preventAutofocus || !active || active === wasActive) { return; }
    if (this.contentNode == null) { return; }

    write(() => {
      if (this.contentNode == null) { return; }
      const focusableChild = findFirstFocusableNode(this.contentNode);
      (focusableChild || this.contentNode).focus();
    });
  }

  render() {
    const {active} = this.props;
    return (
      <Transition in={active} timeout={500}>
        {this.renderOverlay}
      </Transition>
    );
  }

  @autobind
  private renderOverlay(transitionStatus: TransitionStatus) {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = 'below',
    } = this.props;

    if (transitionStatus === 'exited') { return null; }

    return (
      <PositionedOverlay
        fullWidth={fullWidth}
        active={active}
        activator={activator}
        preferredPosition={preferredPosition}
        render={this.renderPopover.bind(this, transitionStatus)}
        onScrollOut={this.handleScrollOut}
      />
    );
  }

  @autobind
  private renderPopover(transitionStatus: TransitionStatus, overlayDetails: OverlayDetails) {
    const {
      measuring,
      left,
      desiredHeight,
      positioning,
      activatorRect,
    } = overlayDetails;

    const {
      id,
      children,
      sectioned,
      fullWidth,
    } = this.props;

    const className = classNames(
      styles.Popover,
      transitionStatus && animationVariations(transitionStatus),
      positioning === 'above' && styles.positionedAbove,
      fullWidth && styles.fullWidth,
      measuring && styles.measuring,
    );

    this.transitionStatus = transitionStatus;

    const tipMarkup = !measuring
      ? (
        <div
          style={{left: activatorRect.center.x - left}}
          className={styles.Tip}
        />
      )
      : null;

    const contentStyles = measuring
      ? undefined
      : {height: desiredHeight};

    const content = (
      <div
        id={id}
        tabIndex={-1}
        className={styles.Content}
        style={contentStyles}
        ref={this.setContentNode}
      >
        {renderPopoverContent(children, {sectioned})}
      </div>
    );

    return (
      <div className={className} {...overlay.props}>
        <EventListener event="click" handler={this.handleClick} />
        <EventListener event="touchstart" handler={this.handleClick} />
        <KeypressListener keyCode={Keys.ESCAPE} handler={this.handleEscape} />
        {tipMarkup}
        <div className={styles.FocusTracker} tabIndex={0} onFocus={this.handleFocusFirstItem} />
        <div className={styles.Wrapper}>
          {content}
        </div>
        <div className={styles.FocusTracker} tabIndex={0} onFocus={this.handleFocusLastItem} />
      </div>
    );
  }

  @autobind
  private setContentNode(node: HTMLElement | null) {
    this.contentNode = node;
  }

  @autobind
  private handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const {contentNode, props: {activator, onClose}} = this;
    if (
      (contentNode != null && nodeContainsDescendant(contentNode, target)) ||
      nodeContainsDescendant(activator, target) || this.transitionStatus !== 'entered'
    ) { return; }
    onClose(CloseSource.Click);
  }

  @autobind
  private handleScrollOut() {
    this.props.onClose(CloseSource.ScrollOut);
  }

  @autobind
  private handleEscape() {
    this.props.onClose(CloseSource.EscapeKeypress);
  }

  @autobind
  private handleFocusFirstItem() {
    this.props.onClose(CloseSource.FocusOut);
  }

  @autobind
  private handleFocusLastItem() {
    this.props.onClose(CloseSource.FocusOut);
  }
}

function renderPopoverContent(children: React.ReactNode, props?: Partial<PaneProps>) {
  const childrenArray = React.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) { return childrenArray; }
  return wrapWithComponent(childrenArray, Pane, props);
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case 'exiting':
      return styles.exiting;
    default:
      return null;
  }
}
