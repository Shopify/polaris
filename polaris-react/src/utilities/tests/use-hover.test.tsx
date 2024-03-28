import React, {useRef} from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mount} from 'tests/utilities';

import {mouseMediaQuery, useHover, useMouseHover} from '../use-hover';

describe('useHover', () => {
  it('returns false by default', () => {
    function App() {
      const ref = useRef(null);
      const isMouseEntered = useHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('false');
  });

  it('returns true on mouse enter', () => {
    function App() {
      const ref = useRef(null);
      const isMouseEntered = useHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
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
      const isMouseEntered = useHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
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

describe('useMouseHover', () => {
  it('returns false by default', () => {
    setMatchMedia({isMouseDevice: true});

    function App() {
      const ref = useRef(null);
      const isMouseEntered = useMouseHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('false');
  });

  it('returns true on mouse enter', () => {
    setMatchMedia({isMouseDevice: true});

    function App() {
      const ref = useRef(null);
      const isMouseEntered = useMouseHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('mouseenter'));
    });

    expect(app).toContainReactText('true');
  });

  it('returns false on mouse enter and leave', () => {
    setMatchMedia({isMouseDevice: true});

    function App() {
      const ref = useRef(null);
      const isMouseEntered = useMouseHover(ref);
      return <div ref={ref}>{String(isMouseEntered)}</div>;
    }

    const app = mount(<App />);
    const div = app.find('div')!.domNode!;

    app.act(() => {
      div.dispatchEvent(new Event('mouseenter'));
      div.dispatchEvent(new Event('mouseleave'));
    });

    expect(app).toContainReactText('false');
  });

  it('returns true fallbackValue when not a mouse device', () => {
    setMatchMedia({isMouseDevice: false});

    function App() {
      const ref = useRef(null);
      const isMouseEntered = useMouseHover(ref, {fallbackValue: true});
      return <div ref={ref}>{String(isMouseEntered)}</div>;
    }

    const app = mount(<App />);

    expect(app).toContainReactText('true');
  });
});

function setMatchMedia(options: {isMouseDevice: boolean}) {
  matchMedia.setMedia((mediaQuery) => ({
    matches: mediaQuery === mouseMediaQuery ? options.isMouseDevice : false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
