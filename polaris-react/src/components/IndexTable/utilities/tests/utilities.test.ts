import {getTableHeadingsBySelector} from '../utilities';

describe('#getTableHeadingsBySelector', function () {
  it('returns empty array when no wrapper is passed', () => {
    expect(getTableHeadingsBySelector(null, '')).toStrictEqual([]);
  });

  it('returns array when wrapper is passed', () => {
    const response = [{id: 'test'}];
    const fakeElement = {
      querySelectorAll: () => response,
    } as unknown as HTMLElement;

    expect(getTableHeadingsBySelector(fakeElement, '')).toStrictEqual(response);
  });
});
