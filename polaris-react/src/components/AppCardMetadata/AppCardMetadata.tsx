import React from 'react';

import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';

import styles from './AppCardMetadata.module.css';
import {
  AppCardAppTitle,
  AppCardBadges,
  AppCardDescription,
  AppCardPricingInfo,
  AppCardStarRating,
} from './components';
import type {AppCardMetadataTitleVariant} from './types';

export interface AppCardMetadataProps {
  appTitle: string;
  appDescription?: string;
  truncate?: boolean;
  signifiers?: string[];
  pricingInfo?: string;
  starRating?: number;
  onTitleClick?: () => void;
  titleVariant?: AppCardMetadataTitleVariant;
}

export function AppCardMetadata({
  titleVariant = 'default',
  appTitle,
  appDescription,
  signifiers = [],
  pricingInfo,
  starRating,
  truncate = false,
  onTitleClick,
}: AppCardMetadataProps) {
  return (
    <div className={styles.Container}>
      <BlockStack align="center">
        <AppCardAppTitle
          appTitle={appTitle}
          variant={titleVariant}
          truncate={truncate}
          onTitleClick={onTitleClick}
        />
        <InlineStack wrap={false} blockAlign="center" gap="100">
          {starRating ? <AppCardStarRating starRating={starRating} /> : null}

          {pricingInfo ? (
            <AppCardPricingInfo pricingInfo={pricingInfo} truncate={truncate} />
          ) : null}
        </InlineStack>

        {appDescription && <AppCardDescription description={appDescription} />}

        <AppCardBadges signifiers={signifiers} />
      </BlockStack>
    </div>
  );
}
