import React from 'react';

// eslint-disable-next-line shopify/strict-component-boundaries
import {ComboBoxContext} from '../ComboBox/context';
import BaseTextField, {Props as TextFieldProps} from '../../../TextField';

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
