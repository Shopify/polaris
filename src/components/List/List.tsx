import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './List.scss';
import Item from './Item';

export type Type = 'bullet' | 'number';

export interface Props {
  children?: React.ReactNode,
  type?: Type,
}

export default class ContentList extends React.PureComponent<Props, never> {
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
