import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SettingAction} from '../../SettingAction';
import {SettingToggle} from '../SettingToggle';

describe('<SettingToggle />', () => {
  function getComponentProps(node: React.ReactNode) {
    return (node as JSX.Element).props;
  }

  describe('action', () => {
    it('passes a button for the action into SettingAction', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} />);
      const {children} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(children).toBe('Click me!');
    });
  });

  describe('enabled', () => {
    it('makes the button primary when not enabled', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} />);
      const {primary} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(primary).toBe(true);
    });

    it('makes the button secondary when enabled', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} enabled />);
      const {primary} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(primary).toBe(false);
    });
  });

  describe('children', () => {
    it('renders the given children', () => {
      const children = <div id="someId" />;
      const toggle = mountWithApp(<SettingToggle>{children}</SettingToggle>);
      expect(toggle).toContainReactComponent('div', {id: 'someId'});
    });
  });
});

function noop() {}
