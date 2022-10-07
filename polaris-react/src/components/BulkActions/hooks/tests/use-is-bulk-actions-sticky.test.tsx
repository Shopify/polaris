import React from 'react';
import {intersectionObserver} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {useIsBulkActionsSticky} from '..';

interface ComponentProps {
  selectMode: boolean;
}

function Component({selectMode}: ComponentProps) {
  const {
    bulkActionsIntersectionRef,
    tableMeasurerRef,
    isBulkActionsSticky,
    bulkActionsAbsoluteOffset,
  } = useIsBulkActionsSticky(selectMode);

  return (
    <div className="table" ref={tableMeasurerRef}>
      <p className="sticky">{isBulkActionsSticky ? 'true' : 'false'}</p>
      <span className="offset">{bulkActionsAbsoluteOffset}</span>
      <em style={{height: 400}} />
      <i className="intersection" ref={bulkActionsIntersectionRef} />
    </div>
  );
}

describe('useIsBulkActionsSticky', () => {
  let getBoundingClientRectSpy: jest.SpyInstance;

  beforeEach(() => {
    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      'getBoundingClientRect',
    );
    setGetBoundingClientRect(400);

    intersectionObserver.mock();
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
    intersectionObserver.restore();
  });

  describe('when measuring', () => {
    it('returns the offset correctly when select mode is false', () => {
      const component = mountWithApp(<Component selectMode={false} />);
      const result = component.find('span')?.text();
      expect(result).toBe('400');
    });

    it('returns the offset correctly when select mode is true', () => {
      const component = mountWithApp(<Component selectMode />);
      const result = component.find('span')?.text();
      expect(result).toBe('300');
    });
  });

  describe('when isIntersecting', () => {
    it('sets the isBulkActionsSticky value to false', () => {
      const component = mountWithApp(<Component selectMode />);

      const intersector = component.find('i');

      component.act(() => {
        intersectionObserver.simulate({
          isIntersecting: true,
          target: intersector!.domNode!,
        });
      });

      const result = component.find('p')?.text();
      expect(result).toBe('false');
    });
  });

  describe('when not isIntersecting', () => {
    it('sets the isBulkActionsSticky value to true', () => {
      const component = mountWithApp(<Component selectMode />);

      const intersector = component.find('i');

      component.act(() => {
        intersectionObserver.simulate({
          isIntersecting: false,
          target: intersector!.domNode!,
        });
      });

      const result = component.find('p')?.text();
      expect(result).toBe('true');
    });
  });

  function setGetBoundingClientRect(height: number) {
    getBoundingClientRectSpy.mockImplementation(() => {
      return {
        height,
        width: 0,
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
});
