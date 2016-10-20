// @flow

import React from 'react';
import {css} from '../../utilities/styles';
import styles from './TypeContainer.scss';

type Props = {
  children?: any,
  subdued?: boolean,
};

export default function TypeContainer(props: Props) {
  const {children} = props;

  return (
    <div className={classNameForTypeContainer(props)}>{children}</div>
  );
}

function classNameForTypeContainer({subdued}) {
  return css([
    styles.TypeContainer,
    subdued && styles.subdued,
  ]);
}
