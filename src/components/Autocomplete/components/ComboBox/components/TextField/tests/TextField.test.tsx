import React from 'react';
import {mountWithAppContext} from 'tests/modern';
import {noop} from '@web-utilities/other';
import {
  TextFieldProps,
  TextField as PolarisTextField,
  labelID,
} from '@shopify/polaris';

import {TextField} from '../TextField';
import {
  ComboBoxTextFieldContext,
  ComboBoxTextFieldType,
} from '../../../utilities/combo-box';

const textFieldContextDefaultValue = {
  activeOptionId: undefined,
  listBoxId: undefined,
  expanded: false,
  setTextFieldLabelId: noop,
  setTextFieldFocused: noop,
  onTextFieldFocus: noop,
  onTextFieldBlur: noop,
  onTextFieldChange: noop,
};

async function mountWithProvider(
  props: {
    textFieldProps?: Partial<TextFieldProps>;
    textFieldProviderValue?: Partial<ComboBoxTextFieldType>;
  } = {},
) {
  const providerValue = {
    ...textFieldContextDefaultValue,
    ...props.textFieldProviderValue,
  };

  const textField = await mountWithAppContext(
    <ComboBoxTextFieldContext.Provider value={providerValue}>
      <TextField label="label" onChange={noop} {...props.textFieldProps} />
    </ComboBoxTextFieldContext.Provider>,
  );

  return textField;
}

describe('ComboBox.TextField', () => {
  it('throws if not wrapped in ComboBoxTextFieldContext', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      mountWithAppContext(<TextField label="label" onChange={noop} />),
    ).toThrow('No ComboBox was provided.');

    consoleErrorSpy.mockRestore();
  });

  it('renders a PolarisTextField', async () => {
    const combobox = await mountWithProvider({
      textFieldProps: {
        value: 'value',
        id: 'textFieldId',
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      value: 'value',
      autoComplete: false,
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

  it('passes the activeOptionId to the aria-activedescendant of the PolarisTextField', async () => {
    const activeOptionId = 'activeOptionId';
    const combobox = await mountWithProvider({
      textFieldProviderValue: {
        activeOptionId,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaActiveDescendant: activeOptionId,
    });
  });

  it('passes the listBoxId to the aria-controls of the PolarisTextField', async () => {
    const listBoxId = 'listBoxId';
    const combobox = await mountWithProvider({
      textFieldProviderValue: {
        listBoxId,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaControls: listBoxId,
    });
  });

  it('passes the expanded to the aria-expanded of the PolarisTextField', async () => {
    const combobox = await mountWithProvider({
      textFieldProviderValue: {
        expanded: true,
      },
    });

    expect(combobox).toContainReactComponent(PolarisTextField, {
      ariaExpanded: true,
    });
  });

  it('calls setTextFieldLabelId with the expected ID', async () => {
    const textFieldId = 'textFieldId';
    const setTextFieldLabelIdSpy = jest.fn();
    const expectedId = labelID(textFieldId);
    await mountWithProvider({
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
    it('calls the onFocus prop on focus', async () => {
      const onFocusSpy = jest.fn();
      const combobox = await mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onFocus: onFocusSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onFocus');

      expect(onFocusSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldFocus on Context', async () => {
      const onTextFieldFocusSpy = jest.fn();
      const combobox = await mountWithProvider({
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

    it('calls the setTextFieldFocused on Context', async () => {
      const setTextFieldFocusSpy = jest.fn();
      const combobox = await mountWithProvider({
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
    it('calls the onBlur prop', async () => {
      const onBlurSpy = jest.fn();
      const combobox = await mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onBlur: onBlurSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onBlur');

      expect(onBlurSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldBlur on Context', async () => {
      const onTextFieldBlurSpy = jest.fn();
      const combobox = await mountWithProvider({
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
    it('calls the onChange prop', async () => {
      const onChangeSpy = jest.fn();
      const combobox = await mountWithProvider({
        textFieldProps: {
          value: 'value',
          id: 'textFieldId',
          onChange: onChangeSpy,
        },
      });
      combobox.find(PolarisTextField)!.trigger('onChange');

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('calls the onTextFieldChange on Context', async () => {
      const onTextFieldChangeSpy = jest.fn();
      const combobox = await mountWithProvider({
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
