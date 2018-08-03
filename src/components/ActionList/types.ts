import {
  IconableAction,
  DisableableAction,
  BadgeAction,
  DestructableAction,
} from '../../types';

export interface ItemDescriptor
  extends IconableAction,
    DisableableAction,
    BadgeAction,
    DestructableAction {
  /** Image source */
  image?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
}
