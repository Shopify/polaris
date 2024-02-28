import {Rect} from '../../../../utilities/geometry';
import type {PreferredAlignment, PreferredPosition} from '../math';
import {
  intersectionWithViewport,
  calculateHorizontalPosition,
  calculateVerticalPosition,
} from '../math';

describe('intersectionWithViewport', () => {
  const viewport = new Rect({
    top: 0,
    left: 0,
    width: 1000,
    height: 1000,
  });

  it('clips the given rect to stay within the viewport (top-left clip)', () => {
    const intersection = intersectionWithViewport(
      new Rect({
        top: -500,
        left: -500,
        width: 1000,
        height: 1000,
      }),
      viewport,
    );

    expect(intersection).toStrictEqual(
      new Rect({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 500,
        height: 500,
      }),
    );
  });

  it('clips the given rect to stay within the viewport (bottom-right clip)', () => {
    const intersection = intersectionWithViewport(
      new Rect({
        top: 500,
        left: 500,
        width: 1000,
        height: 1000,
      }),
      viewport,
    );

    expect(intersection).toStrictEqual(
      new Rect({
        top: 500,
        left: 500,
        width: 500,
        height: 500,
      }),
    );
  });

  it('does not clip the given rect when it is fully within the viewport', () => {
    const intersection = intersectionWithViewport(
      new Rect({
        top: 250,
        left: 250,
        width: 500,
        height: 500,
      }),
      viewport,
    );

    expect(intersection).toStrictEqual(
      new Rect({
        top: 250,
        left: 250,
        width: 500,
        height: 500,
      }),
    );
  });

  it('returns a 0-size rect when the given rect is completely outside the viewport', () => {
    const intersection = intersectionWithViewport(
      new Rect({
        top: 1000,
        left: 1000,
        width: 500,
        height: 500,
      }),
      viewport,
    );

    expect(intersection).toStrictEqual(
      new Rect({
        top: 1000,
        left: 1000,
        width: 0,
        height: 0,
      }),
    );
  });
});

describe('calculateVerticalPosition', () => {
  it('returns position when preferredPosition is "above"', () => {
    const result = getVerticalPosition('above', 0);

    expect(result).toStrictEqual({
      height: 300,
      top: 200,
      positioning: 'above',
    });
  });

  it('returns offset position when preferredPosition is "above"', () => {
    const result = getVerticalPosition('above', 200);

    expect(result).toStrictEqual({
      height: 300,
      top: 530,
      positioning: 'below',
    });
  });

  it('returns position when preferredPosition is "below"', () => {
    const result = getVerticalPosition('below', 0);

    expect(result).toStrictEqual({
      height: 300,
      top: 200,
      positioning: 'above',
    });
  });

  it('returns offset position when preferredPosition is "below"', () => {
    const result = getVerticalPosition('below', 200);

    expect(result).toStrictEqual({
      height: 300,
      top: 530,
      positioning: 'below',
    });
  });

  describe('when preferredPosition is horizontal', () => {
    it('returns position when preferredPosition is "left"', () => {
      const result = getVerticalPosition('left', 0);

      expect(result).toStrictEqual({
        height: 300,
        bottom: 270,
        positioning: 'above',
      });
    });

    it('returns offset position when preferredPosition is "left"', () => {
      const result = getVerticalPosition('left', 200);

      expect(result).toStrictEqual({
        height: 300,
        top: 500,
        positioning: 'below',
      });
    });

    it('returns position when preferredPosition is "right"', () => {
      const result = getVerticalPosition('right', 0);

      expect(result).toStrictEqual({
        height: 300,
        bottom: 270,
        positioning: 'above',
      });
    });

    it('returns offset position when preferredPosition is "right"', () => {
      const result = getVerticalPosition('right', 200);

      expect(result).toStrictEqual({
        height: 300,
        top: 500,
        positioning: 'below',
      });
    });
  });
});

