import {IconableAction, DisableableAction} from '../../types';

export interface ItemDescriptor extends IconableAction, DisableableAction {
  image?: string;
}
