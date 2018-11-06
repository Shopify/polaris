import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {Image} from 'components';
import Avatar from '../Avatar';

describe('<Avatar />', () => {
  describe('intials', () => {
    it('renders intials if the image is not provided ', () => {
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
  });

  describe('customer', () => {
    it('renders an Image component with a customer Avatar if the customer prop is true ', () => {
      const avatar = mountWithAppProvider(<Avatar customer />);
      const image = avatar.find(Image);
      expect(image.prop('source')).toContain('avatar-');
    });

    it('does not render a customer Avatar if a source is provided', () => {
      const src = 'image/path/';
      const avatar = mountWithAppProvider(<Avatar customer source={src} />);
      const image = avatar.find(Image);
      expect(image.prop('source')).not.toContain('avatar-');
    });
  });

  describe('on Error with Intials', () => {
    it('renders initials if the Image onError prop is triggered and the Intials are provided.', () => {
      const src = 'image/path/';
      const avatar = mountWithAppProvider(
        <Avatar size="large" initials="DL" source={src} />,
      );
      expect(avatar.find('span[role="img"] span svg')).toHaveLength(0);
      trigger(avatar.find(Image), 'onError');
      expect(avatar.find('span[role="img"] span svg')).toHaveLength(1);
    });
  });
});
