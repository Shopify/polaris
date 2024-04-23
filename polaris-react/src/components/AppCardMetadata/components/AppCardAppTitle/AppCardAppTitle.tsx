import React from 'react';

import type {AppCardMetadataTitleVariant, TextVariant} from '../../types';
import {Text} from '../../../Text';
import {classNames} from '../../../../utilities/css';

import styles from './AppCardAppTitle.module.css';

interface AppCardAppTitleProps {
  appTitle: string;
  variant?: AppCardMetadataTitleVariant;
  onTitleClick?: () => void;
  truncate?: boolean;
}

const VARIANT_TO_TEXT_VARIANT: {
  [key in AppCardMetadataTitleVariant]: TextVariant;
} = {
  default: 'bodyMd',
  large: 'headingSm',
};

export function AppCardAppTitle({
  variant = 'default',
  onTitleClick,
  truncate = false,
  appTitle,
}: AppCardAppTitleProps) {
  const textVariant = VARIANT_TO_TEXT_VARIANT[variant ?? 'default'];

  const linkClassNames = classNames(
    styles.TitleLink,
    !onTitleClick ? styles.LinkDisabled : undefined,
  );

  const handleTitleClick = () => {
    return onTitleClick ? onTitleClick() : undefined;
  };

  return (
    <div className={styles.TitleContainer}>
      <div
        role={onTitleClick ? 'link' : undefined}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={onTitleClick ? 0 : undefined}
        className={linkClassNames}
        onClick={handleTitleClick}
      >
        <Text truncate={truncate} variant={textVariant} as="h3">
          {appTitle}
        </Text>
      </div>
    </div>
  );
}
