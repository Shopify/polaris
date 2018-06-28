/* global browser, $ */
/* eslint-disable no-console */

describe('Take snapshots', () => {
  it('Snapshots', () => {
    browser.url('/');
    const urlElements = $('a');
    urlElements.waitForExist(5000);
    const urls = browser.getAttribute('a', 'href');
    urls.map((path) => {
      console.log('Snapshotting ', path);
      browser.url(path);
      browser.pause(1000);
      browser.percySnapshot(path);
    });
  });
});
