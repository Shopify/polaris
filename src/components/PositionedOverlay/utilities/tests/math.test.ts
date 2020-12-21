import {Rect} from '../../../../utilities/geometry';
import {intersectionWithViewport} from '../math';

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
        left: 0,
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
