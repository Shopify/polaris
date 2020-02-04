import React from 'react';
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
  children?: React.ReactNode;
}

export class List extends React.PureComponent<ListProps, never> {
  static Item = Item;

  render() {
    const {children, type = 'bullet'} = this.props;
    const className = classNames(
      styles.List,
      type && styles[variationName('type', type)],
    );

    const ListElement = type === 'bullet' ? 'ul' : 'ol';
    return <ListElement className={className}>{children}</ListElement>;
  }
}
