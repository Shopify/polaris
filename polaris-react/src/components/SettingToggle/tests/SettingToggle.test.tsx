import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SettingToggle} from '../SettingToggle';
import {Button} from '../../Button';
import {Badge} from '../../Badge';
import {Text} from '../../Text';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: window.innerWidth < 768,
      addEventListener() {},
      removeEventListener() {},
    };
  };

const defaultWindowWidth = window.innerWidth;

describe('<SettingToggle />', () => {
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: defaultWindowWidth,
    });
  });

  describe('action', () => {
    it('renders a button for the setting action', () => {
      const action = {
        content: 'Click me!',
        onAction: () => {},
      };
      const toggle = mountWithApp(<SettingToggle action={action} />);

      expect(toggle).toContainReactComponent(Button, {
        children: 'Click me!',
      });
    });

    describe('accessibility', () => {
      it('renders as a switch widget', () => {
        const toggle = mountWithApp(
          <SettingToggle
            action={{content: 'Deactivate', onAction: () => {}}}
            enabled
          />,
        );
        expect(toggle).toContainReactComponent(Button, {role: 'switch'});
      });

      describe('when enabled', () => {
        it('updates `aria-checked`', () => {
          const toggle = mountWithApp(
            <SettingToggle
              action={{content: 'Deactivate', onAction: () => {}}}
              enabled
            />,
          );
          expect(toggle).toContainReactComponent('button', {
            role: 'switch',
            'aria-checked': 'true',
          });
        });
      });

      describe('when enabled=false', () => {
        it('updates `aria-checked`', () => {
          const toggle = mountWithApp(
            <SettingToggle
              action={{content: 'Activate', onAction: () => {}}}
              enabled={false}
            />,
          );
          expect(toggle).toContainReactComponent('button', {
            role: 'switch',
            'aria-checked': 'false',
          });
        });
      });
    });
  });

  describe('enabled', () => {
    it('does not render an enabled status badge if no title is set', () => {
      const toggle = mountWithApp(<SettingToggle enabled />);

      expect(toggle).not.toContainReactComponent(Badge);
    });

    it('renders the enabled status <Badge/>', () => {
      const toggle = mountWithApp(
        <SettingToggle title="Setting name" enabled />,
      );
      expect(toggle).toContainReactComponent(Badge, {
        status: 'success',
        children: 'On',
      });
    });
  });

  describe('disabled', () => {
    it('does not render a disabled status <Badge/> if no title is set', () => {
      const toggle = mountWithApp(<SettingToggle enabled={false} />);
      expect(toggle).not.toContainReactComponent(Badge);
    });

    it('renders the disabled status <Badge/>', () => {
      const toggle = mountWithApp(
        <SettingToggle title="Setting name" enabled={false} />,
      );
      expect(toggle).toContainReactComponent(Badge, {
        status: undefined,
        children: 'Off',
      });
    });
  });

  describe('setting toggle content', () => {
    it('renders title', () => {
      const title = 'Multipass';
      const toggle = mountWithApp(<SettingToggle title={title} />);

      expect(toggle).toContainReactComponent(Text, {
        children: title,
        variant: 'headingMd',
        as: 'h6',
      });
    });

    it('renders description', () => {
      const description =
        'Allow customers to log in with an external customer account system.';
      const toggle = mountWithApp(<SettingToggle description={description} />);

      expect(toggle).toContainReactComponent(Text, {
        children: description,
        as: 'p',
        variant: 'bodyMd',
      });
    });

    it('renders children', () => {
      const children = <div id="someId" />;
      const toggle = mountWithApp(<SettingToggle>{children}</SettingToggle>);
      expect(toggle).toContainReactComponent('div', {id: 'someId'});
    });
  });
});
