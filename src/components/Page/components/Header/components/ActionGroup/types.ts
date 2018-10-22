import {ActionListItemDescriptor, IconableAction, BadgeAction} from 'types';

export interface ActionGroupDescriptor extends BadgeAction {
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
