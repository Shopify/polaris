import React from 'react';
import {CaretDownMinor, SaveMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';

import {Icon} from '../../../../Icon';
import {UnstyledLink} from '../../../../UnstyledLink';
import {MenuAction} from '../MenuAction';

describe('<MenuAction />', () => {
  const mockProps = {
    content: 'content',
  };

  describe('content', () => {
    const mockContent = 'mock content';

    it('renders when provided only `content`', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction content={mockContent} />,
      );

      expect(wrapper.contains(mockContent)).toBeTruthy();
    });
  });

  describe('icon', () => {
    it('renders when provided `icon`', () => {
      const icon = SaveMinor;
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} icon={icon} />,
      );

      expect(wrapper.find(Icon).prop('source')).toBe(icon);
    });
  });

  describe('<UnstyledLink />', () => {
    const mockUrl = 'http://google.com';

    it('renders when passed a `url`', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} url={mockUrl} />,
      );

      expect(wrapper.find(UnstyledLink).prop('url')).toBe(mockUrl);
    });

    it('passes `external` prop', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} url={mockUrl} external />,
      );

      expect(wrapper.find(UnstyledLink).prop('external')).toBeTruthy();
    });
  });

  describe('accessibilityLabel', () => {
    it('gets passed into the link', () => {
      const accessibilityLabel = 'Go to Google';
      const wrapper = mountWithAppProvider(
        <MenuAction
          {...mockProps}
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
        <MenuAction {...mockProps} accessibilityLabel={accessibilityLabel} />,
      );

      expect(wrapper.find('button').prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });
  });

  describe('disclosure', () => {
    it('renders with `disclosure` icon', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} disclosure />,
      );
      const disclosureIcon = wrapper
        .find(Icon)
        .filterWhere((icon) => icon.prop('source') === CaretDownMinor);

      expect(disclosureIcon).toHaveLength(1);
    });
  });

  describe('disabled', () => {
    it('gets passed into the button', () => {
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} disabled />,
      );

      expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    });
  });

  describe('onAction()', () => {
    it('triggers when the button gets clicked', () => {
      const onActionSpy = jest.fn();
      const wrapper = mountWithAppProvider(
        <MenuAction {...mockProps} onAction={onActionSpy} />,
      );

      trigger(wrapper.find('button'), 'onClick');

      expect(onActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
