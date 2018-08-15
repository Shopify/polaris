import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
} from '@shopify/javascript-utilities/focus';

import {PreferredPosition, PreferredAlignment} from '../PositionedOverlay';
import Portal from '../Portal';
import {CloseSource, Pane, PopoverOverlay, Section} from './components';

export {CloseSource};

export interface Props {
  /** The content to display inside the popover */
  children?: React.ReactNode;
  /** The preferred direction to open the popover */
  preferredPosition?: PreferredPosition;
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PreferredAlignment;
  /** Show or hide the Popover */
  active: boolean;
  /** The element to activate the Popover */
  activator: React.ReactElement<any>;
  /**
   * The element type to wrap the activator with
   * @default 'div'
   */
  activatorWrapper?: string;
  /** Prevent automatic focus of the first field on activation */
  preventAutofocus?: boolean;
  /** Automatically add wrap content in a section */
  sectioned?: boolean;
  /** Allow popover to stretch to the full width of its activator */
  fullWidth?: boolean;
  /** Allow popover to stretch to fit content vertically */
  fullHeight?: boolean;
  /** Remains in a fixed position */
  fixed?: boolean;
  /** Callback when popover is closed */
  onClose(source: CloseSource): void;
}

export interface State {
  activatorFocused: boolean;
  activatorNode: HTMLElement | null;
}

const getUniqueID = createUniqueIDFactory('Popover');

export default class Popover extends React.PureComponent<Props, State> {
  static Pane = Pane;
  static Section = Section;

  state: State = {
    activatorFocused: false,
    activatorNode: null,
  };

  private activatorContainer: HTMLElement | null = null;
  private id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    if (
      this.activatorContainer &&
      this.state.activatorNode &&
      !this.activatorContainer.contains(this.state.activatorNode)
    ) {
      this.setActivator(this.activatorContainer);
    }
    this.setAccessibilityAttributes();
  }

  render() {
    const {
      activatorWrapper: WrapperComponent = 'div',
      children,
      onClose,
      activator,
      activatorWrapper,
      active,
      fixed,
      ...rest
    } = this.props;

    const {activatorNode} = this.state;

    const portal = activatorNode ? (
      <Portal idPrefix="popover" testID="portal">
        <PopoverOverlay
          testID="popoverOverlay"
          id={this.id}
          activator={activatorNode}
          onClose={this.handleClose}
          active={active}
          fixed={fixed}
          {...rest}
        >
          {children}
        </PopoverOverlay>
      </Portal>
    ) : null;

    return (
      <WrapperComponent testID="wrapper-component" ref={this.setActivator}>
        {React.Children.only(this.props.activator)}
        {portal}
      </WrapperComponent>
    );
  }

  private setAccessibilityAttributes() {
    const {id, activatorContainer} = this;
    if (activatorContainer == null) {
      return;
    }

    const firstFocusable = findFirstFocusableNode(activatorContainer);
    const focusableActivator = firstFocusable || activatorContainer;
    focusableActivator.tabIndex = focusableActivator.tabIndex || 0;
    focusableActivator.setAttribute('aria-controls', id);
    focusableActivator.setAttribute('aria-owns', id);
    focusableActivator.setAttribute('aria-haspopup', 'true');
    focusableActivator.setAttribute('aria-expanded', String(this.props.active));
  }

  @autobind
  private handleClose(source: CloseSource) {
    this.props.onClose(source);

    if (this.activatorContainer == null) {
      return;
    }
    if (
      source === CloseSource.FocusOut ||
      source === CloseSource.EscapeKeypress
    ) {
      focusFirstFocusableNode(this.activatorContainer, false);
    }
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
}
