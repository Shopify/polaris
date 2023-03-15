import {mount} from 'tests/utilities';

import {useComponentDidMount} from '../use-component-did-mount';
import {useIsAfterInitialMount} from '../use-is-after-initial-mount';

describe('useComponentDidMount', () => {
  it('invokes your callback after mount', () => {
    const spy = jest.fn();
    function Component() {
      const isAfterInitialMount = useIsAfterInitialMount();
      useComponentDidMount(() => {
        spy(isAfterInitialMount);
      });

      return null;
    }

    mount(<Component />);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('invokes the callback once', () => {
    const spy = jest.fn();
    function Component() {
      useComponentDidMount(spy);
      return null;
    }

    const component = mount(<Component />);

    component.setProps({});
    component.setProps({});
    component.setProps({});
    component.setProps({});
    component.setProps({});
    component.setProps({});

    component.unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
