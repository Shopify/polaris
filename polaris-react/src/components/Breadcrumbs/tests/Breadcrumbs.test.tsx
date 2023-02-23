import React from 'react';
import {mountWithApp} from 'tests/utilities';

import type {CallbackAction, LinkAction} from '../../../types';
import {Breadcrumbs} from '../Breadcrumbs';
import {Text} from '../../Text';

describe('<Breadcrumbs />', () => {
  describe('url', () => {
    it('uses <a> tags when passed a LinkAction', () => {
      const linkBreadcrumb: LinkAction = {
        content: 'Products',
        url: 'https://www.shopify.com',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={linkBreadcrumb} />,
      );

      expect(breadcrumbs).toContainReactComponentTimes('a', 1);
    });

    it('passes the accessibilityLabel through to <a> tag', () => {
      const linkBreadcrumb: LinkAction = {
        content: 'Products',
        url: 'https://shopify.com',
        accessibilityLabel: 'Go to Products',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={linkBreadcrumb} />,
      );

      expect(breadcrumbs).toContainReactComponent('a', {
        'aria-label': 'Go to Products',
      });
    });
  });

  describe('onAction()', () => {
    it('uses <button> tags when passed a CallbackAction', () => {
      const callbackBreadcrumb: CallbackAction = {
        content: 'Products',
        onAction: noop,
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBreadcrumb} />,
      );

      expect(breadcrumbs).toContainReactComponentTimes('button', 1);
    });

    it('passes accessibilityLabel through to <button> tag', () => {
      const callbackBreadcrumb: CallbackAction = {
        content: 'Products',
        onAction: noop,
        accessibilityLabel: 'Go to Products',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBreadcrumb} />,
      );

      expect(breadcrumbs).toContainReactComponent('button', {
        'aria-label': 'Go to Products',
      });
    });

    it('triggers the callback function when clicked', () => {
      const spy = jest.fn();
      const callbackBreadcrumb: CallbackAction = {
        content: 'Products',
        onAction: spy,
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBreadcrumb} />,
      );

      breadcrumbs.find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });
  });

  const linkBreadcrumb: LinkAction = {
    content: 'Products',
    url: 'https://www.shopify.com',
  };

  it('renders breadcrumb content as a visually hidden label when the new design language is enabled', () => {
    const wrapper = mountWithApp(<Breadcrumbs backAction={linkBreadcrumb} />);

    expect(wrapper).toContainReactComponent(Text, {
      children: 'Products',
      visuallyHidden: true,
    });
  });
});

function noop() {}
