import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Props as ButtonProps} from '../Button';
import * as styles from './ButtonGroup.scss';

export interface Props {
  button: React.ReactElement<ButtonProps>,
}

export default function Item({button}: Props) {
  const className = classNames(
    styles.Item,
    button.props.plain && styles.plain,
  );

  return <div className={className}>{button}</div>;
}
