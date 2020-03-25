import {isVarFunction} from '../analyze-custom-properties';

import {mockVarNode, mockPunctuation, mockArguments} from './fixtures';

describe('isVarFunction', () => {
  it('returns true when the node is a var function', () => {
    expect(isVarFunction(mockVarNode)).toBe(true);
  });

  it(`returns false when the node's value is not an array`, () => {
    expect(isVarFunction(mockPunctuation)).toBe(false);
  });

  it(`returns false when the node's value is an array but the values value is not var`, () => {
    expect(isVarFunction(mockArguments)).toBe(false);
  });
});
