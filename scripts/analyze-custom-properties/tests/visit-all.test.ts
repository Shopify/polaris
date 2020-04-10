import {visitAll} from '../analyze-custom-properties';

import {mockVarNode, mockPunctuation, mockStringSingle} from './fixtures';

describe('visitAll', () => {
  it('returns true when the node is a var function', () => {
    const spy = jest.fn();
    visitAll(mockVarNode, spy);
    expect(spy).toHaveBeenCalledTimes(mockVarNode.value.length);
  });

  it(`doesn't try to invoke the callback when the nodes value is empty`, () => {
    const spy = jest.fn();
    visitAll(mockStringSingle, spy);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it(`doesn't try to invoke the callback when the nodes value is not an array`, () => {
    const spy = jest.fn();
    visitAll(mockPunctuation, spy);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
