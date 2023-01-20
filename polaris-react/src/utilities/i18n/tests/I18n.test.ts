import {I18n} from '../I18n';

describe('I18n.translate', () => {
  it('returns a simple string value in the translation dictionary', () => {
    const i18n = new I18n({foo: 'bar'});
    expect(i18n.translate('foo')).toBe('bar');
  });

  it('returns a nested string value in the translation dictionary', () => {
    const i18n = new I18n({foo: {bar: {baz: 'qux'}}});
    expect(i18n.translate('foo.bar.baz')).toBe('qux');
  });

  it('returns an empty string when no match is found', () => {
    const i18n = new I18n({foo: {bar: 'baz'}});
    expect(i18n.translate('foo.bar.baz')).toBe('');
  });

  it('merges multiple dictionaries', () => {
    const translations: {[key: string]: string}[] = [
      {one: 'un', two: 'deux', three: 'trois'},
      {one: 'one', two: 'two', three: 'three', fallback: 'fallback'},
    ];

    const i18n = new I18n(translations);
    expect(i18n.translate('one')).toBe('un');
    expect(i18n.translate('fallback')).toBe('fallback');

    // Assert the original translations array is not mutated
    expect(translations[0].two).toBe('deux');
  });

  it('defaults to using English pluralization rules (for backwards compatibility)', () => {
    const i18n = new I18n({
      plurals: {one: '{count} (one)', other: '{count} (other)'},
    });
    expect(i18n.translate('plurals', {count: 0})).toBe('0 (other)');
    expect(i18n.translate('plurals', {count: 1})).toBe('1 (one)');
    expect(i18n.translate('plurals', {count: 2})).toBe('2 (other)');
  });

  it('falls back to using `other` plural key if the proper one is missing', () => {
    const i18n = new I18n({plurals: {other: '{count} (other)'}}, 'en');
    expect(i18n.translate('plurals', {count: 0})).toBe('0 (other)');
    expect(i18n.translate('plurals', {count: 1})).toBe('1 (other)');
    expect(i18n.translate('plurals', {count: 2})).toBe('2 (other)');
  });

  it('works when count is used but it is not a pluralization context', () => {
    const i18n = new I18n({foo: 'bar {count}'}, 'en');
    expect(i18n.translate('foo', {count: 0})).toBe('bar 0');
  });

  it('uses the pluralization rules for zh-Hant-TW locale', () => {
    const i18n = new I18n({plurals: {other: '{count} (other)'}}, 'zh-Hant-TW');
    expect(i18n.translate('plurals', {count: 0})).toBe('0 (other)');
    expect(i18n.translate('plurals', {count: 1})).toBe('1 (other)');
    expect(i18n.translate('plurals', {count: 2})).toBe('2 (other)');
  });

  it('uses the pluralization rules for fr locale', () => {
    const i18n = new I18n(
      {
        plurals: {
          many: '{count} (many)',
          one: '{count} (one)',
          other: '{count} (other)',
        },
      },
      'fr',
    );
    expect(i18n.translate('plurals', {count: 0})).toBe('0 (one)');
    expect(i18n.translate('plurals', {count: 1})).toBe('1 (one)');
    expect(i18n.translate('plurals', {count: 2})).toBe('2 (other)');
    expect(i18n.translate('plurals', {count: 1000000})).toBe('1000000 (many)');
  });

  it('uses replacements', () => {
    const i18n = new I18n({key: 'foo {string} {number}'});
    expect(i18n.translate('key', {string: 'bar', number: 3})).toBe('foo bar 3');
  });

  it('throws an error for a missing replacement', () => {
    const i18n = new I18n({key: 'foo {string}'});
    expect(() => {
      i18n.translate('key', {notString: 'bar'});
    }).toThrow(
      `Error in translation for key 'key'. No replacement found for key 'string'. The following replacements were passed: '{"notString":"bar"}'`,
    );

    expect(() => {
      // Cast because while typescript should guard against this, people have
      // been known to misuse `any` and undefined can get passed into the
      //  replacements
      i18n.translate('key', {string: undefined as any});
    }).toThrow(
      `Error in translation for key 'key'. No replacement found for key 'string'. The following replacements were passed: '{}'`,
    );
  });
});
