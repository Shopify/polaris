import {getWidth} from '../get-width';

describe('getWidth', () => {
  it('will return a pixel value', () => {
    const width = getWidth({width: 200}, null, 'width');
    expect(width).toBe(`200px`);
  });

  describe('value argument', () => {
    it('will return a pixel value from a nested object', () => {
      const width = getWidth(
        {
          aa: {
            bb: {
              cc: {ee: null},
            },
            ff: {
              width: 200,
            },
          },
        },
        null,
        'width',
      );
      expect(width).toBe(`200px`);
    });

    it('will return a pixel value from a number', () => {
      const width = getWidth(200);
      expect(width).toBe(`200px`);
    });
  });

  describe('key argument', () => {
    it('will look for keys other than width', () => {
      const width = getWidth({formWidth: 250}, null, 'formWidth');
      expect(width).toBe(`250px`);
    });
  });

  describe('defaultWidth argument', () => {
    it('will have a default width automatically set to 0', () => {
      const width = getWidth({});
      expect(width).toBe(`0px`);
    });

    it('will have a default width of 200', () => {
      const width = getWidth({}, 200);
      expect(width).toBe(`200px`);
    });
  });
});
