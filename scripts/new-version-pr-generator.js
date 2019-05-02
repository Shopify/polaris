/* eslint-disable no-console */
const {execSync} = require('child_process');
const {readFileSync} = require('fs');
const path = require('path');
const {mkdir} = require('shelljs');
const yaml = require('js-yaml');
const semver = require('semver');

const {version: PACKAGE_VERSION} = require('../package.json');
const secrets = require('../secrets.json');
const retry = require('./utilities/retry');

const repositories = ['polaris-styleguide', 'web'];

const YARN_VERSION = yaml
  .safeLoad(readFileSync(path.resolve(__dirname, '..', 'dev.yml'), 'utf8'))
  .up.find((obj) => Object.keys(obj).includes('node')).node.yarn;

const root = path.resolve(__dirname, '../');
const sandbox = path.resolve(root, 'sandbox');

const releaseVersion = `v${PACKAGE_VERSION}`;

function isMajorPrerelease(version) {
  return (
    semver.prerelease(version) &&
    semver.minor(version) === 0 &&
    semver.patch(version) === 0
  );
}

const baseBranch = isMajorPrerelease(PACKAGE_VERSION)
  ? `v${semver.major(PACKAGE_VERSION)}`
  : 'master';

const polarisBotName = 'Shopify Polaris Bot';
const polarisBotEmail = 'shopify-polaris-bot@users.noreply.github.com';
const polarisBotToken = secrets.github['shopify-polaris'];
const shopifyPolarisBotGitOverride = `GIT_COMMITTER_NAME='${polarisBotName}' GIT_COMMITTER_EMAIL='${polarisBotEmail}'`;

function pullRequestTemplate(repository, version) {
  return `
## Version ${version} of @shopify/polaris just got published!

See what’s new: https://github.com/Shopify/polaris-react/releases/tag/${version}

cc @Shopify/polaris-reviewers

---

<details>
<summary>🚨 What to do if you see “Your tests failed on CircleCI”?</summary>

If tests fail, you may have to troubleshoot the problem locally.

1. Checkout the \`update-polaris-${version}\` branch:
    \`\`\`bash
    dev cd ${repository}
    git fetch
    git checkout update-polaris-${version}
    dev up
    \`\`\`
1. Apply changes/fixes
1. Commit
1. Push your work to the \`update-polaris-${version}\` branch:
    \`\`\`bash
    git push origin update-polaris-${version}
    \`\`\`
1. Repeat until the build & tests go ✅
1. 🎩
1. :shipit:
</details>
`.trim();
}

function failedUpdateMessage(repository, version) {
  return `
The automatic branch creation for ${repository} failed. This can be due to many reasons. To resolve this follow these steps:

  1. Checkout "${repository}"
  2. Get the latest version of master "git checkout master && git pull"
  3. Create a new branch based on the version that failed "git checkout -b update-polaris-v${version}"
  4. Update "@shopify/polaris" by running "npx yarn upgrade @shopify/polaris@${version}"
  5. Add the changed files to git by running "git add package.json yarn.lock"
  6. Commit the changes with "git commit -m 'Update @shopify/polaris to ${version}'"
  7. Push the changes with "git push origin update-polaris-v${version}"
  8. Create a new pull request for the branch in "${repository}"
`;
}

mkdir(sandbox);

const jobs = repositories.map((repository) => {
  return new Promise(async (resolve, reject) => {
    try {
      const repositoryDirectory = path.resolve(sandbox, repository);

      await retry(() => {
        execSync(
          `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/${repository}.git`,
          {
            // Clone into the sandbox directory
            cwd: sandbox,
            stdio: 'inherit',
          },
        );
      });

      const commands = [
        `git checkout -b update-polaris-${releaseVersion}`,
        `npx yarn@${YARN_VERSION} upgrade @shopify/polaris@${releaseVersion.replace(
          'v',
          '',
        )} --no-progress --ignore-engines`,
        `git add package.json yarn.lock`,
        `${shopifyPolarisBotGitOverride} git commit -m "Update @shopify/polaris to ${releaseVersion}" --author "${polarisBotName} <${polarisBotEmail}>" -m "${releaseVersion}" --allow-empty`,
        `git push origin update-polaris-${releaseVersion}`,
        `curl -d '${JSON.stringify({
          title: `Update @shopify/polaris to ${releaseVersion} 🚀`,
          body: pullRequestTemplate(repository, releaseVersion),
          head: `update-polaris-${releaseVersion}`,
          base: baseBranch,
        })}' -X POST https://api.github.com/repos/shopify/${repository}/pulls?access_token=${polarisBotToken}`,
      ];

      for (const command of commands) {
        await retry(() => {
          execSync(command, {
            // Run the commands in the cloned repository directories
            cwd: repositoryDirectory,
            stdio: 'inherit',
          });
        });
      }

      resolve(
        `Pull request made in shopify/${repository} for version ${releaseVersion}`,
      );
    } catch (error) {
      const errorMessage = `${error}\n\n${failedUpdateMessage(
        repository,
        releaseVersion,
      )}`;
      reject(errorMessage);
    }
  });
});

Promise.all(jobs)
  .then((result) => console.log(result))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
