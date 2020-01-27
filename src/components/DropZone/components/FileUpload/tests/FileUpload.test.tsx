import React from 'react';
import {Icon, Caption, TextStyle} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, findByTestID} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {DropZoneContext} from '../../../context';
import {FileUpload} from '../FileUpload';
import {fileUpload as fileUploadImage, imageUpload} from '../../../images';

describe('<FileUpload />', () => {
  const defaultStates = {
    hover: false,
    focused: false,
    disabled: false,
    measuring: false,
  };
  describe('measuring', () => {
    it('hides the FileUpload while measuring is true', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider
          value={{
            size: 'extraLarge',
            type: 'file',
            ...defaultStates,
            measuring: true,
          }}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      const wrapper = fileUpload.find('div').first();
      expect(wrapper.hasClass('measuring')).toBe(true);
    });
  });

  describe('extraLarge', () => {
    it('renders extra large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider
          value={{
            size: 'extraLarge',
            type: 'file',
            ...defaultStates,
          }}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(findByTestID(fileUpload, 'Button')).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });

    it('renders extra large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider
          value={{size: 'extraLarge', type: 'image', ...defaultStates}}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(findByTestID(fileUpload, 'Button')).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
    });
  });

  describe('large', () => {
    it('renders large view for type file', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider
          value={{size: 'large', type: 'file', ...defaultStates}}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(fileUploadImage);
      expect(findByTestID(fileUpload, 'Button')).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });

    it('renders large view for type image', () => {
      const fileUpload = mountWithAppProvider(
        <DropZoneContext.Provider
          value={{size: 'large', type: 'image', ...defaultStates}}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload.find('img').prop('src')).toBe(imageUpload);
      expect(findByTestID(fileUpload, 'Button')).toHaveLength(1);
      expect(fileUpload.find(TextStyle)).toHaveLength(1);
      expect(fileUpload.find(Caption)).toHaveLength(1);
    });
  });

  it('renders medium view', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider
        value={{size: 'medium', type: 'file', ...defaultStates}}
      >
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(findByTestID(fileUpload, 'Link')).toHaveLength(1);
    expect(fileUpload.find(Caption)).toHaveLength(1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider
        value={{size: 'small', type: 'file', ...defaultStates}}
      >
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(fileUpload.find(Icon)).toHaveLength(1);
  });

  it('sets a default actionTitle if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider
        value={{size: 'large', type: 'file', ...defaultStates}}
      >
        <FileUpload actionTitle="Title" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(findByTestID(fileUpload, 'Button').text()).toBe('Add file');
  });

  it('sets a default actionHint if the prop is provided then removed', () => {
    const fileUpload = mountWithAppProvider(
      <DropZoneContext.Provider
        value={{size: 'large', type: 'file', ...defaultStates}}
      >
        <FileUpload actionHint="Hint" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload.find(TextStyle).text()).toBe('or drop files to upload');
  });

  describe('globalTheming', () => {
    it('adds a global theming class when global theming is enabled', () => {
      const fileUpload = mountWithApp(
        <DropZoneContext.Provider
          value={{
            size: 'extraLarge',
            type: 'file',
            ...defaultStates,
            measuring: true,
          }}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
        {
          features: {unstableGlobalTheming: true},
        },
      );

      expect(fileUpload).toContainReactComponent('div', {
        className: 'FileUpload globalTheming measuring',
      });
      expect(fileUpload).toContainReactComponent('div', {
        className: 'Button globalTheming',
      });
    });

    it('does not add a global theming class when global theming is disabled', () => {
      const fileUpload = mountWithApp(
        <DropZoneContext.Provider
          value={{
            size: 'extraLarge',
            type: 'file',
            ...defaultStates,
            measuring: true,
          }}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
        {
          features: {unstableGlobalTheming: false},
        },
      );

      expect(fileUpload).not.toContainReactComponent('div', {
        className: 'FileUpload globalTheming measuring',
      });
      expect(fileUpload).not.toContainReactComponent('div', {
        className: 'Button globalTheming',
      });
    });
  });
});
