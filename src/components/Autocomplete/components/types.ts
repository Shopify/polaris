import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

export const contextTypes: ValidationMap<any> = {
  selectedOptionId: PropTypes.string,
  comboBoxId: PropTypes.string,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
};
