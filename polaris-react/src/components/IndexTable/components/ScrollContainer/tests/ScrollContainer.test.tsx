import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {setMatchMedia} from 'tests/setup/tests';

import {ScrollContext} from '../../../../../utilities/index-table';
import {ScrollContainer} from '../ScrollContainer';

setMatchMedia();

function TestComponent() {
  const containerRef = React.useRef(null);

  return <div ref={containerRef}>Hello</div>;
}

describe('<ScrollContainer />', () => {
  it('renders a ScrollContext provider', () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mountWithApp(
      <ScrollContainer scrollableContainerRef={ref} onScroll={() => {}}>
        <TestComponent />
      </ScrollContainer>,
    );

    expect(wrapper).toContainReactComponent(ScrollContext.Provider);
  });
});
