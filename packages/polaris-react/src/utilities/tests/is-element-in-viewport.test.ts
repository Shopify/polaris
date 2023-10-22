import {isElementInViewport} from '../is-element-in-viewport';

describe('isElementInViewport', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('returns true when in viewport', () => {
    mockGetBoundingClientRect({
      top: 200,
      right: window.innerWidth - 200,
      bottom: window.innerHeight - 200,
      left: 200,
    });
    expect(isElementInViewport(createDiv())).toBe(true);
  });

  it('returns true when on the viewport edges', () => {
    mockGetBoundingClientRect({
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    });
    expect(isElementInViewport(createDiv())).toBe(true);
  });

  describe('not in viewport', () => {
    it('returns false when top is not in viewport', () => {
      mockGetBoundingClientRect({top: -1});
      expect(isElementInViewport(createDiv())).toBe(false);
    });

    it('returns false when right is not in viewport', () => {
      mockGetBoundingClientRect({right: window.innerWidth + 1});
      expect(isElementInViewport(createDiv())).toBe(false);
    });

    it('returns false when bottom is not in viewport', () => {
      mockGetBoundingClientRect({bottom: window.innerHeight + 1});
      expect(isElementInViewport(createDiv())).toBe(false);
    });

    it('returns false when left is not in viewport', () => {
      mockGetBoundingClientRect({left: -1});
      expect(isElementInViewport(createDiv())).toBe(false);
    });
  });
});

function createDiv() {
  return document.createElement('div');
}

function mockGetBoundingClientRect({
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
  height = 0,
  width = 0,
}: Partial<DOMRect | ClientRect>) {
  Element.prototype.getBoundingClientRect = () => ({
    top,
    left,
    bottom,
    right,
    height,
    width,
    x: 0,
    y: 0,
    toJSON() {},
  });
}
