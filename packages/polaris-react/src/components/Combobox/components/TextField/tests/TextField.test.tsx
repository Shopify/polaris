import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TextField as PolarisTextField} from '../../../../TextField';
import type {TextFieldProps} from '../../../../TextField';
import {TextField} from '../TextField';
import {labelID} from '../../../../Label';
import {ComboboxTextFieldContext} from '../../../../../utilities/combobox';
import type {ComboboxTextFieldType} from '../../../../../utilities/combobox';

const textFieldContextDefaultValue = {
  activeOptionId: undefined,
  listboxId: undefined,
  expanded: false,
  setTextFieldLabelId: noop,
  setTextFieldFocused: noop,
  onTextFieldFocus: noop,
  onTextFieldBlur: noop,
  onTextFieldChange: noop,
};

function mountWithProvider(
  props: {
    textFieldProps?: Partial<TextFieldProps>;
    textFieldProviderValue?: Partial<ComboboxTextFieldType>;
  } = {},
) {
  const providerValue = {
    ...textFieldContextDefaultValue,
    ...props.textFieldProviderValue,
  };

  const textField = mountWithApp(
    <ComboboxTextFieldContext.Provider value={providerValue}>
      <TextField
        label="label"
        onChange={noop}
        {...props.textFieldProps}
        autoComplete="off"
      />
    </ComboboxTextFieldContext.Provider>,
  );

  return textField;
}

describe('Combobox.TextField', () => {
  it('throws if not wrapped in ComboboxTextFieldContext', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      mountWithApp(
        <TextField label="label" onChange={noop} autoComplete="off" />,
      ),
    ).toThrow('No Combobox was provided.');

    consoleErrorSpy.mockRestore();
  });

  it('renders a PolarisTextField', () => {
    const combobox = mountWithProvider({
      textFieldProps: {
        value: 'value',
        id: 'textFieldId',
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      value: 'value',
      autoComplete: 'off',
      id: 'textFieldId',
      onFocus: expect.any(Function),
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      ariaAutocomplete: 'list',
      ariaActiveDescendant: undefined,
      ariaControls: undefined,
      role: 'combobox',
      ariaExpanded: false,
    });
  });

  it('passes the activeOptionId to the aria-activedescendant of the PolarisTextField', () => {
    const activeOptionId = 'activeOptionId';
    const combobox = mountWithProvider({
      textFieldProviderValue: {
        activeOptionId,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaActiveDescendant: activeOptionId,
    });
  });

  it('passes the listboxId to the aria-controls of the PolarisTextField', () => {
    const listboxId = 'listboxId';
    const combobox = mountWithProvider({
      textFieldProviderValue: {
        listboxId,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaControls: listboxId,
    });
  });

  it('passes the expanded to the aria-expanded of the PolarisTextField', () => {
    const combobox = mountWithProvider({
      textFieldProviderValue: {
        expanded: true,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaExpanded: true,
    });
  });

  it('calls setTextFieldLabelId with the expected ID', () => {
    const textFieldId = 'textFieldId';
    const setTextFieldLabelIdSpy = jest.fn();
    const expectedId = labelID(textFieldId);
    mountWithProvider({
      textFieldProps: {
        id: textFieldId,
      },
      textFieldProviderValue: {
        setTextFieldLabelId: setTextFieldLabelIdSpy,
      },
    });

    expect(setTextFieldLabelIdSpy).toHaveBeenCalledWith(expectedId);
  });

  describe('onFocus', () => {
    it('calls the onFocus prop on focus', () => {
      const onFocusSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onFocus: onFocusSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onFocus');

      expect(onFocusSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldFocus on Context', () => {
      const onTextFieldFocusSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
        },
        textFieldProviderValue: {
          onTextFieldFocus: onTextFieldFocusSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onFocus');

      expect(onTextFieldFocusSpy).toHaveBeenCalled();
    });

    it('calls the setTextFieldFocused on Context', () => {
      const setTextFieldFocusSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
        },
        textFieldProviderValue: {
          setTextFieldFocused: setTextFieldFocusSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onFocus');

      expect(setTextFieldFocusSpy).toHaveBeenCalled();
    });
  });

  describe('onBlur', () => {
    it('calls the onBlur prop', () => {
      const onBlurSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onBlur: onBlurSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onBlur');

      expect(onBlurSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldBlur on Context', () => {
      const onTextFieldBlurSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
        },
        textFieldProviderValue: {
          onTextFieldBlur: onTextFieldBlurSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onBlur');

      expect(onTextFieldBlurSpy).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('calls the onChange prop', () => {
      const onChangeSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onChange: onChangeSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onChange');

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldChange on Context', () => {
      const onTextFieldChangeSpy = jest.fn();
      const combobox = mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
        },
        textFieldProviderValue: {
          onTextFieldChange: onTextFieldChangeSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onChange');

      expect(onTextFieldChangeSpy).toHaveBeenCalled();
    });
  });
});

function noop() {}
