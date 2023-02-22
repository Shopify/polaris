import React from 'react';
import {intersectionObserver} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {IndexFiltersMode} from '../../useSetIndexFiltersMode';
import {useIsSticky} from '..';

interface Props {
  disabled?: boolean;
}

function Component({disabled}: Props) {
  const {intersectionRef, measurerRef, isSticky, indexFilteringHeight} =
    useIsSticky(IndexFiltersMode.Default, Boolean(disabled), false);

  return (
    <div
      className="table"
      ref={measurerRef}
      style={{height: indexFilteringHeight}}
    >
      <p className="sticky">{isSticky ? 'true' : 'false'}</p>
      <em style={{height: 400}} />
      <i className="intersection" ref={intersectionRef} />
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
    setGetBoundingClientRect({
      width: 600,
      height: 400,
      left: 20,
    });

    intersectionObserver.mock();
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
    intersectionObserver.restore();
  });

  describe('when measuring', () => {
    it('returns the height correctly', () => {
      const component = mountWithApp(<Component />);

      expect(component).toContainReactComponent('div', {
        className: 'table',
        style: expect.objectContaining({
          height: 400,
        }),
      });
    });
  });

  describe('when isIntersecting', () => {
    it('sets the isBulkActionsSticky value to false', () => {
      const component = mountWithApp(<Component />);

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
      const component = mountWithApp(<Component />);

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

    it('sets the isBulkactionSticky value to false if disabled', () => {
      const component = mountWithApp(<Component disabled />);

      const intersector = component.find('i');

      component.act(() => {
        intersectionObserver.simulate({
          isIntersecting: false,
          target: intersector!.domNode!,
        });
      });

      const result = component.find('p')?.text();

      expect(result).toBe('false');
    });
  });

  function setGetBoundingClientRect({
    width,
    height,
    left,
  }: {
    width: number;
    height: number;
    left: number;
  }) {
    getBoundingClientRectSpy.mockImplementation(() => {
      return {
        height,
        width,
        top: 0,
        left,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON() {},
      };
    });
  }
});
