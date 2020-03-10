import React from 'react';
import {QuestionMarkMajorTwotone} from '@shopify/polaris-icons';
import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';
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

  return (
    <div className={className}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon source={QuestionMarkMajorTwotone} color="teal" backdrop />
        </div>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
