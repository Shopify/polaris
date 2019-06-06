import * as React from 'react';
import {SaveMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';

import Icon from '../../Icon';
import UnstyledLink from '../../UnstyledLink';

import PlainAction from '../PlainAction';

describe('<PlainAction />', () => {
  describe('icon', () => {
    it('renders the given icon', () => {
      const icon = SaveMinor;
      const action = mountWithAppProvider(<PlainAction icon={icon} />);
      expect(action.find(Icon).prop('source')).toBe(icon);
    });
  });

  describe('url', () => {
    it('renders a link', () => {
      const action = mountWithAppProvider(
        <PlainAction url="http://google.com" />,
      );
      expect(action.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('passes the url into the link', () => {
      const url = 'http://google.com';
      const action = mountWithAppProvider(<PlainAction url={url} />);
      expect(action.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const action = mountWithAppProvider(
        <PlainAction url="http://google.com" external />,
      );
      expect(action.find(UnstyledLink).prop('external')).toBeTruthy();
    });
  });

  describe('accessibilityLabel', () => {
    it('gets passed into the link', () => {
      const accessibilityLabel = 'Go to Google';
      const action = mountWithAppProvider(
        <PlainAction
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
        <PlainAction accessibilityLabel={accessibilityLabel} />,
      );
      expect(action.find('button').prop('aria-label')).toBe(accessibilityLabel);
    });
  });

  describe('disabled', () => {
    it('gets passed into the button', () => {
      const action = mountWithAppProvider(<PlainAction disabled />);
      expect(action.find('button').prop('disabled')).toBeTruthy();
    });
  });

  describe('children', () => {
    it('gets rendered when an icon is present', () => {
      const content = 'Click me!';
      const action = mountWithAppProvider(
        <PlainAction content={content} icon={SaveMinor} />,
      );
      expect(action.contains(content)).toBeTruthy();
    });

    it('gets rendered when disclosure is truthy', () => {
      const content = 'Click me!';
      const action = mountWithAppProvider(
        <PlainAction content={content} disclosure />,
      );
      expect(action.contains(content)).toBeTruthy();
    });

    it('gets rendered when neither one is present', () => {
      const content = 'Click me!';
      const action = mountWithAppProvider(<PlainAction content={content} />);
      expect(action.contains(content)).toBeTruthy();
    });
  });

  describe('onAction()', () => {
    it('triggers when the button gets clicked', () => {
      const onActionSpy = jest.fn();
      const action = mountWithAppProvider(
        <PlainAction onAction={onActionSpy} />,
      );
      trigger(action.find('button'), 'onClick');
      expect(onActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
