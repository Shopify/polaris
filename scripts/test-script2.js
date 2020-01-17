const fs = require('fs');

const rawData = fs.readFileSync('./bigJSON.json');
const data = JSON.parse(rawData);

const hey = data
  .map((datum) => {
    return datum.data.find((comment) => {
      return comment.body.startsWith('<!-- discoverability-action -->');
    });
  })
  .filter((comment) => comment)
  .map((comment) => comment.body)
  .filter(
    (comment) =>
      !comment.includes(
        'No significant changes to `src/**/*.tsx` were detected.',
      ),
  )
  .filter(
    (comment) => !comment.includes('Something fishy happened. We’re on it!'),
  )
  .map((comment) => {
    const modifiedRegex = /Files modified<\/th><td>(\d+).*/.exec(comment);
    const affectedRegex = /Files potentially affected<\/th><td>(\d+)/.exec(
      comment,
    );
    if (!modifiedRegex || !affectedRegex) {
      console.log('BROKEN COMMENT');
      console.log('BROKEN COMMENT');
      console.log(comment);
      console.log('BROKEN COMMENT');
      console.log('BROKEN COMMENT');
      return {};
    }
    return {modified: modifiedRegex[1], affected: affectedRegex[1]};
  });

console.log(hey);

fs.writeFileSync('prImpactData.json', JSON.stringify(hey, undefined, 2));
