import {mount} from '@shopify/react-testing';

import {useDisableClick, useDisableKeyboard} from '../use-disable-interaction';

describe('useDisableClick', () => {
  it('returns click handler passed but prevents interaction if the boolean is true', () => {
    const spy = jest.fn();

    function MockComponent() {
      const mouseHandler = useDisableClick(true, spy);
      return <button onClick={mouseHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onClick', event);

    spy(event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    wrapper!.unmount();
  });

  it('returns click handler passed but does not prevent interaction if the boolean is false', () => {
    const spy = jest.fn();

    function MockComponent() {
      const mouseHandler = useDisableClick(false, spy);
      return <button onClick={mouseHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onClick', event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();

    wrapper!.unmount();
  });

  it('returns a click handler that prevents interaction if only a boolean is passed', () => {
    const spy = jest.fn();

    function MockComponent() {
      const mouseHandler = useDisableClick(true);
      return <button onClick={mouseHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onClick', event);

    spy(event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    wrapper!.unmount();
  });
});

describe('useDisableKeyboard', () => {
  it('returns keyboard handler passed but prevents interaction if the boolean is true and the key is Enter or Space', () => {
    const spy = jest.fn();

    function MockComponent() {
      const keyboardHandler = useDisableKeyboard(true, spy);
      return <button onKeyDown={keyboardHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      key: 'Enter',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onKeyDown', event);

    spy(event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    wrapper!.unmount();
  });

  it('returns keyboard handler passed but does not prevent interaction if the boolean is false and the key is Enter or Space', () => {
    const spy = jest.fn();

    function MockComponent() {
      const keyboardHandler = useDisableKeyboard(false, spy);
      return <button onKeyDown={keyboardHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      key: ' ',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onKeyDown', event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();

    wrapper!.unmount();
  });

  it('returns a keyboard event that prevents interaction when only a boolean is passed', () => {
    const spy = jest.fn();

    function MockComponent() {
      const keyboardHandler = useDisableKeyboard(true);
      return <button onKeyDown={keyboardHandler} />;
    }

    const wrapper = mount(<MockComponent />);

    const event = {
      key: ' ',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    expect(spy).not.toHaveBeenCalled();

    wrapper!.find('button')!.trigger('onKeyDown', event);

    spy(event);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();

    wrapper!.unmount();
  });
});
