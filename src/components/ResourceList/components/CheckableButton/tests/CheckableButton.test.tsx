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
  describe('props', () => {
    it('selected is correctly passed down to CheckableButton', () => {
      const {selected} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(element.find(Checkbox).prop('checked')).toEqual(selected);
    });

    it('label is correctly passed down to CheckableButton', () => {
      const {label} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(element.find(Checkbox).prop('label')).toEqual(label);
    });

    it('accessibilityLabel is applied when provided', () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = shallow(<CheckableButton {...CheckableButtonProps} />);
      expect(element.find('div').first().prop('aria-label')).toEqual(accessibilityLabel);
    });

    it('onToggleAll is correctly called on click', () => {
      const spy = jest.fn();
      const element = mount(<CheckableButton {...CheckableButtonProps} onToggleAll={spy}/>);
      element.find('div').first().simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
