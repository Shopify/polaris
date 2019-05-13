const shitlistCheck = require('./../scripts/pa11y-utilities.js').shitlistCheck;

describe('shitlistCheck', () => {
  const shitlist = {
    伊藤美来: [
      {
        code: 'ショッキングブルー',
      },
    ],
    豊田萌絵: [
      {
        code: 'Pyxis',
      },
    ],
  };

  it('filters errors on the shitlist', () => {
    const issueList = [
      {
        exampleID: '伊藤美来',
        issues: [{code: 'ショッキングブルー'}, {code: '風の戦士'}],
      },
    ];

    const {results} = shitlistCheck(issueList, shitlist);

    expect(
      results[0].issues.findIndex(({code}) => code === 'ショッキングブルー'),
    ).toBe(-1);
    expect(results[0].issues.findIndex(({code}) => code === '風の戦士')).toBe(
      0,
    );
    expect(results[0].issues).toHaveLength(1);
  });

  it('leaves errors not on the shitlist', () => {
    const issueList = [
      {
        exampleID: '伊藤美来',
        issues: [{code: '美来の色探し'}, {code: '風の戦士'}],
      },
    ];

    const {results} = shitlistCheck(issueList, shitlist);

    expect(results[0].issues).toHaveLength(2);
  });

  it('removes entries with no issues from the list', () => {
    const issueList = [
      {
        exampleID: '虹香',
        issues: [],
      },
    ];

    const {results} = shitlistCheck(issueList, shitlist);

    expect(results).toHaveLength(0);
  });

  it('returns a list with errors that werent found', () => {
    const issueList = [
      {
        exampleID: '伊藤美来',
        issues: [{code: 'ショッキングブルー'}],
      },
    ];

    const {remainingIssues} = shitlistCheck(issueList, shitlist);

    expect(remainingIssues).toHaveLength(1);
    expect(remainingIssues[0].issues).toHaveLength(1);
    expect(remainingIssues[0].issues[0].code).toBe('Pyxis');
  });
});
