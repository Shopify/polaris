import * as PropTypes from 'prop-types';
import {Props as IconProps} from '../Icon';
import {contentContextTypes} from '../../types';

export interface Context {
  location: string;
  onNavigationDismiss?(): void;
}

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

export const contextTypes = {
  location: PropTypes.string,
  onNavigationDismiss: PropTypes.func,
  ...contentContextTypes,
};
