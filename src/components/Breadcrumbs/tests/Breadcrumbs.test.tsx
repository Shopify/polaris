import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {UnstyledLink} from '../../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../../types';
import {Breadcrumbs} from '../Breadcrumbs';
import {VisuallyHidden} from '../../VisuallyHidden';

describe('<Breadcrumbs />', () => {
  describe('url', () => {
    it('uses <a> tags when passed a LinkAction', () => {
      const linkBreadcrumbs: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.shopify.com',
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
      );

      expect(breadcrumbs.find('a')).toHaveLength(1);
    });

    it('passes the accessibilityLabel through to <a> tag', () => {
      const linkBreadcrumbs: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://shopify.com',
          accessibilityLabel: 'Go to Products',
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
      );

      expect(breadcrumbs.find('a').prop('aria-label')).toStrictEqual(
        'Go to Products',
      );
    });
  });

  describe('onAction()', () => {
    it('uses <button> tags when passed a CallbackAction', () => {
      const callbackBreadcrumbs: CallbackAction[] = [
        {
          content: 'Products',
          onAction: noop,
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={callbackBreadcrumbs} />,
      );

      expect(breadcrumbs.find('button')).toHaveLength(1);
    });

    it('passes accessibilityLabel through to <button> tag', () => {
      const callbackBreadcrumbs: CallbackAction[] = [
        {
          content: 'Products',
          onAction: noop,
          accessibilityLabel: 'Go to Products',
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={callbackBreadcrumbs} />,
      );

      expect(breadcrumbs.find('button').prop('aria-label')).toStrictEqual(
        'Go to Products',
      );
    });

    it('triggers the callback function when clicked', () => {
      const spy = jest.fn();
      const callbackBreadcrumbs: CallbackAction[] = [
        {
          content: 'Products',
          onAction: spy(),
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={callbackBreadcrumbs} />,
      );

      breadcrumbs.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('newDesignLanguage', () => {
    const linkBreadcrumbs: LinkAction[] = [
      {
        content: 'Products',
        url: 'https://www.shopify.com',
      },
    ];

    it('adds a newDesignLanguage class', () => {
      const wrapper = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
        {
          features: {newDesignLanguage: true},
        },
      );

      expect(wrapper.find(UnstyledLink).prop('className')).toStrictEqual(
        'Breadcrumb newDesignLanguage',
      );
    });

    it('does not add a newDesignLanguage class', () => {
      const wrapper = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
        {
          features: {newDesignLanguage: false},
        },
      );

      expect(wrapper.find(UnstyledLink).prop('className')).toStrictEqual(
        'Breadcrumb',
      );
    });

    it('renders breadcrumb content as a visually hidden label when the new design language is enabled', () => {
      const wrapper = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
        {
          features: {newDesignLanguage: true},
        },
      );

      expect(wrapper.find(VisuallyHidden).text()).toStrictEqual('Products');
    });

    it('does not render breadcrumb content as a visually hidden label when the new design language is enabled', () => {
      const wrapper = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
        {
          features: {newDesignLanguage: false},
        },
      );

      expect(wrapper.find(VisuallyHidden)).toHaveLength(0);
      expect(wrapper.find('.Content').text()).toStrictEqual('Products');
    });
  });
});

function noop() {}
