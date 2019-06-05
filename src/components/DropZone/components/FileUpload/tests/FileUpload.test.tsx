import React from 'react';
import {Link, Icon, Button, Caption, TextStyle} from 'components';
import {mountWithAppProvider} from 'test-utilities/legacy';
import DropZoneContext from '../../../context';
import FileUpload from '../FileUpload';
import {fileUpload as fileUploadImage, imageUpload} from '../../../images';

describe('<FileUpload />', () => {
  describe('extraLarge', () => {
    it('renders extra large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider value={{size: 'extraLarge', type: 'file'}}>
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });

    it('renders extra large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider value={{size: 'extraLarge', type: 'image'}}>
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });
  });

  describe('large', () => {
    it('renders large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider value={{size: 'large', type: 'file'}}>
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });

    it('renders large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider value={{size: 'large', type: 'image'}}>
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(fileUpload.find(Button)).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider value={{size: 'medium', type: 'file'}}>
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(fileUpload.find(Link)).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider value={{size: 'small', type: 'file'}}>
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('sets a default actionTitle if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider value={{size: 'large', type: 'file'}}>
        <FileUpload actionTitle="Title" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(Button).text()).toBe('Add file');
  });

  it('sets a default actionHint if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider value={{size: 'large', type: 'file'}}>
        <FileUpload actionHint="Hint" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(TextStyle).text()).toBe('or drop files to upload');
  });

  it('does not use default action title and hint when props are changed', () => {
    const actionTitle = 'Add file title';
    const actionHint = 'or drop files to upload hint';
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider value={{size: 'large', type: 'file'}}>
        <FileUpload actionTitle={actionTitle} actionHint={actionHint} />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({actionTitle, actionHint});

    expect(fileUpload.props()).toStrictEqual({actionTitle, actionHint});
  });
});
