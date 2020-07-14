import React from 'react';
import {CirclePlusMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {Spinner} from 'components';

import {Key} from '../../../types';
import {ComboBox} from '../components';
import {Autocomplete} from '../Autocomplete';

describe('<Autocomplete/>', () => {
  const options = [
    {value: 'cheese_pizza', label: 'Cheese Pizza'},
    {value: 'macaroni_pizza', label: 'Macaroni Pizza'},
    {value: 'pepperoni_pizza', label: 'Pepperoni Pizza'},
  ];

  it('mounts', () => {
    const autocomplete = mountWithAppProvider(
      <Autocomplete
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={noop}
      />,
    );
    expect(autocomplete.find(Autocomplete).exists()).toBe(true);
  });

  it('displays a spinner when loading is true', () => {
    const autocomplete = mountWithAppProvider(
      <Autocomplete
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={noop}
        loading
      />,
    );
    autocomplete.simulate('click');
    expect(autocomplete.find(Spinner).exists()).toBe(true);
  });

  describe('<Combobox />', () => {
    it('passes props to ComboBox', () => {
      const actionBefore = {
        content: "Add 'f'",
        icon: CirclePlusMinor,
        id: 'ComboBox3-0',
      };

      const EmptyState = () => <span>No results</span>;

      const autocomplete = mountWithAppProvider(
        <Autocomplete
          id="Autocomplete-ID"
          options={options}
          selected={['cheese_pizza']}
          textField={renderTextField()}
          preferredPosition="mostSpace"
          listTitle="List title"
          allowMultiple
          actionBefore={actionBefore}
          onSelect={handleOnSelect}
          emptyState={<EmptyState />}
        />,
      );

      expect(autocomplete.find(ComboBox).prop('id')).toBe('Autocomplete-ID');
      expect(autocomplete.find(ComboBox).prop('options')).toBe(options);
      expect(autocomplete.find(ComboBox).prop('selected')).toStrictEqual([
        'cheese_pizza',
      ]);
      expect(autocomplete.find(ComboBox).prop('textField')).toStrictEqual(
        renderTextField(),
      );
      expect(autocomplete.find(ComboBox).prop('preferredPosition')).toBe(
        'mostSpace',
      );
      expect(autocomplete.find(ComboBox).prop('listTitle')).toBe('List title');
      expect(autocomplete.find(ComboBox).prop('allowMultiple')).toBe(true);
      expect(autocomplete.find(ComboBox).prop('actionsBefore')).toStrictEqual([
        actionBefore,
      ]);
      expect(autocomplete.find(ComboBox).prop('onSelect')).toBe(handleOnSelect);
      expect(autocomplete.find(ComboBox).prop('emptyState')).toStrictEqual(
        <EmptyState />,
      );
    });

    it('`Enter` keypress in <Autocomplete/> does not trigger `onSubmit` when wrapped in a <form>', () => {
      const spy = jest.fn();

      const autocomplete = mountWithAppProvider(
        <form style={{height: '225px'}} onSubmit={spy}>
          <Autocomplete
            options={options}
            selected={[]}
            textField={renderTextField()}
            onSelect={noop}
            loading
          />
        </form>,
      );

      autocomplete.find(Autocomplete).simulate('click');
      autocomplete
        .find(Autocomplete)
        .simulate('keyup', {keyCode: Key.DownArrow});
      autocomplete.find(Autocomplete).simulate('keyDown', {keyCode: Key.Enter});
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('loading', () => {
    it('passes an empty array as options and contentAfter to ComboBox when loading is true', () => {
      const autocomplete = mountWithAppProvider(
        <Autocomplete
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          loading
        />,
      );
      expect(autocomplete.find(ComboBox).prop('options')).toStrictEqual([]);
      expect(autocomplete.find(ComboBox).prop('contentAfter')).not.toBeNull();
    });
  });

  describe('onLoadMoreResults', () => {
    it('gets called when then end of the option list is reached', () => {
      const spy = jest.fn();
      const autocomplete = mountWithAppProvider(
        <Autocomplete
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          onLoadMoreResults={spy}
        />,
      );

      const comboBox = autocomplete.find(ComboBox);
      trigger(comboBox, 'onEndReached');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  function noop() {}

  function renderTextField() {
    return <Autocomplete.TextField label="" onChange={noop} />;
  }

  function handleOnSelect(this: any, updatedSelection: string[]) {
    const selectedText = updatedSelection.map((selectedItem: string) => {
      const matchedOption = this.options.filter((option: any) => {
        return option.value.match(selectedItem);
      });
      return matchedOption[0] && matchedOption[0].label;
    });
    if (this.ALLOW_MULTIPLE) {
      this.setState({selected: updatedSelection});
    } else {
      this.setState({selected: selectedText, inputText: selectedText});
    }
  }
});
