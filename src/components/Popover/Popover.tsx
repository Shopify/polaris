import * as React from 'react';
import {layeredComponent} from '@shopify/react-utilities/components';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {focusFirstFocusableNode, findFirstFocusableNode} from '@shopify/javascript-utilities/focus';

import {PreferredPosition} from '../PositionedOverlay';
import PopoverOverlay, {CloseSource} from './PopoverOverlay';
import Pane from './Pane';
import Section from './Section';

export {CloseSource};

export interface Props {
  /** The content to display inside the popover */
  children?: React.ReactNode,
  /** If true, the popover will stretch to the full width of it's activator */
  fullWidth?: boolean,
  /** The preferred direction to open the popover */
  preferredPosition?: PreferredPosition,
  /** Show or hide the Popover */
  active: boolean,
  /** The element to activate the Popover */
  activator: React.ReactElement<any>,
  /** The element type to wrap the activator with */
  activatorWrapper?: string,
  /** Prevent automatic focus of the first field on activation */
  preventAutofocus?: boolean,
  /** Automatically add wrap content in a section */
  sectioned?: boolean,
  /** Callback when popover is closed */
  onClose(source: CloseSource): void,
}

export interface State {
  activatorFocused: boolean,
}

const getUniqueID = createUniqueIDFactory('Popover');

@layeredComponent({idPrefix: 'Popover'})
export default class Popover extends React.PureComponent<Props, State> {
  static Pane = Pane;
  static Section = Section;

  state: State = {
    activatorFocused: false,
  };

  private activatorNode: HTMLElement | null;
  private activatorContainer: HTMLElement | null;
  private id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  renderLayer() {
    const {
      children,
      onClose,
      activator,
      activatorWrapper,
      ...rest,
    } = this.props;

    if (this.activatorNode == null) {
      return null;
    }

    return (
      <PopoverOverlay
        id={this.id}
        activator={this.activatorNode}
        onClose={this.handleClose}
        {...rest}
      >
        {children}
      </PopoverOverlay>
    );
  }

  render() {
    const {activatorWrapper: WrapperComponent = 'div'} = this.props;

    return (
      <WrapperComponent ref={this.setActivator}>
        {React.Children.only(this.props.activator)}
      </WrapperComponent>
    );
  }

  private setAccessibilityAttributes() {
    const {id, activatorContainer} = this;
    if (activatorContainer == null) { return; }

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

    if (this.activatorContainer == null) { return; }
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
      this.activatorNode = null;
      this.activatorContainer = null;
      return;
    }

    this.activatorNode = node.firstElementChild as HTMLElement;
    this.activatorContainer = node;
  }
}
