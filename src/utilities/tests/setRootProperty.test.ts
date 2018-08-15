import {setRootProperty} from '../setRootProperty';
import {documentHasStyle} from '../../../tests/utilities';

describe('setRootProperty', () => {
  it('sets styles on the document element', () => {
    setRootProperty('topBar', '#eee', null);
    expect(documentHasStyle('topBar', '#eee')).toBe(true);
  });
});
