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
    const i18n = new I18n([
      {one: 'one', two: 'two', three: 'three', fallback: 'fallback'},
      {one: 'uno', two: 'deux', three: 'trois'},
    ]);
    expect(i18n.translate('one')).toBe('uno');
    expect(i18n.translate('fallback')).toBe('fallback');
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
      `No replacement found for key 'string'. The following replacements were passed: 'notString'`,
    );
  });
});
