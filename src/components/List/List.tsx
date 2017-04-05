import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';

import {noop} from '@shopify/javascript-utilities/other';
import * as styles from './List.scss';

export interface Props<T> {
  items: T[],
  renderItem?(item: T): React.ReactNode,
  getKeyForItem?(item: T): string,
  onItemSelect?(item: T): void,
}

export default class List<T> extends React.PureComponent<Props<T>, {}> {
  static of<S>(_: S[]) {
    return List as ReactComponent<Props<S>>;
  }

  render() {
    const {
      items,
      renderItem = defaultRenderer,
      getKeyForItem,
      onItemSelect,
    } = this.props;
    const getKey = getKeyForItem || ((item) => defaultKeyGenerator(item));
    const ItemComponent = ListItem as ReactComponent<ItemProps<T>>;

    return (
      <ul className={styles.List}>
        {items.map((item) => (
          <ItemComponent key={getKey(item)} item={item} onSelect={onItemSelect}>{renderItem(item)}</ItemComponent>
        ))}
      </ul>
    );
  }
}

function defaultRenderer(item: any): string {
  return item.toString();
}

function defaultKeyGenerator(item: any): string {
  if (item.id) { return item.id; }
  return item.toString();
}

interface ItemProps<T> {
  item: T,
  children?: React.ReactNode,
  onSelect?(item: T): void,
}

function ListItem<T>({
  item,
  children,
  onSelect,
}: ItemProps<T>) {
  const onClick = onSelect ? onSelect.bind(null, item) : noop;

  return (
    <li className={styles.ListItem} onClick={onClick}>
      {children}
    </li>
  );
}
