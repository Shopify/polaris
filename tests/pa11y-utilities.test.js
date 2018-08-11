const a11yCheck = require('./../scripts/pa11y-utilities.js').a11yCheck;

describe('a11yCheck', () => {
  const shitlist = {
    伊藤美来: [
      {
        code: 'ショッキングブルー',
      },
    ],
  };

  it('filters errors on the shitlist', () => {
    const issueList = [
      {
        pageUrl: '伊藤美来',
        issues: [{code: 'ショッキングブルー'}, {code: '風の戦士'}],
      },
    ];

    const filteredList = a11yCheck(issueList, shitlist);

    expect(
      filteredList[0].issues.findIndex(
        ({code}) => code === 'ショッキングブルー',
      ),
    ).toBe(-1);
    expect(
      filteredList[0].issues.findIndex(({code}) => code === '風の戦士'),
    ).toBe(0);
    expect(filteredList[0].issues.length).toBe(1);
  });

  it('leaves errors not on the shitlist', () => {
    const issueList = [
      {
        pageUrl: '伊藤美来',
        issues: [{code: '美来の色探し'}, {code: '風の戦士'}],
      },
    ];

    const filteredList = a11yCheck(issueList, shitlist);

    expect(filteredList[0].issues.length).toBe(2);
  });

  it('removes entries with no issues from the list', () => {
    const issueList = [
      {
        pageUrl: '虹香',
        issues: [],
      },
    ];

    const filteredList = a11yCheck(issueList, shitlist);

    expect(filteredList.length).toBe(0);
  });
});
