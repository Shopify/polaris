import path from 'path';

import glob from 'glob';

const iconBasePath = path.resolve(__dirname, '../icons');

const allSVGs = glob
  .sync('*.svg', {
    cwd: iconBasePath,
  })
  .map((filename) => path.basename(filename));

const allYMLs = glob
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
