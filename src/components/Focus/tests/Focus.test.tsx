import React, {useRef, useState, useEffect} from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import Focus, {Props} from '../Focus';
import {Discard} from '../../../types';

describe('<Focus />', () => {
  let requestAnimationFrameSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    requestAnimationFrameSpy.mockImplementation((cb) => cb());
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('mounts', () => {
    const focus = mountWithAppProvider(<FocusTestWrapper />);

    expect(focus.exists()).toBe(true);
  });

  it('will not focus any element if none are natively focusable', () => {
    mountWithAppProvider(
      <FocusTestWrapper>
        <span />
      </FocusTestWrapper>,
    );

    expect(document.body).toBe(document.activeElement);
  });

  it('will focus first focusable node', () => {
    const focus = mountWithAppProvider(
      <FocusTestWrapper>
        <input />
      </FocusTestWrapper>,
    );

    const input = focus.find('input').getDOMNode();
    expect(input).toBe(document.activeElement);
  });

  it('will not focus the first focusable node is the `disabled` is true', () => {
    const focus = mountWithAppProvider(
      <FocusTestWrapper disabled>
        <input />
      </FocusTestWrapper>,
    );

    const input = focus.find('input').getDOMNode();
    expect(input).not.toBe(document.activeElement);
  });
});

function FocusTestWrapper({children, ...props}: Discard<Props, 'root'>) {
  const root = useRef<HTMLDivElement>(null);
  const [, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <Focus {...props} root={root.current}>
      <div ref={root}>{children}</div>
    </Focus>
  );
}
