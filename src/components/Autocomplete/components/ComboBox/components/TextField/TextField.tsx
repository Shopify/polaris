import * as React from 'react';

import {ComboBoxContext} from 'components/Autocomplete/components/types';
import BaseTextField, {Props as TextFieldProps} from '../../../../../TextField';
import {Consumer} from '../Context';

export default function TextField(props: TextFieldProps) {
  return (
    <Consumer>
      {({selectedOptionId, comboBoxId}: ComboBoxContext) => (
        <BaseTextField
          {...props}
          autoComplete={false}
          ariaAutocomplete="list"
          ariaActiveDescendant={selectedOptionId}
          ariaControls={comboBoxId}
        />
      )}
    </Consumer>
  );
}
