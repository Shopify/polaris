import * as React from 'react';
import {shallow} from 'enzyme';
import Panel from '../Panel';

describe('<Panel />', () => {
  it('adds the correct role', () => {
    const panel = shallow(<Panel id="panel" tabID="tab" />);
    expect(panel.prop('role')).toBe('tabpanel');
  });

  describe('id', () => {
    it('uses the ID for panel', () => {
      const panel = shallow(<Panel id="my-panel" tabID="my-tab" />);
      expect(panel.prop('id')).toBe('my-panel');
    });
  });

  describe('tabID', () => {
    it('uses the ID as the labeling element', () => {
      const panel = shallow(<Panel id="my-panel" tabID="my-tab" />);
      expect(panel.prop('aria-labelledby')).toBe('my-tab');
    });
  });
});
