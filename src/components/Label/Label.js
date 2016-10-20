// @flow

import React from 'react';

import {css} from '../../utilities/styles';

import styles from './Label.scss';

export type Props = {
  children?: any,
  id: string,
  error?: boolean,
  note?: string,
  action?: React$Element<*>,
};

export default function Label(props: Props) {
  const {children, note, id, action} = props;

  return (
    <div className={styles.LabelWrapper}>
      <label htmlFor={id} className={classNameForLabel(props)}>{children} {note}</label>
      {action}
    </div>
  );
}

Label.defaultProps = {
  error: false,
};

function classNameForLabel({error}) {
  return css([
    styles.Label,
    error && styles.error,
  ]);
}
