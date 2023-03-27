import type {ReactNode, ReactElement, MutableRefObject} from 'react';
import React, {memo, useEffect, useRef} from 'react';

import {classNames} from '../../../../utilities/css';
import {UnstyledLink} from '../../../UnstyledLink';
import styles from '../../AlphaTabs.scss';

export interface ItemProps {
  id: string;
  focused: boolean;
  children?: ReactNode;
  url?: string;
  accessibilityLabel?: string;
  onClick?(): void;
}
export const Item = memo(function Item({
  id,
  focused,
  children,
  url,
  accessibilityLabel,
  onClick = noop,
}: ItemProps) {
  const focusedNode = useRef<HTMLButtonElement | ReactElement | null>(null);

  useEffect(() => {
    if (
      focusedNode.current &&
      focusedNode.current instanceof HTMLElement &&
      focused
    ) {
      focusedNode.current.focus();
    }
  }, [focusedNode, focused]);

  const classname = classNames(styles.Item);

  const sharedProps = {
    id,
    ref: focusedNode,
    onClick,
    className: classname,
    'aria-selected': false,
    'aria-label': accessibilityLabel,
  };

  const markup = url ? (
    <UnstyledLink {...sharedProps} url={url}>
      {children}
    </UnstyledLink>
  ) : (
    <button
      {...sharedProps}
      ref={focusedNode as MutableRefObject<HTMLButtonElement>}
      type="button"
    >
      {children}
    </button>
  );

  return <li>{markup}</li>;
});

function noop() {}
