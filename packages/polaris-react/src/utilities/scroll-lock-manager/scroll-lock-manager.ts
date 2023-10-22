import {isServer} from '../target';

export const SCROLL_LOCKING_ATTRIBUTE = 'data-lock-scrolling';

const SCROLL_LOCKING_HIDDEN_ATTRIBUTE = 'data-lock-scrolling-hidden';

const SCROLL_LOCKING_WRAPPER_ATTRIBUTE = 'data-lock-scrolling-wrapper';

let scrollPosition = 0;

function isScrollBarVisible() {
  const {body} = document;
  return body.scrollHeight > body.clientHeight;
}

export class ScrollLockManager {
  private scrollLocks = 0;
  private locked = false;

  registerScrollLock() {
    this.scrollLocks += 1;
    this.handleScrollLocking();
  }

  unregisterScrollLock() {
    this.scrollLocks -= 1;
    this.handleScrollLocking();
  }

  handleScrollLocking() {
    if (isServer) return;

    const {scrollLocks} = this;
    const {body} = document;
    const wrapper = body.firstElementChild;

    if (scrollLocks === 0) {
      body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
      body.removeAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE);
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, '');

      if (!isScrollBarVisible()) {
        body.setAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE, '');
      }

      if (wrapper) {
        wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, '');
        wrapper.scrollTop = scrollPosition;
      }
      this.locked = true;
    }
  }

  resetScrollPosition() {
    scrollPosition = 0;
  }
}
