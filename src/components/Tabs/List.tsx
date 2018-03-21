import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {autobind} from '@shopify/javascript-utilities/decorators';

import Item from './Item';
import {TabDescriptor, getTabContent} from './Tabs';
import * as styles from './Tabs.scss';

export interface Props {
  focusIndex: number;
  disclosureTabs: TabDescriptor[];
  onClick?(id: string): void;
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
}

export default class List extends React.PureComponent<Props, never> {
  render() {
    const {focusIndex, disclosureTabs, onClick = noop} = this.props;
    const tabs = disclosureTabs.map((tab, index) => {
      const tabContent = getTabContent(tab);
      return (
        <Item
          key={tab.id}
          id={tab.id}
          panelID={tab.panelID}
          focused={index === focusIndex}
          accessibilityLabel={tab.accessibilityLabel}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onClick.bind(null, tab.id)}
        >
          {tabContent}
        </Item>
      );
    });

    return (
      <ul
        className={styles.List}
        onKeyDown={handleKeyDown}
        onKeyUp={this.handleKeypress}
      >
        {tabs}
      </ul>
    );
  }

  @autobind
  private handleKeypress(event: React.KeyboardEvent<HTMLElement>) {
    const {onKeyPress = noop} = this.props;
    onKeyPress(event);
  }
}

function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
  const {key} = event;

  if (
    key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
