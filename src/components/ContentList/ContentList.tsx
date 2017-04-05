import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './ContentList.scss';
import Item from './Item';

export type ListType = 'bullet' | 'number';

export interface Props {
  children?: React.ReactNode,
  type?: ListType,
}

export default class ContentList extends React.Component<Props, {}> {
  static Item = Item;

  render() {
    const {children, type = 'bullet'} = this.props;
    const className = classNames(
      styles.ContentList,
      type && styles[variationName('type', type)],
    );

    const ListTag = type === 'bullet' ? 'ul' : 'ol';
    return <ListTag className={className}>{children}</ListTag>;
  }
}
