const path = require('path');

const globby = require('globby');

const iconBasePath = path.resolve(__dirname, '../icons/new-icons');

const allSVGs = globby
  .sync('*.svg', {
    cwd: iconBasePath,
  })
  .map((filename) => path.basename(filename));

const allYMLs = globby
  .sync('*.yml', {
    cwd: iconBasePath,
  })
  .map((filename) => path.basename(filename));

describe(`Each SVG file`, () => {
  it(`must have a corresponding YML file`, () => {
    expect(
      allYMLs
        .map((yml) => yml.replace(/yml$/, 'svg'))
        .filter((file) => !allSVGs.includes(file)),
    ).toStrictEqual([]);
  });
});

describe(`Each YML file`, () => {
  it(`must have a corresponding SVG file`, () => {
    expect(
      allSVGs
        .map((svg) => svg.replace(/svg$/, 'yml'))
        .filter((file) => !allYMLs.includes(file)),
    ).toStrictEqual([]);
  });
});
