import React, {useRef} from 'react';
import {mount} from 'tests/utilities';

import {useFocus, useFocusIn} from '../use-focus';

describe('useFocus', () => {
  it('returns false by default', () => {
    function App() {
      const ref = useRef(null);
      const isFocused = useFocus(ref);
      return <div ref={ref}>{String(isFocused)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('false');
  });

  it('returns true on focus', () => {
    function App() {
      const ref = useRef(null);
      const isFocused = useFocus(ref);
      return <div ref={ref}>{String(isFocused)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('focus'));
    });

    expect(app).toContainReactText('true');
  });

  it('returns false on focus and blur', () => {
    function App() {
      const ref = useRef(null);
      const isFocused = useFocus(ref);
      return <div ref={ref}>{String(isFocused)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('focus'));
      div.dispatchEvent(new Event('blur'));
    });

    expect(app).toContainReactText('false');
  });
});

describe('useFocusIn', () => {
  it('returns false by default', () => {
    function App() {
      const ref = useRef(null);
      const isFocusedIn = useFocusIn(ref);
      return <div ref={ref}>{String(isFocusedIn)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('false');
  });

  it('returns true on focusin', () => {
    function App() {
      const ref = useRef(null);
      const isFocusedIn = useFocusIn(ref);
      return <div ref={ref}>{String(isFocusedIn)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('focusin'));
    });

    expect(app).toContainReactText('true');
  });

  it('returns false on focusin and focusout', () => {
    jest.useFakeTimers();

    function App() {
      const ref = useRef(null);
      const isFocusedIn = useFocusIn(ref);
      return <div ref={ref}>{String(isFocusedIn)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('focusin'));
      div.dispatchEvent(new Event('focusout'));
    });

    // Remains true until the next turn of the event loop (See next test)
    expect(app).toContainReactText('true');

    app.act(() => jest.advanceTimersByTime(1));

    // Updates to false on the next turn of the event loop
    expect(app).toContainReactText('false');
  });

  it('returns true on focusin between children', () => {
    jest.useFakeTimers();

    function App() {
      const ref = useRef(null);
      const isFocusedIn = useFocusIn(ref);
      return <div ref={ref}>{String(isFocusedIn)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('focusin'));
      div.dispatchEvent(new Event('focusout'));
    });

    // Remains true until the next turn of the event loop
    expect(app).toContainReactText('true');

    // Subsequent focusin events clear the deferred focusout
    app.act(() => {
      div.dispatchEvent(new Event('focusin'));
    });

    app.act(() => jest.advanceTimersByTime(1));

    // Remains true on the next turn of the event loop
    expect(app).toContainReactText('true');
  });
});
