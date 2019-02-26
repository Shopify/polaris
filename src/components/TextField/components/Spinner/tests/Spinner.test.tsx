import * as React from 'react';
import {shallow} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import Spinner from '../Spinner';

describe('<Spinner />', () => {
  describe('onChange', () => {
    it('adds a change callback', () => {
      const spy = jest.fn();
      const spinner = shallow(
        <Spinner onChange={spy} onMouseDown={noop} onMouseUp={noop} />,
      );
      spinner
        .find('[role="button"]')
        .first()
        .simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('onClick', () => {
    it('adds a click callback', () => {
      const spy = jest.fn();
      const spinner = shallow(
        <Spinner
          onClick={spy}
          onChange={noop}
          onMouseDown={noop}
          onMouseUp={noop}
        />,
      );
      spinner.simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseDown', () => {
    it('adds a mouse down callback which calls the change callback', () => {
      const mouseDownSpy = jest.fn((callback) => {
        callback();
      });
      const changeSpy = jest.fn();
      const spinner = shallow(
        <Spinner
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
          onMouseUp={noop}
        />,
      );
      spinner
        .find('[role="button"]')
        .first()
        .simulate('mousedown', {button: 0});
      expect(mouseDownSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('does not call the change callback if a non-primary button', () => {
      const mouseDownSpy = jest.fn((callback) => {
        callback();
      });
      const changeSpy = jest.fn();
      const spinner = shallow(
        <Spinner
          onChange={changeSpy}
          onMouseDown={mouseDownSpy}
          onMouseUp={noop}
        />,
      );
      spinner
        .find('[role="button"]')
        .first()
        .simulate('mousedown', {button: 1});
      expect(mouseDownSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseUp', () => {
    it('adds a mouse up callback', () => {
      const spy = jest.fn();
      const spinner = shallow(
        <Spinner onChange={noop} onMouseDown={noop} onMouseUp={spy} />,
      );
      spinner
        .find('[role="button"]')
        .first()
        .simulate('mouseup');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
