import {
  ActionListItemDescriptor,
  Action,
  IconableAction,
  DisableableAction,
  BadgeAction,
} from '../../types';
import {PaginationDescriptor} from '../Pagination';
import {Props as BreadcrumbProps} from '../Breadcrumbs';
import {Props as ButtonProps} from '../Button';

export type SecondaryAction = IconableAction & DisableableAction;

export interface ActionGroup extends BadgeAction {
  /** Action group title */
  title: string;
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Action details */
  details?: React.ReactNode;
  /** Callback when any action takes place */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export interface ActionProps {
  children?: string;
  disclosure?: boolean;
  url?: IconableAction['url'];
  external?: IconableAction['external'];
  icon?: IconableAction['icon'];
  onAction?: IconableAction['onAction'];
  accessibilityLabel?: IconableAction['accessibilityLabel'];
  disabled?: DisableableAction['disabled'];
  showIndicator?: boolean;
  hasIndicator?: boolean;
}

export interface HeaderProps {
  /** Page title, in large type */
  title: string;
  /** Visually hide the title */
  titleHidden?: boolean;
  /** App icon, for pages that are part of Shopify apps */
  icon?: string;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbProps['breadcrumbs'];
  /** Adds a border to the bottom of the page header */
  separator?: boolean;
  /** Collection of secondary page-level actions */
  secondaryActions?: SecondaryAction[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: ActionGroup[];
  /** Primary page-level action */
  primaryAction?: Action & ButtonProps;
  /** Page-level pagination */
  pagination?: PaginationDescriptor;
}

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  singleColumn?: boolean;
}
