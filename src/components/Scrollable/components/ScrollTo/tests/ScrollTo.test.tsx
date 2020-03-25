import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {ScrollTo} from '../ScrollTo';
import {ScrollableContext} from '../../../context';

describe('<Scrollable.ScrollTo />', () => {
  it('calls scrollToPosition on mount', () => {
    const spy = jest.fn();

    mountWithAppProvider(
      <ScrollableContext.Provider value={spy}>
        <ScrollTo />
      </ScrollableContext.Provider>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it("does not call scrollToPosition when it's undefined", () => {
    function fn() {
      mountWithAppProvider(
        <ScrollableContext.Provider value={undefined}>
          <ScrollTo />
        </ScrollableContext.Provider>,
      );
    }

    expect(fn).not.toThrow();
  });
});
