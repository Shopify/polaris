import {autobind} from '@shopify/javascript-utilities/decorators';

interface FrameCallback {
  (time: number): any,
}

export default class AnimationFrame {
  isUsingFakeAnimationFrame = false;

  private queued: {[key: number]: FrameCallback} = {};
  private originalRequestAnimationFrame: any;
  private originalCancelAnimationFrame: any;
  private currentAnimationFrame = 0;

  fake() {
    if (this.isUsingFakeAnimationFrame) {
      throw new Error(
        'The animation frame is already faked, but you tried to fake it again.',
      );
    }

    this.isUsingFakeAnimationFrame = true;

    this.originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = this.requestAnimationFrame;

    this.originalCancelAnimationFrame = window.cancelAnimationFrame;
    window.cancelAnimationFrame = this.cancelAnimationFrame;
  }

  restore() {
    if (!this.isUsingFakeAnimationFrame) {
      throw new Error(
        'The animation frame is already real, but you tried to restore it again.',
      );
    }

    this.isUsingFakeAnimationFrame = false;

    window.requestAnimationFrame = this.originalRequestAnimationFrame;
    window.cancelAnimationFrame = this.originalCancelAnimationFrame;
  }

  runFrame() {
    this.ensureAnimationFrameIsFake();
    // We need to do it this way so that frames that queue other frames
    // don't get removed
    Object.keys(this.queued).forEach((frame: any) => {
      const callback = this.queued[frame];
      delete this.queued[frame];
      callback(Date.now());
    });
  }

  @autobind
  private requestAnimationFrame(callback: FrameCallback): number {
    this.currentAnimationFrame += 1;
    this.queued[this.currentAnimationFrame] = callback;
    return this.currentAnimationFrame;
  }

  @autobind
  private cancelAnimationFrame(frame: number) {
    delete this.queued[frame];
  }

  private ensureAnimationFrameIsFake() {
    if (!this.isUsingFakeAnimationFrame) {
      throw new Error(
        'You must call animationFrame.fake() before interacting with the fake request-/ cancelAnimationFrame.',
      );
    }
  }
}
