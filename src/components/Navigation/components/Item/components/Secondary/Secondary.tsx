import React from 'react';

import {useUniqueId} from '../../../../../../utilities/unique-id';
import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';
import {useFeatures} from '../../../../../../utilities/features';
import {Tokens} from '../../../../../../utilities/theme';

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
}

export function Secondary({children, expanded}: SecondaryProps) {
  const id = useUniqueId('SecondaryNavigation');
  const {newDesignLanguage = false} = useFeatures();

  const transitionProperties = {
    duration: newDesignLanguage ? Tokens.duration150 : '0ms',
    timingFunction: newDesignLanguage ? Tokens.ease : 'none',
  };

  return (
    <Collapsible id={id} open={expanded} transition={transitionProperties}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
