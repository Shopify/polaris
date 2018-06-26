import * as PropTypes from 'prop-types';
import {IconProps} from '../../components';

export interface Context {
  location: string;
  onNavDismiss?(): void;
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
  onNavDismiss: PropTypes.func,
};
