import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

export const contextTypes: ValidationMap<any> = {
  selectMode: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedItems: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  resourceName: PropTypes.object,
  loading: PropTypes.bool,
  sortOptions: PropTypes.array,
  sortValue: PropTypes.string,
  onSortChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
};

export type SelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum BulkActionType {
  AddTags,
  CapturePayments,
  CreateShippingLabels,
  Fulfill,
  RemoveTags,
}

export enum MouseButton {
  Main,
  Auxiliary,
  Secondary,
  Fourth,
  Fifth,
}
