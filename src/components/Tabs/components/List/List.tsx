import React from 'react';

import Item from '../Item';
import {TabDescriptor} from '../../types';
import styles from '../../Tabs.scss';

export interface Props {
  disclosureTabs: TabDescriptor[];
  onClick?(id: string): void;
}

export default class List extends React.PureComponent<Props, never> {
  render() {
    const {disclosureTabs, onClick = noop} = this.props;
    const tabs = disclosureTabs.map(({id, content, ...tabProps}) => {
      return (
        <Item {...tabProps} key={id} id={id} onClick={onClick.bind(null, id)}>
          {content}
        </Item>
      );
    });

    return <ul className={styles.List}>{tabs}</ul>;
  }
}

function noop() {}
