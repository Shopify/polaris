/* eslint-disable no-console */

const {execSync} = require('child_process');
const {readFileSync} = require('fs');
const pathResolve = require('path').resolve;
const {mkdir} = require('shelljs');
const yaml = require('js-yaml');
const semver = require('semver');

const {version: PACKAGE_VERSION} = require('../package.json');
const secrets = require('../secrets.json');
const retry = require('./utilities/retry');

const YARN_VERSION = yaml
  .safeLoad(readFileSync(pathResolve(__dirname, '..', 'dev.yml'), 'utf8'))
  .up.find((obj) => Object.keys(obj).includes('node')).node.yarn;

// File paths and directories
const root = pathResolve(__dirname, '../');
const sandbox = pathResolve(root, 'sandbox');

// Create the sandbox directory
mkdir(sandbox);

// Execute sync default options
const execOpts = {stdio: 'inherit'};

// Current release version
const releaseVersion = `v${PACKAGE_VERSION}`;

// Compute the base branch on polaris-styleguide (default: master)
// Example: will open a PR against the v4 branch if the
// version found in package.json is `4.0.0-beta.x`

// Check if a version is a major pre-release:
// isMajorPrerelease('2.0.0') => false
// isMajorPrerelease('3.0.1-beta') => false
// isMajorPrerelease('1.1.0-alpha') => false
// isMajorPrerelease('2.0.0-beta.1') => true
// isMajorPrerelease('3.0.0-alpha') => true
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

// Polaris bot settings
const polarisBotName = 'Shopify Polaris Bot';
const polarisBotEmail = 'shopify-polaris-bot@users.noreply.github.com';
const polarisBotToken = secrets.github['shopify-polaris'];
const shopifyPolarisBotGitOverride = `GIT_COMMITTER_NAME='${polarisBotName}' GIT_COMMITTER_EMAIL='${polarisBotEmail}'`;

const gitPolarisStyleguideDirectoryOverride = `--git-dir ${polarisStyleguide}/.git --work-tree=${polarisStyleguide}`;

// Pull request template
const updateBody = `
## Version ${releaseVersion} of @shopify/polaris just got published!

See what’s new: https://github.com/Shopify/polaris-react/releases/tag/${releaseVersion}

cc @kaelig @dfmcphee @amrocha @BPScott

---

<details>
<summary>🚨 What to do if you see “Your tests failed on CircleCI”?</summary>

If tests fail, you may have to troubleshoot the problem locally.

1. Checkout the \`update-polaris-${releaseVersion}\` branch:
    \`\`\`bash
    dev cd polaris-styleguide
    git fetch
    git checkout update-polaris-${releaseVersion}
    dev up
    \`\`\`
1. Apply changes/fixes
1. Commit
1. Push your work to the \`update-polaris-${releaseVersion}\` branch:
    \`\`\`bash
    git push origin update-polaris-${releaseVersion}
    \`\`\`
1. Repeat until the build & tests go ✅
1. 🎩
1. :shipit:
</details>
`.trim();

const updatePostObject = {
  title: `Update @shopify/polaris to ${releaseVersion} 🚀`,
  body: updateBody,
  head: `update-polaris-${releaseVersion}`,
  base: baseBranch,
};

ExecSyncQueue(
  ['polaris-styleguide', 'polaris-web'],
  [
    // Notify polaris-styleguide to upgrade @shopify/polaris to the latest version
    // So that polaris.shopify.com gets updated fairly quickly
    [
      `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/polaris-styleguide.git ${id}`,
      execOpts,
    ],
    // Used to make git operations in polarisStyleguide dir instead of current working dir
    [
      `git ${gitPolarisStyleguideDirectoryOverride} checkout -b update-polaris-${releaseVersion}`,
      execOpts,
    ],
    // Ensure all @shopify/* packages are pulled from the public registry
    ['npm config set @shopify:registry https://registry.npmjs.org', execOpts],
    [
      `npx yarn@${YARN_VERSION} upgrade @shopify/polaris@${releaseVersion.replace(
        'v',
        '',
      )} --no-progress --ignore-engines`,
      {cwd: id},
    ],
    [
      `git ${gitPolarisStyleguideDirectoryOverride} add package.json yarn.lock`,
      execOpts,
    ],
    [
      `${shopifyPolarisBotGitOverride} git ${gitPolarisStyleguideDirectoryOverride} commit -m "Update @shopify/polaris to ${releaseVersion}" --author "${polarisBotName} <${polarisBotEmail}>" -m "${releaseVersion}" --allow-empty`,
      ,
      execOpts,
    ],
    [
      `git ${gitPolarisStyleguideDirectoryOverride} push origin update-polaris-${releaseVersion}`,
      execOpts,
    ],
    [
      `curl -d '${JSON.stringify(
        updatePostObject,
      )}' -X POST https://api.github.com/repos/shopify/polaris-styleguide/pulls?access_token=${polarisBotToken}`,
      execOpts,
    ],
  ],
);

/**
 * ExecSyncQueue - Queue tasks to be ran parallel
 *
 * @param {*} ids      - The unique ids of the tasks
 * @param {*} commands - The commands to be ran
 */
function execSyncQueue(ids, commands, options) {
  // Create the tasks for each repository
  const repositoryTasks = ids.map((id) => {
    return new Promise((resolve, reject) => {
      try {
        commands.forEach((command) => {
          execSync(command, options);
          console.log(id);
        });

        console.log(
          `Done: a pull request was opened at https://github.com/shopify/${id}/pulls'`,
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  // Wait for all of the tasks to complete
  Promise.all(repositoryTasks)
    .then('Pull requests created')
    .catch((error) => console.error(error));
}

// Try and run update polaris using retry default settings, 3 attempts, 10second delay
// retry(
//   updatePolaris,
//   `It seems your automatic branch creation for polaris-styleguide failed. This can be due to many reasons. To resolve this follow these steps and replace [release-version] with the version you are publishing:

// 1. Checkout "polaris-styleguide"
// 2. Get the latest version of master "git checkout master && git pull"
// 3. Create a new branch based on the version that failed "git checkout -b update-polaris-v[release-version]"
// 4. Update "shopify/polaris" by running "npx yarn upgrade @shopify/polaris@[release-version]"
// 5. Add the changed files to git by running "git add package.json yarn.lock"
// 6. Commit the changes with "git commit -m 'Update @shopify/polaris to [release-version]'
// 7. Push the changes with "git push origin update-polaris-v[release-version]"
// 8. Create a new pull request for the branch in "polaris-styleguide"`,
// );
