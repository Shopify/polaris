import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Panel from '../Panel';

describe('<Panel />', () => {
  describe('id', () => {
    it('uses the ID for panel', () => {
      const panel = mountWithAppProvider(<Panel id="my-panel" />);
      expect(panel.find('div').prop('id')).toBe('my-panel');
    });
  });
});
