import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';

import {TabDescriptor} from './Tabs';
import * as styles from './Tabs.scss';

export interface Props {
  focusIndex: number,
  index: number,
  tab: TabDescriptor,
  onClick?(tab: TabDescriptor): void,
};

export default class Item extends React.PureComponent<Props, never> {
  private focusedNode: HTMLElement;

  componentDidUpdate() {
    const {focusedNode} = this;
    const {index, focusIndex} = this.props;

    if (index === focusIndex) {
      focusedNode.focus();
    }
  }

  render() {
    const {tab, onClick = noop} = this.props;

    const className = classNames(
      styles.Item,
    );

    return (
      <li>
        <button
          ref={this.setFocusedNode}
          onClick={onClick.bind(null, tab)}
          className={className}
        >
          {tab.title}
        </button>
      </li>
    );
  }

  @autobind
  private setFocusedNode(node: HTMLElement) {
    this.focusedNode = node;
  }
}
