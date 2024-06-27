import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {Badge} from '../Badge';

import {AppCardBadgeEnum} from './types';

export interface AppCardBadgeProps {
  type: AppCardBadgeEnum;
}

export function AppCardBadge({type}: AppCardBadgeProps) {
  const i18n = useI18n();

  if (type === AppCardBadgeEnum.BuiltForShopify) {
    const content = i18n.translate(`Polaris.AppCardBadge.builtForShopify`);
    return <Badge tone="info">{content}</Badge>;
  }
  return null;
}
