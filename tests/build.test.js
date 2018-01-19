const execSync = require('child_process').execSync;
const fs = require('fs-extra');

describe('build', () => {
  beforeAll(() => {
    execSync('yarn run build');
  });

  afterAll(() => {
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

  it('generates a component entry point for each component', () => {
    expect(fs.existsSync('./styles/components/ResourceList.scss')).toBe(true);
  });

  it('copies over subcomponent stylesheets', () => {
    expect(fs.existsSync('./styles/components/ResourceList/components/BulkActions/BulkActions.scss')).toBe(true);
  });

  it('generates fully namespaced CSS for root components', () => {
    expect(fs.readFileSync('./styles/components/Button/Button.scss', 'utf8')).toMatch('.Polaris-Button {');
  });

  it('generates fully namespaced CSS for nested components', () => {
    expect(fs.readFileSync('./styles/components/ResourceList/components/BulkActions/BulkActions.scss', 'utf8')).toMatch('.Polaris-ResourceList-BulkActions {');
  });

  it('generates a zip of ./build/sass', () => {
    expect(fs.existsSync('./build/Sass.zip')).toBe(true);
  });

  it('generates the necessary typescript definition files', () => {
    expect(fs.existsSync('./types/index.d.ts')).toBe(true);
    expect(fs.existsSync('./embedded.d.ts')).toBe(true);
  });

  describe('esnext', () => {
    const STACK_CLASSNAME_MATCHER = /"Stack":\s*"([^"]*)"/;

    it('facilitates production builds without typescript', () => {
      expect(fs.existsSync('esnext/index.js')).toBe(true);
      expect(fs.existsSync('esnext/server.js')).toBe(true);
    });

    it('preserves classes to facilitate class-level tree shaking', () => {
      // `Stack` is a foundation class, so is unlikely to disappear from the build.
      expect(fs.readFileSync('esnext/index.js', 'utf8')).toMatch('class Stack');
      expect(fs.readFileSync('esnext/server.js', 'utf8')).toMatch('class Stack');
    });

    it('generates scss files to be built from source in production builds', () => {
      expect(fs.existsSync('esnext/styles/components/Stack.scss')).toBe(true);
    });

    it('minifies class names', () => {
      expect(fs.readFileSync('esnext/styles/components/Stack/Stack.scss', 'utf8')).not.toMatch('Stack');
      // Checks that we correctly minify on word boundaries and dasherized class names, fixing
      // https://github.com/Shopify/polaris-react/issues/824
      expect(fs.readFileSync('esnext/styles/components/Tabs/Tabs.scss', 'utf8')).not.toMatch('Measurer');
      expect(fs.readFileSync('esnext/styles/components/Card/Card.scss', 'utf8')).not.toMatch('-subdued');
    });

    it('uses the correct class names in the server and index builds', () => {
      const indexStackClassname = fs.readFileSync('esnext/index.js', 'utf8').match(STACK_CLASSNAME_MATCHER);
      const serverStackClassname = fs.readFileSync('esnext/server.js', 'utf8').match(STACK_CLASSNAME_MATCHER);
      expect(indexStackClassname[1]).toBeTruthy();
      expect(indexStackClassname[1]).toBe(serverStackClassname[1]);
      expect(fs.readFileSync('esnext/styles/components/Stack/Stack.scss', 'utf8')).toMatch(`.${indexStackClassname[1]}`);
    });

    it('preserves native imports in the index build', () => {
      const indexContents = fs.readFileSync('esnext/index.js', 'utf8');
      expect(indexContents).toMatch('import ');
      expect(indexContents).not.toMatch('require(');
    });

    it('uses CommonJS in the server build', () => {
      const indexContents = fs.readFileSync('esnext/server.js', 'utf8');
      expect(indexContents).not.toMatch('import ');
      expect(indexContents).toMatch('require(');
    });
  });
});