describe('calculateHorizontalPosition', () => {
  describe('when preferredPosition is vertical', () => {
    it('returns position when preferredAlignment is "left"', () => {
      const result = getHorizontalPosition(0);

      expect(result).toStrictEqual({left: 500, width: null});
    });

    it('returns offset position when preferredAlignment is "left"', () => {
      const result = getHorizontalPosition(200);

      expect(result).toStrictEqual({left: 500, width: null});
    });

    it('returns position when preferredAlignment is "right"', () => {
      const result = getHorizontalPosition(0);

      expect(result).toStrictEqual({left: 500, width: null});
    });

    it('returns offset position when preferredAlignment is "right"', () => {
      const result = getHorizontalPosition(200);

      expect(result).toStrictEqual({left: 500, width: null});
    });

    it('returns position when preferredAlignment is "center"', () => {
      const result = getHorizontalPosition(0, 'center');

      expect(result).toStrictEqual({left: 500, width: null});
    });

    it('returns offset position when preferredAlignment is "center"', () => {
      const result = getHorizontalPosition(200, 'center');

      expect(result).toStrictEqual({left: 500, width: null});
    });
  });

  describe('when preferredPosition is horizontal', () => {
    it('returns position when preferredPosition is "left"', () => {
      const result = getHorizontalPosition(0, 'left', 'left');

      expect(result).toStrictEqual({right: 350, width: null});
    });

    it('returns offset position when preferredPosition is "left"', () => {
      const result = getHorizontalPosition(200, 'left', 'left');

      expect(result).toStrictEqual({left: 350, width: null});
    });

    it('returns position when preferredPosition is "right"', () => {
      const result = getHorizontalPosition(0, 'left', 'right');

      expect(result).toStrictEqual({right: 350, width: null});
    });

    it('returns offset position when preferredPosition is "right"', () => {
      const result = getHorizontalPosition(200, 'left', 'right');

      expect(result).toStrictEqual({left: 350, width: null});
    });
  });
});

function getVerticalPosition(
  preferredPosition: PreferredPosition,
  scrollOffset: number,
  fixed?: boolean,
) {
  const activatorRect = {
    width: 50,
    height: 30,
    top: 500,
    bottom: 530,
    left: 500,
    right: 550,
    center: {x: 725, y: 515},
  };

  const overlayRect = {
    width: 350,
    height: 300,
    top: 300,
    bottom: 800,
    left: 350,
    right: 700,
    center: {x: 475, y: 450},
  };

  const containerRect = {
    width: 850,
    height: 800,
    top: 0,
    bottom: 800,
    left: 0,
    right: 850,
    center: {x: 425, y: 400},
  };
  const overlayMargins = {horizontal: 0, activator: 0, container: 0};

  const scrollableContainerRect = {
    width: 850,
    height: 900,
    top: 0,
    bottom: 800,
    left: 0,
    right: 850,
    center: {x: 425, y: 450},
  };

  if (scrollOffset) {
    activatorRect.top -= scrollOffset;
    activatorRect.bottom -= scrollOffset;
    overlayRect.top -= scrollOffset;
    overlayRect.bottom -= scrollOffset;
    scrollableContainerRect.top -= scrollOffset;
    scrollableContainerRect.bottom -= scrollOffset;
    containerRect.top += scrollOffset;
    containerRect.bottom += scrollOffset;
  }

  return calculateVerticalPosition(
    activatorRect,
    overlayRect,
    overlayMargins,
    scrollableContainerRect,
    containerRect,
    preferredPosition,
    fixed,
    0,
  );
}

function getHorizontalPosition(
  scrollOffset: number,
  preferredAlignment?: PreferredAlignment,
  preferredPosition?: 'left' | 'right',
) {
  const activatorRect = {
    width: 50,
    height: 30,
    top: 500,
    bottom: 530,
    left: 500,
    right: 550,
    center: {x: 700, y: 500},
  };

  const overlayRect = {
    width: 350,
    height: 300,
    top: 300,
    bottom: 800,
    left: 350,
    right: 700,
    center: {x: 500, y: 400},
  };

  const containerRect = {
    width: 850,
    height: 800,
    top: 0,
    bottom: 800,
    left: 0,
    right: 850,
    center: {x: 400, y: 400},
  };
  const overlayMargins = {horizontal: 0, activator: 0, container: 0};

  const scrollableContainerRect = {
    width: 850,
    height: 900,
    top: 0,
    bottom: 800,
    left: 0,
    right: 850,
    center: {x: 400, y: 400},
  };

  const overlayMinWidth = 300;

  if (scrollOffset) {
    activatorRect.left -= scrollOffset;
    activatorRect.right -= scrollOffset;
    overlayRect.left -= scrollOffset;
    overlayRect.right -= scrollOffset;
    scrollableContainerRect.left -= scrollOffset;
    scrollableContainerRect.right -= scrollOffset;
    containerRect.left += scrollOffset;
    containerRect.right += scrollOffset;
  }

  return calculateHorizontalPosition({
    activatorRect,
    overlayRect,
    containerRect,
    overlayMargins,
    preferredAlignment: preferredAlignment ?? 'center',
    preferredHorizontalPosition: preferredPosition,
    overlayMinWidth,
  });
}
