/* eslint-disable no-console */

const {execSync} = require('child_process');
const {readFileSync} = require('fs');
const {resolve} = require('path');
const {mkdir} = require('shelljs');
const yaml = require('js-yaml');
const semver = require('semver');

const {version: PACKAGE_VERSION} = require('../package.json');

const YARN_VERSION = yaml
  .safeLoad(readFileSync(resolve(__dirname, '..', 'dev.yml'), 'utf8'))
  .up.find((obj) => Object.keys(obj).includes('node')).node.yarn;

const polarisBotName = 'Shopify Polaris Bot';
const polarisBotEmail = 'shopify-polaris-bot@users.noreply.github.com';
const polarisBotToken = require('../secrets.json').github['shopify-polaris'];

const STYLEGUIDE = 'polaris-styleguide';
const root = resolve(__dirname, '../');
const sandbox = resolve(root, 'sandbox');
const polarisStyleguide = resolve(sandbox, STYLEGUIDE);
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

mkdir(sandbox);
const execOpts = {stdio: 'inherit'};
execSync(
  `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/polaris-styleguide.git ${polarisStyleguide}`,
  execOpts,
);

const shopifyPolarisBotGitOverride = `GIT_COMMITTER_NAME='${polarisBotName}' GIT_COMMITTER_EMAIL='${polarisBotEmail}'`;

// Notify polaris-styleguide to upgrade @shopify/polaris to the latest version
// So that polaris.shopify.com gets updated fairly quickly

// Used to make git operations in polarisStyleguide dir instead of current working dir
const gitPolarisStyleguideDirectoryOverride = `--git-dir ${polarisStyleguide}/.git --work-tree=${polarisStyleguide}`;
execSync(
  `git ${gitPolarisStyleguideDirectoryOverride} checkout -b update-polaris-${releaseVersion}`,
  execOpts,
);

// Ensure all @shopify/* packages are pulled from the public registry
execSync(
  'npm config set @shopify:registry https://registry.npmjs.org',
  execOpts,
);

execSync(
  `npx yarn@${YARN_VERSION} upgrade @shopify/polaris@${releaseVersion.replace(
    'v',
    '',
  )} --no-progress --ignore-engines`,
  {cwd: polarisStyleguide},
);
execSync(
  `git ${gitPolarisStyleguideDirectoryOverride} add package.json yarn.lock`,
  execOpts,
);
execSync(
  `${shopifyPolarisBotGitOverride} git ${gitPolarisStyleguideDirectoryOverride} commit -m "Update @shopify/polaris to ${releaseVersion}" --author "${polarisBotName} <${polarisBotEmail}>" -m "${releaseVersion}" --allow-empty`,
  execOpts,
);
execSync(
  `git ${gitPolarisStyleguideDirectoryOverride} push origin update-polaris-${releaseVersion}`,
  execOpts,
);

const updateBody = `
## Version ${releaseVersion} of @shopify/polaris just got published!

See what’s new: https://github.com/Shopify/polaris-react/releases/tag/${releaseVersion}

cc @kaelig @dfmcphee @amrocha @bpscott

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

execSync(
  `curl -d '${JSON.stringify(
    updatePostObject,
  )}' -X POST https://api.github.com/repos/shopify/polaris-styleguide/pulls?access_token=${polarisBotToken}`,
  execOpts,
);

console.log(
  'Done: a pull request was opened at https://github.com/shopify/polaris-styleguide/pulls',
);
