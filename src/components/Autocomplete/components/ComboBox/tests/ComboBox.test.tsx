import React from 'react';
import {OptionList, ActionList, Popover} from 'components';
import {mountWithApp} from 'test-utilities';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, act} from 'test-utilities/legacy';

import {TextField} from '../../TextField';
import {Key} from '../../../../../types';
import {ComboBox} from '../ComboBox';

describe('<ComboBox/>', () => {
  const options = [
    {value: 'cheese_pizza', label: 'Cheese Pizza'},
    {value: 'macaroni_pizza', label: 'Macaroni Pizza'},
    {value: 'pepperoni_pizza', label: 'Pepperoni Pizza'},
  ];

  const action = [
    {
      content: 'Add tag',
      onAction: noop,
    },
  ];

  describe('options', () => {
    it('passes options to OptionList', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      comboBox.simulate('click');

      const optionListOptions = comboBox.find(OptionList).prop('options') || [
        {
          value: '',
          label: '',
        },
      ];

      expect(optionListOptions[0].value).toBe('cheese_pizza');
      expect(optionListOptions[0].label).toBe('Cheese Pizza');
      expect(optionListOptions[1].value).toBe('macaroni_pizza');
      expect(optionListOptions[1].label).toBe('Macaroni Pizza');
    });

    it.each([
      [options, 0],
      [[], -1],
    ])('sets tabIndex depending of number of options', (options, tabIndex) => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      expect(comboBox.find('div')).toHaveReactProps({
        tabIndex,
      });
    });
  });

  describe('contentBefore and contentAfter', () => {
    it('renders content passed into contentBefore', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentBefore={renderNodeWithId()}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('#CustomNode')).toHaveLength(1);
    });

    it('renders content passed into contentAfter', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentAfter={renderNodeWithId()}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('#CustomNode')).toHaveLength(1);
    });
  });

  describe('actionsBefore and actionsAfter', () => {
    const comboBox = mountWithAppProvider(
      <ComboBox
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={noop}
        actionsBefore={[{image: '../image/path', role: 'option'}]}
        actionsAfter={[{image: '../image/path', role: 'option'}]}
      />,
    );

    it('passes actionsBefore to the options in the first ActionList', () => {
      comboBox.simulate('click');

      const actionListItems = comboBox
        .find(ActionList)
        .first()
        .prop('items') || [
        {
          image: '',
          role: '',
        },
      ];

      expect(actionListItems[0].image).toBe('../image/path');
      expect(actionListItems[0].role).toBe('option');
    });

    it('passes actionsAfter to the options in the second ActionList', () => {
      comboBox.simulate('click');

      const actionListItems = comboBox
        .find(ActionList)
        .last()
        .prop('items') || [
        {
          image: '',
          role: '',
        },
      ];

      expect(actionListItems[0].image).toBe('../image/path');
      expect(actionListItems[0].role).toBe('option');
    });
  });

  describe('ids', () => {
    it('passes an id to the options in OptionList', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          id="TestId"
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('button').at(0).prop('id')).toBe('TestId-0');
    });

    it('passes an id to the actions in ActionList', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          id="TestId"
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={action}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('button').at(0).prop('id')).toBe('TestId-0');
    });
  });

  describe('actions', () => {
    it('renders an action in actionsBefore', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={action}
        />,
      );

      comboBox.simulate('click');

      expect(comboBox.find('button').at(0).text()).toBe('Add tag');
    });

    it('renders an action in actionsAfter', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={action}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('button').at(3).text()).toBe('Add tag');
    });
  });

  describe('select', () => {
    it('passes the selected options to OptionList', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={['cheese_pizza']}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={action}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(OptionList).prop('selected')).toStrictEqual([
        'cheese_pizza',
      ]);
    });
  });

  describe('listTitle', () => {
    it('passes the listTitle as title to OptionList', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          listTitle="List title"
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(OptionList).prop('title')).toBe('List title');
    });
  });

  describe('<TextField />', () => {
    it('renders TextField by default', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );
      expect(comboBox.find(TextField)).toHaveLength(1);
    });

    it('renders a custom given input', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={<input type="text" />}
          onSelect={noop}
        />,
      );
      expect(comboBox.find('input')).toHaveLength(1);
      expect(comboBox.find(TextField)).toHaveLength(0);
    });

    it('is passed to Popover as the activator', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      expect(comboBox.find(Popover).find(TextField)).toHaveLength(1);
    });
  });

  describe('<Popover />', () => {
    const comboBox = mountWithAppProvider(
      <ComboBox
        options={options}
        selected={[]}
        textField={renderTextField()}
        onSelect={noop}
        preferredPosition="above"
      />,
    );

    it('does not set Popover to active before being clicked', () => {
      expect(comboBox.find(Popover).prop('active')).toBe(false);
    });

    it('sets Popover to active when clicked', () => {
      comboBox.simulate('click');
      expect(comboBox.find(Popover).prop('active')).toBe(true);
    });

    it('sets Popover to active on keyDown', () => {
      comboBox.simulate('keydown');
      expect(comboBox.find(Popover).prop('active')).toBe(true);
    });

    it('sets Popover to fullWidth', () => {
      expect(comboBox.find(Popover).prop('fullWidth')).toBe(true);
    });

    it('prevents autofocus on Popover', () => {
      expect(comboBox.find(Popover).prop('autofocusTarget')).toBe('none');
    });

    it('passes the preferredPosition to Popover', () => {
      expect(comboBox.find(Popover).prop('preferredPosition')).toBe('above');
    });
  });

  describe('allowMultiple', () => {
    it('renders a button if the prop is false', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          allowMultiple={false}
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('button')).toHaveLength(options.length);
    });

    it('renders a checkbox if the prop is set to true', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          allowMultiple
        />,
      );
      comboBox.simulate('click');
      expect(comboBox.find('input[type="checkbox"]')).toHaveLength(
        options.length,
      );
    });
  });

  describe('onSelect', () => {
    it('gets called when an item is clicked', () => {
      const spy = jest.fn();
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
        />,
      );
      comboBox.simulate('click');
      comboBox.find('button').at(0).simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('gets called when a checkbox is changed', () => {
      const spy = jest.fn();
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
          allowMultiple
        />,
      );
      comboBox.simulate('click');
      comboBox
        .find('input[type="checkbox"]')
        .at(0)
        .simulate('change', {target: {checked: true}});
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onEndReached', () => {
    it('gets called when the end of the option list is reached', () => {
      const spy = jest.fn();
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          onEndReached={spy}
        />,
      );

      // Focus the combobox so that the popover pane is rendered
      comboBox.find('div')!.trigger('onFocus');

      comboBox.find(Popover.Pane)!.trigger('onScrolledToBottom');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('keypress events', () => {
    // Jest 25 / JSDOM 16 causes this test case to go into an infinite loop and
    // never recover. Skip for now till we can find a fix
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('handles key events when there are no previous options', () => {
      const spy = jest.fn();
      const options: {value: string; label: string}[] = [];
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
        />,
      );
      comboBox.find(TextField).simulate('click');
      act(() => {
        dispatchKeyup(Key.DownArrow);
      });
      act(() => {
        dispatchKeydown(Key.Enter);
      });
      expect(spy).not.toHaveBeenCalled();

      comboBox.setProps({
        options: [
          {value: 'cheese_pizza', label: 'Cheese Pizza'},
          {value: 'macaroni_pizza', label: 'Macaroni Pizza'},
          {value: 'pepperoni_pizza', label: 'Pepperoni Pizza'},
        ],
      });
      comboBox.update();
      comboBox.find(TextField).simulate('click');
      act(() => {
        dispatchKeyup(Key.DownArrow);
      });
      act(() => {
        dispatchKeydown(Key.Enter);
      });
      expect(spy).toHaveBeenCalledWith(['cheese_pizza']);
    });

    // Jest 25 / JSDOM 16 causes this test case to go into an infinite loop and
    // never recover. Skip for now till we can find a fix
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('adds to selected options when the down arrow and enter keys are pressed', () => {
      const spy = jest.fn();
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
        />,
      );
      comboBox.find(TextField).simulate('click');
      act(() => {
        dispatchKeyup(Key.DownArrow);
      });
      act(() => {
        dispatchKeydown(Key.Enter);
      });
      expect(spy).toHaveBeenCalledWith(['cheese_pizza']);
    });

    // Jest 25 / JSDOM 16 causes this test case to go into an infinite loop and
    // never recover. Skip for now till we can find a fix
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('does not add to selected options when the down arrow and key other than enter is pressed', () => {
      const spy = jest.fn();
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
        />,
      );
      comboBox.find(TextField).simulate('click');
      act(() => {
        dispatchKeyup(Key.DownArrow);
      });
      act(() => {
        dispatchKeydown(Key.RightArrow);
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('activates the popover when the combobox is focused', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      comboBox.simulate('focus');
      expect(comboBox.find(Popover).prop('active')).toBe(true);
    });

    it('deactivates the popover when the escape key is pressed', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      comboBox.find(TextField).simulate('click');
      expect(comboBox.find(Popover).prop('active')).toBe(true);

      act(() => {
        dispatchKeyup(Key.Escape);
      });

      comboBox.update();
      expect(comboBox.find(Popover).prop('active')).toBe(false);
    });
  });

  describe('empty state', () => {
    const EmptyState = () => <div>No results</div>;

    it('renders an empty state when no options are passed in', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(EmptyState)).toHaveLength(1);
    });

    it('does not render empty state if actionsBefore exist', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={[{image: '../image/path', role: 'option'}]}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(EmptyState)).toHaveLength(0);
    });

    it('does not render empty state if actionsAfter exist', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={[{image: '../image/path', role: 'option'}]}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(EmptyState)).toHaveLength(0);
    });

    it('does not render empty state if contentAfter exist', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentAfter={<div>Content after</div>}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(EmptyState)).toHaveLength(0);
    });

    it('does not render empty state if contentBefore exist', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentBefore={<div>Content before</div>}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.simulate('click');
      expect(comboBox.find(EmptyState)).toHaveLength(0);
    });
  });
});

function noop() {}

function renderTextField() {
  return <TextField label="" onChange={noop} />;
}

function renderNodeWithId() {
  return <div id="CustomNode" />;
}

function dispatchKeyup(key: Key) {
  const event: KeyboardEventInit & {keyCode: Key} = {keyCode: key};
  document.dispatchEvent(new KeyboardEvent('keyup', event));
}

function dispatchKeydown(key: Key) {
  const event: KeyboardEventInit & {keyCode: Key} = {keyCode: key};
  window.dispatchEvent(new KeyboardEvent('keydown', event));
}
