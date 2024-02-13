interface RectConfig {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
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
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;

  constructor({
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    width = 0,
    height = 0,
  }: RectConfig = {}) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
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
  if (!(node instanceof Element)) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  const rect = node.getBoundingClientRect();

  return new Rect({
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
  });
}
