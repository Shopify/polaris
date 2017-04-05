import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import * as styles from './ProgressBar.scss';

export interface Props {
  transitionBetweenValues?: boolean,
  animatedInitialValue?: boolean,
  level: number,
}

export default function ProgressBar({level, animatedInitialValue, transitionBetweenValues}: Props) {
  const wrapperClassName = classNames(
    styles.ProgressBar,
    animatedInitialValue && styles.animatedInitialValue,
    transitionBetweenValues && styles.transitionBetweenValues,
  );

  const progressBarStyles = {
    width: `${level}%`,
  };

  return (
    <div className={wrapperClassName}>
      <div className={styles.Level} style={progressBarStyles} />
    </div>
  );
}
