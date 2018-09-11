import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import ComboBox from '..';
import {TextField} from '../components';
import {mountWithAppProvider} from '../../../../../../tests/utilities';

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

  describe('textField', () => {
    it('renders a custom given input', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={<input type="text" />}
          onSelect={noop}
        />,
      );
      expect(comboBox.find('input').exists()).toBe(true);
      expect(comboBox.find(TextField).exists()).toBe(false);
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
      expect(comboBox.find('button').exists()).toBe(true);
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
      expect(comboBox.find('input[type="checkbox"]').exists()).toBe(true);
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
      expect(comboBox.find('#CustomNode').exists()).toBe(true);
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
      expect(comboBox.find('#CustomNode').exists()).toBe(true);
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
      comboBox
        .find('button')
        .at(0)
        .simulate('click');
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
      expect(
        comboBox
          .find('button')
          .at(0)
          .prop('id'),
      ).toBe('TestId-0');
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
      expect(
        comboBox
          .find('button')
          .at(0)
          .prop('id'),
      ).toBe('TestId-0');
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
      expect(
        comboBox
          .find('button')
          .at(0)
          .text(),
      ).toBe('Add tag');
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
      expect(
        comboBox
          .find('button')
          .at(3)
          .text(),
      ).toBe('Add tag');
    });
  });
});

function renderTextField() {
  return <TextField label="" onChange={noop} />;
}

function renderNodeWithId() {
  return <div id="CustomNode" />;
}
