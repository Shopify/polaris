import {isServer} from '../target';

export const SCROLL_LOCK_ATTRIBUTE = 'data-scroll-lock';

let scrollPosition = 0;

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
    const wrapper = document.body.firstElementChild;

    if (scrollLocks === 0) {
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCK_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;

      if (wrapper) {
        wrapper.setAttribute(SCROLL_LOCK_ATTRIBUTE, '');
        wrapper.scrollTop = scrollPosition;
      }
      this.locked = true;
    }
  }

  resetScrollPosition() {
    scrollPosition = 0;
  }
}
