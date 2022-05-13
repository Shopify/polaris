import meow from 'meow';

const cli = meow(
  `
	Usage
	  $ polaris-migrator <migration> <path>

	Examples
	  $ polaris-migrator v9-sass-spacing src/components/**/*.scss
	  🌈 unicorns 🌈
`,
  {importMeta: import.meta},
);

const v9SassSpacing = (files) => {
  console.log(files);
};

const migrations = {
  'v9-sass-spacing': v9SassSpacing,
};

const polarisMigrator = (migration, path) => {
  console.log(migration, path);
};

polarisMigrator(cli.input[0], cli.input[1]);
