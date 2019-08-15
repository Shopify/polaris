import React, {
  createContext,
  createRef,
  TransitionEvent,
  ComponentClass,
} from 'react';
import {read} from '@shopify/javascript-utilities/fastdom';
import {classNames} from '../../utilities/css';

import styles from './Collapsible.scss';

export interface Props {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

export type AnimationState =
  | 'idle'
  | 'measuring'
  | 'closingStart'
  | 'closing'
  | 'openingStart'
  | 'opening';

interface State {
  height?: number | null;
  animationState: AnimationState;
  open: boolean;
}

const ParentCollapsibleExpandingContext = createContext(false);

class Collapsible extends React.Component<Props, State> {
  static contextType = ParentCollapsibleExpandingContext;

  static getDerivedStateFromProps(
    {open: willOpen}: Props,
    {open, animationState: prevAnimationState}: State,
  ) {
    let nextAnimationState = prevAnimationState;
    if (open !== willOpen) {
      nextAnimationState = 'measuring';
    }

    return {
      animationState: nextAnimationState,
      open: willOpen,
    };
  }

  context!: React.ContextType<typeof ParentCollapsibleExpandingContext>;

  state: State = {
    height: null,
    animationState: 'idle',
    // eslint-disable-next-line react/no-unused-state
    open: this.props.open,
  };

  private node = createRef<HTMLDivElement>();
  private heightNode = createRef<HTMLDivElement>();

  componentDidUpdate({open: wasOpen}: Props) {
    const {animationState} = this.state;
    const parentCollapsibleExpanding = this.context;

    if (parentCollapsibleExpanding && animationState !== 'idle') {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        animationState: 'idle',
      });

      return;
    }

    read(() => {
      const heightNode = this.heightNode.current;
      switch (animationState) {
        case 'idle':
          break;
        case 'measuring':
          this.setState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height: wasOpen && heightNode ? heightNode.scrollHeight : 0,
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
            height: heightNode ? heightNode.scrollHeight : 0,
          });
      }
    });
  }

  render() {
    const {id, open, children} = this.props;
    const {animationState, height} = this.state;
    const parentCollapsibleExpanding = this.context;

    const animating = animationState !== 'idle';

    const wrapperClassName = classNames(
      styles.Collapsible,
      open && styles.open,
      animating && styles.animating,
      !animating && open && styles.fullyOpen,
    );

    const displayHeight = collapsibleHeight(open, animationState, height);

    const content = animating || open ? children : null;

    return (
      <ParentCollapsibleExpandingContext.Provider
        value={
          parentCollapsibleExpanding || (open && animationState !== 'idle')
        }
      >
        <div
          id={id}
          aria-hidden={!open}
          style={{height: displayHeight}}
          className={wrapperClassName}
          ref={this.node}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div ref={this.heightNode}>{content}</div>
        </div>
      </ParentCollapsibleExpandingContext.Provider>
    );
  }

  private handleTransitionEnd = (event: TransitionEvent) => {
    const {target} = event;
    if (target === this.node.current) {
      this.setState({animationState: 'idle', height: null});
    }
  };
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

export default Collapsible as ComponentClass<Props> & typeof Collapsible;
