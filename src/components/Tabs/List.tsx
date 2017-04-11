import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';
import {addEventListener, removeEventListener} from '@shopify/javascript-utilities/events';

import Item from './Item';
import {TabDescriptor} from './Tabs';
import * as styles from './Tabs.scss';

export interface Props {
  focusIndex: number,
  disclosureTabs: TabDescriptor[],
  onClick?(tab: TabDescriptor): void,
  onKeyPress?(event: KeyboardEvent): void,
};

export default class List extends React.PureComponent<Props, {}> {
  componentDidMount() {
    addEventListener(findDOMNode(this), 'keyup', this.handleKeypress, {capture: true});
  }

  componentWillUnmount() {
    removeEventListener(findDOMNode(this), 'keyup', this.handleKeypress, true);
  }

  render() {
    const { focusIndex, disclosureTabs, onClick = noop} = this.props;
    const tabs = disclosureTabs.map((tab, index) => {
      return (
        <Item
          key={`${index}-${tab.id}`}
          index={index}
          focusIndex={focusIndex}
          tab={tab}
          onClick={onClick.bind(null, tab)}
        />
      );
    });

    return (
      <ul className={styles.List}>
        {tabs}
      </ul>
    );
  }

  @autobind
  private handleKeypress(event: KeyboardEvent) {
    const {onKeyPress = noop} = this.props;
    onKeyPress(event);
  }
}
