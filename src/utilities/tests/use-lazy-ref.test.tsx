import {useEffect, useState} from 'react';
import {mount} from 'tests/utilities';

import {useLazyRef} from '../use-lazy-ref';

describe('useLazyRef', () => {
  it('returns a ref object', () => {
    const spy = jest.fn();

    function MockComponent() {
      const lazyValue = useLazyRef(() => true);
      spy(lazyValue);
      return null;
    }

    mount(<MockComponent />);
    expect(spy).toHaveBeenCalledWith({current: true});
  });

  it('only calls initialValue once', () => {
    const spy = jest.fn();

    function MockComponent() {
      const [, setFooState] = useState(false);

      useEffect(() => {
        setFooState(true);
      }, []);

      useLazyRef(spy);

      return null;
    }

    mount(<MockComponent />);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
