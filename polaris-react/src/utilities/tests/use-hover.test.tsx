import React, {useRef} from 'react';
import {mount} from 'tests/utilities';

import {useHover} from '../use-hover';

describe('useHover', () => {
  it('returns false by default', () => {
    function App() {
      const ref = useRef(null);
      const isHovered = useHover(ref);
      return <div ref={ref}>{String(isHovered)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('false');
  });

  it('returns true on mouse enter', () => {
    function App() {
      const ref = useRef(null);
      const isHovered = useHover(ref);
      return <div ref={ref}>{String(isHovered)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('mouseenter'));
    });

    expect(app).toContainReactText('true');
  });

  it('returns false on mouse enter and leave', () => {
    function App() {
      const ref = useRef(null);
      const isHovered = useHover(ref);
      return <div ref={ref}>{String(isHovered)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('mouseenter'));
      div.dispatchEvent(new Event('mouseleave'));
    });

    expect(app).toContainReactText('false');
  });
});
