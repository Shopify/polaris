import {mountWithApp} from 'tests/utilities';

import {ScrollTo} from '../ScrollTo';
import {ScrollableContext} from '../../../context';

describe('<Scrollable.ScrollTo />', () => {
  it('calls scrollToPosition on mount', () => {
    const spy = jest.fn();

    mountWithApp(
      <ScrollableContext.Provider value={spy}>
        <ScrollTo />
      </ScrollableContext.Provider>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it("does not call scrollToPosition when it's undefined", () => {
    function fn() {
      mountWithApp(
        <ScrollableContext.Provider value={undefined}>
          <ScrollTo />
        </ScrollableContext.Provider>,
      );
    }

    expect(fn).not.toThrow();
  });
});
