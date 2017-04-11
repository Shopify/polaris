import * as React from 'react';
import {findDOMNode} from 'react-dom';
import autobind from '@shopify/javascript-utilities/autobind';
import {nodeContainsDescendant} from '@shopify/javascript-utilities/dom';
import {write} from '@shopify/javascript-utilities/fastdom';
import {classNames} from '@shopify/react-utilities/styles';
import {isElementOfType, wrapWithComponent} from '@shopify/react-utilities/components';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';

import {focusFirstFocusableChild} from '../Focus';
import Scrollable from '../Scrollable';
import EventListener from '../EventListener';
import {default as PositionedOverlay, OverlayDetails, PreferredPosition, Alignment} from '../PositionedOverlay';
import * as styles from './Popover.scss';
import Pane from './Pane';

export interface Props {
  activatorFocused: boolean,
  active: boolean,
  preventAutofocus: boolean,
  fullHeight?: boolean,
  preferredPosition?: PreferredPosition,
  alignment?: Alignment,
  children?: React.ReactNode,
  activator: React.ReactNode,
  onCloseRequest(): void,
}

export interface State {
  maxHeight: number,
}

const INITIAL_MAX_HEIGHT = Infinity;

export default class PopoverOverlay extends React.PureComponent<Props, State> {
  state = {
    maxHeight: INITIAL_MAX_HEIGHT,
  };

  private popoverContent: HTMLElement;

  componentDidUpdate() {
    const {activatorFocused, active, preventAutofocus} = this.props;
    const child = findDOMNode(this) ? findDOMNode(this).firstElementChild : null;
    if (child && activatorFocused && active && !preventAutofocus) {
      const element = child as HTMLElement;
      write(() => focusFirstFocusableChild(element));
    }
  }

  render() {
    const {active} = this.props;
    const selector = `.${styles.Popover}`;
    const markup = active
      ? (
        <TransitionGroup.TransitionChild
          render={this.renderOverlay}
          selector={selector}
          skipAppearing
        />
      )
      : null;

    return (
      <TransitionGroup>
        {markup}
      </TransitionGroup>
    );
  }

  @autobind
  private renderOverlay(transitionStatus: TransitionStatus) {
    const {
      active,
      activator,
      alignment = 'center',
      preferredPosition = 'below',
    } = this.props;

    const {maxHeight} = this.state;

    const renderWithOverlayDetails = (overlayDetails: OverlayDetails) => {
      return this.renderPopover(transitionStatus, overlayDetails);
    };

    return (
      <PositionedOverlay
        maxHeight={maxHeight}
        active={active}
        activator={activator}
        alignment={alignment}
        preferredPosition={preferredPosition}
        render={renderWithOverlayDetails}
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
    const {children, fullHeight} = this.props;

    const tipStyle = calculateTipPosition(activatorRect.center.x, left);

    const containerClassName = classNames(
      styles.Popover,
      transitionStatus && animationVariations(transitionStatus),
      positioning === 'above' && styles.positionedAbove,
    );

    const contentClassName = classNames(
      styles.Content,
      fullHeight && styles.fullHeight,
    );

    const contentStyles = {
      maxHeight: !measuring ? desiredHeight : null,
    };

    const tipMarkup = !measuring
      ? <div style={tipStyle} className={styles.Tip} />
      : null;

    const popoverContent = !measuring
      ? (
        <Scrollable shadow>
          {renderPopoverContent(children)}
        </Scrollable>
      )
      : renderPopoverContent(children);

    const content = (
      <div className={contentClassName} style={contentStyles}>
        {popoverContent}
      </div>
    );

    return (
      <div className={containerClassName}>
        <EventListener event="click" handler={this.handleClick} />
        {tipMarkup}
        <div className={styles.Wrapper} ref={this.getMaxHeight}>
          {content}
        </div>
      </div>
    );
  }
  @autobind
  private getMaxHeight(node: HTMLElement | null) {
    if (node == null || node === this.popoverContent) { return; }

    this.popoverContent = node.firstChild as HTMLElement;

    const cssMaxHeight = window.getComputedStyle(this.popoverContent).maxHeight || 'none';
    const maxHeight = parseInt(cssMaxHeight, 10);

    this.setState({
      maxHeight: Number.isNaN(maxHeight) ? INITIAL_MAX_HEIGHT : maxHeight,
    });
  }

  @autobind
  private handleClick({target}: {target: HTMLElement}) {
    const {popoverContent, props: {activator, onCloseRequest}} = this;
    if (
      nodeContainsDescendant(popoverContent, target) ||
      nodeContainsDescendant(activator as HTMLElement, target)
    ) { return; }
    onCloseRequest();
  }
}

function renderPopoverContent(children: React.ReactNode) {
  const childrenArray = React.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) { return childrenArray; }
  return wrapWithComponent(childrenArray, Pane);
}

function calculateTipPosition(activatorRectXAxisCenter: number, left: number) {
  return {left: activatorRectXAxisCenter - left};
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case TransitionStatus.EnteringStart:
      return styles.enteringStart;
    case TransitionStatus.Leaving:
      return styles.leaving;
    default:
      return null;
  }
}
