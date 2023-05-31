import React, {useId} from 'react';

import {classNames} from '../../../../../../utilities/css';
import {useFeatures} from '../../../../../../utilities/features';
import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
  id?: string;
}

export function Secondary({id, children, expanded}: SecondaryProps) {
  const uid = useId();
  const {polarisSummerEditions2023} = useFeatures();

  return (
    <Collapsible id={id || uid} open={expanded} transition={false}>
      <ul
        className={classNames(
          styles.List,
          polarisSummerEditions2023 && styles.ListSecondary,
        )}
      >
        {children}
      </ul>
    </Collapsible>
  );
}
