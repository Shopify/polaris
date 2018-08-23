import * as React from 'react';
import * as PropTypes from 'prop-types';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {read} from '@shopify/javascript-utilities/fastdom';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

import * as styles from './Collapsible.scss';

export interface Props {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

export type CombinedProps = Props & WithAppProviderProps;

export type AnimationState =
  | 'idle'
  | 'measuring'
  | 'closingStart'
  | 'closing'
  | 'openingStart'
  | 'opening';

export interface State {
  height?: number | null;
  animationState: AnimationState;
}

export interface Context {
  parentCollapsibleExpanding: boolean;
}

const CONTEXT_TYPES = {
  parentCollapsibleExpanding: PropTypes.bool,
};

export class Collapsible extends React.Component<CombinedProps, State> {
  static contextTypes = CONTEXT_TYPES;
  static childContextTypes = CONTEXT_TYPES;

  context: Partial<Context>;

  state: State = {
    height: null,
    animationState: 'idle',
  };

  private node: HTMLElement | null = null;
  private heightNode: HTMLElement | null = null;

  getChildContext(): Context {
    const {open} = this.props;
    const {animationState} = this.state;
    const {parentCollapsibleExpanding} = this.context;
    return {
      parentCollapsibleExpanding:
        parentCollapsibleExpanding || (open && animationState !== 'idle'),
    };
  }

  componentWillReceiveProps({open: willOpen}: Props) {
    const {open} = this.props;

    if (open !== willOpen) {
      this.setState({animationState: 'measuring'});
    }
  }

  componentDidUpdate({open: wasOpen}: Props) {
    const {animationState} = this.state;

    const {parentCollapsibleExpanding} = this.context;
    if (parentCollapsibleExpanding && animationState !== 'idle') {
      this.setState({
        animationState: 'idle',
      });
      return;
    }

    read(() => {
      switch (animationState) {
        case 'idle':
          break;
        case 'measuring':
          this.setState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height:
              wasOpen && this.heightNode ? this.heightNode.scrollHeight : 0,
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
            height: this.heightNode ? this.heightNode.scrollHeight : 0,
          });
      }
    });
  }

  componentDidMount() {
    if (this.node == null) {
      return;
    }
    addEventListener(this.node, 'transitionend', this.handleTransitionEnd);
  }

  componentWillUnmount() {
    if (this.node == null) {
      return;
    }
    removeEventListener(this.node, 'transitionend', this.handleTransitionEnd);
  }

  render() {
    const {id, open, children} = this.props;
    const {animationState, height} = this.state;

    const animating = animationState !== 'idle';

    const wrapperClassName = classNames(
      styles.Collapsible,
      open && styles.open,
      animating && styles.animating,
    );

    const displayHeight = collapsibleHeight(open, animationState, height);

    const content = animating || open ? children : null;

    return (
      <div
        id={id}
        aria-hidden={!open}
        style={{height: displayHeight}}
        className={wrapperClassName}
        ref={this.bindNode}
      >
        <div ref={this.bindHeightNode}>{content}</div>
      </div>
    );
  }

  @autobind
  private bindNode(node: HTMLElement | null) {
    this.node = node;
  }

  @autobind
  private bindHeightNode(node: HTMLElement | null) {
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

function collapsibleHeight(
  open: boolean,
  animationState: AnimationState,
  height?: number | null,
) {
  if (animationState === 'idle' && open) {
    return open ? 'auto' : undefined;
  }

  if (animationState === 'measuring') {
    return open ? undefined : 'auto';
  }

  return `${height || 0}px`;
}

export default withAppProvider<Props>()(Collapsible);
