import React from 'react';

import {AppIcon} from '../AppIcon';
import {AppCardMetadata} from '../AppCardMetadata';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {AppCardAction} from '../AppCardAction';
import type {AppCardActionType} from '../AppCardAction';
import {useI18n} from '../../utilities/i18n';

import type {AppCardVariant, AppCardSize} from './types';
import {AppCardSizingMode} from './types';
import styles from './AppCard.module.css';
import {AppCardWrapper} from './components';
import {useAppCardSizing} from './hooks';

export interface AppCardProps {
  as?: 'div' | 'li';
  title: string;
  iconUrl?: string;
  action: AppCardActionType;
  description?: string;
  signifiers?: string[];
  pricingInfo?: string;
  starRating?: number;
  variant?: AppCardVariant;
  sizingMode?: AppCardSizingMode;
  size?: AppCardSize;
  onTitleClick?: () => void;
  onIconClick?: () => void;
}

export function AppCard({
  title,
  description,
  iconUrl,
  signifiers = [],
  action,
  pricingInfo,
  starRating,
  variant = 'primary',
  sizingMode = AppCardSizingMode.Adaptive,
  size = 'md',
  as = 'div',
  onTitleClick,
  onIconClick,
}: AppCardProps) {
  const {isNarrow, onNarrowChange} = useAppCardSizing(sizingMode);
  const i18n = useI18n();

  return (
    <AppCardWrapper
      as={as}
      variant={variant}
      onNarrowChange={onNarrowChange}
      accessibilityLabel={
        title
          ? i18n.translate('Polaris.AppCard.accessibilityLabel', {
              appTitle: title,
            })
          : undefined
      }
    >
      <InlineStack gap="300">
        <BlockStack align="start">
          <AppIcon
            onClick={onIconClick}
            size={size}
            appTitle={title}
            source={iconUrl}
          />
        </BlockStack>
        <div className={styles.MetadataContainer}>
          <AppCardMetadata
            onTitleClick={onTitleClick}
            signifiers={signifiers}
            truncate={isNarrow}
            appTitle={title}
            appDescription={isNarrow ? undefined : description}
            pricingInfo={pricingInfo}
            starRating={starRating}
          />
        </div>
        <BlockStack align="center">
          <AppCardAction
            action={action}
            variant={isNarrow ? 'narrow' : 'default'}
          />
        </BlockStack>
      </InlineStack>
    </AppCardWrapper>
  );
}
