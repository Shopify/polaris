const fs = require('fs-extra');
const {semverRegExp, readmes} = require('../scripts/utilities');

describe('readme-update-version', () => {
  it('matches 5 semver numbers in READMEs', () => {
    let occurances = 0;
    readmes.forEach((readmePath) => {
      const readme = fs.readFileSync(readmePath, 'utf8');
      occurances += (readme.match(semverRegExp) || []).length;
    });

    expect(occurances).toBe(5);
  });

  it('semverRegExp matches a variety of valid semver numbers', () => {
    const testCase =
      'Both version 2.5.0 and 99.99.99-beta.1 are valid, foo.bar.qux is not';
    const occurances = (testCase.match(semverRegExp) || []).length;

    expect(occurances).toBe(2);
  });
});
