import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {useFollowMouse} from '../hooks';

describe('useFollowMouse', () => {
  it('functions correctly', () => {
    const spy = jest.fn();

    function MockComponent() {
      const {targetRef, transformValue, handleFollowMouseMove, constraints} =
        useFollowMouse();
      spy({
        targetRef,
        transformValue,
        handleFollowMouseMove,
        constraints,
      });
      return null;
    }

    mountWithApp(<MockComponent />);

    expect(spy).toHaveBeenCalledWith({
      targetRef: {current: null},
      constraints: {
        current: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
      },
      transformValue: '',
      handleFollowMouseMove: expect.anything(),
    });
  });
});
