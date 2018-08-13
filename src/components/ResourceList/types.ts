import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

export const contextTypes: ValidationMap<any> = {
  selectMode: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedItems: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  resourceName: PropTypes.object,
  loading: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
};

export type SelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';
