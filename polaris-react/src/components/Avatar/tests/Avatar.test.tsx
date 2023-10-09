import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Image} from '../../Image';
import {Avatar} from '../Avatar';

describe('<Avatar />', () => {
  describe('intials', () => {
    it('renders initials if the image is not provided', () => {
      const avatar = mountWithApp(<Avatar initials="DL" />);

      expect(avatar).toContainReactComponent('span', {
        className: 'Initials',
      });
      expect(avatar).toContainReactText('DL');
      expect(avatar).not.toContainReactComponent(Image);
    });
  });

  describe('source', () => {
    it('renders an Image component with the Avatar source if one is provided', () => {
      const src = 'image/path/';
      const avatar = mountWithApp(<Avatar source={src} />);
      expect(avatar).toContainReactComponent(Image, {source: src});
    });

    it('safely updates', () => {
      const src = 'image/path/';
      const avatar = mountWithApp(<Avatar source={src} />);
      expect(() => {
        avatar.setProps({source: 'image/new/path'});
      }).not.toThrow();
    });

    it('does not apply a style background class', () => {
      const src = 'image/path/';
      const avatar = mountWithApp(<Avatar source={src} />);
      expect(avatar).toContainReactComponent('span', {
        className: 'Avatar sizeMd',
      });
      expect(avatar).toContainReactComponent('span', {
        className: expect.not.stringContaining('styleOne'),
      });
    });
  });

  describe('customer', () => {
    it('renders an inline svg', () => {
      const avatar = mountWithApp(<Avatar customer />);
      expect(avatar).toContainReactComponentTimes('svg', 1);
    });

    it('does not render a customer Avatar if a source is provided', () => {
      const src = 'image/path/';
      const avatar = mountWithApp(<Avatar customer source={src} />);
      expect(avatar).not.toContainReactComponent('svg');
    });

    it('does not apply a style class', () => {
      const src = 'image/path/';
      const avatar = mountWithApp(<Avatar customer source={src} />);
      expect(avatar).toContainReactComponent('span', {
        className: 'Avatar sizeMd',
      });
      expect(avatar).toContainReactComponent('span', {
        className: expect.not.stringContaining('styleOne'),
      });
    });
  });

  describe('Initials', () => {
    it('renders initials if the Image onError prop is triggered and the Intials are provided', () => {
      const avatar = mountWithApp(
        <Avatar size="lg" initials="DL" source="image/path/" />,
      );

      expect(avatar).toContainReactComponent(Image);
      expect(avatar).not.toContainReactComponent('span', {
        className: 'Initials',
      });

      avatar.find(Image)!.trigger('onError');

      expect(avatar).not.toContainReactComponent(Image);
      expect(avatar).toContainReactComponent('span', {
        className: 'Initials',
      });
    });

    it('renders an inline svg if initials are blank', () => {
      const avatar = mountWithApp(<Avatar initials="" />);
      expect(avatar).toContainReactComponentTimes('svg', 1);
    });
  });

  describe('consumer-specified "onError" hook', () => {
    it('gets invoked in the event of an error', () => {
      const spy = jest.fn();
      const avatar = mountWithApp(
        <Avatar size="lg" initials="DL" source="image/path/" onError={spy} />,
      );

      avatar.find(Image)!.trigger('onError');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('on Error with changed props', () => {
    it('re-renders the image if a the source prop is changed after an error', () => {
      const workingSrc = 'image/goodPath/';
      const avatar = mountWithApp(
        <Avatar size="lg" initials="DL" source="image/path/" />,
      );
      avatar.find(Image)!.trigger('onError');

      expect(avatar).not.toContainReactComponent(Image);

      avatar.setProps({source: workingSrc});
      expect(avatar).toContainReactComponent(Image);
    });
  });

  describe('on Load', () => {
    it('safely triggers onLoad', () => {
      const avatar = mountWithApp(<Avatar source="image/path/" />);
      expect(() => {
        avatar.find(Image)!.trigger('onLoad');
      }).not.toThrow();
    });
  });

  describe('accessibilityLabel', () => {
    it('is passed to the aria-label', () => {
      const avatar = mountWithApp(<Avatar accessibilityLabel="Hello World" />);
      expect(avatar).toContainReactComponent('span', {
        'aria-label': 'Hello World',
      });
    });
  });

  describe('name', () => {
    it('is passed to the aria-label', () => {
      const avatar = mountWithApp(<Avatar name="Hello World" />);
      expect(avatar).toContainReactComponent('span', {
        'aria-label': 'Hello World',
      });
    });
  });

  describe('accessibilityRole', () => {
    it('is presentation role if name, initials, or accessibilityLabel not passed', () => {
      const avatar = mountWithApp(<Avatar />);

      expect(avatar).toContainReactComponent('span', {
        role: 'presentation',
      });
    });

    it('is img role if name passed', () => {
      const avatar = mountWithApp(<Avatar name="Hello World" />);

      expect(avatar).toContainReactComponent('span', {
        role: 'img',
      });
    });
  });
});
