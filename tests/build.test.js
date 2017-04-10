const execSync = require('child_process').execSync;
const fs = require('fs-extra');

describe('build', () => {
  it('should generate CDN files in ./build', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/quilt.css')).toBe(true);
    expect(fs.existsSync('./build/quilt.min.css')).toBe(true);
    execSync('yarn run clean');
  });

  it('should generate lib files in ./', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./index.js')).toBe(true);
    expect(fs.existsSync('./index.es.js')).toBe(true);
    expect(fs.existsSync('./styles.css')).toBe(true);
    execSync('yarn run clean');
  });

  it('should generate a ./build/sass/components dir with Icon.scss', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/sass/components/Icon.scss')).toBe(true);
    execSync('yarn run clean');
  });
  it('should generate a ./build/sass/components.scss index file', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/sass/components.scss')).toBe(true);
    execSync('yarn run clean');
  });
  it('should generate a ./build/sass/foundation dir with spacing.scss', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/sass/foundation/spacing.scss')).toBe(true);
    execSync('yarn run clean');
  });
  it('should generate a root level .scss files in ./build/sass', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/sass/global.scss')).toBe(true);
    expect(fs.existsSync('./build/sass/foundation.scss')).toBe(true);
    expect(fs.existsSync('./build/sass/all.scss')).toBe(true);
    execSync('yarn run clean');
  });
});

