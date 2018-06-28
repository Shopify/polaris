const percy = require('@percy-io/percy-webdriverio');

exports.config = {
  specs: ['./visual-regression-testing-build/snapshots.js'],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'firefox',
    },
  ],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:3000',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  plugins: {
    '@percy-io/percy-webdriverio': {},
  },
  framework: 'mocha',
  reporters: ['dot'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 999999999,
  },
  onPrepare() {
    // Percy + WebdriverIO
    // https://percy.io/docs/clients/javascript/webdriverio
    const assetLoaders = [
      percy.assetLoader('filesystem', {
        buildDir: './visual-regression-testing-build/assets',
        mountPath: '/assets',
      }),
    ];
    return percy.createBuild(assetLoaders);
  },
  onComplete() {
    return percy.finalizeBuild();
  },
};
