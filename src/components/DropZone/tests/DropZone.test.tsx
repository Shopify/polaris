import * as React from 'react';
import {ReactWrapper} from 'enzyme';
import {clock} from '@shopify/jest-dom-mocks';
import {Label, Labelled, DisplayText, Caption} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import DropZone from '../DropZone';

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
const widths = {
  small: 99,
  medium: 159,
  large: 299,
  extraLarge: 1024,
};

describe('<DropZone />', () => {
  let spy: jest.Mock;

  beforeEach(() => {
    spy = jest.fn();
    clock.mock();
  });

  afterEach(() => {
    clock.restore();
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = origGetBoundingClientRect;
  });

  it('calls the onDrop callback when a drop event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDrop={spy} />);
    const event = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDrop callback when a drop event is fired on document twice when a duplicate file is added consecutively', () => {
    const dropZone = mountWithAppProvider(<DropZone onDrop={spy} />);
    const event1 = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event1);
    expect(spy).toBeCalledWith(files, files, []);

    const event2 = createEvent('drop', duplicateFiles);
    dropZone.getDOMNode().dispatchEvent(event2);
    expect(spy).toBeCalledWith(duplicateFiles, duplicateFiles, []);
  });

  it('calls the onDrop callback when a drop event is fired on document', () => {
    mountWithAppProvider(<DropZone dropOnPage onDrop={spy} />);
    const event = createEvent('drop', files);
    document.dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDrop callback correctly when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDrop={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('calls the onDropAccepted callback correctly when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDropAccepted={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(acceptedFiles);
  });

  it('calls the onDropRejected callback correctly when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDropRejected={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(rejectedFiles);
  });

  it('calls the onDragEnter callback when a dragEnter event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragEnter={spy} />);
    const event = createEvent('dragenter', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragOver callback when a dragOver event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragOver={spy} />);
    const event = createEvent('dragover', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragLeave callback when a dragLeave event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragLeave={spy} />);
    const event = createEvent('dragleave', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('validates correctly when customValidator propertly added', () => {
    const customValidator = (file: File) => {
      return file.type === 'image/jpeg';
    };
    const dropZone = mountWithAppProvider(
      <DropZone onDrop={spy} customValidator={customValidator} />,
    );
    const event = createEvent('drop', files);
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('should not call any callbacks when disabled', () => {
    const dropZone = mountWithAppProvider(
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
    fireEvent('drop', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragenter', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragleave', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragover', dropZone, spy);
    expect(spy).not.toBeCalled();
  });

  it('should not call callbacks when not allowed multiple and a file is uploaded', () => {
    const dropZone = mountWithAppProvider(
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
    fireEvent('drop', dropZone, spy);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);

    // All events should now be ignored
    fireEvent('drop', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragenter', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragleave', dropZone, spy);
    expect(spy).not.toBeCalled();
    fireEvent('dragover', dropZone, spy);
    expect(spy).not.toBeCalled();
  });

  it('renders <Labelled /> when `label` is provided', () => {
    const labelText = 'My DropZone label';
    const dropZone = mountWithAppProvider(<DropZone label={labelText} />);
    const labelled = dropZone.find(Labelled);
    expect(labelled.prop('label')).toEqual(labelText);
  });

  it('renders a <Label /> with matching id for the file input', () => {
    const id = 'Test';
    const dropZone = mountWithAppProvider(
      <DropZone id={id} label="My DropZone label" />,
    );
    const label = dropZone.find(Label);
    expect(label.prop('id')).toEqual(id);
    const input = dropZone.find('input[type="file"]');
    expect(input.prop('id')).toEqual(id);
  });

  describe('labelAction', () => {
    it("passes 'labelAction' to the Labelled options", () => {
      const callbackDropZone = {
        onAction: () => {},
      };
      const dropZone = mountWithAppProvider(
        <DropZone label="My DropZone label" labelAction={callbackDropZone} />,
      );
      expect(dropZone.find(Labelled).props()).toHaveProperty(
        'action',
        callbackDropZone,
      );
    });
  });

  describe('labelHidden', () => {
    it("passes 'labelHidden' to the Labelled options", () => {
      const dropZone = mountWithAppProvider(
        <DropZone label="My DropZone label" labelHidden />,
      );
      expect(dropZone.find(Labelled).props()).toHaveProperty(
        'labelHidden',
        true,
      );
    });
  });

  describe('overlayText', () => {
    const overlayText = 'overlay text';
    it('does not render the overlayText on small screens', () => {
      setBoundingClientRect('small');
      const dropZone = mountWithAppProvider(
        <DropZone overlayText={overlayText} />,
      );
      triggerDragEnter(dropZone);
      const displayText = dropZone.find(DisplayText);
      const caption = dropZone.find(Caption);
      expect(displayText).toHaveLength(0);
      expect(caption).toHaveLength(0);
    });

    it('renders a Caption containing the overlayText on medium screens', () => {
      setBoundingClientRect('medium');
      const dropZone = mountWithAppProvider(
        <DropZone overlayText={overlayText} />,
      );
      triggerDragEnter(dropZone);
      const captionText = dropZone.find(Caption);
      expect(captionText.contains(overlayText)).toBe(true);
    });

    it('renders a Caption containing the overlayText on large screens', () => {
      setBoundingClientRect('large');
      const dropZone = mountWithAppProvider(
        <DropZone overlayText={overlayText} />,
      );
      triggerDragEnter(dropZone);
      const captionText = dropZone.find(Caption);
      expect(captionText.contains(overlayText)).toBe(true);
    });

    it('renders a DisplayText containing the overlayText on extra-large screens', () => {
      setBoundingClientRect('extraLarge');
      const dropZone = mountWithAppProvider(
        <DropZone overlayText={overlayText} />,
      );
      triggerDragEnter(dropZone);
      const displayText = dropZone.find(DisplayText);
      expect(displayText.contains(overlayText)).toBe(true);
    });
  });

  describe('errorOverlayText ', () => {
    const errorOverlayText = "can't drop this";
    it("doesn't render the overlayText on small screens", () => {
      setBoundingClientRect('small');
      const dropZone = mountWithAppProvider(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      triggerDragEnter(dropZone);
      const displayText = dropZone.find(DisplayText);
      const caption = dropZone.find(Caption);
      expect(displayText).toHaveLength(0);
      expect(caption).toHaveLength(0);
    });

    it('renders a Caption containing the overlayText on medium screens', () => {
      setBoundingClientRect('medium');
      const dropZone = mountWithAppProvider(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      triggerDragEnter(dropZone);
      const captionText = dropZone.find(Caption);
      expect(captionText.contains(errorOverlayText)).toBe(true);
    });

    it('renders a Caption containing the overlayText on large screens', () => {
      setBoundingClientRect('large');
      const dropZone = mountWithAppProvider(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      triggerDragEnter(dropZone);
      const captionText = dropZone.find(Caption);
      expect(captionText.contains(errorOverlayText)).toBe(true);
    });

    it('renders a DisplayText containing the overlayText on extra-large screens', () => {
      setBoundingClientRect('extraLarge');
      const dropZone = mountWithAppProvider(
        <DropZone errorOverlayText={errorOverlayText} accept="image/gif" />,
      );
      triggerDragEnter(dropZone);
      const displayText = dropZone.find(DisplayText);
      expect(displayText.contains(errorOverlayText)).toBe(true);
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
  Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      width: widths[size],
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  });
}

function triggerDragEnter(element: ReactWrapper<any, any>) {
  const event = createEvent('dragenter', files);
  element.getDOMNode().dispatchEvent(event);
  clock.tick(50);
  element.update();
}

function fireEvent(
  eventType: string,
  element: ReactWrapper<any, any>,
  spy: jest.Mock,
) {
  spy.mockReset();
  const event = createEvent(eventType, files);
  element.getDOMNode().dispatchEvent(event);
}
