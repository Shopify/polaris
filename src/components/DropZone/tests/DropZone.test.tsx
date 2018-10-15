import * as React from 'react';
import {Label, Labelled} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import DropZone from '../DropZone';

describe('<DropZone />', () => {
  let spy: jest.Mock;
  let files: {}[];
  let acceptedFiles: {}[];
  let rejectedFiles: {}[];
  let createEvent: any;

  beforeEach(() => {
    spy = jest.fn();
    files = [
      {
        name: 'jpeg file',
        type: 'image/jpeg',
      },
      {
        name: 'svg file',
        type: 'image/svg',
      },
    ];
    acceptedFiles = [files[0]];
    rejectedFiles = [files[1]];
    createEvent = (name: string) => {
      const evt = new CustomEvent(name);
      Object.defineProperty(evt, 'dataTransfer', {
        enumerable: true,
        value: {files},
      });
      return evt;
    };
  });

  it('calls the onDrop callback when a drop event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDrop={spy} />);
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDrop callback when a drop event is fired on document', () => {
    mountWithAppProvider(<DropZone dropOnPage onDrop={spy} />);
    const event = createEvent('drop');
    document.dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDrop callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDrop={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('calls the onDropAccepted callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDropAccepted={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(acceptedFiles);
  });

  it('calls the onDropRejected callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithAppProvider(
      <DropZone onDropRejected={spy} accept="image/jpeg" />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(rejectedFiles);
  });

  it('calls the onDragEnter callback when a dragEnter event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragEnter={spy} />);
    const event = createEvent('dragenter');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragOver callback when a dragOver event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragOver={spy} />);
    const event = createEvent('dragover');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragLeave callback when a dragLeave event is fired', () => {
    const dropZone = mountWithAppProvider(<DropZone onDragLeave={spy} />);
    const event = createEvent('dragleave');
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
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('should not call any callbacks when disabled', () => {
    mountWithAppProvider(
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
    createEvent('drop');
    expect(spy).not.toBeCalled();
    createEvent('dragenter');
    expect(spy).not.toBeCalled();
    createEvent('dragleave');
    expect(spy).not.toBeCalled();
    createEvent('dragover');
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
});
