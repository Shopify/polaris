import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Avatar, Image} from 'components';

describe('<Avatar />', () => {
  describe('intials', () => {
    it('renders intials if the image is not provided', () => {
      const avatar = mountWithAppProvider(<Avatar initials="DL" />);
      expect(avatar.find('span[role="img"] span svg')).toHaveLength(1);
    });
  });

  describe('source', () => {
    it('renders an Image component with the Avatar source if one is provided', () => {
      const src = 'image/path/';
      const avatar = mountWithAppProvider(<Avatar source={src} />);
      const image = avatar.find(Image);
      expect(image.prop('source')).toBe(src);
    });

    it('safely updates', () => {
      const src = 'image/path/';
      const avatar = mountWithAppProvider(<Avatar source={src} />);
      expect(() => {
        avatar.setProps({source: 'image/new/path'});
      }).not.toThrow();
    });
  });

  describe('customer', () => {
    it('renders an inline svg', () => {
      const avatar = mountWithAppProvider(<Avatar customer />);
      expect(avatar.find('svg').exists()).toBe(true);
    });

    it('does not render a customer Avatar if a source is provided', () => {
      const src = 'image/path/';
      const avatar = mountWithAppProvider(<Avatar customer source={src} />);
      expect(avatar.find('svg').exists()).toBe(false);
    });
  });

  describe('Initials', () => {
    it('renders initials if the Image onError prop is triggered and the Intials are provided', () => {
      const avatar = mountWithApp(
        <Avatar size="large" initials="DL" source="image/path/" />,
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
      const avatar = mountWithAppProvider(<Avatar initials="" />);
      expect(avatar.find('svg').exists()).toBe(true);
    });
  });

  describe('on Error with changed props', () => {
    it('re-renders the image if a the source prop is changed after an error', () => {
      const workingSrc = 'image/goodPath/';
      const avatar = mountWithApp(
        <Avatar size="large" initials="DL" source="image/path/" />,
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
      const avatar = mountWithAppProvider(
        <Avatar accessibilityLabel="Hello World" />,
      );
      expect(avatar.find('span').first().prop('aria-label')).toBe(
        'Hello World',
      );
    });
  });

  describe('name', () => {
    it('is passed to the aria-label', () => {
      const avatar = mountWithAppProvider(<Avatar name="Hello World" />);
      expect(avatar.find('span').first().prop('aria-label')).toBe(
        'Hello World',
      );
    });
  });

  describe('styleClass', () => {
    it('renders a sixth style when newDesignLanguage is false', () => {
      const avatar = mountWithApp(<Avatar name="e" />, {
        features: {newDesignLanguage: false},
      });

      expect(avatar.domNodes[0].classList).toContain('styleSix');
    });

    it('does not render a sixth style when newDesignLanguage is true', () => {
      const avatar = mountWithApp(<Avatar name="e" />, {
        features: {newDesignLanguage: true},
      });

      expect(avatar.domNodes[0].classList).not.toContain('styleSix');
    });
  });
});
