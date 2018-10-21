const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const glob = require('glob');
const packageJSON = require('../package.json');

describe('build', () => {
  beforeAll(() => {
    // Running clean shall remove the entire build directory. Including
    // `build/cache/jest` which is Jest's cache location. Removing Jest's cache
    // in the middle of it running understandably has undesirable effects -
    // it crashes jest.
    // The clean:build script (ran as part of the prebuild step) removes the
    // build directory with the exception of the build/cache folder so that
    // Jest can keep its cache and keep running.
    execSync('yarn run build');
  });

  it('generates CDN files in ./build', () => {
    expect(fs.existsSync('./build/polaris.css')).toBe(true);
    expect(fs.existsSync('./build/polaris.min.css')).toBe(true);
  });

  it('generates lib files in ./', () => {
    expect(fs.existsSync('./index.js')).toBe(true);
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

  it('generates a component entry point for each component', () => {
    expect(fs.existsSync('./styles/components/ResourceList.scss')).toBe(true);
  });

  it('copies over subcomponent stylesheets', () => {
    expect(
      fs.existsSync(
        './styles/components/ResourceList/components/BulkActions/BulkActions.scss',
      ),
    ).toBe(true);
  });

  it('generates fully namespaced CSS for root components', () => {
    expect(
      fs.readFileSync('./styles/components/Button/Button.scss', 'utf8'),
    ).toMatch('.Polaris-Button {');
  });

  it('generates fully namespaced CSS for nested components', () => {
    expect(
      fs.readFileSync(
        './styles/components/ResourceList/components/Item/Item.scss',
        'utf8',
      ),
    ).toMatch('.Polaris-ResourceList-Item {');
  });

  it('generates a zip of ./build/sass', () => {
    expect(fs.existsSync('./build/Sass.zip')).toBe(true);
  });

  it('generates the necessary typescript definition files', () => {
    expect(fs.existsSync('./types/index.d.ts')).toBe(true);
  });

  it('replaces all occurrences of POLARIS_VERSION', () => {
    const files = glob.sync('./build/**/*.{js,scss,css}', {
      ignore: './build/cache/**',
    });

    const total = files.reduce((acc, file) => {
      const contents = fs.readFileSync(file, 'utf-8');
      return acc + Number(contents.includes('POLARIS_VERSION'));
    }, 0);
    expect(total).toBe(0);
  });

  it('features the version of Polaris in all compiled files', () => {
    const files = glob.sync('./build/**/*.{js,scss,css}', {
      ignore: './build/cache/**',
    });
    const total = files.reduce((acc, file) => {
      const contents = fs.readFileSync(file, 'utf-8');
      return acc + Number(contents.includes(packageJSON.version));
    }, 0);
    expect(total).toBe(5);
  });

  it('features the version of Polaris in those specific files', () => {
    const globFiles = [
      'polaris.css',
      'polaris.es.js',
      'polaris.js',
      'polaris.min.css',
      'sass/styles/global/elements.scss',
    ].join(',');
    const files = glob.sync(`./build/{${globFiles}}`);
    const total = files.reduce((acc, file) => {
      const contents = fs.readFileSync(file, 'utf-8');
      return acc + Number(contents.includes(packageJSON.version));
    }, 0);
    expect(total).toBe(5);
  });

  describe('esnext', () => {
    it('facilitates production builds without typescript', () => {
      expect(fs.existsSync('esnext/index.js')).toBe(true);
    });

    it('preserves classes to facilitate class-level tree shaking', () => {
      // `Stack` is a foundation class, so is unlikely to disappear from the build.
      expect(
        fs.readFileSync('esnext/components/Stack/Stack.js', 'utf8'),
      ).toMatch('class Stack');
    });

    it('preserves jsx to give consumers control over Babel transforms', () => {
      expect(
        fs.readFileSync('esnext/components/Stack/Stack.js', 'utf8'),
      ).toMatch(/return <div .+?<\/div>/);
    });

    it('provides scss files', () => {
      expect(fs.existsSync('esnext/components/Stack/Stack.scss')).toBe(true);
    });

    it('preserves CSS class names to give consumers control over minification', () => {
      expect(
        fs.readFileSync('esnext/components/Stack/Stack.scss', 'utf8'),
      ).toMatch('.Stack');
    });

    it('preserves ES script imports', () => {
      const contents = fs.readFileSync(
        'esnext/components/Avatar/index.js',
        'utf8',
      );
      expect(contents).toMatch("import Avatar from './Avatar'");
    });

    it('preserves ES scss imports', () => {
      const indexContents = fs.readFileSync(
        'esnext/components/Avatar/Avatar.js',
        'utf8',
      );
      expect(indexContents).toMatch("import * as styles from './Avatar.scss';");
    });

    it('gives consumers control over global.scss', () => {
      const indexContents = fs.readFileSync('esnext/index.js', 'utf8');
      expect(indexContents).not.toMatch(/import '.+\.scss'/);
    });
  });
});
