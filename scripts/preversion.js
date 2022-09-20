const {execSync} = require('child_process');

const getReleasePlan = require('@changesets/get-release-plan').default;

const run = async () => {
  const {releases} = await getReleasePlan(process.cwd());
  const packages = releases.map((release) => release.name);

  const execOpts = {stdio: 'inherit'};
  execSync(
    `yarn turbo run preversion ${packages
      .map((pkg) => `--filter=${pkg}`)
      .join(' ')}`,
    execOpts,
  );
};

try {
  run();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}
