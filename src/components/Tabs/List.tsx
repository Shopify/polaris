import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';

import Item from './Item';
import {TabDescriptor} from './Tabs';
import * as styles from './Tabs.scss';

export interface Props {
  focusIndex: number,
  disclosureTabs: TabDescriptor[],
  onClick?(id: string): void,
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void,
}

export default class List extends React.PureComponent<Props, never> {
  render() {
    const {focusIndex, disclosureTabs, onClick = noop} = this.props;
    const tabs = disclosureTabs.map(({id, panelID, title}, index) => {
      return (
        <Item
          key={id}
          id={id}
          panelID={panelID}
          focused={index === focusIndex}
          onClick={onClick.bind(null, id)}
        >
          {title}
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

  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
