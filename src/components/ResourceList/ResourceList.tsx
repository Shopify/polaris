import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import Item from './Item';
import {FilterControl} from './components';
import * as styles from './ResourceList.scss';

export interface Props {
  items: any[],
  filterControl?: React.ReactNode,
  idForItem?(item: any, index: number): string | number,
  renderItem(item: any, index: number): React.ReactNode,
}

export default class ResourceList extends React.PureComponent<Props, never> {
  static Item = Item;
  static FilterControl = FilterControl;

  render() {
    const {items, filterControl} = this.props;

    const headerMarkup = filterControl
      ? filterControl
      : null;

    const itemsMarkup = (
      <ul className={styles.ResourceList}>
        {items.map(this.renderItem)}
      </ul>
    );

    return (
      <div>
        {headerMarkup}
        {itemsMarkup}
      </div>
    );
  }

  @autobind
  private renderItem(item: any, index: number) {
    const {renderItem, idForItem = defaultIdForItem} = this.props;

    const key = idForItem(item, index);

    return (
      <li key={key} className={styles.ItemWrapper}>
        {renderItem(item, index)}
      </li>
    );
  }
}

function defaultIdForItem(item: any, index: number) {
  return item.hasOwnProperty('id') ? item.id : index;
}
