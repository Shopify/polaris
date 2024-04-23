import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {AppCardBadge} from './AppCardBadge';
import {AppCardBadgeEnum} from './types';

export default {
  component: AppCardBadge,
} as ComponentMeta<typeof AppCardBadge>;

export function BuiltForShopify() {
  return <AppCardBadge type={AppCardBadgeEnum.BuiltForShopify} />;
}
