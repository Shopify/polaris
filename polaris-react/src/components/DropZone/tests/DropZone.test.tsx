import React from 'react';
import {act} from 'react-dom/test-utils';
import {clock} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';
import type {CustomRoot} from 'tests/utilities';

import {Text} from '../../Text';
import {Label} from '../../Label';
import {Labelled} from '../../Labelled';
import {DropZone} from '../DropZone';
import type {DropZoneFileType} from '../DropZone';
import {DropZoneContext} from '../context';

const files = [
  {
    name: 'jpeg file',
    type: 'image/jpeg',
  },
  {
    name: 'svg file',
    type: 'image/svg',
  },
];
const duplicateFiles = [
  {
    name: 'jpegs files',
    type: 'image/jpeg',
  },
  {
    name: 'svg file',
    type: 'image/svg',
  },
];
const acceptedFiles = [files[0]];
const rejectedFiles = [files[1]];
const origGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const origClick = HTMLElement.prototype.click;
const widths = {
  small: 99,
  medium: 159,
  large: 299,
};

describe('<DropZone />', () => {
  let spy: jest.Mock;

  beforeEach(() => {
    spy = jest.fn();
    clock.mock();
  });

  afterEach(() => {
    clock.restore();
    HTMLElement.prototype.click = origClick;
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = origGetBoundingClientRect;
  });

  it('calls the onDrop callback when a drop event is fired', () => {
    const dropZone = mountWithApp(<DropZone onDrop={spy} />);
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(files, files, []);
  });

  it('calls the onDrop callback when a drop event is fired on document twice when a duplicate file is added consecutively', () => {
    const dropZone = mountWithApp(<DropZone onDrop={spy} />);
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(files, files, []);

    fireEvent({wrapper: dropZone, testFiles: duplicateFiles});
    expect(spy).toHaveBeenCalledWith(duplicateFiles, duplicateFiles, []);
  });

  it('calls the onDrop callback with files when a drop event is fired on document', () => {
    mountWithApp(<DropZone dropOnPage onDrop={spy} />);
    const event = createEvent('drop', files);
    act(() => {
      document.dispatchEvent(event);
    });
    expect(spy).toHaveBeenCalledWith(files, files, []);
  });

  it('calls the onDrop callback with files, acceptedFiles, and rejectedFiles when it accepts only jpeg', () => {
    const dropZone = mountWithApp(
      <DropZone onDrop={spy} accept="image/jpeg" />,
    );
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('calls the onDropAccepted callback with acceptedFiles when it accepts only jpeg', () => {
    const dropZone = mountWithApp(
      <DropZone onDropAccepted={spy} accept="image/jpeg" />,
    );
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(acceptedFiles);
  });

  it('calls the onDropRejected callback with rejectedFiles when it accepts only jpeg', () => {
    const dropZone = mountWithApp(
      <DropZone onDropRejected={spy} accept="image/jpeg" />,
    );
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(rejectedFiles);
  });

  it('calls the onDragEnter callback when a dragenter event is fired', () => {
    const dropZone = mountWithApp(<DropZone onDragEnter={spy} />);
    fireEvent({wrapper: dropZone, eventType: 'dragenter'});
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onDragOver callback when a dragover event is fired', () => {
    const dropZone = mountWithApp(<DropZone onDragOver={spy} />);
    fireEvent({wrapper: dropZone, eventType: 'dragover'});
    expect(spy).toHaveBeenCalled();
  });

  it('calls the onDragLeave callback when a dragleave event is fired', () => {
    const dropZone = mountWithApp(<DropZone onDragLeave={spy} />);
    fireEvent({wrapper: dropZone, eventType: 'dragleave'});
    expect(spy).toHaveBeenCalled();
  });

  it('validates files, acceptedFiles, and rejectedFiles when customValidator property is added', () => {
    const customValidator = (file: File) => {
      return file.type === 'image/jpeg';
    };
    const dropZone = mountWithApp(
      <DropZone onDrop={spy} customValidator={customValidator} />,
    );
    fireEvent({wrapper: dropZone});
    expect(spy).toHaveBeenCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('does not call any callbacks when disabled', () => {
    const dropZone = mountWithApp(
      <DropZone
        disabled
        onDrop={spy}
        onDropAccepted={spy}
        onDropRejected={spy}
        onDragEnter={spy}
        onDragLeave={spy}
        onDragOver={spy}
      />,
    );
    fireEvent({wrapper: dropZone, spy});
    expect(spy).not.toHaveBeenCalled();
    fireEvent({wrapper: dropZone, eventType: 'dragenter', spy});
    expect(spy).not.toHaveBeenCalled();
    fireEvent({wrapper: dropZone, eventType: 'dragleave', spy});
    expect(spy).not.toHaveBeenCalled();
    fireEvent({wrapper: dropZone, eventType: 'dragover', spy});
    expect(spy).not.toHaveBeenCalled();
  });

  it('calls callbacks when not allowed multiple and a replacement file is uploaded', () => {
    const dropZone = mountWithApp(
      <DropZone
        allowMultiple={false}
        onDrop={spy}
        onDragEnter={spy}
        onDragLeave={spy}
        onDragOver={spy}
        accept="image/jpeg"
      />,
    );

    // Initial event to populate zone with data (should succeed)
    fireEvent({wrapper: dropZone, spy});
    expect(spy).toHaveBeenCalledWith(files, acceptedFiles, rejectedFiles);

    // Attempt to replace the current file
    fireEvent({wrapper: dropZone, spy});
    expect(spy).toHaveBeenCalledWith(files, acceptedFiles, rejectedFiles);
    fireEvent({wrapper: dropZone, eventType: 'dragenter', spy});
    expect(spy).toHaveBeenCalled();
    fireEvent({wrapper: dropZone, eventType: 'dragleave', spy});
    expect(spy).toHaveBeenCalled();
    fireEvent({wrapper: dropZone, eventType: 'dragover', spy});
    expect(spy).toHaveBeenCalled();
  });

  it('renders <Labelled /> when `label` is provided', () => {
    const labelText = 'My DropZone label';
    const dropZone = mountWithApp(<DropZone label={labelText} />);
    expect(dropZone).toContainReactComponent(Labelled, {label: labelText});
  });

  it('renders a <Label /> with matching id for the file input', () => {
    const id = 'Test';
    const dropZone = mountWithApp(
      <DropZone id={id} label="My DropZone label" />,
    );
    const label = dropZone.find(Label)!;

    expect(dropZone).toContainReactComponent(Label, {id});

    expect(label.prop('id')).toStrictEqual(id);
    const input = dropZone.find('input', {type: 'file'});

    expect(input).toHaveReactProps({id});
  });

  it('renders a disabled input when the disabled prop is true', () => {
    const dropZone = mountWithApp(<DropZone disabled />);
    expect(dropZone.find('input', {type: 'file'})).toHaveReactProps({
      disabled: true,
    });
  });

  it.each([
    [false, 'image', 'Drop image to upload', 'Upload image'],
    [true, 'image', 'Drop images to upload', 'Upload images'],
    [false, 'file', 'Drop file to upload', 'Upload file'],
    [true, 'file', 'Drop files to upload', 'Upload files'],
    [false, 'video', 'Drop video to upload', 'Upload video'],
    [true, 'video', 'Drop videos to upload', 'Upload videos'],
  ])(
    'renders texts when allowMultiple is %s and type is %s',
    (allowMultiple, type, expectedText, expectedLabelText) => {
      const dropZone = mountWithApp(
        <DropZone
          overlay
          allowMultiple={allowMultiple}
          type={type as DropZoneFileType}
        />,
      );

      act(() => {
        dropZone
          .find('div', {'aria-disabled': false})!
          .domNode!.dispatchEvent(new Event('dragenter'));
      });

      dropZone.forceUpdate();

      expect(dropZone).toContainReactComponent(Text, {
        children: expectedText,
      });

      expect(dropZone).toContainReactComponent(Labelled, {
        label: expectedLabelText,
      });
    },
  );

  describe('onClick', () => {
    it('calls the onClick when clicking the dropzone if one is provided', () => {
      const spy = jest.fn();
      const dropZone = mountWithApp(
        <DropZone label="My DropZone label" onClick={spy} />,
      );

      dropZone
        .find('div', {
          'aria-disabled': false,
        })
        ?.trigger('onClick');

      expect(spy).toHaveBeenCalled();
    });

    it('does not call the onClick when the dropzone is disabled', () => {
      const spy = jest.fn();
      const dropZone = mountWithApp(
        <DropZone disabled label="My DropZone label" onClick={spy} />,
      );

      dropZone
        .find('div', {
          'aria-disabled': true,
        })
        ?.domNode!.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('triggers the file input click event if no onClick is provided', () => {
      const dropZone = mountWithApp(<DropZone label="My DropZone label" />);

      const fileInput = dropZone.find('input')!.domNode;

      const spy = jest.spyOn(fileInput as HTMLElement, 'click');
      dropZone.find('div', {'aria-disabled': false})!.trigger('onClick');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('labelAction', () => {
    it("passes 'labelAction' to the Labelled options", () => {
      const callbackDropZone = {
        onAction: () => {},
      };
      const dropZone = mountWithApp(
        <DropZone label="My DropZone label" labelAction={callbackDropZone} />,
      );

      expect(dropZone).toContainReactComponent(Labelled, {
        action: callbackDropZone,
      });
    });
  });

  describe('labelHidden', () => {
    it("passes 'labelHidden' to the Labelled options", () => {
      const dropZone = mountWithApp(
        <DropZone label="My DropZone label" labelHidden />,
      );
      expect(dropZone).toContainReactComponent(Labelled, {labelHidden: true});
    });
  });

  describe('overlayText', () => {
    const overlayText = 'overlay text';

    it('does not render the overlayText on small screens', () => {
      setBoundingClientRect('small');
      const dropZone = mountWithApp(<DropZone overlayText={overlayText} />);
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).not.toContainReactComponent(Text, {
        variant: 'bodySm',
        as: 'p',
      });
    });

    it('renders a Text containing the overlayText on medium screens', () => {
      setBoundingClientRect('medium');
      const dropZone = mountWithApp(<DropZone overlayText={overlayText} />);
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      const text = dropZone.find(Text, {
        variant: 'bodySm',
        as: 'p',
      });
      expect(text).toContainReactText(overlayText);
    });

    it('renders a Text containing the overlayText on large screens', () => {
      setBoundingClientRect('large');
      const dropZone = mountWithApp(<DropZone overlayText={overlayText} />);
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      const text = dropZone.find(Text, {
        variant: 'bodySm',
        as: 'p',
      });
      expect(text).toContainReactText(overlayText);
    });

    it('renders a Text containing the overlayText on any screen size when variableHeight is true', () => {
      setBoundingClientRect('small');
      const dropZone = mountWithApp(
        <DropZone overlayText={overlayText} variableHeight />,
      );
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).toContainReactComponent(Text, {
        children: overlayText,
      });
    });
  });

  describe('errorOverlayText', () => {
    const errorOverlayText = "can't drop this";

    it("doesn't render the overlayText on small screens", () => {
      setBoundingClientRect('small');
      const dropZone = mountWithApp(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).not.toContainReactComponent(Text, {
        variant: 'bodySm',
        as: 'p',
      });
    });

    it('renders a Text containing the overlayText on medium screens', () => {
      setBoundingClientRect('medium');
      const dropZone = mountWithApp(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).toContainReactComponent(Text, {
        children: errorOverlayText,
      });
    });

    it('renders a Text containing the overlayText on large screens', () => {
      setBoundingClientRect('large');
      const dropZone = mountWithApp(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).toContainReactComponent(Text, {
        children: errorOverlayText,
      });
    });

    it('renders a Text containing the overlayText on any screen size when variableHeight is true', () => {
      setBoundingClientRect('small');
      const dropZone = mountWithApp(
        <DropZone
          errorOverlayText={errorOverlayText}
          accept="image/gif"
          variableHeight
        />,
      );
      fireEvent({wrapper: dropZone, eventType: 'dragenter'});
      expect(dropZone).toContainReactComponent(Text, {
        children: errorOverlayText,
      });
    });
  });

  describe('onFileDialogClose', () => {
    it('triggers onFileDialogClose when openFileDialog is true', () => {
      const spy = jest.fn();
      mountWithApp(
        <DropZone
          label="My DropZone label"
          openFileDialog
          onFileDialogClose={spy}
        />,
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('context', () => {
    it('sets type from props on context', () => {
      const type = 'image';

      function Component() {
        return (
          <DropZone type="image">
            <DropZoneContext.Consumer>
              {(ctx) => {
                return type === ctx.type ? <div /> : null;
              }}
            </DropZoneContext.Consumer>
          </DropZone>
        );
      }

      const component = mountWithApp(<Component />);
      expect(component).toContainReactComponent('div');
    });

    it('sets focused to true when the input file is focused', () => {
      const dropZone = mountWithApp(
        <DropZone>
          <DropZoneContext.Consumer>
            {({focused}) => {
              return focused ? <div id="focused" /> : null;
            }}
          </DropZoneContext.Consumer>
        </DropZone>,
      );
      const fileInput = dropZone.find('input', {type: 'file'})!;
      fileInput.trigger('onFocus');
      expect(dropZone).toContainReactComponent('div', {id: 'focused'});
    });

    it('sets focused to false when the input file is blur', () => {
      const dropZone = mountWithApp(
        <DropZone>
          <DropZoneContext.Consumer>
            {({focused}) => {
              return focused ? null : <div id="blurred" />;
            }}
          </DropZoneContext.Consumer>
        </DropZone>,
      );
      const fileInput = dropZone.find('input', {type: 'file'})!;
      fileInput.trigger('onBlur');
      expect(dropZone).toContainReactComponent('div', {id: 'blurred'});
    });

    it('sets disabled to true when the dropzone is disabled', () => {
      const dropZone = mountWithApp(
        <DropZone disabled>
          <DropZoneContext.Consumer>
            {({disabled}) => {
              return disabled ? <div id="disabled" /> : null;
            }}
          </DropZoneContext.Consumer>
        </DropZone>,
      );

      expect(dropZone).toContainReactComponent('div', {id: 'disabled'});
    });

    it('sets the default type to file if not specified', () => {
      const dropZone = mountWithApp(
        <DropZone>
          <DropZoneContext.Consumer>
            {({type}) => {
              return type === 'file' ? <div id="file" /> : null;
            }}
          </DropZoneContext.Consumer>
        </DropZone>,
      );

      expect(dropZone).toContainReactComponent('div', {id: 'file'});
    });
  });

  describe('lifecycle', () => {
    it('triggers the file input dialog on mount when openFileDialog is true', () => {
      const spy = jest.spyOn(HTMLElement.prototype, 'click');

      mountWithApp(<DropZone label="My DropZone label" openFileDialog />);
      expect(spy).toHaveBeenCalled();
    });

    it('updates safely', () => {
      const dropZone = mountWithApp(<DropZone />);

      expect(() => {
        dropZone.setProps({openFileDialog: true});
      }).not.toThrow();
    });

    it('unmounts safely', () => {
      const dropZone = mountWithApp(<DropZone />);

      expect(() => {
        dropZone.unmount();
      }).not.toThrow();
    });
  });
});

function createEvent(name: string, files: any) {
  const evt = new CustomEvent(name);
  Object.defineProperty(evt, 'dataTransfer', {
    enumerable: true,
    value: {files},
  });
  return evt;
}

function setBoundingClientRect(size: keyof typeof widths) {
  jest
    .spyOn(Element.prototype, 'getBoundingClientRect')
    .mockImplementation(() => {
      return {
        width: widths[size],
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON() {},
      };
    });
}

function fireEvent({
  wrapper,
  eventType = 'drop',
  testFiles = files,
  spy,
}: {
  wrapper: CustomRoot<any, any>;
  eventType?: string;
  spy?: jest.Mock;
  testFiles?: {[key: string]: unknown}[];
}) {
  act(() => {
    if (spy) {
      spy.mockReset();
    }
    const event = createEvent(eventType, testFiles);

    wrapper.findAll('div')[3].domNode!.dispatchEvent(event);

    if (eventType === 'dragenter') {
      clock.tick(50);
    }
  });
  wrapper.forceUpdate();
}
