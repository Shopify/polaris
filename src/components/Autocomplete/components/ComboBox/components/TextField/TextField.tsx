import React from 'react';

import ComboBoxContext from '../../context';
import BaseTextField, {Props as TextFieldProps} from '../../../../../TextField';

export default function TextField(props: TextFieldProps) {
  return (
    <ComboBoxContext.Consumer>
      {({selectedOptionId, comboBoxId}) => (
        <BaseTextField
          {...props}
          autoComplete={false}
          ariaAutocomplete="list"
          ariaActiveDescendant={selectedOptionId}
          ariaControls={comboBoxId}
        />
      )}
    </ComboBoxContext.Consumer>
  );
}
