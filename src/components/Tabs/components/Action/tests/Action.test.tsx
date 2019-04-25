import * as React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';
import Icon from '../../../../Icon';
import UnstyledLink from '../../../../UnstyledLink';
import Action from '../Action';

describe('<Action />', () => {
  describe('icon', () => {
    it('renders the given icon', () => {
      const icon = CancelSmallMinor;
      const action = mountWithAppProvider(<Action icon={icon} />);
      expect(action.find(Icon).prop('source')).toBe(icon);
    });
  });

  describe('url', () => {
    it('renders a link', () => {
      const action = mountWithAppProvider(<Action url="http://google.com" />);
      expect(action.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('passes the url into the link', () => {
      const url = 'http://google.com';
      const action = mountWithAppProvider(<Action url={url} />);
      expect(action.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const action = mountWithAppProvider(
        <Action url="http://google.com" external />,
      );
      expect(action.find(UnstyledLink).prop('external')).toBeTruthy();
    });
  });

  describe('accessibilityLabel', () => {
    it('gets passed into the link', () => {
      const accessibilityLabel = 'Go to Google';
      const action = mountWithAppProvider(
        <Action
          url="http://google.com"
          accessibilityLabel={accessibilityLabel}
        />,
      );
      expect(action.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });

    it('gets passed into the button', () => {
      const accessibilityLabel = 'Go to Google';
      const action = mountWithAppProvider(
        <Action accessibilityLabel={accessibilityLabel} />,
      );
      expect(action.find('button').prop('aria-label')).toBe(accessibilityLabel);
    });
  });

  describe('disabled', () => {
    it('gets passed into the button', () => {
      const action = mountWithAppProvider(<Action disabled />);
      expect(action.find('button').prop('disabled')).toBeTruthy();
    });
  });

  describe('children', () => {
    it(' does not render when an icon is present', () => {
      const children = 'Click me!';
      const action = mountWithAppProvider(
        <Action icon={CancelSmallMinor}>{children}</Action>,
      );
      expect(action.contains(children)).toBeFalsy();
    });

    it('gets rendered when icon is not present', () => {
      const children = 'Click me!';
      const action = mountWithAppProvider(<Action>{children}</Action>);
      expect(action.contains(children)).toBeTruthy();
    });
  });

  describe('onAction()', () => {
    it('triggers when the button gets clicked', () => {
      const onActionSpy = jest.fn();
      const action = mountWithAppProvider(<Action onAction={onActionSpy} />);
      trigger(action.find('button'), 'onClick');
      expect(onActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
