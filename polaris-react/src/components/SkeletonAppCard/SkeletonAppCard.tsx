import React from 'react';

import {AppCardWrapper} from '../AppCard';
import type {AppCardProps} from '../AppCard';
import {SkeletonBodyText} from '../SkeletonBodyText';
import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';
import {AppIcon} from '../AppIcon';
import {useI18n} from '../../utilities/i18n';

import styles from './SkeletonAppCard.module.css';

type SkeletonAppCardProps = Pick<AppCardProps, 'size' | 'variant' | 'as'>;

export function SkeletonAppCard({
  variant = 'primary',
  size = 'md',
  as = 'div',
}: SkeletonAppCardProps) {
  const i18n = useI18n();
  const numLines = Math.max(1, ['sm', 'md', 'lg'].indexOf(size) + 1);

  const bodyTextLines = [];
  for (let i = 1; i <= numLines; i += 1) {
    bodyTextLines.push(<SkeletonBodyText lines={1} key={i} />);
  }

  const labelTranslationKey = `Polaris.SkeletonAppCard.loadingLabel`;

  return (
    <AppCardWrapper
      variant={variant}
      as={as}
      accessibilityLabel={i18n.translate(labelTranslationKey)}
    >
      <InlineStack gap="300" blockAlign="center">
        <AppIcon size={size} />
        <div className={styles.MetadataContainer}>
          <BlockStack align="center" gap="200">
            {bodyTextLines}
          </BlockStack>
        </div>
      </InlineStack>
    </AppCardWrapper>
  );
}
