import * as React from 'react';
import {mountWithProvider} from '../../../../tests/utilities';

import DropZone from '../DropZone';

describe('<DropZone />', () => {
  let spy: jest.Mock;
  let files: {}[];
  let acceptedFiles: {}[];
  let rejectedFiles: {}[];
  let createEvent: any;
  let defaultType: 'file';

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
    const dropZone = mountWithProvider(
      <DropZone onDrop={spy} type={defaultType} />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDrop callback when a drop event is fired on document', () => {
    mountWithProvider(<DropZone dropOnPage onDrop={spy} type={defaultType} />);
    const event = createEvent('drop');
    document.dispatchEvent(event);
    expect(spy).toBeCalledWith(files, files, []);
  });

  it('calls the onDragEnter callback when a dragEnter event is fired', () => {
    const dropZone = mountWithProvider(
      <DropZone onDragEnter={spy} type={defaultType} />,
    );
    const event = createEvent('dragenter');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragOver callback when a dragOver event is fired', () => {
    const dropZone = mountWithProvider(
      <DropZone onDragOver={spy} type={defaultType} />,
    );
    const event = createEvent('dragover');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDragLeave callback when a dragLeave event is fired', () => {
    const dropZone = mountWithProvider(
      <DropZone onDragLeave={spy} type={defaultType} />,
    );
    const event = createEvent('dragleave');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalled();
  });

  it('calls the onDrop callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithProvider(
      <DropZone onDrop={spy} accept="image/jpeg" type={defaultType} />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('calls the onDropAccepted callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithProvider(
      <DropZone onDropAccepted={spy} accept="image/jpeg" type={defaultType} />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(acceptedFiles);
  });

  it('calls the onDropRejected callback corrently when it accepts only jpeg', () => {
    const dropZone = mountWithProvider(
      <DropZone onDropRejected={spy} accept="image/jpeg" type={defaultType} />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(rejectedFiles);
  });

  it('validates correctly when customValidator propertly added', () => {
    const customValidator = (file: File) => {
      return file.type === 'image/jpeg';
    };
    const dropZone = mountWithProvider(
      <DropZone
        onDrop={spy}
        customValidator={customValidator}
        type={defaultType}
      />,
    );
    const event = createEvent('drop');
    dropZone.getDOMNode().dispatchEvent(event);
    expect(spy).toBeCalledWith(files, acceptedFiles, rejectedFiles);
  });

  it('should not call any callback when is disabled', () => {
    mountWithProvider(
      <DropZone
        disabled
        onDrop={spy}
        onDropAccepted={spy}
        onDropRejected={spy}
        onDragEnter={spy}
        onDragLeave={spy}
        onDragOver={spy}
        type={defaultType}
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
});
