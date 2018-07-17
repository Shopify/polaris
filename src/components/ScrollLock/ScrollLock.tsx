import * as React from 'react';
import './ScrollLock.scss';

export const SCROLL_LOCKING_ATTRIBUTE = 'data-lock-scrolling';

export default class ScrollLock extends React.Component<{}, never> {
  componentDidMount() {
    const scrollPosition = window.scrollY;

    const {body} = document;

    body.style.paddingRight = `${scrollBarPadding()}px`;
    body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, '');
    body.scrollTop = scrollPosition;
  }

  componentWillUnmount() {
    document.body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
    document.body.removeAttribute('style');
  }

  render() {
    return null;
  }
}

function scrollBarPadding() {
  if (!document || !window) return 0;

  const paddingRight = document.body.style.paddingRight || '0';

  const currentPadding = parseInt(paddingRight, 10) || 0;
  const clientWidth = document.body ? document.body.clientWidth : 0;
  const adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;

  return adjustedPadding;
}
