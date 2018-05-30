import {IconableAction, DisableableAction} from '../../types';

export interface ItemDescriptor extends IconableAction, DisableableAction {
  /** Image source */
  image?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
}
