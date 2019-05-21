import {Props as IconProps} from '../Icon';
import {contentContextTypes} from '../../types';

export interface ItemType {
  label: string;
  url: string;
  icon?: IconProps['source'];
}

export interface SectionType {
  title?: string;
  fill?: boolean;
  items?: ItemType[];
}
