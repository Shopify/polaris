import {preventOrphans} from '../string';

describe('string', () => {
  describe('preventOrphans', () => {
    it('adds a &nbsp; between last two words', () => {
      const result = preventOrphans(
        'The quick brown fox jumped over the lazy dog',
      );

      const expected = [
        'The quick brown fox jumped over the lazy',
        String.fromCharCode(160),
        'dog',
      ].join('');

      expect(result).toBe(expected);
    });

    it('does not add a &nbsp; if string is only one word', () => {
      const result = preventOrphans('Word');

      expect(result).toBe('Word');
    });
  });
});
