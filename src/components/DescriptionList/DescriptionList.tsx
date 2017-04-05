import * as React from 'react';
import * as styles from './DescriptionList.scss';
import Item from './Item';

export interface Props {
  children?: React.ReactNode,
}

export default class DescriptionList extends React.PureComponent<Props, {}> {
  static Item = Item;

  render() {
    const {children} = this.props;

    return (
      <dl className={styles.DescriptionList}>
        {children}
      </dl>
    );
  }
}
