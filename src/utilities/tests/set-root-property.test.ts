import {documentHasStyle} from 'test-utilities';
import {setRootProperty} from '../set-root-property';

describe('setRootProperty', () => {
  it('sets styles on the document element', () => {
    setRootProperty('color', 'red', null);
    expect(documentHasStyle('color', 'red')).toBe(true);
  });
  // JSDOM 11.12.0 does not support setting/reading custom properties so we are
  // unable to assert that we set a custom property
  // See https://github.com/jsdom/jsdom/issues/1895
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('sets custom styles on the document element', () => {
    setRootProperty('topBar', '#eee', null);
    expect(documentHasStyle('topBar', '#eee')).toBe(true);
  });
});
