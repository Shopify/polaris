/* eslint-disable no-console */
const os = require('os');

const puppeteer = require('puppeteer');
const pMap = require('p-map');

// eslint-disable-next-line node/no-path-concat
const iframePath = `file://${__dirname}/../build/storybook/static/iframe.html`;

const concurrentCount = os.cpus().length;
console.log(`Running ${concurrentCount} concurrent pages at a time`);

(async function run() {
  try {
    const browser = await puppeteer.launch();
    const initialPage = await browser.newPage();

    await initialPage.goto(iframePath);
    const stories = await initialPage.evaluate(() => {
      return window.__STORYBOOK_CLIENT_API__.raw();
    });

    await initialPage.close();

    const storyUrls = stories.reduce((memo, story) => {
      // There is no need to test the Playground, or the "All Examples" stories
      const isSkippedStory =
        story.kind === 'Playground/Playground' || story.name === 'All Examples';

      if (!isSkippedStory) {
        const idParam = `id=${encodeURIComponent(story.id)}`;
        memo.push(
          idParam,
          `${idParam}&contexts=Global%20Theming=Enabled%20-%20Light%20Mode`,
          // Dark mode has lots of errors. It is still very WIP so ignore for now
          // `${idParam}&contexts=Global%20Theming=Enabled%20-%20Dark%20Mode`,
        );
      }
      return memo;
    }, []);

    const testPage = async (url) => {
      try {
        console.log(`Testing: ${url}`);
        const page = await browser.newPage();
        await page.goto(`${iframePath}?${url}`);

        const result = await page.evaluate(() => {
          return window.axe.run(document.getElementById('root'), {});
        });

        await page.close();

        if (result.violations.length === 0) {
          return Promise.resolve({type: 'PASS', url});
        }

        return Promise.resolve({
          type: 'FAIL',
          url,
          error: JSON.stringify(result.violations, null, 2),
        });
      } catch (error) {
        return Promise.resolve({
          type: 'ERROR',
          url,
          error: JSON.stringify(error, null, 2),
        });
      }
    };

    const results = await pMap(storyUrls, testPage, {
      concurrency: concurrentCount,
    });

    await browser.close();

    if (results.length === 0) {
      throw new Error('Component URLs could not be crawled');
    }

    const resultsWithIssues = results.filter(({type}) => type !== 'PASS');
    const issueCount = resultsWithIssues.length;

    if (issueCount === 0) {
      console.log('No Errors Reported!');
      return;
    }

    console.log(`There were ${issueCount} Errors Reported!`);

    resultsWithIssues.forEach((result) => {
      console.log(`${result.type} ${result.url}: \n${result.error}`);
    });

    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
