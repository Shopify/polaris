import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import Item from './Item';
import * as styles from './ResourceList.scss';

export interface Props {
  items: any[],
  renderItem(item: any, index: number): React.ReactNode,
}

export default class ResourceList extends React.PureComponent<Props, never> {
  static Item = Item;

  render() {
    const {items} = this.props;

    return (
      <ul className={styles.ResourceList}>
        {items.map(this.renderItem)}
      </ul>
    );
  }

  @autobind
  private renderItem(item: any, index: number) {
    const {renderItem} = this.props;

    return (
      <li key={index} className={styles.ItemWrapper}>
        {renderItem(item, index)}
      </li>
    );
  }
}
