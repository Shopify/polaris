// @flow

import React from 'react';
import {css} from '../../utilities/styles';
import styles from './Subheading.scss';

type Props = {
  level?: 3 | 4,
  children?: any,
  subdued?: boolean,
};

export default function Subheading(props: Props) {
  const {level = 3, children} = props;

  return level === 3
    ? <h3 className={classNameForSubheading(props)}>{children}</h3>
    : <h4 className={classNameForSubheading(props)}>{children}</h4>;
}

function classNameForSubheading({subdued}) {
  return css([
    styles.Subheading,
    subdued && styles.subdued,
  ]);
}
