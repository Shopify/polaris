import React from 'react';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {ComboBoxContext} from '../ComboBox/context';
import {TextField as BaseTextField, TextFieldProps} from '../../../TextField';

export function TextField(props: TextFieldProps) {
  return (
    <ComboBoxContext.Consumer>
      {({selectedOptionId, comboBoxId}) => (
        <BaseTextField
          {...props}
          role="combobox"
          autoComplete="nope"
          ariaAutocomplete="list"
          ariaActiveDescendant={selectedOptionId}
          ariaControls={comboBoxId}
        />
      )}
    </ComboBoxContext.Consumer>
  );
}
