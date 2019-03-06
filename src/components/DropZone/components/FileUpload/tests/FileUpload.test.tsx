import * as React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import {Provider} from '../../Context';
import FileUpload from '../FileUpload';
import {fileUpload as fileUploadImage, imageUpload} from '../../../images';
import {Size} from '../../../types';

describe('<FileUpload />', () => {
  describe('extraLarge', () => {
    it('renders extra large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <Provider
          value={{
            width: Size.ExtraLarge,
            height: Size.ExtraLarge,
            type: 'file',
          }}
        >
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });

    it('renders extra large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <Provider
          value={{
            width: Size.ExtraLarge,
            height: Size.ExtraLarge,
            type: 'image',
          }}
        >
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });
  });

  describe('large', () => {
    it('renders large view', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
          <FileUpload />
        </Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });

    it('renders large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
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
        <Provider
          value={{width: Size.Large, height: Size.Large, type: 'image'}}
        >
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
      <Provider value={{width: Size.Medium, height: Size.Medium, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Link)).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Small, height: Size.Small, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('renders the smaller view when width is small but height is large', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Small, height: Size.Large, type: 'file'}}>
        <FileUpload />
      </Provider>,
    );
    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('sets a default actionTitle if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
        <FileUpload actionTitle="Title" />
      </Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(Button).text()).toBe('Add file');
  });

  it('sets a default actionHint if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
        <FileUpload actionHint="Hint" />
      </Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(TextStyle).text()).toBe('or drop files to upload');
  });

  it('does not use default action title and hint when props are changed', () => {
    const actionTitle = 'Add file title';
    const actionHint = 'or drop files to upload hint';
    const fileUpload = mountWithAppProvider(
      <Provider value={{width: Size.Large, height: Size.Large, type: 'file'}}>
        <FileUpload actionTitle={actionTitle} actionHint={actionHint} />
      </Provider>,
    );

    fileUpload.setProps({
      children: (
        <FileUpload actionTitle={actionTitle} actionHint={actionHint} />
      ),
    });
    expect(fileUpload.props()).toStrictEqual({actionTitle, actionHint});
  });
});
