
/* global describe it expect */
const execSync = require('child_process').execSync;
const fs = require('fs-extra');


describe('build', () => {
  it('should generate CDN files', () => {
    execSync('yarn run build');
    expect(fs.existsSync('./build/quilt.js')).toBe(true);
    expect(fs.existsSync('./build/quilt.css')).toBe(true);
  });
});
