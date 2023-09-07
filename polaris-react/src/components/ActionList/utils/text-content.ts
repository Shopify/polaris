import type React from 'react';

export function textContent(
  elem?: React.ReactElement | JSX.Element | string,
): string | undefined {
  if (!elem) {
    return;
  }

  if (typeof elem === 'string') {
    return elem;
  }

  const children = elem.props?.children;
  if (Array.isArray(children)) {
    return children.map(textContent).join('');
  } else if (typeof elem?.type === 'function') {
    return textContent(elem.type(elem.props));
  } else {
    console.log(typeof elem?.type);
  }

  // for a react component that isn't an array, it'll recursively keep going until it gets to a string.
  return textContent(children);
}
