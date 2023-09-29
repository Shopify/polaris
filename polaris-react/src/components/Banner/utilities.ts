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

import type {BannerTone} from './Banner';

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

export const bannerAttributes: {[key in BannerTone]: BannerAttributes} = {
  success: {
    withinPage: {
      background: 'bg-success-strong',
      text: 'text-success-on-bg-fill',
      icon: 'text-success-on-bg-fill',
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
      text: 'text-warning-on-bg-fill',
      icon: 'text-warning-on-bg-fill',
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
      text: 'text-critical-on-bg-fill',
      icon: 'text-critical-on-bg-fill',
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
      text: 'text-info-on-bg-fill',
      icon: 'text-info-on-bg-fill',
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
