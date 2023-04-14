import {clock} from '@shopify/jest-dom-mocks';
import {I18n} from '@shopify/react-i18n';

import englishTranslations from 'locales/en.json';
import frenchTranslations from 'locales/fr.json';

import {humanizedDateRange} from '../humanized-date-range';

describe('humanizedDateRange', () => {
  const mockI18n = new I18n([englishTranslations], {
    locale: 'en',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
  });

  beforeEach(() => {
    clock.mock(new Date('2017-07-27T00:00:00-08:00'));
  });

  afterEach(() => {
    clock.restore();
  });

  it('excludes the second date if passed equal dates', () => {
    const actualAbsolute = humanizedDateRange(
      {since: '2017-07-01', until: '2017-07-01'},
      mockI18n,
      'America/Los_Angeles',
    );

    expect(actualAbsolute).toBe('Jul 1, 2017');
  });

  it('humanizes relative date ranges within the same year', () => {
    const actual = humanizedDateRange(
      {since: '-5d', until: '-3d'},
      mockI18n,
      'America/Los_Angeles',
    );

    expect(actual).toBe('Jul 22–Jul 24, 2017');
  });

  it('humanizes relative date ranges across years', () => {
    const actual = humanizedDateRange(
      {since: '-365d', until: 'today'},
      mockI18n,
      'America/Los_Angeles',
    );

    expect(actual).toBe('Jul 27, 2016–Jul 27, 2017');
  });

  it('humanizes absolute date ranges within the same year', () => {
    const actual = humanizedDateRange(
      {since: '2017-07-10', until: '2017-07-20'},
      mockI18n,
      'America/Los_Angeles',
    );

    expect(actual).toBe('Jul 10–Jul 20, 2017');
  });

  it('humanizes absolute date ranges across years', () => {
    const actual = humanizedDateRange(
      {since: '2016-07-10', until: '2017-07-20'},
      mockI18n,
      'America/Los_Angeles',
    );

    expect(actual).toBe('Jul 10, 2016–Jul 20, 2017');
  });

  it('localizes with a space for the french language', () => {
    const frenchMockI18n = new I18n([frenchTranslations], {
      locale: 'fr',
      currency: 'CAD',
      timezone: 'America/Quebec',
    });
    const actual = humanizedDateRange(
      {since: '2016-07-10', until: '2017-07-20'},
      frenchMockI18n,
      'America/Los_Angeles',
    );

    expect(actual).toBe('10 juil. 2016 – 20 juil. 2017');
  });
});
