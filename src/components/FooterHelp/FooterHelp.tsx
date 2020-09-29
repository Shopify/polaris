import React from 'react';
import {QuestionMarkMajor, InfoMinor} from '@shopify/polaris-icons';

import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';
import type {IconProps} from '../../types';
import {Icon} from '../Icon';

import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  const {newDesignLanguage} = useFeatures();
  const className = classNames(
    styles.FooterHelp,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const iconProps: IconProps = {
    source: newDesignLanguage ? InfoMinor : QuestionMarkMajor,
    color: newDesignLanguage ? 'highlight' : 'teal',
    backdrop: !newDesignLanguage,
  };

  return (
    <div className={className}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon {...iconProps} />
        </div>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
