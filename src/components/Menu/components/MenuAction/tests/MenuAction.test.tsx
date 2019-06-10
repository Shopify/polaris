import * as React from 'react';
import {SaveMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';

import Icon from '../../../../Icon';
import UnstyledLink from '../../../../UnstyledLink';

import MenuAction from '../MenuAction';

describe('<MenuAction />', () => {
  describe('icon', () => {
    it('renders the given icon', () => {
      const icon = SaveMinor;
      const wrapper = mountWithAppProvider(<MenuAction icon={icon} />);

      expect(wrapper.find(Icon).prop('source')).toBe(icon);
    });
  });

  describe('url', () => {
    it('renders a link', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction url="http://google.com" />,
      );

      expect(wrapper.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('passes the url into the link', () => {
      const url = 'http://google.com';
      const wrapper = mountWithAppProvider(<MenuAction url={url} />);

      expect(wrapper.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction url="http://google.com" external />,
      );

      expect(wrapper.find(UnstyledLink).prop('external')).toBeTruthy();
    });
  });

  describe('accessibilityLabel', () => {
    it('gets passed into the link', () => {
      const accessibilityLabel = 'Go to Google';
      const wrapper = mountWithAppProvider(
        <MenuAction
          url="http://google.com"
          accessibilityLabel={accessibilityLabel}
        />,
      );

      expect(wrapper.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });

    it('gets passed into the button', () => {
      const accessibilityLabel = 'Go to Google';
      const wrapper = mountWithAppProvider(
        <MenuAction accessibilityLabel={accessibilityLabel} />,
      );

      expect(wrapper.find('button').prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });
  });

  describe('disabled', () => {
    it('gets passed into the button', () => {
      const wrapper = mountWithAppProvider(<MenuAction disabled />);

      expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    });
  });

  describe('children', () => {
    it('gets rendered when an icon is present', () => {
      const content = 'Click me!';
      const wrapper = mountWithAppProvider(
        <MenuAction content={content} icon={SaveMinor} />,
      );

      expect(wrapper.contains(content)).toBeTruthy();
    });

    it('gets rendered when disclosure is truthy', () => {
      const content = 'Click me!';
      const wrapper = mountWithAppProvider(
        <MenuAction content={content} disclosure />,
      );

      expect(wrapper.contains(content)).toBeTruthy();
    });

    it('gets rendered when neither one is present', () => {
      const content = 'Click me!';
      const wrapper = mountWithAppProvider(<MenuAction content={content} />);

      expect(wrapper.contains(content)).toBeTruthy();
    });
  });

  describe('onAction()', () => {
    it('triggers when the button gets clicked', () => {
      const onActionSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuAction onAction={onActionSpy} />,
      );

      trigger(wrapper.find('button'), 'onClick');

      expect(onActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
