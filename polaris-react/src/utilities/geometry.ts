interface RectConfig {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

interface Point {
  x: number;
  y: number;
}

export class Rect {
  static get zero(): Rect {
    return new Rect();
  }

  top: number;
  left: number;
  width: number;
  height: number;

  constructor({top = 0, left = 0, width = 0, height = 0}: RectConfig = {}) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  get center(): Point {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2,
    };
  }
}

export function getRectForNode(
  node: Element | React.ReactNode | Window | Document,
): Rect {
  /**
   * NOTE: We cannot do node instanceof Element because it will fail when inside of an iframe.
   * Technically we can do `node instanceof node.ownerDocument.defaultView.Element`but this will
   * fail when node isn't an Element. We might as well try to run `getBoundingClientRect` and then
   * have a fallback for when that breaks.
   */
  try {
    const rect = (node as Element).getBoundingClientRect();

    return new Rect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  } catch (_) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
}
