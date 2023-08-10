import React from 'react';
import {mountWithApp} from 'tests/utilities';

import type {CallbackAction, LinkAction} from '../../../types';
import {Breadcrumbs} from '../Breadcrumbs';
import {Text} from '../../Text';

describe('<Breadcrumbs />', () => {
  describe('url', () => {
    it('uses <a> tags when passed a LinkAction', () => {
      const linkBackAction: LinkAction = {
        content: 'Products',
        url: 'https://www.shopify.com',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={linkBackAction} />,
      );

      expect(breadcrumbs).toContainReactComponentTimes('a', 1);
    });

    it('passes the accessibilityLabel through to <a> tag', () => {
      const linkBackAction: LinkAction = {
        content: 'Products',
        url: 'https://shopify.com',
        accessibilityLabel: 'Go to Products',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={linkBackAction} />,
      );

      expect(breadcrumbs).toContainReactComponent('a', {
        'aria-label': 'Go to Products',
      });
    });
  });

  describe('onAction()', () => {
    it('uses <button> tags when passed a CallbackAction', () => {
      const callbackBackAction: CallbackAction = {
        content: 'Products',
        onAction: noop,
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBackAction} />,
      );

      expect(breadcrumbs).toContainReactComponentTimes('button', 1);
    });

    it('passes accessibilityLabel through to <button> tag', () => {
      const callbackBackAction: CallbackAction = {
        content: 'Products',
        onAction: noop,
        accessibilityLabel: 'Go to Products',
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBackAction} />,
      );

      expect(breadcrumbs).toContainReactComponent('button', {
        'aria-label': 'Go to Products',
      });
    });

    it('triggers the callback function when clicked', () => {
      const spy = jest.fn();
      const callbackBackAction: CallbackAction = {
        content: 'Products',
        onAction: spy,
      };
      const breadcrumbs = mountWithApp(
        <Breadcrumbs backAction={callbackBackAction} />,
      );

      breadcrumbs.find('button')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });
  });

  it('renders breadcrumb content as a visually hidden label', () => {
    const linkBackAction: LinkAction = {
      content: 'Products',
      url: 'https://www.shopify.com',
    };
    const wrapper = mountWithApp(<Breadcrumbs backAction={linkBackAction} />);

    expect(wrapper).toContainReactComponent(Text, {
      visuallyHidden: true,
    });
  });
});

function noop() {}
