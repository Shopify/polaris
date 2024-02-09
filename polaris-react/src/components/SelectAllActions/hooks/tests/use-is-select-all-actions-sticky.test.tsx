import React from 'react';
import {intersectionObserver} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Scrollable} from '../../../Scrollable';
import {useIsSelectAllActionsSticky} from '../use-is-select-all-actions-sticky';
import type {UseIsSelectAllActionsStickyProps} from '../use-is-select-all-actions-sticky';

function Component({
  selectMode = false,
  hasPagination,
  tableType = 'index-table',
}: Partial<UseIsSelectAllActionsStickyProps>) {
  const {
    selectAllActionsIntersectionRef,
    tableMeasurerRef,
    isSelectAllActionsSticky,
    selectAllActionsAbsoluteOffset,
    selectAllActionsMaxWidth,
    selectAllActionsOffsetLeft,
    selectAllActionsOffsetBottom,
  } = useIsSelectAllActionsSticky({selectMode, hasPagination, tableType});

  return (
    <div className="table" ref={tableMeasurerRef}>
      <p className="sticky">{isSelectAllActionsSticky ? 'true' : 'false'}</p>
      <span className="offset">{selectAllActionsAbsoluteOffset}</span>
      <span className="width">{selectAllActionsMaxWidth}</span>
      <span className="left">{selectAllActionsOffsetLeft}</span>
      <span className="bottom">{selectAllActionsOffsetBottom}</span>
      <em style={{height: 400}} />
      <i className="intersection" ref={selectAllActionsIntersectionRef} />
    </div>
  );
}

describe('useIsSelectAllActionsSticky', () => {
  let getBoundingClientRectSpy: jest.SpyInstance;
  let getComputedStyleSpy: jest.SpyInstance;

  beforeEach(() => {
    getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');

    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      'getBoundingClientRect',
    );

    setGetBoundingClientRect({
      width: 600,
      height: 400,
      left: 20,
      y: 18,
    });

    intersectionObserver.mock();
  });

  afterEach(() => {
    getComputedStyleSpy.mockRestore();
    getBoundingClientRectSpy.mockRestore();
    intersectionObserver.restore();
  });

  describe('when measuring', () => {
    it('returns the offset correctly when select mode is false', () => {
      const component = mountWithApp(<Component selectMode={false} />);
      const result = component.findAll('span')[0]?.text();
      expect(result).toBe('400');
    });

    it('returns the offset correctly when select mode is true', () => {
      const component = mountWithApp(<Component selectMode />);
      const result = component.findAll('span')[0]?.text();
      expect(result).toBe('359');
    });

    it('returns the width value correctly', () => {
      const component = mountWithApp(<Component selectMode />);
      const result = component.findAll('span')[1]?.text();
      expect(result).toBe('600');
    });

    it('returns the width value correctly when hasPagination is true', () => {
      const component = mountWithApp(<Component selectMode hasPagination />);
      const result = component.findAll('span')[1]?.text();
      expect(result).toBe('536');
    });

    it('returns the left value correctly', () => {
      const component = mountWithApp(<Component selectMode />);
      const result = component.findAll('span')[2]?.text();
      expect(result).toBe('20');
    });

    it('returns the bottom value correctly when not in a scroll container', () => {
      setGetComputedStyle({
        overflow: 'visible',
        overflowX: 'visible',
        overflowY: 'visible',
      });

      const component = mountWithApp(<Component selectMode />);
      const result = component.findAll('span')[3]?.text();
      expect(result).toBe('0');
    });

    it('returns the bottom value correctly when in a scroll container', () => {
      setGetComputedStyle({
        overflow: 'auto',
        overflowX: 'auto',
        overflowY: 'auto',
      });

      const component = mountWithApp(
        <Scrollable style={{height: '200px'}}>
          <Component selectMode />
        </Scrollable>,
      );
      const result = component.findAll('span')[3]?.text();
      expect(result).toBe('26');
    });
  });

  describe('when isIntersecting', () => {
    it('sets the isSelectAllActionsSticky value to false', () => {
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
    it('sets the isSelectAllActionsSticky value to true', () => {
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

  describe('when the table is off screen', () => {
    it('will set isSelectAllActionsSticky to true if we are intersecting', () => {
      const component = mountWithApp(<Component selectMode />);

      const table = component.find('div');

      component.act(() => {
        intersectionObserver.simulate({
          isIntersecting: true,
          target: table!.domNode!,
          boundingClientRect: {
            top: 100,
            height: 100,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: jest.fn(),
          },
          rootBounds: {
            height: 150,
            top: 0,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: jest.fn(),
          },
        });
      });

      const result = component.find('p')?.text();
      expect(result).toBe('true');
    });

    it('will not set isSelectAllActionsSticky to true if we are intersecting but the rootBounds is large enough', () => {
      const component = mountWithApp(<Component selectMode />);

      const table = component.find('div');

      component.act(() => {
        intersectionObserver.simulate({
          isIntersecting: true,
          target: table!.domNode!,
          boundingClientRect: {
            top: 100,
            height: 100,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: jest.fn(),
          },
          rootBounds: {
            height: 250,
            top: 0,
            width: 0,
            bottom: 0,
            left: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: jest.fn(),
          },
        });
      });

      const result = component.find('p')?.text();
      expect(result).toBe('false');
    });
  });

  function setGetComputedStyle({
    overflow,
    overflowX,
    overflowY,
  }: {
    overflow: string;
    overflowX: string;
    overflowY: string;
  }) {
    getComputedStyleSpy.mockImplementation(() => {
      return {
        overflow,
        overflowX,
        overflowY,
        toJSON() {},
      };
    });
  }

  function setGetBoundingClientRect({
    width,
    height,
    left,
    y,
  }: {
    width: number;
    height: number;
    left: number;
    y: number;
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
        y,
        toJSON() {},
      };
    });
  }
});
