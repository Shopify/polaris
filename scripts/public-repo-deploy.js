/* eslint-disable no-console */
import {execSync} from 'child_process';
import {outputJsonSync, readFileSync, writeFileSync} from 'fs-extra';
import {join, resolve, basename} from 'path';
import {cp, rm, mkdir} from 'shelljs';
import glob from 'glob';
import semver from 'semver';

const {version: packageVersion} = require('../package.json');

const polarisBotName = 'Shopify Polaris Bot';
const polarisBotEmail = 'shopify-polaris-bot@users.noreply.github.com';
const polarisBotToken = require('../secrets.json').github['shopify-polaris'];

const PRIVATE = 'polaris-react';
const PUBLIC = 'polaris';
const STYLEGUIDE = 'polaris-styleguide';
const STRIP_PRIVATE_LINKS = /\s?\(\[.*?\]\([^\s].*\/shopify\/polaris-react\/.*?\)\)/gi;

const root = resolve(__dirname, '../');
const sandbox = resolve(root, 'sandbox');
const polarisPublic = resolve(sandbox, PUBLIC);
const polarisPrivate = resolve(sandbox, PRIVATE);
const polarisStyleguide = resolve(sandbox, STYLEGUIDE);
const scripts = resolve(polarisPrivate, 'scripts');
const polarisPackage = resolve(polarisPrivate, 'package.json');
const releaseVersion = `v${packageVersion}`;
const changelog = resolve(polarisPrivate, 'CHANGELOG.md');

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

const baseBranch = isMajorPrerelease(packageVersion)
  ? `v${semver.major(packageVersion)}`
  : 'master';

// Files to 🔥
const privateFiles = [
  resolve(polarisPrivate, 'README.md'),
  resolve(polarisPrivate, 'secrets.ejson'),
  resolve(polarisPrivate, 'service.yml'),
  resolve(polarisPrivate, 'tests', 'build.test.js'),
  resolve(scripts, 'deploy.js'),
  resolve(scripts, 'public-repo-deploy.js'),
  resolve(scripts, 'build-consumer.js'),
];

// Scripts to 🔥
const privateScripts = [
  'precdn',
  'public',
  'cdn:secrets',
  'cdn:deploy',
  'cdn',
  'dev:host',
  'public-release:secrets',
  'prepublic-release',
  'public-release',
  'prepublish',
  'postpublish',
  'hide-private-readme',
  'show-private-readme',
  'prebuild-consumer',
  'build-consumer',
  'postbuild-consumer',
];

mkdir(sandbox);
const execOpts = {stdio: 'inherit'};
execSync(
  `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/${PRIVATE}.git ${polarisPrivate}`,
  execOpts,
);
execSync(
  `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/${PUBLIC}.git ${polarisPublic}`,
  execOpts,
);
execSync(
  `git clone --branch ${baseBranch} --single-branch https://${polarisBotToken}@github.com/Shopify/polaris-styleguide.git ${polarisStyleguide}`,
  execOpts,
);

// Strip package.json scripts
const packageJSON = require(polarisPackage);
privateScripts.forEach((script) => delete packageJSON.scripts[script]);
outputJsonSync(polarisPackage, packageJSON, {spaces: 2});

// Delete private files
rm(privateFiles);

// Regex to remove polaris-react links in CHANGELOG.md
let changelogFile = readFileSync(changelog, 'utf8');
changelogFile = changelogFile.replace(STRIP_PRIVATE_LINKS, '');
writeFileSync(changelog, changelogFile);

const hiddenFilesToKeepInPublicRepository = [
  '.circleci',
  '.github',
  '.vscode',
  '.babelrc',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc',
  '.gitignore',
  '.nvmrc',
  '.prettierrc',
  '.prettierignore',
  '.yarnclean',
].join(',');
const hiddenFilesGlob = `{${hiddenFilesToKeepInPublicRepository}}`;

// 🔥 ./sandbox/polaris
rm('-rf', [join(polarisPublic, '*'), join(polarisPublic, hiddenFilesGlob)]);

// There should always be a .git folder as a match
const emptyRepoFiles = glob.sync(join(polarisPublic, '{.*,*}'));
if (emptyRepoFiles.length !== 1) {
  throw new Error(
    `Stale files exist in the public Polaris repo. Found ${JSON.stringify(
      emptyRepoFiles,
    )}.`,
  );
}
if (basename(emptyRepoFiles[0]) !== '.git') {
  throw new Error(
    `.git directory must exist to preserve commit history. Found ${JSON.stringify(
      emptyRepoFiles,
    )}.`,
  );
}

cp(
  '-rf',
  [resolve(polarisPrivate, '*'), resolve(polarisPrivate, hiddenFilesGlob)],
  polarisPublic,
);

// Dump sandbox/polaris-react/public into sandbox/polaris
cp(
  '-rf',
  [
    resolve(polarisPrivate, 'public', '.github'),
    resolve(polarisPrivate, 'public', '*'),
  ],
  polarisPublic,
);
rm('-rf', join(polarisPublic, 'public'));
rm('-rf', polarisPrivate);

// Replace variables in the main README with the appropriate details
const publicReadme = resolve(polarisPublic, 'README.md');
writeFileSync(
  publicReadme,
  readFileSync(publicReadme, 'utf8').replace(
    /\{\{VERSION\}\}/g,
    packageVersion,
  ),
);

// Replace variables in the component README with the appropriate details
const componentReadme = resolve(polarisPublic, './src/components/README.md');
writeFileSync(
  componentReadme,
  readFileSync(componentReadme, 'utf8').replace(
    /\{\{VERSION\}\}/g,
    packageVersion,
  ),
);

// Used to make git operations in polarisPublic dir instead of current working dir
const gitDirectoryOverride = `--git-dir ${polarisPublic}/.git --work-tree=${polarisPublic}`;
const shopifyPolarisBotGitOverride = `GIT_COMMITTER_NAME='${polarisBotName}' GIT_COMMITTER_EMAIL='${polarisBotEmail}'`;
execSync(`git ${gitDirectoryOverride} add .`, execOpts);
execSync(
  `${shopifyPolarisBotGitOverride} git ${gitDirectoryOverride} commit --author "${polarisBotName} <${polarisBotEmail}>" -m "${releaseVersion}"`,
  execOpts,
);
execSync(`git ${gitDirectoryOverride} tag ${releaseVersion}`, execOpts);
execSync(`git ${gitDirectoryOverride} push origin ${baseBranch}`);
execSync(`git ${gitDirectoryOverride} push --tags`);

console.log(`Done: Succesfully pushed to ${PUBLIC}`);

// Notify polaris-styleguide to upgrade @shopify/polaris to the latest version
// So that polaris.shopify.com gets updated fairly quickly

// Used to make git operations in polarisStyleguide dir instead of current working dir
const gitPolarisStyleguideDirectoryOverride = `--git-dir ${polarisStyleguide}/.git --work-tree=${polarisStyleguide}`;
execSync(
  `git ${gitPolarisStyleguideDirectoryOverride} checkout -b update-polaris-${releaseVersion}`,
  execOpts,
);
execSync(
  `yarn upgrade @shopify/polaris@${releaseVersion.replace(
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

See what’s new: https://github.com/Shopify/polaris/releases/tag/${releaseVersion}

cc @kaelig @dfmcphee @amrocha

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
