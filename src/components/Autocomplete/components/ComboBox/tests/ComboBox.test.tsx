import * as React from 'react';
import ComboBox from '..';
import {mountWithAppProvider} from '../../../../../../tests/utilities';

describe('<ComboBox/>', () => {
  const options = [
    {value: 'cheese_pizza', label: 'Cheese Pizza'},
    {value: 'macaroni_pizza', label: 'Macaroni Pizza'},
    {value: 'pepperoni_pizza', label: 'Pepperoni Pizza'},
  ];

  describe('textField', () => {
    it('renders a custom given input', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={<input type="text" />}
          onSelect={emptyFunction}
        />,
      );
      expect(comboBox.find('input').exists()).toBe(true);
      expect(comboBox.find(ComboBox.TextField).exists()).toBe(false);
    });
  });

  describe('allowMultiple', () => {
    it('renders a button if the prop is false', () => {
      const comboBox = mountWithAppProvider(
        <ComboBox
          options={options}
          selected={[]}
          textField={renderTextField()}
          onSelect={emptyFunction}
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
          onSelect={emptyFunction}
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
          onSelect={emptyFunction}
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
          onSelect={emptyFunction}
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
});

function renderTextField() {
  return <ComboBox.TextField label="" onChange={emptyFunction} />;
}

function emptyFunction() {
  return {};
}

function renderNodeWithId() {
  return <div id="CustomNode" />;
}
