import React from 'react';
import {mountWithApp} from 'test-utilities';

import {useComboBoxTextField} from '../hooks';
import {ComboBoxTextFieldContext} from '../context';

function TextFieldComponent() {
  const textFieldContext = useComboBoxTextField();

  return textFieldContext ? <div /> : null;
}

describe('textFieldContent', () => {
  it('throws if not wrapped in ComboBoxTextFieldContext', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithApp(<TextFieldComponent />)).toThrow(
      'No ComboBox was provided. Your component must be wrapped in a <ComboBox> component.',
    );

    consoleErrorSpy.mockRestore();
  });

  it('does not throw if wrapped in a ComboBoxTextFieldContext provide', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      mountWithApp(
        <ComboBoxTextFieldContext.Provider value={{}}>
          <TextFieldComponent />
        </ComboBoxTextFieldContext.Provider>,
      ),
    ).not.toThrow('No ComboBox was provided.');

    consoleErrorSpy.mockRestore();
  });
});
