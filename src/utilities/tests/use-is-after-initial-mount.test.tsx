import React from 'react';
import {mount} from 'test-utilities';

import {useIsAfterInitialMount} from '../use-is-after-initial-mount';

describe('useIsAfterInitialMount', () => {
  it('starts off false', () => {
    let isAfterInitialMountValue: boolean | undefined;
    function Component() {
      const isAfterInitialMount = useIsAfterInitialMount();
      if (isAfterInitialMountValue === undefined)
        isAfterInitialMountValue = !isAfterInitialMount;
      return null;
    }

    mount(<Component />);

    expect(isAfterInitialMountValue).toBe(true);
  });

  it('is true after mount', () => {
    let isAfterInitialMountValue: boolean | undefined;
    function Component() {
      isAfterInitialMountValue = useIsAfterInitialMount();
      return null;
    }

    mount(<Component />);

    expect(isAfterInitialMountValue).toBe(true);
  });
});
