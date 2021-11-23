import {mountWithApp} from 'tests/utilities';

import {Spinner} from '../Spinner';

describe('<Spinner />', () => {
  describe('onChange', () => {
    it('adds a change callback', () => {
      const spy = jest.fn();
      const spinner = mountWithApp(
        <Spinner onChange={spy} onMouseDown={noop} onMouseUp={noop} />,
      );

      spinner.find('div', {role: 'button'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick', () => {
    it('adds a click callback', () => {
      const spy = jest.fn();
      const spinner = mountWithApp(
        <Spinner
          onClick={spy}
          onChange={noop}
          onMouseDown={noop}
          onMouseUp={noop}
        />,
      );
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
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
          onMouseUp={noop}
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
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
          onMouseUp={noop}
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
        <Spinner onChange={noop} onMouseDown={noop} onMouseUp={spy} />,
      );

      spinner.find('div', {role: 'button'})!.trigger('onMouseUp');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

function noop() {}
