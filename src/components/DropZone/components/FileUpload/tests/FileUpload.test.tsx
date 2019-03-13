import * as React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import {Provider} from '../../Context';
import FileUpload from '../FileUpload';
import {fileUpload as fileUploadImage, imageUpload} from '../../../images';

describe('<FileUpload />', () => {
  describe('extraLarge', () => {
    it('renders extra large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{size: 'extraLarge', type: 'file'}}>
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });

    it('renders extra large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{size: 'extraLarge', type: 'image'}}>
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });
  });

  describe('large', () => {
    it('renders large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{size: 'large', type: 'file'}}>
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });

    it('renders large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{size: 'large', type: 'image'}}>
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'medium', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link)).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{size: 'small', type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });
});
