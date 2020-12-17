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

    /**
     * @param {string} url
     */
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
          return Promise.resolve({type: 'PASS', url, errorCount: 0});
        }

        return Promise.resolve({
          type: 'FAIL',
          url,
          errorCount: result.violations.length,
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

    // A list of urls with a count of known, expected failures
    // Ideally this shouldn't exist for long as we fix issues
    const expectedIssues = {
      'id=all-components-modal--modal-with-scroll-listener': 1,
      'id=all-components-modal--modal-with-scroll-listener&contexts=Global%20Theming=Enabled%20-%20Light%20Mode': 1,
      'id=all-components-resource-list--resource-list-with-loading-state': 1,
      'id=all-components-resource-list--resource-list-with-loading-state&contexts=Global%20Theming=Enabled%20-%20Light%20Mode': 1,
    };

    const {
      resultsWithErrors,
      resultsWithUnexpectedViolations,
      resultsWithExpectedViolations,
    } = results.reduce(
      (memo, resultItem) => {
        if (resultItem.type === 'ERROR') {
          memo.resultsWithErrors.push(resultItem);
        } else if (resultItem.type === 'FAIL') {
          if (resultItem.errorCount === expectedIssues[resultItem.url]) {
            memo.resultsWithExpectedViolations.push(resultItem);
            // Delete items once we fine them, so we know what items haven't
            // been triggered, so we can tell people they should be removed from
            // the list
            delete expectedIssues[resultItem.url];
          } else {
            memo.resultsWithUnexpectedViolations.push(resultItem);
          }
        }

        return memo;
      },
      {
        resultsWithErrors: [],
        resultsWithUnexpectedViolations: [],
        resultsWithExpectedViolations: [],
      },
    );

    const errorCount = resultsWithErrors.length;

    const unexpectedViolationsCount = resultsWithUnexpectedViolations.length;
    const expectedViolationsCount = resultsWithExpectedViolations.length;
    const totalViolationsCount =
      unexpectedViolationsCount + expectedViolationsCount;

    const untriggeredExpectedIssues = Object.entries(expectedIssues);
    const untriggeredExpectedViolationsCount = untriggeredExpectedIssues.length;

    console.log(
      `There were ${totalViolationsCount} Issues reported! ${expectedViolationsCount} Issues were expected. ${untriggeredExpectedViolationsCount} Expected Issues were absent. There were ${errorCount} errors`,
    );

    if (
      unexpectedViolationsCount === 0 &&
      untriggeredExpectedViolationsCount === 0 &&
      errorCount === 0
    ) {
      return;
    }

    if (unexpectedViolationsCount) {
      console.log('---\n\nUnexpected Issues:');
      resultsWithUnexpectedViolations.forEach((result) => {
        console.log(
          `${result.type} ${result.url} (${result.errorCount}): \n${result.error}`,
        );
      });
    }

    if (untriggeredExpectedViolationsCount) {
      console.log('---\n\nExpected Issues that were not triggerd:');
      untriggeredExpectedIssues.forEach(([url, expectedViolationCount]) => {
        const result = results.find((resultItem) => resultItem.url === url);

        if (!result) {
          console.log(
            `${url}: No matching story, remove this url from the expectedIssues array`,
          );
        } else if (result.type !== 'ERROR') {
          console.log(
            `${url}: Expected ${expectedViolationCount} issues, got ${result.errorCount}.`,
          );
        }
      });
    }

    if (errorCount) {
      console.log(
        '---\n\nPages triggered an ERROR when trying to identify violations (you should rerun too see if this goes away):',
      );

      resultsWithErrors.forEach((result) => {
        console.log(`${result.type} ${result.url}: \n${result.error}`);
      });
    }

    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
