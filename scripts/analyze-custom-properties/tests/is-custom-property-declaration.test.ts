import {isCustomPropertyDeclaration} from '../analyze-custom-properties';

import {
  mockVarNode,
  mockPunctuation,
  mockCustomPropertyDeclaration,
  mockPropertyDeclaration,
} from './fixtures';

describe('isCustomPropertyDeclaration', () => {
  it('returns true when the node is a declaration', () => {
    expect(isCustomPropertyDeclaration(mockCustomPropertyDeclaration)).toBe(
      true,
    );
  });

  it(`returns false when the node's value is not an array`, () => {
    expect(isCustomPropertyDeclaration(mockPunctuation)).toBe(false);
  });

  it(`returns false when the node's value is an array but the first values type is not a property`, () => {
    expect(isCustomPropertyDeclaration(mockVarNode)).toBe(false);
  });

  it(`returns false when the node's value is an array but the first values first values type is not an operator`, () => {
    expect(isCustomPropertyDeclaration(mockPropertyDeclaration)).toBe(false);
  });
});
