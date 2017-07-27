const execSync = require('child_process').execSync;
const fs = require('fs-extra');

describe('build', () => {
  beforeEach(() => {
    execSync('yarn run build');
  });

  afterEach(() => {
    execSync('yarn run clean');
  });

  it('generates CDN files in ./build', () => {
    expect(fs.existsSync('./build/polaris.css')).toBe(true);
    expect(fs.existsSync('./build/polaris.min.css')).toBe(true);
  });

  it('generates lib files in ./', () => {
    expect(fs.existsSync('./index.js')).toBe(true);
    expect(fs.existsSync('./embedded.js')).toBe(true);
    expect(fs.existsSync('./index.es.js')).toBe(true);
    expect(fs.existsSync('./styles.css')).toBe(true);
  });

  it('generates a ./styles/components dir with Icon.scss', () => {
    expect(fs.existsSync('./styles/components/Icon.scss')).toBe(true);
  });

  it('generates a ./styles/foundation dir with spacing.scss', () => {
    expect(fs.existsSync('./styles/foundation/spacing.scss')).toBe(true);
  });

  it('generates sass entries files in ./styles dir', () => {
    expect(fs.existsSync('./styles/global.scss')).toBe(true);
    expect(fs.existsSync('./styles/foundation.scss')).toBe(true);
    expect(fs.existsSync('./styles/shared.scss')).toBe(true);
    expect(fs.existsSync('./styles/components.scss')).toBe(true);
  });

  it('generates a ./styles.scss sass entry point in root', () => {
    expect(fs.existsSync('./styles.scss')).toBe(true);
  });

  it('generates a zip of ./build/sass', () => {
    expect(fs.existsSync('./build/sass.zip')).toBe(true);
  });

  it('generates the necessary typescript definition files', () => {
    expect(fs.existsSync('./types/index.d.ts')).toBe(true);
    expect(fs.existsSync('./embedded.d.ts')).toBe(true);
  });

  describe('esnext', () => {
    it('facilitates production builds without typescript', () => {
      expect(fs.existsSync('esnext/index.js')).toBe(true);
    });

    it('preserves classes to facilitate class-level tree shaking', () => {
      // `Stack` is a foundation class, so is unlikely to disappear from the build.
      expect(fs.readFileSync('esnext/index.js', 'utf8')).toMatch('class Stack');
    });

    it('generates scss files to be built from source in production builds', () => {
      expect(fs.existsSync('esnext/styles/components/Stack.scss')).toBe(true);
    });

    it('minifies class names', () => {
      expect(fs.readFileSync('esnext/styles/components/Stack.scss', 'utf8')).not.toMatch('Stack');
    });
  });
});
