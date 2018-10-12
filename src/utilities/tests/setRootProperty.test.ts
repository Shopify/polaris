import {documentHasStyle} from 'tests/utilities';
import {setRootProperty} from '../setRootProperty';

describe('setRootProperty', () => {
  it('sets styles on the document element', () => {
    setRootProperty('topBar', '#eee', null);
    expect(documentHasStyle('topBar', '#eee')).toBe(true);
  });
});
