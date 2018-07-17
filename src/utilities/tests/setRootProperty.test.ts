import {setRootProperty} from '../setRootProperty';

describe('setRootProperty', () => {
  it('will set styles on the document element', () => {
    setRootProperty('topBar', '#eee');
    expect(documentHasStyle('topBar', '#eee')).toBe(true);
  });
});

function documentHasStyle(key: string, value: string) {
  if (!document) {
    return;
  }

  const documentElement = document.querySelector('html');
  return documentElement && documentElement.style[key as any] === value;
}
