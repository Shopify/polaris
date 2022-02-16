import React from 'react';
import {mount, mountWithApp} from 'tests/utilities';

import {TextOption} from '../TextOption';
import {Listbox} from '../../..';
import {Checkbox} from '../../../../Checkbox';
import {ComboboxListboxOptionContext} from '../../../../../utilities/combobox/context';

describe('TextOption', () => {
  it('renders children', () => {
    const child = 'child';
    const textOption = mount(<TextOption>{child}</TextOption>);

    expect(textOption).toContainReactText(child);
  });

  it('renders visually disabled text when disabled', () => {
    const textOption = mount(<TextOption disabled>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption disabled',
    });
  });

  it('renders visually selected text when selected', () => {
    const textOption = mount(<TextOption selected>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption selected',
    });
  });

  it('renders visual checkbox when allowMultiple is provided', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: true}}>
        <TextOption>child</TextOption>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).toContainReactComponent(Checkbox);
  });

  it('does not render visual checkbox when allowMultiple is false', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: false}}>
        <TextOption>child</TextOption>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).not.toContainReactComponent(Checkbox);
  });

  it('does not render visual checkbox wrapped in a ListBox.Action', () => {
    const textOption = mountWithApp(
      <ComboboxListboxOptionContext.Provider value={{allowMultiple: true}}>
        <Listbox accessibilityLabel="Listbox with Action example">
          <Listbox.Action value="action">
            <TextOption>child</TextOption>
          </Listbox.Action>
        </Listbox>
      </ComboboxListboxOptionContext.Provider>,
    );

    expect(textOption).not.toContainReactComponent(Checkbox);
  });
});
