import React from 'react';
import {ExitMajor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {useI18n} from '../../utilities/i18n';

import styles from './FullscreenBar.scss';

export interface FullscreenBarProps {
  /** Callback when back button is clicked */
  onAction: () => void;
  /** Render child elements */
  children?: React.ReactNode;
}

export function FullscreenBar({onAction, children}: FullscreenBarProps) {
  const i18n = useI18n();

  return (
    <div className={styles.FullscreenBar}>
      <button
        className={styles.BackAction}
        onClick={onAction}
        aria-label={i18n.translate('Polaris.FullscreenBar.accessibilityLabel')}
      >
        <Icon source={ExitMajor} />
        {i18n.translate('Polaris.FullscreenBar.back')}
      </button>
      {children}
    </div>
  );
}
