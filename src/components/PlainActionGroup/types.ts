import {
  ActionListItemDescriptor,
  BadgeAction,
  IconableAction,
} from '../../types';

export interface PlainActionGroupDescriptor extends BadgeAction {
  /** Action group title */
  title: string;
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** Action details */
  details?: React.ReactNode;
  /** Callback when any action takes place */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}
