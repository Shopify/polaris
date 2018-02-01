import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {noop, createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';

import {PreferredPosition} from '../PositionedOverlay';
import Portal from '../Portal';
import TooltipOverlay from './TooltipOverlay';
import * as styles from './Tooltip.scss';

export interface Props {
  /** The element that will activate to tooltip */
  children?: React.ReactNode,
  /** The content to display within the tooltip */
  content: string,
  /** Display tooltip with a light background */
  light?: boolean,
  /** Toggle whether the tooltip is visible */
  active?: boolean,
  /** The direction the tooltip tries to display */
  preferredPosition?: PreferredPosition,
  /** The element type to wrap the activator in */
  activatorWrapper?: string,
}

export interface State {
  active: boolean,
  activatorNode: HTMLElement | null,
}

const getUniqueID = createUniqueIDFactory('TooltipContent');

export default class Tooltip extends React.PureComponent<Props, State> {
  state: State = {
    active: false,
    activatorNode: null,
  };

  private id = getUniqueID();
  private activatorContainer: HTMLElement | null;

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  render() {
    const {
      id,
    } = this;

    const {
      children,
      content,
      light,
      preferredPosition = 'below',
      activatorWrapper: WrapperComponent = 'span',
    } = this.props;

    const {
      activatorNode,
    } = this.state;

    const {
      active,
    } = this.state;

    const portal = activatorNode
      ? (
        <Portal idPrefix="Tooltip">
          <TooltipOverlay
            id={id}
            preferredPosition={preferredPosition}
            activator={activatorNode}
            active={active}
            onClose={noop}
            light={light}
          >
            <div className={styles.Label}>
              {content}
            </div>
          </TooltipOverlay>
        </Portal>
      )
      : null;

    return (
      <WrapperComponent
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.setActivator}
      >
        {children}
        {portal}
      </WrapperComponent>
    );
  }

  @autobind
  private setActivator(node: HTMLElement | null) {
    if (node == null) {
      this.activatorContainer = null;
      this.setState({activatorNode: null});
      return;
    }

    this.setState({activatorNode: node.firstElementChild as HTMLElement});
    this.activatorContainer = node;
  }

  @autobind
  private handleFocus() {
    this.setState({active: true});
  }

  @autobind
  private handleBlur() {
    this.setState({active: false});
  }

  @autobind
  private handleMouseEnter() {
    this.setState({active: true});
  }

  @autobind
  private handleMouseLeave() {
    this.setState({active: false});
  }

  private setAccessibilityAttributes() {
    const {activatorContainer, id} = this;
    if (activatorContainer == null) { return; }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const accessibilityNode = firstFocusable || activatorContainer;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
  }
}
