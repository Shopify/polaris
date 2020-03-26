import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {UnstyledLink} from '../../UnstyledLink';
import {CallbackAction, LinkAction} from '../../../types';
import {Breadcrumbs} from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  describe('url', () => {
    it('uses <a> tags when passed a LinkAction', () => {
      const linkBreadcrumbs: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.shopify.com',
          target: 'REMOTE',
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
          target: 'REMOTE',
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
        target: 'REMOTE',
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
  });
});

function noop() {}
