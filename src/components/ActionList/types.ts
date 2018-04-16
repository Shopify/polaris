import {IconableAction, DisableableAction, BadgeAction} from '../../types';

export interface ItemDescriptor
  extends IconableAction,
    DisableableAction,
    BadgeAction {
  /** Image source */
  image?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
}
