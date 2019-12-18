import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';

import {PreferredPosition} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {TooltipOverlay} from './components';
import styles from './Tooltip.scss';

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: string;
  /** Display tooltip with a light background */
  light?: boolean;
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /**
   * The direction the tooltip tries to display
   * @default 'below'
   */
  preferredPosition?: PreferredPosition;
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
}

interface State {
  active: boolean;
  activatorNode: HTMLElement | null;
}

const getUniqueID = createUniqueIDFactory('TooltipContent');

export class Tooltip extends React.PureComponent<TooltipProps, State> {
  state: State = {
    active: Boolean(this.props.active),
    activatorNode: null,
  };

  private id = getUniqueID();
  private activatorContainer: HTMLElement | null = null;
  private mouseEntered = false;

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  render() {
    const {id} = this;

    const {
      children,
      content,
      light,
      preferredPosition = 'below',
      activatorWrapper: WrapperComponent = 'span' as any,
    } = this.props;

    const {active, activatorNode} = this.state;

    const portal = activatorNode ? (
      <Portal idPrefix="tooltip">
        <TooltipOverlay
          id={id}
          preferredPosition={preferredPosition}
          activator={activatorNode}
          active={active}
          onClose={noop}
          light={light}
        >
          <div className={styles.Label} testID="TooltipOverlayLabel">
            {content}
          </div>
        </TooltipOverlay>
      </Portal>
    ) : null;

    return (
      <WrapperComponent
        testID="WrapperComponent"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseEnterFix}
        ref={this.setActivator}
      >
        {children}
        {portal}
      </WrapperComponent>
    );
  }

  private setActivator = (node: HTMLElement | null) => {
    if (node == null) {
      this.activatorContainer = null;
      this.setState({activatorNode: null});
      return;
    }

    this.setState({activatorNode: node.firstElementChild as HTMLElement});
    this.activatorContainer = node;
  };

  private handleFocus = () => {
    this.setState({active: true});
  };

  private handleBlur = () => {
    this.setState({active: false});
  };

  private handleMouseEnter = () => {
    this.mouseEntered = true;
    this.setState({active: true});
  };

  private handleMouseLeave = () => {
    this.mouseEntered = false;
    this.setState({active: false});
  };

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  private handleMouseEnterFix = () => {
    !this.mouseEntered && this.handleMouseEnter();
  };

  private setAccessibilityAttributes() {
    const {activatorContainer, id} = this;
    if (activatorContainer == null) {
      return;
    }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const accessibilityNode = firstFocusable || activatorContainer;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
  }
}

function noop() {}
