import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ReactWrapper} from 'enzyme';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import {Key} from 'types';
import DualThumb, {Props as DualThumbProps} from '../DualThumb';

describe('<DualThumb />', () => {
  const mockProps: DualThumbProps = {
    id: 'RangeSlider',
    value: [0, 1],
    min: 0,
    max: 50,
    step: 1,
    output: false,
    disabled: false,
    onChange: noop,
    label: 'Dual thumb range slider',
  };

  describe('id', () => {
    it('is used to set the id on the wrapper div', () => {
      const id = 'MytestID';
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} id={id} />,
      );
      expect(dualThumb.find(`div#${id}`)).toHaveLength(1);
    });

    it('is used to set idLower on the lower thumb', () => {
      const id = 'MyNewID';
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} id={id} />,
      );
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('id')).toBe(`${id}Lower`);
    });

    it('is used to set idUpper on the upper thumb', () => {
      const id = 'MyNewID';
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} id={id} />,
      );
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('id')).toBe(`${id}Upper`);
    });
  });

  describe('min', () => {
    it('is used to set the aria-valuemin on the lower thumb', () => {
      const min = 0;
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} min={min} />,
      );
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('aria-valuemin')).toBe(min);
    });

    it('is used to set the aria-valuemin on the upper thumb', () => {
      const min = 0;
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} min={min} />,
      );
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-valuemin')).toBe(min);
    });
  });

  describe('max', () => {
    it('is used to set the aria-valuemax on the lower thumb', () => {
      const max = 100;
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} max={max} />,
      );
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('aria-valuemax')).toBe(max);
    });

    it('is used to set the aria-valuemax on the upper thumb', () => {
      const max = 100;
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} max={max} />,
      );
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-valuemax')).toBe(max);
    });
  });

  describe('disabled', () => {
    it('sets aria-disabled to false by default on the lower thumb', () => {
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('aria-disabled')).toBe(false);
    });

    it('sets aria-disabled to false by default on the upper thumb', () => {
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-disabled')).toBe(false);
    });

    it('sets aria-disabled to true on the lower thumb', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} disabled />,
      );

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('aria-disabled')).toBe(true);
    });

    it('sets aria-disabled to true on the upper thumb', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} disabled />,
      );

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-disabled')).toBe(true);
    });
  });

  describe('error', () => {
    it('sets aria-invalid to true on the lower thumb', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} error="Error" />,
      );

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower.prop('aria-invalid')).toBe(true);
    });

    it('sets aria-invalid to true on the upper thumb', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} error="Error" />,
      );

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-invalid')).toBe(true);
    });

    describe('aria-describedby', () => {
      it('gets set correctly on the lower thumb', () => {
        const dualThumb = mountWithAppProvider(
          <DualThumb {...mockProps} error="Error" />,
        );

        const thumbLower = findThumbLower(dualThumb);
        expect(thumbLower.prop('aria-describedby')).toBe('RangeSliderError');
      });

      it('gets set correctly on the upper thumb', () => {
        const dualThumb = mountWithAppProvider(
          <DualThumb {...mockProps} error="Error" />,
        );

        const thumbUpper = findThumbUpper(dualThumb);
        expect(thumbUpper.prop('aria-describedby')).toBe('RangeSliderError');
      });
    });
  });

  describe('output', () => {
    it('does not render the lower output by default', () => {
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      const outputLower = dualThumb.find('output').first();
      expect(outputLower).toHaveLength(0);
    });

    it('does not render the upper output by default', () => {
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      const outputUpper = dualThumb.find('output').last();
      expect(outputUpper).toHaveLength(0);
    });

    it('renders the lower output', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} output />,
      );

      const outputLower = dualThumb.find('output').first();
      expect(outputLower).toHaveLength(1);
    });

    it('renders the upper output', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} output />,
      );

      const outputUpper = dualThumb.find('output').last();
      expect(outputUpper).toHaveLength(1);
    });

    it('renders the correct value for the lower output', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} output />,
      );

      const outputLower = dualThumb.find('output').first();
      expect(outputLower.find('span').text()).toContain('0');
    });

    it('renders the correct value for the upper output', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} output />,
      );

      const outputUpper = dualThumb.find('output').last();
      expect(outputUpper.find('span').text()).toContain('1');
    });
  });

  describe('onFocus()', () => {
    it('gets called when the lower thumb gets focus', () => {
      const onFocusSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} onFocus={onFocusSpy} />,
      );

      const lowerThumb = findThumbLower(dualThumb);
      lowerThumb.simulate('focus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called when the upper thumb gets focus', () => {
      const onFocusSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} onFocus={onFocusSpy} />,
      );

      const upperThumb = findThumbUpper(dualThumb);
      upperThumb.simulate('focus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('gets called when the lower thumb loses focus', () => {
      const onBlurSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      const lowerThumb = findThumbLower(dualThumb);
      lowerThumb.simulate('blur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called when the upper thumb loses focus', () => {
      const onBlurSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      const upperThumb = findThumbUpper(dualThumb);
      upperThumb.simulate('blur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange()', () => {
    it('is called when the value prop needs sanitization', () => {
      const onChangeSpy = jest.fn();
      const id = 'onChangeID';

      mountWithAppProvider(
        <DualThumb
          {...mockProps}
          value={[15, 10]}
          onChange={onChangeSpy}
          id={id}
        />,
      );

      expect(onChangeSpy).toHaveBeenCalledWith([9, 10], id);
    });

    it('is not called when the value prop needs no sanitization', () => {
      const onChangeSpy = jest.fn();

      mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 15]} onChange={onChangeSpy} />,
      );

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('CSS custom properties', () => {
    it('sets the correct css custom properties on the track', () => {
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      const expected = {
        '--Polaris-RangeSlider-progress-lower': '12px',
        '--Polaris-RangeSlider-progress-upper': '11.52px',
      };
      const track = findByTestID(dualThumb, 'track');
      const actual = track.find('[style]').prop('style');

      expect(expected).toEqual(actual);
    });
  });

  describe('keyboard control', () => {
    it('increments the lower value on right arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.RightArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('increments the upper value on right arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbUpper(dualThumb), Key.RightArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 41], mockProps.id);
    });

    it('decrement the upper value on left arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbUpper(dualThumb), Key.LeftArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 39], mockProps.id);
    });

    it('increments the lower value on up arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.UpArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('does not increment the lower value when it is a step below the upper value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[39, 40]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      simulateKeyDown(lowerThumb, Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect([
        lowerThumb.prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([39, 40]);
    });

    it('does not decrement the lower value when it is equal to the min', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[0, 40]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      simulateKeyDown(lowerThumb, Key.LeftArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect([
        lowerThumb.prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([0, 40]);
    });

    it('does not increment the upper value when it is equal to the max', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[0, 50]} onChange={onChangeSpy} />,
      );
      const upperThumb = findThumbUpper(dualThumb);
      simulateKeyDown(upperThumb, Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        upperThumb.prop('aria-valuenow'),
      ]).toEqual([0, 50]);
    });

    it('does not decrement the upper value when it is a step above the lower value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[49, 50]} onChange={onChangeSpy} />,
      );
      const upperThumb = findThumbUpper(dualThumb);
      simulateKeyDown(upperThumb, Key.LeftArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        upperThumb.prop('aria-valuenow'),
      ]).toEqual([49, 50]);
    });

    it('decrements the lower value on left arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.LeftArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    it('decrements the lower value on down arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.DownArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    it('increment the lower value on up arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.UpArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('decrement the lower value on down arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.DownArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    function simulateKeyDown(component: ReactWrapper, keyCode: Key) {
      component.simulate('keyDown', {
        keyCode,
        preventDefault: noop,
        stopPropagation: noop,
      });
    }
  });

  describe('mouse interface', () => {
    type EventCallback = (mockEventData?: {[key: string]: any}) => void;

    const eventMap: {[eventType: string]: EventCallback} = {};
    const origialAddEventListener = document.addEventListener;

    beforeAll(() => {
      document.addEventListener = jest.fn(
        (eventType: string, callback: EventCallback) => {
          eventMap[eventType] = callback;
        },
      );
    });

    afterAll(() => {
      document.addEventListener = origialAddEventListener;
    });

    it('moving the lower thumb sets the lower value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveLowerThumb(dualThumb, 0.5);

      expect(onChangeSpy).toHaveBeenCalledWith([25, 40], mockProps.id);
    });

    it('moving the upper thumb sets the upper value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveUpperThumb(dualThumb, 0.5);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 25], mockProps.id);
    });

    it('mouseup removes the mousemove event listener', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener',
      );
      const dualThumb = mountWithAppProvider(<DualThumb {...mockProps} />);

      moveUpperThumb(dualThumb, 0.5);
      removeEventListenerSpy.mockClear();
      eventMap.mouseup();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
      expect(removeEventListenerSpy.mock.calls[0][0]).toBe('mousemove');
    });

    it('the lower and upper thumbs do not move when using a non-primary mouse button', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveUpperThumb(dualThumb, 0.5, 1);
      moveLowerThumb(dualThumb, 0.5, 1);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    function moveLowerThumb(
      component: ReactWrapper,
      percentageOfTrackX: number,
      button = 0,
    ) {
      const trackWidth = 100;

      component.setState({trackLeft: 0, trackWidth}, () => {
        findThumbLower(component).simulate('mouseDown', {button});
        eventMap.mousemove({clientX: trackWidth * percentageOfTrackX});
      });
    }

    function moveUpperThumb(
      component: ReactWrapper,
      percentageOfTrackX: number,
      button = 0,
    ) {
      const trackWidth = 100;

      component.setState({trackLeft: 0, trackWidth}, () => {
        findThumbUpper(component).simulate('mouseDown', {button});
        eventMap.mousemove({clientX: trackWidth * percentageOfTrackX});
      });
    }
  });

  describe('value prop sanitization', () => {
    it('sanitizes the lower value with respect to the step prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[4, 40]} step={5} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([5, 40]);
    });

    it('sanitizes the upper value with respect to the step prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[5, 41]} step={5} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([5, 40]);
    });

    it('sanitizes the lower value with respect to the max prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[110, 150]} max={100} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([99, 100]);
    });

    it('sanitizes the upper value with respect to the max prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[110, 150]} max={100} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([99, 100]);
    });

    it('sanitizes the lower value with respect to the min prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 40]} min={20} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([20, 40]);
    });

    it('sanitizes the upper value with respect to the min prop', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 15]} min={20} />,
      );
      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([20, 21]);
    });

    it('sets the lower value to a step below the upper value if the lower value equals the upper value', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[10, 10]} />,
      );

      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([9, 10]);
    });

    it('sets the lower value to a step below the upper value if the lower value is higher than the upper value', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[15, 10]} />,
      );

      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([9, 10]);
    });

    it('sets the upper value to one step above the min and the lower value to the min when they are out of bounds and inversed', () => {
      const dualThumb = mountWithAppProvider(
        <DualThumb {...mockProps} value={[1500, -10]} />,
      );

      expect([
        findThumbLower(dualThumb).prop('aria-valuenow'),
        findThumbUpper(dualThumb).prop('aria-valuenow'),
      ]).toEqual([0, 1]);
    });
  });
});

function findThumbLower(containerComponent: ReactWrapper): ReactWrapper {
  return containerComponent.find('button').first();
}

function findThumbUpper(containerComponent: ReactWrapper): ReactWrapper {
  return containerComponent.find('button').last();
}
