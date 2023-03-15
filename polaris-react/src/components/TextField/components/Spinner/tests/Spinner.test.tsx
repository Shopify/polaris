import {mountWithApp} from 'tests/utilities';

import {Spinner} from '../Spinner';

describe('<Spinner />', () => {
  const defaultProps = {
    onChange: noop,
    onMouseDown: noop,
    onMouseUp: noop,
    onBlur: noop,
  };

  describe('onChange', () => {
    it('adds a change callback', () => {
      const spy = jest.fn();
      const spinner = mountWithApp(
        <Spinner {...defaultProps} onChange={spy} />,
      );

      spinner.find('div', {role: 'button'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('adds a click callback', () => {
      const spy = jest.fn();
      const spinner = mountWithApp(<Spinner {...defaultProps} onClick={spy} />);
      spinner.find('div', {className: 'Spinner'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseDown', () => {
    it('adds a mouse down callback which calls the change callback', () => {
      const mouseDownSpy = jest.fn((callback) => {
        callback();
      });
      const changeSpy = jest.fn();
      const spinner = mountWithApp(
        <Spinner
          {...defaultProps}
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
        />,
      );

      spinner
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
      const spinner = mountWithApp(
        <Spinner
          {...defaultProps}
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
        />,
      );

      spinner
        .find('div', {role: 'button'})!
        .trigger('onMouseDown', {button: 1});

      expect(mouseDownSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseUp', () => {
    it('adds a mouse up callback', () => {
      const spy = jest.fn();
      const spinner = mountWithApp(
        <Spinner {...defaultProps} onMouseUp={spy} />,
      );

      spinner.find('div', {role: 'button'})!.trigger('onMouseUp');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the stepper is blurred', () => {
      const onBlurSpy = jest.fn();
      const spinner = mountWithApp(
        <Spinner {...defaultProps} onBlur={onBlurSpy} />,
      );
      spinner.find('div', {role: 'button'})!.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function noop() {}
