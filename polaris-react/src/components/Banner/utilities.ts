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
import {useImperativeHandle, useRef, useState} from 'react';

import type {IconSource} from '../../types';

import type {BannerStatus} from './Banner';

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

export const bannerAttributes: {[key in BannerStatus]: BannerAttributes} = {
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

export interface BannerHandles {
  focus(): void;
}

export function useBannerFocus(bannerRef: React.Ref<BannerHandles>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldShowFocus, setShouldShowFocus] = useState(false);

  useImperativeHandle(
    bannerRef,
    () => ({
      focus: () => {
        wrapperRef.current?.focus();
        setShouldShowFocus(true);
      },
    }),
    [],
  );

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };

  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };

  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus,
  };
}
