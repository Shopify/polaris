import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';
import autobind from '@shopify/javascript-utilities/autobind';
import {noop} from '@shopify/javascript-utilities/other';

import {PreferredPosition, Alignment} from '../PositionedOverlay';
import {FOCUSABLE_SELECTOR} from '../Focus';
import TooltipOverlay from './TooltipOverlay';
import * as styles from './Tooltip.scss';

export interface Props {
  id?: string,
  children?: React.ReactNode,
  content: string,
  active?: boolean,
  light?: boolean,
  preferredPosition?: PreferredPosition,
  activatorWrapper?: string | React.ComponentClass<any>,
  alignment?: Alignment,
}

export interface State {
  active: boolean,
}

@layeredComponent({idPrefix: 'Tooltip'})
export default class Tooltip extends React.PureComponent<Props, State> {
  state: State = {
    active: false,
  };

  private id = this.props.id || uniqueID();

  componentWillReceiveProps(newProps: Props) {
    this.id = newProps.id || this.id;
  }

  componentDidMount() {
    this.setAccessibilityAttributes();
  }

  componentDidUpdate() {
    this.setAccessibilityAttributes();
  }

  renderLayer() {
    const {id} = this;
    const {
      alignment = 'center',
      preferredPosition = 'below',
      active,
      light,
      content,
    } = this.props;

    return (
      <TooltipOverlay
        id={id}
        preferredPosition={preferredPosition}
        alignment={alignment}
        activator={this.activatorNode}
        active={active || this.state.active}
        onCloseRequest={noop}
        light={light}
      >
        <div className={styles.Label}>
          {content}
        </div>
      </TooltipOverlay>
    );
  }

  render() {
    const {activatorWrapper: WrapperComponent = 'span'} = this.props;

    return (
      <WrapperComponent
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </WrapperComponent>
    );
  }

  private get activatorNode(): HTMLElement {
    return findDOMNode<HTMLElement>(this);
  }

  @autobind
  private handleFocus() {
    this.setState({
      active: true,
    });
  }

  @autobind
  private handleBlur() {
    this.setState({
      active: false,
    });
  }

  @autobind
  private handleMouseEnter() {
    this.setState({
      active: true,
    });
  }

  @autobind
  private handleMouseLeave() {
    this.setState({
      active: false,
    });
  }

  private setAccessibilityAttributes() {
    const {activatorNode, id} = this;
    const firstFocusable = activatorNode.querySelector(FOCUSABLE_SELECTOR) as HTMLElement | null;
    const accessibilityNode = firstFocusable || activatorNode;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
  }
}

let currentID = 1;

function uniqueID() {
  return `TooltipContent${currentID++}`;
}
