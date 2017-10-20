import * as React from 'react';
import {shallow} from 'enzyme';
import Label, {labelID} from '..';

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
});
