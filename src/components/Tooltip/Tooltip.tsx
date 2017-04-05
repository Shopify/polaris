import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {layeredComponent} from '@shopify/react-utilities/components';
import autobind from '@shopify/javascript-utilities/autobind';
import {noop} from '@shopify/javascript-utilities/other';

import {PreferredPosition, Alignment} from '../PositionedOverlay';
import TooltipOverlay from './TooltipOverlay';
import * as styles from './Tooltip.scss';

export interface Props {
  children?: React.ReactNode,
  content: React.ReactElement<{}>,
  active?: boolean,
  light?: boolean,
  preferredPosition?: PreferredPosition,
  alignment?: Alignment,
}

export interface State {
  active: boolean,
}

@layeredComponent({idPrefix: 'Tooltip'})
export default class Tooltip extends React.PureComponent<Props, State> {
  state = {
    active: false,
  };

  renderLayer() {
    const {
      alignment = 'center',
      preferredPosition = 'below',
      active,
      light,
      content,
    } = this.props;

    return (
      <TooltipOverlay
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
    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {React.Children.only(this.props.children)}
      </span>
    );
  }

  private get activatorNode(): HTMLElement {
    return findDOMNode<HTMLElement>(this);
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
}
