import React, {useRef, useState, useEffect} from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Focus, FocusProps} from '../Focus';

describe('<Focus />', () => {
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

  it('will not focus the first focusable node if `disabled` is true', () => {
    const focus = mountWithAppProvider(
      <FocusTestWrapper disabled>
        <input />
      </FocusTestWrapper>,
    );

    const input = focus.find('input').getDOMNode();
    expect(input).not.toBe(document.activeElement);
  });
});

function FocusTestWrapper({children, ...props}: Omit<FocusProps, 'root'>) {
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
