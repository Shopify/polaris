import React from 'react';
import {mountWithApp, CustomRoot} from 'tests/utilities';

import {Key} from '../../../../../types';
import {DualThumb, DualThumbProps} from '../DualThumb';

type MountedComponentType = CustomRoot<any, any>;

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
  const trackClassName = 'TrackWrapper';
  const disabledTrackClassName = 'TrackWrapper disabled';

  describe('id', () => {
    it('is used on the lower thumb', () => {
      const id = 'MyNewID';
      const dualThumb = mountWithApp(<DualThumb {...mockProps} id={id} />);
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        id,
      });
    });

    it('is used to set idUpper on the upper thumb', () => {
      const id = 'MyNewID';
      const dualThumb = mountWithApp(<DualThumb {...mockProps} id={id} />);
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper).toHaveReactProps({
        id: `${id}Upper`,
      });
    });
  });

  describe('min', () => {
    it('is used to set the aria-valuemin on the lower thumb', () => {
      const min = 0;
      const dualThumb = mountWithApp(<DualThumb {...mockProps} min={min} />);
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        'aria-valuemin': min,
      });
    });

    it('is used to set the aria-valuemin on the upper thumb', () => {
      const min = 0;
      const dualThumb = mountWithApp(<DualThumb {...mockProps} min={min} />);
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper).toHaveReactProps({
        'aria-valuemin': min,
      });
    });
  });

  describe('max', () => {
    it('is used to set the aria-valuemax on the lower thumb', () => {
      const max = 100;
      const dualThumb = mountWithApp(<DualThumb {...mockProps} max={max} />);
      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        'aria-valuemax': max,
      });
    });

    it('is used to set the aria-valuemax on the upper thumb', () => {
      const max = 100;
      const dualThumb = mountWithApp(<DualThumb {...mockProps} max={max} />);
      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper.prop('aria-valuemax')).toBe(max);
      expect(thumbUpper).toHaveReactProps({
        'aria-valuemax': max,
      });
    });
  });

  describe('disabled', () => {
    it('sets aria-disabled to false by default on the lower thumb', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        'aria-disabled': false,
      });
    });

    it('sets aria-disabled to false by default on the upper thumb', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper).toHaveReactProps({
        'aria-disabled': false,
      });
    });

    it('sets aria-disabled to true on the lower thumb', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} disabled />);

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        'aria-disabled': true,
      });
    });

    it('sets aria-disabled to true on the upper thumb', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} disabled />);

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper).toHaveReactProps({
        'aria-disabled': true,
      });
    });
  });

  describe('error', () => {
    it('sets aria-invalid to true on the lower thumb', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} error="Error" />,
      );

      const thumbLower = findThumbLower(dualThumb);
      expect(thumbLower).toHaveReactProps({
        'aria-invalid': true,
      });
    });

    it('sets aria-invalid to true on the upper thumb', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} error="Error" />,
      );

      const thumbUpper = findThumbUpper(dualThumb);
      expect(thumbUpper).toHaveReactProps({
        'aria-invalid': true,
      });
    });

    describe('aria-describedby', () => {
      it('gets set as RangeSliderError on the lower thumb', () => {
        const dualThumb = mountWithApp(
          <DualThumb {...mockProps} error="Error" />,
        );

        const thumbLower = findThumbLower(dualThumb);
        expect(thumbLower).toHaveReactProps({
          'aria-describedby': 'RangeSliderError',
        });
      });

      it('gets set as RangeSliderError on the upper thumb', () => {
        const dualThumb = mountWithApp(
          <DualThumb {...mockProps} error="Error" />,
        );

        const thumbUpper = findThumbUpper(dualThumb);
        expect(thumbUpper).toHaveReactProps({
          'aria-describedby': 'RangeSliderError',
        });
      });
    });
  });

  describe('output', () => {
    it('does not render the lower output by default', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      const outputLower = dualThumb.findAll('output');
      expect(outputLower).toHaveLength(0);
    });

    it('does not render the upper output by default', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      const outputUpper = dualThumb.findAll('output');
      expect(outputUpper).toHaveLength(0);
    });

    it('renders the lower output', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} output />);

      expect(dualThumb).toContainReactComponent('output', {
        htmlFor: 'RangeSlider',
      });
    });

    it('renders the upper output', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} output />);

      expect(dualThumb).toContainReactComponent('output', {
        htmlFor: 'RangeSliderUpper',
      });
    });

    it('renders the lower output value as text', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} output />);

      const outputLower = dualThumb.findAll('output')[0];
      expect(outputLower.find('span')).toContainReactText('0');
    });

    it('renders the upper output value as text', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} output />);

      const outputUpper = dualThumb.find('output', {
        htmlFor: 'RangeSliderUpper',
      });
      expect(outputUpper!.find('span')).toContainReactText('1');
    });
  });

  describe('onFocus()', () => {
    it('gets called when the lower thumb gets focus', () => {
      const onFocusSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} onFocus={onFocusSpy} />,
      );

      const lowerThumb = findThumbLower(dualThumb);
      lowerThumb.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called when the upper thumb gets focus', () => {
      const onFocusSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} onFocus={onFocusSpy} />,
      );

      const upperThumb = findThumbUpper(dualThumb);
      upperThumb.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('gets called when the lower thumb loses focus', () => {
      const onBlurSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      const lowerThumb = findThumbLower(dualThumb);
      lowerThumb.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called when the upper thumb loses focus', () => {
      const onBlurSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      const upperThumb = findThumbUpper(dualThumb);
      upperThumb.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange()', () => {
    it('is called when the value prop needs sanitization', () => {
      const onChangeSpy = jest.fn();
      const id = 'onChangeID';

      mountWithApp(
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

      mountWithApp(
        <DualThumb {...mockProps} value={[10, 15]} onChange={onChangeSpy} />,
      );

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('CSS custom properties', () => {
    it('gets set on the track', () => {
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      expect(dualThumb).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-range-slider-progress-lower': '0px',
          '--pc-range-slider-progress-upper': '-0.32px',
        }),
      });
    });

    describe('when min is above 0', () => {
      it('sets min lower position to 0px', () => {
        const min = 10;
        const max = 50;

        const dualThumb = mountWithApp(
          <DualThumb {...mockProps} min={min} max={max} value={[10, 11]} />,
        );

        expect(dualThumb).toContainReactComponent('div', {
          style: expect.objectContaining({
            '--pc-range-slider-progress-lower': '0px',
            '--pc-range-slider-progress-upper': '-0.40000000000000036px',
          }),
        });
      });
    });

    describe('when min is below 0', () => {
      it('sets min lower position to 0px', () => {
        const min = -10;
        const max = 30;

        const dualThumb = mountWithApp(
          <DualThumb {...mockProps} min={min} max={max} value={[-10, -9]} />,
        );

        expect(dualThumb).toContainReactComponent('div', {
          style: expect.objectContaining({
            '--pc-range-slider-progress-lower': '0px',
            '--pc-range-slider-progress-upper': '-0.3999999999999999px',
          }),
        });
      });
    });
  });

  describe('keyboard control', () => {
    it('increments the lower value on right arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.RightArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('increments the upper value on right arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbUpper(dualThumb), Key.RightArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 41], mockProps.id);
    });

    it('decrement the upper value on left arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbUpper(dualThumb), Key.LeftArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 39], mockProps.id);
    });

    it('increments the lower value on up arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      simulateKeyDown(findThumbLower(dualThumb), Key.UpArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('does not increment the lower value when it is a step below the upper value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[39, 40]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      simulateKeyDown(lowerThumb, Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 39,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 40,
      });
    });

    it('does not decrement the lower value when it is equal to the min', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[0, 40]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      simulateKeyDown(lowerThumb, Key.LeftArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 0,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 40,
      });
    });

    it('does not increment the upper value when it is equal to the max', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[0, 50]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      simulateKeyDown(upperThumb, Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 0,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 50,
      });
    });

    it('does not decrement the upper value when it is a step above the lower value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[49, 50]} onChange={onChangeSpy} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      simulateKeyDown(upperThumb, Key.LeftArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 49,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 50,
      });
    });

    it('decrements the lower value on left arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.LeftArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    it('decrements the lower value on down arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.DownArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    it('increment the lower value on up arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.UpArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([11, 40], mockProps.id);
    });

    it('decrement the lower value on down arrow press', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.DownArrow);

      expect(onChangeSpy).toHaveBeenCalledWith([9, 40], mockProps.id);
    });

    it('does not change the lower value if disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[10, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );
      simulateKeyDown(findThumbLower(dualThumb), Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('does not change the upper value if disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[10, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );
      simulateKeyDown(findThumbUpper(dualThumb), Key.RightArrow);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    function simulateKeyDown(component: any, keyCode: Key) {
      component.trigger('onKeyDown', {
        keyCode,
        preventDefault: noop,
        stopPropagation: noop,
      });
    }
  });

  describe('mouse interface', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;
    type EventCallback = (mockEventData?: {[key: string]: any}) => void;

    const eventMap: {[eventType: string]: EventCallback} = {};
    const origialAddEventListener = document.addEventListener;

    beforeAll(() => {
      jest
        .spyOn(document, 'addEventListener')
        .mockImplementation((eventType: string, callback: EventCallback) => {
          eventMap[eventType] = callback;
        });

      getBoundingClientRectSpy = jest
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockImplementation(mockGetBoundingClientRect);
    });

    afterAll(() => {
      document.addEventListener = origialAddEventListener;
      getBoundingClientRectSpy.mockRestore();
    });

    it('moving the lower thumb sets the lower value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveLowerThumb(dualThumb, 0.5);

      expect(onChangeSpy).toHaveBeenCalledWith([25, 40], mockProps.id);
    });

    it('moving the upper thumb sets the upper value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
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
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      moveUpperThumb(dualThumb, 0.5);
      removeEventListenerSpy.mockClear();
      eventMap.mouseup();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
      expect(removeEventListenerSpy.mock.calls[0][0]).toBe('mousemove');
    });

    it('the lower and upper thumbs do not move when using a non-primary mouse button', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveUpperThumb(dualThumb, 0.5, 1);
      moveLowerThumb(dualThumb, 0.5, 1);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('the lower and upper thumbs do not move when disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[10, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      moveUpperThumb(dualThumb, 0.5);
      moveLowerThumb(dualThumb, 0.5);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('moves the lower thumb when the track is clicked closer to it than the upper thumb', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      clickTrack(dualThumb, 0.2, trackClassName);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 40], mockProps.id);
    });

    it('moves the upper thumb when the track is clicked closer to it than the lower thumb', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      clickTrack(dualThumb, 0.6, trackClassName);

      expect(onChangeSpy).toHaveBeenCalledWith([5, 30], mockProps.id);
    });

    it('moves the lower thumb when the track is clicked closer to it than the upper thumb and the mouse moves', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      clickTrack(dualThumb, 0.2, trackClassName);
      moveLowerThumb(dualThumb, 0.3);

      expect(onChangeSpy).toHaveBeenCalledWith([15, 40], mockProps.id);
    });

    it('moves the upper thumb when the track is clicked closer to it than the lower thumb and the mouse moves', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      clickTrack(dualThumb, 0.6, trackClassName);
      moveUpperThumb(dualThumb, 0.9);

      expect(onChangeSpy).toHaveBeenCalledWith([5, 45], mockProps.id);
    });

    it('does not move the lower thumb when the track is clicked and is disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[5, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      clickTrack(dualThumb, 0.2, disabledTrackClassName);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('does not move the upper thumb when the track is clicked and is disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[5, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      clickTrack(dualThumb, 0.6, disabledTrackClassName);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    function clickTrack(
      component: any,
      percentageOfTrackX: number,
      className: string,
      button = 0,
    ) {
      const trackWidth = 100;
      const clientX = trackWidth * percentageOfTrackX;

      window.dispatchEvent(new Event('resize'));
      findTrack(component, className).trigger(
        'onMouseDown',
        new MouseEvent('mouseDown', {button, clientX}),
      );
    }

    function moveLowerThumb(
      component: MountedComponentType,
      percentageOfTrackX: number,
      button = 0,
    ) {
      const trackWidth = 100;

      window.dispatchEvent(new Event('resize'));
      findThumbLower(component).trigger(
        'onMouseDown',
        new MouseEvent('mouseDown', {button}),
      );
      component.act(() => {
        eventMap.mousemove({clientX: trackWidth * percentageOfTrackX});
      });
    }

    function moveUpperThumb(
      component: MountedComponentType,
      percentageOfTrackX: number,
      button = 0,
    ) {
      const trackWidth = 100;

      window.dispatchEvent(new Event('resize'));
      findThumbUpper(component).trigger(
        'onMouseDown',
        new MouseEvent('mouseDown', {button}),
      );
      component.act(() => {
        eventMap.mousemove({clientX: trackWidth * percentageOfTrackX});
      });
    }
  });

  describe('touch interface', () => {
    let getBoundingClientRectSpy: jest.SpyInstance;
    type EventCallback = (mockEventData?: {[key: string]: any}) => void;

    const eventMap: {[eventType: string]: EventCallback} = {};
    const origialAddEventListener = document.addEventListener;

    beforeAll(() => {
      jest
        .spyOn(document, 'addEventListener')
        .mockImplementation((eventType: string, callback: EventCallback) => {
          eventMap[eventType] = callback;
        });
      getBoundingClientRectSpy = jest
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockImplementation(mockGetBoundingClientRect);
    });

    afterAll(() => {
      document.addEventListener = origialAddEventListener;
      getBoundingClientRectSpy.mockRestore();
    });

    it('touchmove the lower thumb sets the lower value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveLowerThumb(dualThumb, 0.5);

      expect(onChangeSpy).toHaveBeenCalledWith([25, 40], mockProps.id);
    });

    it('touchmove the upper thumb sets the upper value', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} onChange={onChangeSpy} />,
      );

      moveUpperThumb(dualThumb, 0.5);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 25], mockProps.id);
    });

    it('touchend removes the touchmove event listener, itself, and the touchcancel listener', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener',
      );
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      moveUpperThumb(dualThumb, 0.5);
      removeEventListenerSpy.mockClear();
      eventMap.touchend();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
      expect(removeEventListenerSpy.mock.calls[0][0]).toBe('touchmove');
      expect(removeEventListenerSpy.mock.calls[1][0]).toBe('touchend');
      expect(removeEventListenerSpy.mock.calls[2][0]).toBe('touchcancel');
    });

    it('touchcancel removes the touchmove event listener, itself, and the touchend listener', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener',
      );
      const dualThumb = mountWithApp(<DualThumb {...mockProps} />);

      moveUpperThumb(dualThumb, 0.5);
      removeEventListenerSpy.mockClear();
      eventMap.touchcancel();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
      expect(removeEventListenerSpy.mock.calls[0][0]).toBe('touchmove');
      expect(removeEventListenerSpy.mock.calls[1][0]).toBe('touchend');
      expect(removeEventListenerSpy.mock.calls[2][0]).toBe('touchcancel');
    });

    it('the lower and upper thumbs do not move when disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[10, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      moveUpperThumb(dualThumb, 0.5);
      moveLowerThumb(dualThumb, 0.5);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('moves the lower thumb when the track is touched closer to it than the upper thumb', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      touchTrack(dualThumb, 0.2, trackClassName);

      expect(onChangeSpy).toHaveBeenCalledWith([10, 40], mockProps.id);
    });

    it('moves the upper thumb when the track is touched closer to it than the lower thumb', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      touchTrack(dualThumb, 0.6, trackClassName);

      expect(onChangeSpy).toHaveBeenCalledWith([5, 30], mockProps.id);
    });

    it('moves the lower thumb when the track is touched closer to it than the upper thumb and then touchmove', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      touchTrack(dualThumb, 0.2, trackClassName);
      moveLowerThumb(dualThumb, 0.3, false);

      expect(onChangeSpy).toHaveBeenCalledWith([15, 40], mockProps.id);
    });

    it('moves the upper thumb when the track is touched closer to it than the lower thumb and then touchmove', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={onChangeSpy} />,
      );

      touchTrack(dualThumb, 0.6, trackClassName);
      moveUpperThumb(dualThumb, 0.9, false);

      expect(onChangeSpy).toHaveBeenCalledWith([5, 45], mockProps.id);
    });

    it('does not move the lower thumb when the track is touched and is disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[5, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      touchTrack(dualThumb, 0.2, disabledTrackClassName);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('does not move the upper thumb when the track is touched and is disabled', () => {
      const onChangeSpy = jest.fn();
      const dualThumb = mountWithApp(
        <DualThumb
          {...mockProps}
          value={[5, 40]}
          onChange={onChangeSpy}
          disabled
        />,
      );

      touchTrack(dualThumb, 0.6, disabledTrackClassName);

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('removes touchstart listener on track', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 40]} onChange={noop} />,
      );

      const track = findTrack(dualThumb, trackClassName).domNode!;

      const removeEventListenerSpy = jest.spyOn(track, 'removeEventListener');
      removeEventListenerSpy.mockClear();

      dualThumb.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    function touchTrack(
      component: MountedComponentType,
      percentageOfTrackX: number,
      className: string,
    ) {
      const trackWidth = 100;
      const clientX = trackWidth * percentageOfTrackX;

      window.dispatchEvent(new Event('resize'));
      const touch = {clientX};
      const event = new TouchEvent('touchstart', {
        touches: [touch],
      } as TouchEventInit);
      Object.assign(event, {preventDefault: noop});

      component.act(() => {
        findTrack(component, className).domNode!.dispatchEvent(event);
      });
    }

    function moveLowerThumb(
      component: MountedComponentType,
      percentageOfTrackX: number,
      simulateTouchStart = true,
    ) {
      const trackWidth = 100;

      window.dispatchEvent(new Event('resize'));
      if (simulateTouchStart)
        findThumbLower(component).trigger(
          'onTouchStart',
          new TouchEvent('touchStart'),
        );
      component.act(() => {
        eventMap.touchmove({
          touches: [{clientX: trackWidth * percentageOfTrackX}],
          preventDefault: noop,
        });
      });
    }

    function moveUpperThumb(
      component: any,
      percentageOfTrackX: number,
      simulateTouchStart = true,
    ) {
      const trackWidth = 100;

      window.dispatchEvent(new Event('resize'));

      if (simulateTouchStart)
        findThumbUpper(component).trigger(
          'onTouchStart',
          new TouchEvent('touchStart'),
        );
      component.act(() => {
        eventMap.touchmove({
          touches: [{clientX: trackWidth * percentageOfTrackX}],
          preventDefault: noop,
        });
      });
    }
  });

  describe('value prop sanitization', () => {
    it('sanitizes the lower value with respect to the step prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[4, 40]} step={5} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 5,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 40,
      });
    });

    it('sanitizes the upper value with respect to the step prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[5, 41]} step={5} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 5,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 40,
      });
    });

    it('sanitizes the lower value with respect to the max prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[110, 150]} max={100} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 99,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 100,
      });
    });

    it('sanitizes the upper value with respect to the max prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[110, 150]} max={100} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 99,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 100,
      });
    });

    it('sanitizes the lower value with respect to the min prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 40]} min={20} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 20,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 40,
      });
    });

    it('sanitizes the upper value with respect to the min prop', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 15]} min={20} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 20,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 21,
      });
    });

    it('sets the lower value to a step below the upper value if the lower value equals the upper value', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[10, 10]} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 9,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 10,
      });
    });

    it('sets the lower value to a step below the upper value if the lower value is higher than the upper value', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[15, 10]} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 9,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 10,
      });
    });

    it('sets the upper value to one step above the min and the lower value to the min when they are out of bounds and inversed', () => {
      const dualThumb = mountWithApp(
        <DualThumb {...mockProps} value={[1500, -10]} />,
      );
      const lowerThumb = findThumbLower(dualThumb);
      const upperThumb = findThumbUpper(dualThumb);

      expect(lowerThumb).toHaveReactProps({
        'aria-valuenow': 0,
      });
      expect(upperThumb).toHaveReactProps({
        'aria-valuenow': 1,
      });
    });
  });
});

function noop() {}

function findThumbLower(containerComponent: MountedComponentType) {
  return containerComponent.find('div', {
    role: 'slider',
  })!;
}

function findThumbUpper(containerComponent: MountedComponentType) {
  const thumbs = containerComponent.findAll('div', {
    role: 'slider',
  });
  const lastIndex = thumbs.length - 1;
  return thumbs[lastIndex];
}

function findTrack(
  containerComponent: MountedComponentType,
  className: string,
) {
  return containerComponent.find('div', {
    className,
  })!;
}

function mockGetBoundingClientRect(): ReturnType<
  Element['getBoundingClientRect']
> {
  // Match thumbSize set in DualThumb.tsx
  const thumbSize = 16;

  return {
    width: 100 + thumbSize,
    height: 0,
    top: 0,
    left: -(thumbSize / 2),
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON() {},
  };
}
