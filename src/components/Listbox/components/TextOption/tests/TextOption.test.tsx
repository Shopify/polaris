import React from 'react';
import {mount, mountWithApp} from 'test-utilities';

import {TextOption} from '../TextOption';
import {Checkbox} from '../../../../Checkbox';
import {ComboboxListboxOptionContext} from '../../../../../utilities/combobox/context';

jest.mock('components', () => ({
  ...jest.requireActual('components'),
  Icon() {
    return null;
  },
}));

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
      {
        features: {newDesignLanguage: true},
      },
    );

    expect(textOption).toContainReactComponent(Checkbox);
  });
});
