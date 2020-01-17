import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {EventListener} from '../../EventListener';
import {PositionedOverlay} from '../PositionedOverlay';
import * as mathModule from '../utilities/math';

describe('<PositionedOverlay />', () => {
  const mockProps = {
    active: true,
    activator: document.createElement('div'),
    render: mockRender,
  };

  describe('render', () => {
    it('renders the provided children', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} />,
      );
      expect(positionedOverlay.text()).toBe('overlay content');
    });
  });

  describe('preferredPosition', () => {
    let calculateVerticalPositionMock: jest.SpyInstance;

    beforeEach(() => {
      calculateVerticalPositionMock = jest.spyOn(
        mathModule,
        'calculateVerticalPosition',
      );
      calculateVerticalPositionMock.mockReturnValue({
        height: 0,
        top: 0,
        positioning: 'above',
      });
    });

    afterEach(() => {
      calculateVerticalPositionMock.mockRestore();
    });

    it('positions above if preferredPosition is given', () => {
      const spy = jest.fn();
      mountWithAppProvider(
        <PositionedOverlay
          {...mockProps}
          preferredPosition="above"
          render={spy}
        />,
      );

      expect(spy).toHaveBeenCalledWith({
        activatorRect: {height: 0, left: 0, top: 0, width: 0},
        desiredHeight: 0,
        left: 0,
        measuring: false,
        positioning: 'above',
      });
    });
  });

  describe('preferredAlignment', () => {
    it('aligns left if preferredAlignment is given', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} preferredAlignment="left" />,
      );

      expect((positionedOverlay.find('div').prop('style') as any).left).toBe(0);
      expect(
        (positionedOverlay.find('div').prop('style') as any).right,
      ).toBeUndefined();
    });

    it('aligns right if preferredAlignment is given', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} preferredAlignment="right" />,
      );

      expect((positionedOverlay.find('div').prop('style') as any).right).toBe(
        0,
      );
      expect(
        (positionedOverlay.find('div').prop('style') as any).left,
      ).toBeUndefined();
    });
  });

  describe('fullWidth', () => {
    it('is set to full width if fullWidth is true', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} fullWidth />,
      );

      expect((positionedOverlay.find('div').prop('style') as any).width).toBe(
        0,
      );
    });
  });

  describe('lifecycle', () => {
    it('updates safely', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} fixed />,
      );

      expect(() => {
        positionedOverlay.setProps({fixed: false});
      }).not.toThrow();
    });

    it('unmounts safely', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} />,
      );

      expect(() => {
        positionedOverlay.unmount();
      }).not.toThrow();
    });
  });

  describe('<EventListener />', () => {
    it('sets an event listener for resize', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} />,
      );
      expect(positionedOverlay.find(EventListener).exists()).toBe(true);
      expect(positionedOverlay.find(EventListener).prop('event')).toBe(
        'resize',
      );
    });
  });
});

function mockRender() {
  return <span>overlay content</span>;
}
