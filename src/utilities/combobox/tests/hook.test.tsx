import {mountWithApp} from 'tests/utilities';

import {useComboboxTextField} from '../hooks';
import {ComboboxTextFieldContext} from '../context';

function TextFieldComponent() {
  const textFieldContext = useComboboxTextField();

  return textFieldContext ? <div /> : null;
}

describe('textFieldContent', () => {
  it('throws if not wrapped in ComboboxTextFieldContext', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => mountWithApp(<TextFieldComponent />)).toThrow(
      'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
    );

    consoleErrorSpy.mockRestore();
  });

  it('does not throw if wrapped in a ComboboxTextFieldContext provide', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      mountWithApp(
        <ComboboxTextFieldContext.Provider value={{}}>
          <TextFieldComponent />
        </ComboboxTextFieldContext.Provider>,
      ),
    ).not.toThrow('No Combobox was provided.');

    consoleErrorSpy.mockRestore();
  });
});
