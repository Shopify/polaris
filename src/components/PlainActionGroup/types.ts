import {
  ActionListItemDescriptor,
  BadgeAction,
  IconableAction,
} from '../../types';

export interface PlainActionGroupDescriptor extends BadgeAction {
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
