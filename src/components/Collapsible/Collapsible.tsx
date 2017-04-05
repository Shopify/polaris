import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';
import {read} from '@shopify/javascript-utilities/fastdom';

import * as styles from './Collapsible.scss';

export interface Props {
  children?: React.ReactNode,
  open: boolean,
}

export type AnimationState = 'idle' | 'measuring' | 'closingStart' | 'closing' | 'openingStart' | 'opening';

export interface State {
  height?: number | null,
  animationState: AnimationState,
}

export default class Collapsible extends React.Component<Props, State> {
  state: State = {
    height: null,
    animationState: 'idle',
  };

  private node: HTMLElement;
  private heightNode: HTMLElement;

  componentWillReceiveProps(newProps: Props) {
    const {open} = this.props;
    const willBeOpen = newProps.open;

    if (open !== willBeOpen) {
      this.setState({animationState: 'measuring'});
    }
  }

  componentDidUpdate(oldProps: Props) {
    const {animationState} = this.state;

    read(() => {
      switch (animationState) {
        case 'idle':
          break;
        case 'measuring':
          const wasOpen = oldProps.open;

          this.setState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height: wasOpen ? this.heightNode.scrollHeight : 0,
          });
          break;
        case 'closingStart':
          this.setState({
            animationState: 'closing',
            height: 0,
          });
          break;
        case 'openingStart':
          this.setState({
            animationState: 'opening',
            height: this.heightNode.scrollHeight,
          });
          break;
      }
    });
  }

  componentDidMount() {
    addEventListener(this.node, 'transitionend', this.handleTransitionEnd);
  }

  componentWillUnmount() {
    removeEventListener(this.node, 'transitionend', this.handleTransitionEnd);
  }

  render() {
    const {children, open} = this.props;
    const {animationState, height} = this.state;

    const animating = animationState !== 'idle';

    const wrapperClassName = classNames(
      styles.Collapsible,
      open && styles.visibilityShown,
      animating && styles.animating,
    );

    const displayHeight = collapsibleHeight(open, animationState, height);

    return (
      <div
        aria-expanded={open}
        aria-hidden={!open}
        style={{
          height: displayHeight,
        }}
        className={wrapperClassName}
        ref={this.bindNode}
      >
        <div ref={this.bindHeightNode}>
          {children}
        </div>
      </div>
    );
  }

  @autobind
  private bindNode(node: HTMLElement) {
    this.node = node;
  }

  @autobind
  private bindHeightNode(node: HTMLElement) {
    this.heightNode = node;
  }

  @autobind
  private handleTransitionEnd(event: TransitionEvent) {
    const {target} = event;
    if (target === this.node) {
      this.setState({animationState: 'idle', height: null});
    }
  }
}

function collapsibleHeight(open: boolean, animationState: AnimationState, height?: number | null) {
  if (animationState === 'idle' && open) {
    return open ? 'auto' : null;
  }

  if (animationState === 'measuring') {
    return open ? null : 'auto';
  }

  return height;
}
