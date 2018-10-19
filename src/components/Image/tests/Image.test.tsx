import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Image from '../Image';

describe('<Image />', () => {
  describe('accessibilityLabel', () => {
    let src: string;
    let image: any;

    beforeAll(() => {
      src =
        'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
      image = mountWithAppProvider(<Image alt="alt text" source={src} />);
    });

    it('renders the src', () => {
      expect(image.find('img').prop('src')).toBe(src);
    });

    it('renders the alt text', () => {
      expect(image.find('img').prop('alt')).toBe('alt text');
    });
  });
});
