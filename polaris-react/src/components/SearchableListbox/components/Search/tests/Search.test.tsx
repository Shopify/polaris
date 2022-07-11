import React from 'react';
import {SearchMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Search} from '../Search';
import {TextField} from '../../../../TextField';
import {Icon} from '../../../../Icon';
import {noop} from '../../../tests/utilities';

const mockProps = {
  value: '',
  label: 'Search',
  listId: 'customId',
  onSearch: noop,
};

describe('<Search />', () => {
  it('renders a textfield with default props and aria attributes', () => {
    const listId = 'my-id';
    const activeOptionId = 'active-option-id';
    const search = mountWithApp(
      <Search
        {...mockProps}
        listId={listId}
        activeOptionDomId={activeOptionId}
      />,
    );

    expect(search).toContainReactComponent(TextField, {
      labelHidden: true,
      clearButton: true,
      autoComplete: 'off',
      label: 'Search',
      value: '',
      ariaOwns: listId,
      ariaControls: listId,
      ariaActiveDescendant: activeOptionId,
    });

    expect(search.find(TextField)).toContainReactComponent(Icon, {
      source: SearchMinor,
    });
  });

  it('renders a textfield with default value', () => {
    const value = 'test';
    const search = mountWithApp(<Search {...mockProps} value={value} />);

    expect(search).toContainReactComponent(TextField, {
      value,
    });
  });

  it('renders a textfield with a placeholder', () => {
    const placeholder = 'test';
    const search = mountWithApp(
      <Search {...mockProps} placeholder={placeholder} />,
    );

    expect(search).toContainReactComponent(TextField, {
      placeholder,
    });
  });

  it('textField onChange triggers onSearch with updated value', () => {
    const value = 'test';
    const searchSpy = jest.fn();
    const search = mountWithApp(
      <Search {...mockProps} value="" onSearch={searchSpy} />,
    );

    search.find(TextField)!.trigger('onChange', value);

    expect(searchSpy).toHaveBeenCalledWith(value);
  });

  it('textField onClearButtonClick triggers onSearch with empty value', () => {
    const searchSpy = jest.fn();
    const search = mountWithApp(
      <Search {...mockProps} value="" onSearch={searchSpy} />,
    );

    search.find(TextField)!.trigger('onClearButtonClick', 'textfieldId');

    expect(searchSpy).toHaveBeenCalledWith('');
  });
});
