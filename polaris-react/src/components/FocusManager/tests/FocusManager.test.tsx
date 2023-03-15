import { useContext, useEffect, useRef } from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  useFocusManager,
  FocusManagerContext,
} from '../../../utilities/focus-manager';

const Component = ({id}: {id: string}) =>
  useFocusManager({trapping: true}).canSafelyFocus ? <div id={id} /> : null;

describe('FocusManager', () => {
  it('allows the first component added to be safely focused', () => {
    const id = 'one';
    const component = mountWithApp(
      <div>
        <Component id={id} />
        <Component id="two" />
      </div>,
    );
    expect(component).toContainReactComponentTimes('div', 1, {id});
  });

  it('does not allow the second component added to be safely focused', () => {
    const id = 'two';
    const component = mountWithApp(
      <div>
        <Component id="one" />
        <Component id={id} />
      </div>,
    );
    expect(component).not.toContainReactComponent('div', {id});
  });

  describe('remove', () => {
    it('returns false when the component was not removed', () => {
      const Component = () => {
        const wasRemoved = useRef(false);
        const {remove} = useContext(FocusManagerContext)!;

        useEffect(() => {
          wasRemoved.current = remove('id');
        }, [remove]);

        return wasRemoved.current ? <div /> : null;
      };
      const component = mountWithApp(<Component />);
      expect(component).not.toContainReactComponent('div');
    });

    it('returns true when the component was added', () => {
      const id = 'id';
      const Component = () => {
        const wasRemoved = useRef(false);
        const {add, remove} = useContext(FocusManagerContext)!;

        useEffect(() => {
          add(id);
          wasRemoved.current = remove(id);
        }, [add, remove]);

        return wasRemoved.current ? <div /> : null;
      };
      const component = mountWithApp(<Component />);
      expect(component).toContainReactComponentTimes('div', 1);
    });
  });
});
