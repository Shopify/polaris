import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Panel from '../Panel';

describe('<Panel />', () => {
  it('adds the tabpanel role', () => {
    const panel = mountWithAppProvider(<Panel id="panel" tabID="tab" />);
    expect(panel.find('div').prop('role')).toBe('tabpanel');
  });

  describe('id', () => {
    it('uses the ID for panel', () => {
      const panel = mountWithAppProvider(
        <Panel id="my-panel" tabID="my-tab" />,
      );
      expect(panel.prop('id')).toBe('my-panel');
    });
  });

  describe('tabID', () => {
    it('uses the ID as the labeling element', () => {
      const panel = mountWithAppProvider(
        <Panel id="my-panel" tabID="my-tab" />,
      );
      expect(panel.find('div').prop('aria-labelledby')).toBe('my-tab');
    });
  });
});
