import React, {useEffect} from 'react';
import {mount} from 'test-utilities';

import {AfterInitialMount} from '../AfterInitialMount';

describe('AfterInitialMount', () => {
  it('renders fallback before mounting', () => {
    const spy = jest.fn();

    function Fallback() {
      spy();
      return null;
    }

    mount(<AfterInitialMount fallback={<Fallback />} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders children after mounting', () => {
    const fallbackSpy = jest.fn();

    function Fallback() {
      useEffect(() => {
        fallbackSpy(true);
      }, []);

      return null;
    }

    function Children() {
      return null;
    }

    const afterInitialMount = mount(
      <AfterInitialMount fallback={<Fallback />}>
        <Children />
      </AfterInitialMount>,
    );

    expect(fallbackSpy).toHaveBeenCalledWith(true);
    expect(afterInitialMount).toContainReactComponent(Children);
  });
});
