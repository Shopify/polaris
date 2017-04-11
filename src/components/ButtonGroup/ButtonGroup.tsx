import * as React from 'react';
import {elementChildren} from '@shopify/react-utilities/components';
import {Props as ButtonProps} from '../Button';
import Item from './Item';
import * as styles from './ButtonGroup.scss';

export interface Props {
  segmented?: boolean,
  children?: React.ReactElement<ButtonProps>[],
}

export default function ButtonGroup({children, segmented}: Props) {
  const contents = elementChildren(children)
    .map((child, index) => <Item button={child} key={index} />);

  return segmented
    ? <div className={styles.Segmented}>{children}</div>
    : <div className={styles.ButtonGroup}>{contents}</div>;
}
