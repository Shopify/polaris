import {execSync} from 'child_process';

import fs from 'fs-extra';
import glob from 'glob';

import packageJSON from '../package.json';

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

  describe('standard build', () => {
    it('generates .js and .css files', () => {
      expect(fs.existsSync('./dist/index.js')).toBe(true);
      expect(fs.existsSync('./dist/index.mjs')).toBe(true);
      expect(fs.existsSync('./dist/styles.css')).toBe(true);
    });

    it('generates namespaced CSS classes', () => {
      const cssContent = fs.readFileSync('./dist/styles.css', 'utf8');

      expect(cssContent).toMatch('.Polaris-Avatar{');

      expect(cssContent).toMatch(
        '.Polaris-ResourceList-BulkActions__BulkActionButton{',
      );
    });
  });

  describe('esnext build', () => {
    it('generates .esnext  and .css files', () => {
      expect(fs.existsSync('./dist/esnext/index.ts.esnext')).toBe(true);

      expect(
        fs.existsSync('./dist/esnext/components/Avatar/Avatar.tsx.esnext'),
      ).toBe(true);

      expect(fs.existsSync('./dist/esnext/components/Avatar/Avatar.css')).toBe(
        true,
      );
    });

    it('generates namespaced CSS classes', () => {
      const cssContent = fs.readFileSync(
        './dist/esnext/components/Avatar/Avatar.css',
        'utf8',
      );

      expect(cssContent).toMatch('.Polaris-Avatar{');
    });

    it('generates CSS modules classname mappings', () => {
      const jsContent = fs.readFileSync(
        './dist/esnext/components/Avatar/Avatar.scss.esnext',
        'utf8',
      );
      expect(jsContent).toMatch("import './Avatar.css';");
      expect(jsContent).toMatch('Polaris-Avatar');
      expect(jsContent).toMatch('Polaris-Avatar--hidden');
    });

    it('preserves classes to facilitate class-level tree shaking', () => {
      // `Collapsible` deeply ties into the react class based life-cycles methods, so is likely to be one of the last components converted to a function.
      expect(
        fs.readFileSync(
          './dist/esnext/components/Collapsible/Collapsible.tsx.esnext',
          'utf8',
        ),
      ).toMatch('class Collapsible');
    });
  });

  describe('sass public api', () => {
    it('generates sass files in ./styles dir', () => {
      expect(fs.existsSync('./dist/styles/_public-api.scss')).toBe(true);
      expect(fs.existsSync('./dist/styles/foundation/_spacing.scss')).toBe(
        true,
      );
    });

    it('does not contain any :global definitions', () => {
      const files = glob.sync(`./dist/styles/**/*.scss`);

      expect(files).not.toHaveLength(0);

      const filesWithGlobalDefinitions = files.filter((file) => {
        return fs.readFileSync(file, 'utf-8').includes(':global');
      });

      expect(filesWithGlobalDefinitions).toStrictEqual([]);
    });
  });

  describe('ancillary output', () => {
    it('generates typescript definition files', () => {
      expect(fs.existsSync('./dist/types/latest/src/index.d.ts')).toBe(true);

      // Downleveled for consumers on older TypeScript versions
      expect(fs.existsSync('./dist/types/3.4/src/index.d.ts')).toBe(true);
    });
  });

  it('replaces occurrences of POLARIS_VERSION', () => {
    const files = glob.sync('./dist/**/*.{js,mjs,esnext,css,scss}');

    expect(files).not.toHaveLength(0);

    const fileBuckets: Record<string, string[]> = {
      includesTemplateString: [],
      includesVersion: [],
    };

    files.forEach((file) => {
      const fileContent = fs.readFileSync(file, 'utf-8');

      if (fileContent.includes('POLARIS_VERSION')) {
        fileBuckets.includesTemplateString.push(file);
      }

      if (fileContent.includes(packageJSON.version)) {
        fileBuckets.includesVersion.push(file);
      }
    });

    expect(fileBuckets.includesTemplateString).toHaveLength(0);

    expect(fileBuckets.includesVersion).toStrictEqual([
      './dist/esnext/components/AppProvider/AppProvider.css',
      './dist/esnext/configure.ts.esnext',
      './dist/index.js',
      './dist/index.mjs',
      './dist/styles.css',
    ]);
  });
});
