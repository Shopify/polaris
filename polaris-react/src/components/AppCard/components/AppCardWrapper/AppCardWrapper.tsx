import React from 'react';
import {themeDefault, toPx} from '@shopify/polaris-tokens';

import type {AppCardVariant} from '../../types';
import type {AppCardMeasurements} from '../AppCardMeasurer';
import {AppCardMeasurer} from '../AppCardMeasurer';
import {debounce} from '../../../../utilities/debounce';
import type {AppCardProps} from '../../AppCard';
import type {BoxProps} from '../../../Box';
import {Box} from '../../../Box';

const DEBOUNCE_TIME_MS = 200;

const DEFAULT_BOX_STYLE: BoxProps = {
  background: 'bg-surface',
  paddingBlockStart: '300',
  paddingBlockEnd: '300',
  paddingInlineStart: '400',
  paddingInlineEnd: '400',
  borderWidth: '025',
  borderColor: 'border-brand',
  borderRadius: '300',
};

const VARIANT_TO_BOX_PROPS_MAP: {[key in AppCardVariant]: BoxProps} = {
  primary: {
    ...DEFAULT_BOX_STYLE,
  },
  secondary: {
    ...DEFAULT_BOX_STYLE,
    background: 'bg-surface-secondary',
  },
  noBackground: {
    ...DEFAULT_BOX_STYLE,
    background: undefined,
    paddingBlockStart: '0',
    paddingBlockEnd: '0',
    paddingInlineStart: '0',
    paddingInlineEnd: '0',
    borderWidth: '0',
    borderColor: 'transparent',
  },
};

export type AppCardWrapperProps = Pick<AppCardProps, 'variant' | 'as'> & {
  children: React.ReactNode;
  onNarrowChange?: (isNarrow: boolean) => void;
  accessibilityLabel?: string;
};

export function AppCardWrapper({
  variant = 'primary',
  as = 'div',
  children,
  accessibilityLabel,
  onNarrowChange = () => {},
}: AppCardWrapperProps) {
  const handleMeasurement = debounce(
    ({containerWidth}: AppCardMeasurements) => {
      const breakpointWidthInPx = toPx(
        themeDefault.breakpoints['breakpoints-sm'],
      );
      const breakpointWidth = breakpointWidthInPx
        ? parseFloat(breakpointWidthInPx)
        : 0;

      onNarrowChange(containerWidth <= breakpointWidth);
    },
    DEBOUNCE_TIME_MS,
  );

  return (
    <AppCardMeasurer handleMeasurement={handleMeasurement}>
      <Box
        {...VARIANT_TO_BOX_PROPS_MAP[variant]}
        aria-label={accessibilityLabel}
        as={as}
        role={as === 'div' ? 'group' : undefined}
      >
        {children}
      </Box>
    </AppCardMeasurer>
  );
}
