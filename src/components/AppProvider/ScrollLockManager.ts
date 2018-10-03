import {isServer} from '@shopify/react-utilities/target';

export const SCROLL_LOCKING_ATTRIBUTE = 'data-lock-scrolling';
export const SCROLL_LOCKING_WRAPPER_ATTRIBUTE = 'data-lock-scrolling-wrapper';
export const SCROLL_LOCKING_CUSTOM_PROPERTY = '--scroll-lock-body-padding';

let scrollPosition: number = 0;

export default class ScrollLockManager {
  private scrollLocks: number = 0;
  private locked: boolean = false;

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
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, '');

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
