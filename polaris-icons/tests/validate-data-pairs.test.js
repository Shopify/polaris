const path = require('path');

const globby = require('globby');

const iconBasePath = path.resolve(__dirname, '../icons');

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

  it(`must end with 'Icon'`, () => {
    allSVGs.forEach((svg) => {
      expect(svg).toMatch(/Icon\.svg$/);
    });
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

  it(`must end with 'Icon'`, () => {
    allYMLs.forEach((yml) => {
      expect(yml).toMatch(/Icon\.yml$/);
    });
  });
});
