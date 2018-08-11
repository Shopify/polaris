const hash = require('object-hash');

function a11yCheck(results, filterList) {
  const filteredResults = results.map((result) => {
    if (filterList[result.pageUrl]) {
      result.issues = result.issues.filter((issue) => {
        const issueHash = hash(issue);
        return !filterList[result.pageUrl].find((shitlistedResult) => {
          return hash(shitlistedResult) === issueHash;
        });
      });
    }
    return result;
  });
  return filteredResults.filter((result) => result.issues.length);
}

module.exports.a11yCheck = a11yCheck;
