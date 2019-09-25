import React from 'react';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';

import * as styles from './ScrollButton.scss';

export interface ScrollButtonProps {
  direction: 'left' | 'right';
  onboarding?: boolean;
  onClick(): void;
}

export function ScrollButton({
  direction,
  onboarding,
  onClick,
}: ScrollButtonProps) {
  const scrollButtonClassName = classNames(
    styles.ScrollButton,
    onboarding && styles.onboarding,
  );

  const iconColor = onboarding ? 'white' : 'inkLighter';

  const buttonIcon =
    direction === 'left' ? (
      <Icon source={ChevronLeftMinor} color={iconColor} />
    ) : (
      <Icon source={ChevronRightMinor} color={iconColor} />
    );

  return (
    <button className={scrollButtonClassName} onClick={onClick}>
      <span className={styles.IconWrapper}>{buttonIcon}</span>
    </button>
  );
}
