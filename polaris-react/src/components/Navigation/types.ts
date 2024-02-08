import type {ReactNode} from 'react';

import type {TooltipProps} from '../Tooltip';
import type {IconProps} from '../Icon';

export interface ItemURLDetails {
  url?: string;
  matches?: boolean;
  exactMatch?: boolean;
  matchPaths?: string[];
  excludePaths?: string[];
  external?: boolean;
}

export interface ItemProps extends ItemURLDetails {
  icon?: IconProps['source'];
  matchedItemIcon?: IconProps['source'];
  badge?: ReactNode;
  label: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  selected?: boolean;
  exactMatch?: boolean;
  new?: boolean;
  showVerticalLine?: boolean;
  showVerticalHoverPointer?: boolean;
  onMouseEnter?(label: string): void;
  onMouseLeave?(): void;
  subNavigationItems?: SubNavigationItem[];
  /** @deprecated Use secondaryActions instead. */
  secondaryAction?: SecondaryAction;
  secondaryActions?: SecondaryActions;
  level?: number;
  displayActionsOnHover?: boolean;
  onClick?(): void;
  onToggleExpandedState?(): void;
  expanded?: boolean;
  shouldResizeIcon?: boolean;
  truncateText?: boolean;
  viewTransition?: boolean;
}

export interface SubNavigationItem extends ItemURLDetails {
  url: string;
  label: string;
  disabled?: boolean;
  new?: boolean;
  onClick?(): void;
}

export interface SecondaryAction {
  accessibilityLabel: string;
  icon: IconProps['source'];
  url?: string;
  onClick?(): void;
  tooltip?: TooltipProps;
}

export type SecondaryActions =
  | [SecondaryAction]
  | [SecondaryAction, SecondaryAction];

export enum MatchState {
  MatchForced,
  MatchUrl,
  MatchPaths,
  Excluded,
  NoMatch,
}
