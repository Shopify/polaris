import React, {useContext, useEffect, useRef} from 'react';
import {mountWithApp} from 'test-utilities';
import {FocusManager} from '../FocusManager';
import {
  useFocusManager,
  FocusManagerContext,
} from '../../../utilities/focus-manager';

const Component = ({id}: {id: string}) =>
  useFocusManager().canSafelyFocus ? <div id={id} /> : null;

describe('FocusManager', () => {
  it('allows the first component added to be safely focused', () => {
    const id = 'one';
    const component = mountWithApp(
      <FocusManager>
        <Component id={id} />
        <Component id="two" />
      </FocusManager>,
    );
    expect(component).toContainReactComponentTimes('div', 1, {id});
  });

  it('does not allow the second component added to be safely focused', () => {
    const id = 'two';
    const component = mountWithApp(
      <FocusManager>
        <Component id="one" />
        <Component id={id} />
      </FocusManager>,
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
      const component = mountWithApp(
        <FocusManager>
          <Component />
        </FocusManager>,
      );
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
      const component = mountWithApp(
        <FocusManager>
          <Component />
        </FocusManager>,
      );
      expect(component).toContainReactComponentTimes('div', 1);
    });
  });
});
