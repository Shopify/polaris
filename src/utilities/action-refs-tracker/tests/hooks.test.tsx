import React, {useRef, useContext} from 'react';
import {mountWithApp} from 'test-utilities';

import {useSetActionRefs} from '../hooks';
import {ActionRefsTrackerContext} from '../context';

describe('useSetActionRefs', () => {
  it('updates context with values when available', () => {
    const TestHarness = () => {
      return (
        <div>
          <MockComponent1 />
          <MockComponent2 />
        </div>
      );
    };
    mountWithApp(<TestHarness />);
    const component = mountWithApp(<TestComponent />);

    expect(component).toContainReactText('Context length: 2');
  });

  it('doesn not update with duplicate values', () => {
    const TestHarness = () => {
      return (
        <div>
          <MockComponent1 />
          <MockComponent1 />
          <MockComponent2 />
        </div>
      );
    };
    mountWithApp(<TestHarness />);
    const component = mountWithApp(<TestComponent />);

    expect(component).toContainReactText('Context length: 2');
  });
});

function MockComponent1() {
  const activatorRef = useRef(null);
  useSetActionRefs({
    id: 'hello1',
    actionRef: activatorRef,
  });
  return <div ref={activatorRef} />;
}

function MockComponent2() {
  const activatorRef = useRef(null);
  useSetActionRefs({
    id: 'hello2',
    actionRef: activatorRef,
  });
  return <div ref={activatorRef} />;
}

const TestComponent = () => {
  const context = useContext(ActionRefsTrackerContext);
  return <>Context length: {context.length}</>;
};
