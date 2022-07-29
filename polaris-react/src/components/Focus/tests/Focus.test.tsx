import {useRef, useState, useEffect} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Focus, FocusProps} from '../Focus';

describe('<Focus />', () => {
  it('will not focus any element if none are natively focusable', () => {
    mountWithApp(
      <FocusTestWrapper>
        <span />
      </FocusTestWrapper>,
    );

    expect(document.activeElement).toBe(document.body);
  });

  it('will focus first focusable node when passing current node', () => {
    const focus = mountWithApp(
      <FocusTestWrapper>
        <input />
      </FocusTestWrapper>,
    );

    expect(document.activeElement).toBe(focus.find('input')!.domNode);
  });

  it('will focus first focusable node when passing ref', () => {
    const focus = mountWithApp(
      <FocusTestWrapperRootReference>
        <input />
      </FocusTestWrapperRootReference>,
    );

    expect(document.activeElement).toBe(focus.find('input')!.domNode);
  });

  it('will not focus the first focusable node if `disabled` is true', () => {
    const focus = mountWithApp(
      <FocusTestWrapper disabled>
        <input />
      </FocusTestWrapper>,
    );

    expect(document.activeElement).not.toBe(focus.find('input')!.domNode);
  });

  it('will not focus if there is no node', () => {
    const focus = mountWithApp(
      <FocusTestWrapperNoNode>
        <input />
      </FocusTestWrapperNoNode>,
    );

    expect(document.activeElement).not.toBe(focus.find('input')!.domNode);
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

function FocusTestWrapperRootReference({
  children,
  ...props
}: Omit<FocusProps, 'root'>) {
  const root = useRef<HTMLDivElement>(null);

  return (
    <Focus {...props} root={root}>
      <div ref={root}>{children}</div>
    </Focus>
  );
}

function FocusTestWrapperNoNode({
  children,
  ...props
}: Omit<FocusProps, 'root'>) {
  const root = useRef<HTMLDivElement>(null);

  return (
    <Focus {...props} root={root}>
      <div>{children}</div>
    </Focus>
  );
}
