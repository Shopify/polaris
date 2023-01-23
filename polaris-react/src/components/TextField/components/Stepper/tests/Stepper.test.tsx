import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Stepper} from '../Stepper';

describe('<Stepper />', () => {
  const defaultProps = {
    onChange: noop,
    onMouseDown: noop,
    onMouseUp: noop,
    onBlur: noop,
  };

  describe('onChange', () => {
    it('adds a change callback', () => {
      const spy = jest.fn();
      const stepper = mountWithApp(
        <Stepper {...defaultProps} onChange={spy} />,
      );

      stepper.find('div', {role: 'button'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('adds a click callback', () => {
      const spy = jest.fn();
      const stepper = mountWithApp(<Stepper {...defaultProps} onClick={spy} />);
      stepper.find('div', {className: 'Stepper'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseDown', () => {
    it('adds a mouse down callback which calls the change callback', () => {
      const mouseDownSpy = jest.fn((callback) => {
        callback();
      });
      const changeSpy = jest.fn();
      const stepper = mountWithApp(
        <Stepper
          {...defaultProps}
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
        />,
      );

      stepper
        .find('div', {role: 'button'})!
        .trigger('onMouseDown', {button: 0});

      expect(mouseDownSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('does not call the change callback if a non-primary button', () => {
      const mouseDownSpy = jest.fn((callback) => {
        callback();
      });
      const changeSpy = jest.fn();
      const stepper = mountWithApp(
        <Stepper
          {...defaultProps}
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
        />,
      );

      stepper
        .find('div', {role: 'button'})!
        .trigger('onMouseDown', {button: 1});

      expect(mouseDownSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseUp', () => {
    it('adds a mouse up callback', () => {
      const spy = jest.fn();
      const stepper = mountWithApp(
        <Stepper {...defaultProps} onMouseDown={noop} onMouseUp={spy} />,
      );

      stepper.find('div', {role: 'button'})!.trigger('onMouseUp');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the stepper is blurred', () => {
      const onBlurSpy = jest.fn();
      const stepper = mountWithApp(
        <Stepper {...defaultProps} onBlur={onBlurSpy} />,
      );
      stepper.find('div', {role: 'button'})!.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function noop() {}
