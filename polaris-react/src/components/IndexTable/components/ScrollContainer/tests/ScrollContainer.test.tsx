import { useRef, createRef } from 'react';
import {mountWithApp} from 'tests/utilities';

import {ScrollContext} from '../../../../../utilities/index-table';
import {ScrollContainer} from '../ScrollContainer';

function TestComponent() {
  const containerRef = useRef(null);

  return <div ref={containerRef}>Hello</div>;
}

describe('<ScrollContainer />', () => {
  it('renders a ScrollContext provider', () => {
    const ref = createRef<HTMLDivElement>();
    const wrapper = mountWithApp(
      <ScrollContainer scrollableContainerRef={ref} onScroll={() => {}}>
        <TestComponent />
      </ScrollContainer>,
    );

    expect(wrapper).toContainReactComponent(ScrollContext.Provider);
  });
});
