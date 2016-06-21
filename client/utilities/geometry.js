export class Rect {
  static get zero() {
    return new Rect();
  }

  constructor({top = 0, left = 0, width = 0, height = 0} = {}) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }

  get center() {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2,
    };
  }
}

export function getRectForNode(node) {
  if (!(node instanceof Element)) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  const rect = node.getBoundingClientRect();

  return new Rect({
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height,
  });
}
