const hash = require('object-hash');

function shitlistCheck(results, immutableShitlist) {
  const mutableShitlist = {};
  const remainingIssues = {};
  Object.keys(immutableShitlist).forEach((key) => {
    mutableShitlist[key] = Array.from(immutableShitlist[key]);
  });

  const filteredResults = results.map((result) => {
    if (mutableShitlist[result.pageUrl]) {
      result.issues = result.issues.filter((issue) => {
        const issueHash = hash(issue);
        const matchIndex = mutableShitlist[result.pageUrl].findIndex(
          (shitlistedResult) => {
            return hash(shitlistedResult) === issueHash;
          },
        );
        if (matchIndex >= 0) {
          mutableShitlist[result.pageUrl].splice(matchIndex, 1);
        }
        return matchIndex === -1;
      });
    }
    return result;
  });

  Object.keys(mutableShitlist).forEach((key) => {
    mutableShitlist[key].length
      ? (remainingIssues[key] = mutableShitlist[key])
      : undefined;
  });

  return {
    results: filteredResults.filter((result) => result.issues.length),
    remainingIssues: Object.keys(remainingIssues).length
      ? remainingIssues
      : null,
  };
}

module.exports.shitlistCheck = shitlistCheck;
