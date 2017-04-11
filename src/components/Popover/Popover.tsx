import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';
import autobind from '@shopify/javascript-utilities/autobind';

import {focusFirstFocusableChild} from '../Focus';
import {PreferredPosition, Alignment} from '../PositionedOverlay';
import PopoverOverlay from './PopoverOverlay';
import Pane from './Pane';
import Section from './Section';
import * as styles from './Popover.scss';

export interface Props {
  alignment?: Alignment,
  fullHeight?: boolean,
  preferredPosition?: PreferredPosition,
  active: boolean,
  activator: React.ReactElement<{}>,
  activatorWrapper?: string | React.ComponentClass<any>,
  children?: React.ReactNode,
  preventAutofocus?: boolean,
  onCloseRequest(): void,
}

export interface State {
  activatorFocused: boolean,
}

@layeredComponent({idPrefix: 'Popover'})
export default class Popover extends React.PureComponent<Props, {}> {
  static Pane = Pane;

  static Section = Section;

  state: State = {
    activatorFocused: false,
  };

  private activatorContainer: HTMLElement;

  constructor(props: Props) {
    super(props);
  }

  get activatorNode(): HTMLElement {
    return findDOMNode<HTMLElement>(this);
  }

  renderLayer() {
    const {
      children,
      fullHeight,
      alignment,
      preferredPosition,
      active,
      onCloseRequest,
      preventAutofocus = false,
    } = this.props;

    return (
      <PopoverOverlay
        preferredPosition={preferredPosition}
        fullHeight={fullHeight}
        alignment={alignment}
        activator={this.activatorNode}
        active={active}
        onCloseRequest={onCloseRequest}
        activatorFocused={this.state.activatorFocused}
        preventAutofocus={preventAutofocus}
      >
        <div
          tabIndex={0}
          onFocus={this.handleFocusFirstItem}
          onBlur={this.handleBlurFirstItem}
        />
        {children}
        <div
          tabIndex={0}
          onFocus={this.handleFocusLastItem}
        />
      </PopoverOverlay>
    );
  }

  render() {
    const {activatorWrapper: WrapperComponent = 'div'} = this.props;

    return (
      <WrapperComponent
        className={styles.ActivatorContainer}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.setActivatorContainer}
      >
        {React.Children.only(this.props.activator)}
      </WrapperComponent>
    );
  }

  @autobind
  private handleFocusFirstItem(event: React.FocusEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest(`.${styles.Popover}`) == null) {
      focusNextSibling(event.target as HTMLElement);
    } else {
      this.focusActivator();
    }
  }

  @autobind
  private handleFocusLastItem() {
    this.focusActivator();
  }

  @autobind
  private handleBlurFirstItem(event: React.FocusEvent<HTMLDivElement>) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.closest(`.${styles.Popover}`) == null) {
      this.focusActivator();
    }
  }

  @autobind
  private focusActivator() {
    focusFirstFocusableChild(this.activatorContainer);
    this.setState({activatorFocused: true});
    this.props.onCloseRequest();
  }

  @autobind
  private handleFocus() {
    this.setState({activatorFocused: true});
  }

  @autobind
  private handleBlur() {
    this.setState({activatorFocused: false});
  }

  @autobind
  private setActivatorContainer(node: HTMLElement) {
    this.activatorContainer = node;
  }
}

function focusNextSibling(target: HTMLElement) {
  const nextElementSibling = target.nextElementSibling as HTMLElement;
  if (nextElementSibling) {
    focusFirstFocusableChild(nextElementSibling);
  }
}
