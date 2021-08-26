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
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      comboBox.find('div')!.trigger('onClick');

      const optionListOptions = comboBox.find(OptionList)!.prop('options') || [
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
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentBefore={renderNodeWithId()}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponentTimes('div', 1, {
        id: 'CustomNode',
      });
    });

    it('renders content passed into contentAfter', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentAfter={renderNodeWithId()}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponentTimes('div', 1, {
        id: 'CustomNode',
      });
    });
  });

  describe('actionsBefore and actionsAfter', () => {
    it('passes actionsBefore to the options in the first ActionList', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={[{image: '../image/path', role: 'option'}]}
          actionsAfter={[{image: '../image/path', role: 'option'}]}
        />,
      );

      comboBox.find('div')!.trigger('onClick');

      const actionListItems = comboBox.find(ActionList)!.prop('items') || [
        {
          image: '',
          role: '',
        },
      ];

      expect(actionListItems[0].image).toBe('../image/path');
      expect(actionListItems[0].role).toBe('option');
    });

    it('passes actionsAfter to the options in the second ActionList', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={[{image: '../image/path', role: 'option'}]}
          actionsAfter={[{image: '../image/path', role: 'option'}]}
        />,
      );

      comboBox.find('div')!.trigger('onClick');

      const actionLists = comboBox.findAll(ActionList);
      // last actionList
      const actionListItems = actionLists[actionLists.length - 1].prop(
        'items',
      ) || [
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
      const comboBox = mountWithApp(
        <ComboBox
          id="TestId"
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponent('button', {id: 'TestId-0'});
    });

    it('passes an id to the actions in ActionList', () => {
      const comboBox = mountWithApp(
        <ComboBox
          id="TestId"
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={action}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponent('button', {id: 'TestId-0'});
    });
  });

  describe('actions', () => {
    it('renders an action in actionsBefore', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={action}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox.find('button')).toContainReactText('Add tag');
    });

    it('renders an action in actionsAfter', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={action}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      const buttons = comboBox.findAll('button');
      expect(buttons[3]).toContainReactText('Add tag');
    });
  });

  describe('select', () => {
    it('passes the selected options to OptionList', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={['cheese_pizza']}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={action}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponent(OptionList, {
        selected: ['cheese_pizza'],
      });
    });
  });

  describe('listTitle', () => {
    it('passes the listTitle as title to OptionList', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          listTitle="List title"
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponent(OptionList, {
        title: 'List title',
      });
    });
  });

  describe('<TextField />', () => {
    it('renders TextField by default', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );
      expect(comboBox).toContainReactComponentTimes(TextField, 1);
    });

    it('renders a custom given input', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={<input type="text" />}
          onSelect={noop}
        />,
      );
      expect(comboBox).toContainReactComponentTimes('input', 1);
      expect(comboBox).not.toContainReactComponent(TextField);
    });

    it('is passed to Popover as the activator', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      expect(comboBox.find(Popover)).toContainReactComponentTimes(TextField, 1);
    });
  });

  describe('<Popover />', () => {
    const mountComboBox = () =>
      mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          preferredPosition="above"
        />,
      );

    it('does not set Popover to active before being clicked', () => {
      const comboBox = mountComboBox();
      expect(comboBox).toContainReactComponent(Popover, {active: false});
    });

    it('sets Popover to active when clicked', () => {
      const comboBox = mountComboBox();
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponent(Popover, {active: true});
    });

    it('sets Popover to active on keyDown', () => {
      const comboBox = mountComboBox();
      comboBox.find('div')!.trigger('onKeyDown');
      expect(comboBox).toContainReactComponent(Popover, {active: true});
    });

    it('sets Popover to fullWidth', () => {
      const comboBox = mountComboBox();
      expect(comboBox).toContainReactComponent(Popover, {fullWidth: true});
    });

    it('prevents autofocus on Popover', () => {
      const comboBox = mountComboBox();
      expect(comboBox).toContainReactComponent(Popover, {
        autofocusTarget: 'none',
      });
    });

    it('passes the preferredPosition to Popover', () => {
      const comboBox = mountComboBox();
      expect(comboBox).toContainReactComponent(Popover, {
        preferredPosition: 'above',
      });
    });
  });

  describe('allowMultiple', () => {
    it('renders a button if the prop is false', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          allowMultiple={false}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponentTimes('button', options.length);
    });

    it('renders a checkbox if the prop is set to true', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          allowMultiple
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      const checkboxes = comboBox.findAll('input', {type: 'checkbox'});
      expect(checkboxes).toHaveLength(options.length);
    });
  });

  describe('onSelect', () => {
    it('gets called when an item is clicked', () => {
      const spy = jest.fn();
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      comboBox.find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('gets called when a checkbox is changed', () => {
      const spy = jest.fn();
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={spy}
          allowMultiple
        />,
      );
      comboBox.find('div')!.trigger('onClick');
      comboBox
        .find('input', {type: 'checkbox'})!
        .trigger('onChange', {target: {checked: true}});
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
      const comboBox = mountWithApp(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
        />,
      );

      comboBox.find('div')!.trigger('onFocus');
      expect(comboBox).toContainReactComponent(Popover, {active: true});
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
      const comboBox = mountWithApp(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).toContainReactComponentTimes(EmptyState, 1);
    });

    it('does not render empty state if actionsBefore exist', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsBefore={[{image: '../image/path', role: 'option'}]}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).not.toContainReactComponent(EmptyState);
    });

    it('does not render empty state if actionsAfter exist', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          actionsAfter={[{image: '../image/path', role: 'option'}]}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).not.toContainReactComponent(EmptyState);
    });

    it('does not render empty state if contentAfter exist', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentAfter={<div>Content after</div>}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).not.toContainReactComponent(EmptyState);
    });

    it('does not render empty state if contentBefore exist', () => {
      const comboBox = mountWithApp(
        <ComboBox
          options={[]}
          selected={[]}
          textField={renderTextField()}
          onSelect={noop}
          contentBefore={<div>Content before</div>}
          emptyState={<EmptyState />}
        />,
      );

      comboBox.find('div')!.trigger('onClick');
      expect(comboBox).not.toContainReactComponent(EmptyState);
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
