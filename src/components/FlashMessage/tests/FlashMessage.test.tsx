import * as React from 'react';
import {mount} from 'enzyme';
import FlashMessage from '../FlashMessage';
import {findByTestID, trigger} from '../../../../tests/utilities/enzyme';

describe('<FlashMessage />', () => {
  it('does not render the close button by default', () => {
    const message = mount(<FlashMessage duration={3000} />);

    const button = findByTestID(message, 'button');

    expect(button.exists()).toBeFalsy();
  });

  it('renders the close button when dismissible is true', () => {
    const message = mount(<FlashMessage duration={3000} dismissible />);

    const button = findByTestID(message, 'button');

    expect(button.exists()).toBeTruthy();
  });

  it('sets the callback to the dismissible button', () => {
    const spy = jest.fn();

    const message = mount(
      <FlashMessage dismissible duration={3000} onDismiss={spy} />,
    );

    const button = findByTestID(message, 'button');

    trigger(button, 'onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('automatically calls onDismiss after time has reached the default duration', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const message = mount(<FlashMessage onDismiss={spy} duration={3000} />);

    const button = findByTestID(message, 'button');

    expect(button.exists()).toBeFalsy();
    expect(spy).not.toBeCalled();
    jest.runTimersToTime(3000);
    expect(spy).toBeCalled();
    expect(spy.mock.calls.length).toBe(1);
  });

  it('automatically calls onDismiss after time has reached the specified duration', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const message = mount(<FlashMessage onDismiss={spy} duration={1000} />);

    const button = findByTestID(message, 'button');

    expect(button.exists()).toBeFalsy();
    expect(spy).not.toBeCalled();
    jest.runTimersToTime(1000);
    expect(spy).toBeCalled();
    expect(spy.mock.calls.length).toBe(1);
  });

  it('does not call onDismiss if the time passed has not reached the specified duration', () => {
    jest.useFakeTimers();
    const spy = jest.fn();

    const message = mount(<FlashMessage onDismiss={spy} duration={3000} />);

    const button = findByTestID(message, 'button');

    expect(button.exists()).toBeFalsy();
    expect(spy).not.toBeCalled();
    jest.runTimersToTime(2000);
    expect(spy).not.toBeCalled();
    expect(spy.mock.calls.length).toBe(0);
  });
});
