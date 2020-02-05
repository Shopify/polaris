/* eslint-disable no-console, babel/camelcase */
const fs = require('fs');
const Octokit = require('@octokit/rest');

const LATEST_PR = new Date('2020-01-17T16:30:44Z');

const octokit = new Octokit({
  auth: 'INSERT PERSONAL GITHUB TOKEN HERE',
});

const rawImpactData = fs.readFileSync('./prImpactData.json');
const prevImpactData = JSON.parse(rawImpactData);

async function main() {
  console.log('Fetching new PRs');
  const rawPullList = await getPullList(0);
  const pullList = rawPullList.filter((number) => !prevImpactData[number]);

  console.log('Fetching comments in new PRs');
  const commentResponses = await getPullComments(pullList);

  console.log('Processing and writing data to prImpactData.json');
  const newImpactData = processCommentResponses(commentResponses);

  const totalImpactData = Object.assign(prevImpactData, newImpactData);

  fs.writeFileSync(
    'prImpactData.json',
    `${JSON.stringify(totalImpactData, undefined, 2)}
`,
  );

  const quartiles = calculateQuartiles(totalImpactData);
  console.log('The 1st Quartile is: ', quartiles[0]);
  console.log('The 3rd Quartile is: ', quartiles[1]);
}

async function getPullList(page) {
  console.log(`Fetching page ${page} of PRs`);
  let end = false;
  const prPage = await octokit.pulls.list({
    owner: 'Shopify',
    repo: 'polaris-react',
    state: 'all',
    page,
  });

  const numbers = prPage.data.map((pr) => {
    if (new Date(pr.updated_at) <= LATEST_PR) {
      end = true;
    }
    return pr.number;
  });

  return end ? numbers : [...numbers, ...(await getPullList(page + 1))];
}

async function getPullComments(prList) {
  const data = [];
  for (const number of prList) {
    await sleep(1000);
    const response = await octokit.issues.listComments({
      owner: 'Shopify',
      repo: 'polaris-react',
      issue_number: number,
    });

    console.log('New PR', number);
    data.push(response);
  }

  return data;
}

function processCommentResponses(commentResponses) {
  const newImpactData = commentResponses
    .map((response) => {
      return response.data.find((comment) => {
        return comment.body.startsWith('<!-- discoverability-action -->');
      });
    })
    .filter((comment) => comment)
    .filter(
      (comment) =>
        !comment.body.includes('Something fishy happened. We’re on it!'),
    )
    .reduce((acc, {body, issue_url}) => {
      const modifiedRegex = /Files modified<\/th><td>(\d+).*/.exec(body);
      const affectedRegex = /Files potentially affected<\/th><td>(\d+)/.exec(
        body,
      );
      const prNumberRegex = /.*\/(\d+)/.exec(issue_url);

      if (
        body.includes('No significant changes to `src/**/*.tsx` were detected.')
      ) {
        acc[prNumberRegex[1]] = {};
        return acc;
      }

      if (!modifiedRegex || !affectedRegex || !prNumberRegex) {
        console.log('BROKEN COMMENT');
        console.log(issue_url);
        console.log(body);
        console.log();
        return {};
      }

      acc[prNumberRegex[1]] = {
        modified: modifiedRegex[1],
        affected: affectedRegex[1],
      };
      return acc;
    }, {});

  return newImpactData;
}

function calculateQuartiles(data) {
  const affectedData = Object.values(data)
    .filter(({affected}) => affected)
    .map(({affected}) => parseInt(affected, 10));

  affectedData.sort((num1, num2) => num1 - num2);

  const firstQuartile = affectedData[Math.floor(affectedData.length / 4)];
  const thirdQuartile = affectedData[Math.floor((affectedData.length / 4) * 3)];
  return [firstQuartile, thirdQuartile];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
