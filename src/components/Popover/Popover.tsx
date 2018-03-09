import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {focusFirstFocusableNode, findFirstFocusableNode} from '@shopify/javascript-utilities/focus';

import {PreferredPosition} from '../PositionedOverlay';
import Portal from '../Portal';
import PopoverOverlay, {CloseSource} from './PopoverOverlay';
import Pane from './Pane';
import Section from './Section';

export {CloseSource};

export interface Props {
  active: boolean,
  activator: React.ReactElement<any>,
  children?: React.ReactNode,
  preferredPosition?: PreferredPosition,
  activatorWrapper?: string,
  preventAutofocus?: boolean,
  sectioned?: boolean,
  fullWidth?: boolean,
  fullHeight?: boolean,
  onClose(source: CloseSource): void,
}

export interface State {
  activatorFocused: boolean,
  activatorNode: HTMLElement | null,
}

const getUniqueID = createUniqueIDFactory('Popover');

export default class Popover extends React.PureComponent<Props, State> {
  static Pane = Pane;
  static Section = Section;

  state: State = {
    activatorFocused: false,
    activatorNode: null,
  };

  private activatorContainer: HTMLElement | null;
  private id = getUniqueID();

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  render() {
    const {
      activatorWrapper: WrapperComponent = 'div',
      children,
      onClose,
      activator,
      active,
      ...rest,
    } = this.props;

    const {
      activatorNode,
    } = this.state;

    const portal = activatorNode
      ? (
        <Portal idPrefix="popover" testID="portal">
          <PopoverOverlay
            testID="popoverOverlay"
            id={this.id}
            activator={activatorNode}
            onClose={this.handleClose}
            active={active}
            {...rest}
          >
            {children}
          </PopoverOverlay>
        </Portal>
      )
      : null;

    return (
      <WrapperComponent ref={this.setActivator}>
        {React.Children.only(this.props.activator)}
        {portal}
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
      this.activatorContainer = null;
      this.setState({activatorNode: null});
      return;
    }

    this.setState({activatorNode: node.firstElementChild as HTMLElement});
    this.activatorContainer = node;
  }
}
