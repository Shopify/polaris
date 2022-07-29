import {setRootProperty} from '../set-root-property';

describe('setRootProperty', () => {
  it('sets styles on the document element', () => {
    setRootProperty('--topBar', '#eee');

    expect(document.documentElement.style.getPropertyValue('--topBar')).toBe(
      '#eee',
    );
  });
});
