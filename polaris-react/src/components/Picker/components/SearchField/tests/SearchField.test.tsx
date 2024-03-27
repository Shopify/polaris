import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SearchField} from '../SearchField';
import {Label} from '../../../../Label';
import type {ComboboxTextFieldType} from '../../../../../utilities/combobox';
import {ComboboxTextFieldContext} from '../../../../../utilities/combobox';
import type {TextFieldProps} from '../../../../TextField';

function mountWithProvider(
  props: {
    textFieldProps?: Partial<TextFieldProps>;
    textFieldProviderValue?: Partial<ComboboxTextFieldType>;
  } = {},
) {
  const textField = mountWithApp(
    <ComboboxTextFieldContext.Provider
      value={{...props.textFieldProviderValue}}
    >
      <SearchField
        label="label"
        onChange={noop}
        autoComplete="off"
        {...props.textFieldProps}
      />
    </ComboboxTextFieldContext.Provider>,
  );

  return textField;
}

describe('<TextField />', () => {
  it('renders a label', () => {
    const picker = mountWithProvider({
      textFieldProps: {
        label: 'Field',
      },
    });

    expect(picker).toContainReactComponent(Label);
    expect(picker).toContainReactText('Field');
  });

  it('renders a prefix', () => {
    const picker = mountWithProvider({
      textFieldProps: {
        prefix: <div>Prefix</div>,
      },
    });

    expect(picker).toContainReactComponent('div', {children: 'Prefix'});
  });

  it('renders accessibility attributes', () => {
    const picker = mountWithProvider({
      textFieldProviderValue: {
        activeOptionId: 'option1',
        listboxId: 'listbox1',
        setTextFieldLabelId: () => 'TextFieldLabel',
      },
    });

    expect(picker).toContainReactComponent('input', {
      role: 'combobox',
      'aria-activedescendant': 'option1',
      'aria-haspopup': 'listbox',
      'aria-autocomplete': 'list',
      'aria-expanded': 'true',
      'aria-controls': 'listbox1',
    });
  });
});

function noop() {}
