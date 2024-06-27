import React from 'react';
import {ImportIcon} from '@shopify/polaris-icons';

import {Button} from '../Button';
import {useI18n} from '../../utilities/i18n';

import type {
  AppCardActionType,
  AppCardActionVariant,
  AppCardActionSize,
} from './types';
import {AppCardActionEnum} from './types';

export interface AppCardActionProps {
  action?: AppCardActionType;
  variant?: AppCardActionVariant;
  size?: AppCardActionSize;
}

const STYLES_BY_ACTION: {
  [key in AppCardActionEnum]: {
    contentKey: string;
    altKey: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  };
} = {
  [AppCardActionEnum.Install]: {
    contentKey: 'install',
    altKey: 'installAlt',
    icon: ImportIcon,
  },
  [AppCardActionEnum.Open]: {
    contentKey: 'open',
    altKey: 'openAlt',
  },
};

export function AppCardAction({
  action = {type: AppCardActionEnum.Install},
  variant = 'default',
  size = 'medium',
}: AppCardActionProps) {
  const i18n = useI18n();

  const stylesForAction =
    STYLES_BY_ACTION[action?.type ?? AppCardActionEnum.Install];

  const translationKeyPrefix = 'Polaris.AppCardAction.Actions';

  return (
    <Button
      accessibilityLabel={i18n.translate(
        `${translationKeyPrefix}.${stylesForAction.altKey}`,
      )}
      disabled={action?.disabled ?? false}
      loading={action?.loading ?? false}
      size={size ?? 'medium'}
      fullWidth={variant === 'full'}
      icon={stylesForAction.icon}
      onClick={action.onAction ?? (() => {})}
    >
      {variant !== 'narrow'
        ? i18n.translate(
            `${translationKeyPrefix}.${stylesForAction.contentKey}`,
          )
        : undefined}
    </Button>
  );
}
