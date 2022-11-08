<<<<<<< HEAD
const fs = require('fs');

const globby = require('globby');
const stylelint = require('stylelint');

=======
const globby = require('globby');
const fs = require('fs');
const stylelint = require('stylelint');
>>>>>>> be64c5787 (create script to add ignore comments above stylelint coverage failures)
const config = require('../configs/coverage');

// TODO: add CLI args for custom file paths
const filesGlobby = 'polaris-react/**/*.scss';

insertIgnoreComments();

/**
 * Inserts a stylelint-disable-next-line comment for all stylelint-polaris
 * warnings and errors. This is useful if you want to turn on the linter but
 * have existing failures in the codebase.
<<<<<<< HEAD
=======
 *
>>>>>>> be64c5787 (create script to add ignore comments above stylelint coverage failures)
 */
async function insertIgnoreComments() {
  await stylelint.lint({
    fix: true,
    files: filesGlobby,
    configBasedir: 'stylelint-polaris',
    config: {
      ...config,
      plugins: [
        'stylelint-scss',
        './plugins/at-rule-disallowed-list',
        './plugins/global-disallowed-list',
        './plugins/insert-ignore-comments',
      ],
    },
  });

  // To ensure stylelint/prettier doesn't add extra new lines below disables
  const filepaths = globby.sync(filesGlobby);
<<<<<<< HEAD
=======
  const disableComment = 'stylelint-disable-next-line -- polaris';
>>>>>>> be64c5787 (create script to add ignore comments above stylelint coverage failures)

  filepaths.forEach((file) => {
    const content = fs.readFileSync(file, {encoding: 'utf8'});
    const commentRegex = /stylelint-disable-next-line -- polaris.*\n\n/;
    const comment = content.match(commentRegex)?.[0]?.trim();

    if (comment) {
      const trimmedContent = content.replace(commentRegex, `${comment}\n`);
      fs.writeFileSync(file, trimmedContent, {encoding: 'utf8'});
    }
  });
}
