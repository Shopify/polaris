import {documentHasStyle} from 'test-utilities';

import {setRootProperty} from '../set-root-property';

describe('setRootProperty', () => {
  // JSDOM 11.12.0 does not support setting/reading custom properties so we are
  // unable to assert that we set a custom property
  // See https://github.com/jsdom/jsdom/issues/1895
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('sets styles on the document element', () => {
    setRootProperty('topBar', '#eee', null);
    expect(documentHasStyle('topBar', '#eee')).toBe(true);
  });
});
