import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

export const contextTypes: ValidationMap<any> = {
  selectMode: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedItems: PropTypes.array,
  persistActions: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
};
