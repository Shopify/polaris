import {translate} from '../utils';
import {PrimitiveReplacementDictionary, ComplexReplacementDictionary} from '../types';

describe('translate()', () => {
  it('returns a simple string value in the translation dictionary', () => {
    expect(translate('foo', {foo: 'bar'})).toBe('bar');
  });

  it('returns a nested string value in the translation dictionary', () => {
    expect(translate('foo.bar.baz', {foo: {bar: {baz: 'qux'}}})).toBe('qux');
  });

  it('returns an empty string when no match is found', () => {
    expect(translate('foo.bar.baz', {foo: {bar: 'baz'}})).toBe('');
  });

  describe('replacements', () => {
    function translateWithReplacements(
      id: string,
      replacements: PrimitiveReplacementDictionary | ComplexReplacementDictionary,
    ) {
      return translate('value', {value: id}, replacements);
    }

    it('uses replacements', () => {
      expect(translateWithReplacements('foo {next}', {next: 'bar'})).toBe(
        'foo bar',
      );
    });

    it('throws an error for a missing replacement', () => {
      expect(() =>
        translateWithReplacements('foo {next}', {notNext: 'bar'}),
      ).toThrow();
    });
  });
});
