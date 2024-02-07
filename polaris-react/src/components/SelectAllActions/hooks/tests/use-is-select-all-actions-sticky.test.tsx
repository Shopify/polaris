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

  beforeEach(() => {
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

    it('returns the bottom value correctly', () => {
      const component = mountWithApp(<Component selectMode />);
      const result = component.findAll('span')[3]?.text();
      expect(result).toBe('0');
    });

    it('returns the bottom value correctly when in a scroll container', () => {
      const component = mountWithApp(
        <Scrollable style={{height: '400px'}}>
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
