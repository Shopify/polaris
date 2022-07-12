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
  it('renders <TextField /> with default props and aria attributes', () => {
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

  it('renders <TextField />  with value', () => {
    const value = 'test';
    const search = mountWithApp(<Search {...mockProps} value={value} />);

    expect(search).toContainReactComponent(TextField, {
      value,
    });
  });

  it('renders <TextField />  with placeholder', () => {
    const placeholder = 'test';
    const search = mountWithApp(
      <Search {...mockProps} placeholder={placeholder} />,
    );

    expect(search).toContainReactComponent(TextField, {
      placeholder,
    });
  });

  it('triggers onSearch on text field change', () => {
    const value = 'test';
    const onSearchSpy = jest.fn();
    const search = mountWithApp(
      <Search {...mockProps} onSearch={onSearchSpy} />,
    );

    search.find(TextField)!.trigger('onChange', value);

    expect(onSearchSpy).toHaveBeenCalledWith(value);
  });

  it('triggers onSearch with empty value onClearButtonClick', () => {
    const onSearchSpy = jest.fn();
    const search = mountWithApp(
      <Search {...mockProps} value="value" onSearch={onSearchSpy} />,
    );

    search.find(TextField)!.trigger('onClearButtonClick', 'textfieldId');

    expect(onSearchSpy).toHaveBeenCalledWith('');
  });
});
