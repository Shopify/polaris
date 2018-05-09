import {IconableAction, DisableableAction} from '../../types';

export interface ItemDescriptor extends IconableAction, DisableableAction {
  /** Image source */
  image?: string;
}
