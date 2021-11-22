import React from 'react';
import {Caption, TextStyle} from 'components';
import {mountWithApp} from 'tests/utilities';

import {DropZoneContext} from '../../../context';
import {FileUpload} from '../FileUpload';
import {uploadArrow as uploadArrowImage} from '../../../images';

describe('<FileUpload />', () => {
  const defaultStates = {
    hover: false,
    focused: false,
    disabled: false,
    measuring: false,
    allowMultiple: true,
  };
  describe('measuring', () => {
    it('hides the FileUpload while measuring is true', () => {
      const fileUpload = mountWithApp(
        <DropZoneContext.Provider
          value={{
            size: 'large',
            type: 'file',
            ...defaultStates,
            measuring: true,
          }}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload).toContainReactComponent('div', {
        className: expect.stringContaining('measuring'),
      });
    });
  });

  describe('large', () => {
    it('renders large view', () => {
      const fileUpload = mountWithApp(
        <DropZoneContext.Provider
          value={{size: 'large', type: 'file', ...defaultStates}}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload).toContainReactComponent('img', {
        src: uploadArrowImage,
      });
      expect(fileUpload).toContainReactComponent(Caption);
      expect(fileUpload).toContainReactComponent(TextStyle);

      expect(fileUpload).toContainReactComponent('div', {
        className: 'Button slim',
      });
    });
  });

  it('renders medium view', () => {
    const fileUpload = mountWithApp(
      <DropZoneContext.Provider
        value={{size: 'medium', type: 'file', ...defaultStates}}
      >
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(fileUpload).toContainReactComponent('div', {
      className: 'ActionTitle',
    });
    expect(fileUpload).toContainReactComponentTimes(Caption, 1);
  });

  it('renders small view', () => {
    const fileUpload = mountWithApp(
      <DropZoneContext.Provider
        value={{size: 'small', type: 'file', ...defaultStates}}
      >
        <FileUpload />
      </DropZoneContext.Provider>,
    );

    expect(fileUpload).toContainReactComponentTimes('img', 1);
  });

  it('sets a default actionTitle if the prop is provided then removed', () => {
    const fileUpload = mountWithApp(
      <DropZoneContext.Provider
        value={{size: 'large', type: 'file', ...defaultStates}}
      >
        <FileUpload actionTitle="Title" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});

    expect(fileUpload).toContainReactText('Add files');
  });

  it('sets a default actionHint if the prop is provided then removed', () => {
    const fileUpload = mountWithApp(
      <DropZoneContext.Provider
        value={{size: 'large', type: 'file', ...defaultStates}}
      >
        <FileUpload actionHint="Hint" />
      </DropZoneContext.Provider>,
    );

    fileUpload.setProps({children: <FileUpload />});
    expect(fileUpload).toContainReactText('or drop files to upload');
  });

  it.each([
    [false, 'image', 'Add image', 'or drop image to upload'],
    [true, 'image', 'Add images', 'or drop images to upload'],
    [false, 'file', 'Add file', 'or drop file to upload'],
    [true, 'file', 'Add files', 'or drop files to upload'],
  ])(
    'renders texts when allowMultiple is %s and type is %s',
    (allowMultiple, type, expectedButtonText, expectedTextStyleText) => {
      const fileUpload = mountWithApp(
        <DropZoneContext.Provider
          value={{size: 'large', ...defaultStates, allowMultiple, type}}
        >
          <FileUpload />
        </DropZoneContext.Provider>,
      );

      expect(fileUpload).toContainReactComponent('div', {
        children: expectedButtonText,
      });
      expect(fileUpload).toContainReactComponent(TextStyle, {
        children: expectedTextStyleText,
      });
    },
  );
});
