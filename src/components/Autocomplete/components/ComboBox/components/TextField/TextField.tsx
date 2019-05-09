import * as React from 'react';

import ComboBoxContext, {ComboBoxContextType} from '../../context';
import BaseTextField, {Props as TextFieldProps} from '../../../../../TextField';

export default function TextField(props: TextFieldProps) {
  return (
    <ComboBoxContext.Consumer>
      {({selectedOptionId, comboBoxId}: ComboBoxContextType) => (
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
