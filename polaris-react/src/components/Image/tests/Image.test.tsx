import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Image} from '../Image';

describe('<Image />', () => {
  describe('img attributes', () => {
    const src =
      'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';

    it('renders the src', () => {
      const image = mountWithApp(
        <Image alt="alt text" source={src} crossOrigin="anonymous" />,
      );
      expect(image).toContainReactComponent('img', {src});
    });

    it('renders the alt text', () => {
      const image = mountWithApp(
        <Image alt="alt text" source={src} crossOrigin="anonymous" />,
      );
      expect(image).toContainReactComponent('img', {alt: 'alt text'});
    });

    it('renders the crossOrigin', () => {
      const image = mountWithApp(
        <Image alt="alt text" source={src} crossOrigin="anonymous" />,
      );
      expect(image).toContainReactComponent('img', {crossOrigin: 'anonymous'});
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
      const image = mountWithApp(
        <Image
          alt="alt text"
          source={src}
          sourceSet={srcSet}
          crossOrigin="anonymous"
        />,
      );

      expect(image).toContainReactComponent('img', {
        srcSet: `${srcSet[0].source} ${srcSet[0].descriptor}`,
      });
    });
  });

  describe('onError', () => {
    it('calls the onError callback when the image onError is triggered', () => {
      const spy = jest.fn();
      const image = mountWithApp(
        <Image alt="alt text" source="404" onError={spy} />,
      );

      image.find('img')!.trigger('onError');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onLoad', () => {
    it('calls the onLoad callback when the image on onLoad is triggered', () => {
      const spy = jest.fn();
      const image = mountWithApp(
        <Image alt="alt text" source="/path/to/image" onLoad={spy} />,
      );

      image.find('img')!.trigger('onLoad');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
