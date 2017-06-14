import * as React from 'react';
import {shallow} from 'enzyme';
import Label, {labelID} from '..';
import {buttonFrom} from '../../Button';

describe('<Label />', () => {
  describe('id', () => {
    it('uses the ID as the for attribute', () => {
      const label = shallow(<Label id="MyThing" />);
      expect(label.find('label').prop('htmlFor')).toBe('MyThing');
    });

    it('creates an ID for the label from the ID of the connected resource', () => {
      const label = shallow(<Label id="MyThing" />);
      const id = labelID('MyThing');
      expect(label.find('label').prop('id')).toBe(id);
    });
  });

  describe('action', () => {
    it('renders a plain button with the specified attributes', () => {
      const action = {
        content: 'My action',
        onAction() { return true; },
        accessibilityLabel: 'My action with more description',
      };

      const label = shallow(<Label id="MyThing" action={action} />);
      const button = buttonFrom(action, {plain: true});
      expect(label.containsMatchingElement(button)).toBe(true);
    });

    it('does not render any block-level elements in the label element', () => {
      const label = shallow(<Label id="MyThing" action={{content: 'My action'}} />);
      expect(label.find('label').find('div')).toHaveLength(0);
    });
  });
});
