import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {Image} from '../Image';

describe('<Image />', () => {
  describe('img attributes', () => {
    let src: string;
    let image: any;

    beforeAll(() => {
      src =
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
      image = mountWithAppProvider(
        <Image alt="alt text" source={src} crossOrigin="Anonymous" />,
      );
    });

    it('renders the src', () => {
      expect(image.find('img').prop('src')).toBe(src);
    });

    it('renders the alt text', () => {
      expect(image.find('img').prop('alt')).toBe('alt text');
    });

    it('renders the crossOrigin', () => {
      expect(image.find('img').prop('crossOrigin')).toBe('Anonymous');
    });
  });

  describe('sourceSet', () => {
    it('renders an img with a srcSet', () => {
      const src =
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
      const srcSet = [
        {
          source:
            'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
          descriptor: '1x',
        },
      ];
      const image = mountWithAppProvider(
        <Image
          alt="alt text"
          source={src}
          sourceSet={srcSet}
          crossOrigin="Anonymous"
        />,
      );

      expect(image.find('img').prop('srcSet')).toBe(
        `${srcSet[0].source} ${srcSet[0].descriptor}`,
      );
    });
  });

  describe('onError', () => {
    it('calls the onError callback when the image onError is triggered', () => {
      const spy = jest.fn();
      const image = mountWithAppProvider(
        <Image alt="alt text" source="404" onError={spy} />,
      );

      trigger(image.find('img'), 'onError');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onLoad', () => {
    it('calls the onLoad callback when the image on onLoad is triggered', () => {
      const spy = jest.fn();
      const image = mountWithAppProvider(
        <Image alt="alt text" source="/path/to/image" onLoad={spy} />,
      );

      trigger(image.find('img'), 'onLoad');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
