const fs = require('fs-extra');

describe('CHANGELOG deduplication', () => {
  it('the latest release in CHANGELOG.md does not contain any entries currently in UNRELEASED.md', () => {
    const changelogEntries = parseEntries(
      fs.readFileSync('CHANGELOG.md', 'utf8').split('\n## ')[1],
    );
    const unreleasedEntries = parseEntries(
      fs.readFileSync('UNRELEASED.md', 'utf8'),
    );

    unreleasedEntries.forEach((unreleasedEntry) => {
      expect(changelogEntries).not.toContain(unreleasedEntry);
    });
  });
});

function parseEntries(log) {
  return log.split('\n').filter((line) => line.match(/^[-|*] /));
}
