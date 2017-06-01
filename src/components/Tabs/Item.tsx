import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';

import * as styles from './Tabs.scss';

export interface Props {
  id: string,
  focused: boolean,
  panelID?: string,
  children?: React.ReactNode,
  onClick?(): void,
}

export default class Item extends React.PureComponent<Props, never> {
  private focusedNode: HTMLElement;

  componentDidMount() {
    const {focusedNode} = this;
    const {focused} = this.props;

    if (focused) {
      focusedNode.focus();
    }
  }

  componentDidUpdate() {
    const {focusedNode} = this;
    const {focused} = this.props;

    if (focused) {
      focusedNode.focus();
    }
  }

  render() {
    const {id, children, panelID, onClick = noop} = this.props;

    const className = classNames(
      styles.Item,
    );

    return (
      <li role="presentation">
        <button
          id={id}
          ref={this.setFocusedNode}
          onClick={onClick}
          className={className}
          aria-controls={panelID}
          aria-selected={false}
        >
          {children}
        </button>
      </li>
    );
  }

  @autobind
  private setFocusedNode(node: HTMLElement) {
    this.focusedNode = node;
  }
}
