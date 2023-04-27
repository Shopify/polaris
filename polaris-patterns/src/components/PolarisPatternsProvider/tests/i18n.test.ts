import {readFileSync, readdirSync} from 'fs';
import {resolve} from 'path';

import yaml from 'js-yaml';

import {DEFAULT_I18N_DETAILS, SUPPORTED_LOCALES} from '../constants';

describe('DEFAULT_I18N_DETAILS', () => {
  it('matches `source_language` in `translation.yml`', () => {
    const translationYmlPath = resolve(
      __dirname,
      '../../../../../translation.yml',
    );
    const sourceLanguage = (
      yaml.load(readFileSync(translationYmlPath, 'utf8')) as any
    ).source_language;

    expect(DEFAULT_I18N_DETAILS.locale).toBe(sourceLanguage);
  });
});

describe('SUPPORTED_LOCALES', () => {
  it('matches the locale files in `/locales`', () => {
    const localesPath = resolve(__dirname, '../../../../locales');
    const locales = Array.from(
      readdirSync(localesPath, {withFileTypes: true})
        .filter((dirEnt) => dirEnt.isFile() && dirEnt.name.endsWith('.json'))
        .map((dirEnt) => dirEnt.name.replace('.json', '')),
    );

    expect(SUPPORTED_LOCALES).toStrictEqual(locales);
  });
});
