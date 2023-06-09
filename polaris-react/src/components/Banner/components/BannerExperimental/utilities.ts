import {useContext} from 'react';
import type {
  ColorBackgroundAlias,
  ColorIconAlias,
  ColorTextAlias,
} from '@shopify/polaris-tokens';
import {
  DiamondAlertMinor,
  InfoMinor,
  RiskMinor,
  TickMinor,
} from '@shopify/polaris-icons';

import {WithinContentContext} from '../../../../utilities/within-content-context';
import type {BannerProps, BannerStatus} from '../../Banner';
import type {IconSource} from '../../../../types';

interface BannerColorAliases {
  background: ColorBackgroundAlias;
  text: ColorTextAlias;
  icon: ColorIconAlias | ColorTextAlias;
}

interface BannerAttributes {
  withinPage: BannerColorAliases;
  withinContentContainer: BannerColorAliases;
  icon: IconSource;
}

export function useBannerAttributes(status: BannerProps['status'] = 'info') {
  const withinContentContainer = useContext(WithinContentContext);
  const bannerColors =
    bannerAttributes[status][
      withinContentContainer ? 'withinContentContainer' : 'withinPage'
    ];

  return {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    iconColor: bannerColors.icon,
    StatusIcon: bannerAttributes[status].icon,
  };
}

const bannerAttributes: {[key in BannerStatus]: BannerAttributes} = {
  success: {
    withinPage: {
      background: 'bg-success-strong',
      text: 'text-on-color',
      icon: 'icon-on-color',
    },
    withinContentContainer: {
      background: 'bg-success-subdued',
      text: 'text-success',
      icon: 'icon-success-strong-experimental',
    },
    icon: TickMinor,
  },
  warning: {
    withinPage: {
      background: 'bg-warning-strong-experimental',
      text: 'text-warning-strong',
      icon: 'text-warning-strong',
    },
    withinContentContainer: {
      background: 'bg-warning-subdued-experimental',
      text: 'text-warning-experimental',
      icon: 'icon-warning-strong-experimental',
    },
    icon: RiskMinor,
  },
  critical: {
    withinPage: {
      background: 'bg-critical-strong',
      text: 'text-on-color',
      icon: 'icon-on-color',
    },
    withinContentContainer: {
      background: 'bg-critical-subdued',
      text: 'text-critical-strong',
      icon: 'icon-critical-strong-experimental',
    },
    icon: DiamondAlertMinor,
  },
  info: {
    withinPage: {
      background: 'bg-info-strong',
      text: 'text-info-strong',
      icon: 'text-info-strong',
    },
    withinContentContainer: {
      background: 'bg-info-subdued',
      text: 'text-info',
      icon: 'icon-info-strong-experimental',
    },
    icon: InfoMinor,
  },
};
