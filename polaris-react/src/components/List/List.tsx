import type {ReactNode, FunctionComponent} from 'react';

import {classNames, variationName} from '../../utilities/css';

import {Item} from './components';
import styles from './List.scss';

type Type = 'bullet' | 'number';

export interface ListProps {
  /**
   * Type of list to display
   * @default 'bullet'
   */
  type?: Type;
  /** List item elements */
  children?: ReactNode;
}

export const List: FunctionComponent<ListProps> & {
  Item: typeof Item;
} = function List({children, type = 'bullet'}: ListProps) {
  const className = classNames(
    styles.List,
    type && styles[variationName('type', type)],
  );

  const ListElement = type === 'bullet' ? 'ul' : 'ol';
  return <ListElement className={className}>{children}</ListElement>;
};

List.Item = Item;
