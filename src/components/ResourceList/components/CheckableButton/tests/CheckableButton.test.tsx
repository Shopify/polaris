import * as React from 'react';
import {shallow, mount} from 'enzyme';
import CheckableButton from '../';
import Checkbox from '../../../../Checkbox';

const CheckableButtonProps = {
  label: 'Test-Label',
  accessibilityLabel: 'Accessibility-Label',
  selected: true,
  selectMode: false,
};

describe('<CheckableButton />', () => {
  describe('select', () => {
    it('correctly passes down to Checkbox', () => {
      const {selected} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(element.find(Checkbox).prop('checked')).toEqual(selected);
    });
  });

  describe('label', () => {
    it('correctly passes down to Checkbox', () => {
      const {label} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(element.find(Checkbox).prop('label')).toEqual(label);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the aria-label attribute when provided', () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(
        element
          .find('div')
          .first()
          .prop('aria-label'),
      ).toEqual(accessibilityLabel);
    });
  });

  describe('onToggleAll', () => {
    it('is called when the CheckableButton is clicked', () => {
      const spy = jest.fn();
      const element = mount(
        <CheckableButton {...CheckableButtonProps} onToggleAll={spy} />,
      );
      element
        .find('div')
        .first()
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
