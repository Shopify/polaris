import path from 'path';
import fs from 'fs';

import {semverRegExp} from '../scripts/utilities';
import readmes from '../scripts/readme-update-version';

describe('readme-update-version', () => {
  it('matches 2 semver numbers in READMEs', () => {
    const occurrences = readmes.reduce((accumulator, readmePath) => {
      const readme = fs.readFileSync(
        path.join(__dirname, '..', readmePath),
        'utf8',
      );
      return accumulator + (readme.match(semverRegExp) || []).length;
    }, 0);

    expect(occurrences).toBe(2);
  });

  it('semverRegExp matches a variety of valid semver numbers', () => {
    const testCase =
      'Version 2.5.0 (or v2.5.0) and 99.99.99-beta.1 are valid, so is version v100.200.300. But, foo.bar.qux is not';
    const occurrences = (testCase.match(semverRegExp) || []).length;

    expect(occurrences).toBe(4);
  });
});
