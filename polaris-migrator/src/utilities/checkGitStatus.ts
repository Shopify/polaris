/* eslint-disable no-console */
import chalk from 'chalk';
import isGitClean from 'is-git-clean';

export function checkGitStatus(force?: boolean) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using @shopify/polaris-migrator!');
      console.log(
        chalk.yellow(
          '\nBut before we continue, please stash or commit your git changes.',
        ),
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.',
      );
      process.exit(1);
    }
  }
}
