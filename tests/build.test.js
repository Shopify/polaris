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
});
