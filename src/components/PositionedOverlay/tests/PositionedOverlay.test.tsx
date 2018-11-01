import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import EventListener from '../../EventListener';
import PositionedOverlay from '../PositionedOverlay';

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
    it('positions above if preferredPosition is given', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} preferredPosition="above" />,
      );
      expect(positionedOverlay.prop('preferredPosition')).toBe('above');
    });
  });

  describe('preferredAlignment', () => {
    it('aligns left if preferredAlignment is given', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} preferredAlignment="left" />,
      );
      expect(positionedOverlay.prop('preferredAlignment')).toBe('left');
    });
  });

  describe('fullWidth', () => {
    it('is set to full width if fullWidth is true', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} fullWidth />,
      );
      expect(positionedOverlay.prop('fullWidth')).toBe(true);
    });
  });

  describe('fixed', () => {
    it('is set to fixed if fixed is true', () => {
      const positionedOverlay = mountWithAppProvider(
        <PositionedOverlay {...mockProps} fixed />,
      );
      expect(positionedOverlay.prop('fixed')).toBe(true);
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
