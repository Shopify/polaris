import {IconableAction, DisableableAction} from '../../types';

export interface ItemDescriptor extends IconableAction, DisableableAction {
  /** The image to use */
  image?: string;
}
