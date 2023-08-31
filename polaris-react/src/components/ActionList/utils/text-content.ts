import type React from 'react';

export function textContent(
  elem?: React.ReactElement | JSX.Element | string,
): string {
  if (!elem) {
    return '';
  }
  if (typeof elem === 'string') {
    return elem;
  }
  const children = elem.props && elem.props.children;
  if (children instanceof Array) {
    return children.map(textContent).join('');
  } else if (typeof elem?.type === 'function') {
    return textContent(elem.type());
  }
  return textContent(children);
}
