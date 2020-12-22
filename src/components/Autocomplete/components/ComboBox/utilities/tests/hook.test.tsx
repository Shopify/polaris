import React from 'react';
import {mountWithAppContext} from 'tests/modern';

import {useComboBoxTextField, ComboBoxTextFieldContext} from '../combo-box';

function TextFieldComponent() {
  const textFieldContext = useComboBoxTextField();

  return textFieldContext ? <div /> : null;
}

describe('textFieldContent', () => {
  it('throws if not wrapped in ComboBoxTextFieldContext', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithAppContext(<TextFieldComponent />)).toThrow(
      'No ComboBox was provided. Your component must be wrapped in a <ComboBox> component.',
    );

    consoleErrorSpy.mockRestore();
  });

  it('does not throw if wrapped in a ComboBoxTextFieldContext provide', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      mountWithAppContext(
        <ComboBoxTextFieldContext.Provider value={{}}>
          <TextFieldComponent />
        </ComboBoxTextFieldContext.Provider>,
      ),
    ).not.toThrow('No ComboBox was provided.');

    consoleErrorSpy.mockRestore();
  });
});
