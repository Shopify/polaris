/* eslint-disable no-console */
const os = require('os');

const puppeteer = require('puppeteer');
const pMap = require('p-map');
const chalk = require('chalk');

// eslint-disable-next-line node/no-path-concat
const iframePath = `file://${__dirname}/../build/storybook/static/iframe.html`;
const concurrentCount = os.cpus().length;
const skippedStoryIds = ['playground-playground', 'all-examples'];

const getUrls = async (browser) => {
  // Get the URLS from storybook
  const page = await browser.newPage();
  await page.goto(iframePath);
  const stories = await page.evaluate(() =>
    window.__STORYBOOK_CLIENT_API__.raw(),
  );
  await page.close();

  const urls = stories.reduce((memo, story) => {
    // If it is a story id that is not in excludedStoryIds
    if (skippedStoryIds.every((id) => !story.id.includes(id))) {
      const url = `${iframePath}?id=${story.id}`;
      memo.push(
        url,
        `${url}&contexts=New%20Design%20Language%3DEnabled%20-%20Light%20Mode`,
        // Dark mode has lots of errors. It is still very WIP so ignore for now
        // `${url}&contexts=New%20Design%20Language%3DEnabled%20-%20Dark%20Mode`,
      );
    }

    return memo;
  }, []);

  return urls;
};

const formatMessage = (id, violations) => {
  const url = chalk.underline.blue(
    `http://localhost:6006/iframe.html?id=all-components-${id}`,
  );
  return violations
    .map((fail) => {
      const message = fail.nodes
        .map((e) => ` - ${e.failureSummary.split('\n  ')[1]}\n   ${e.html}`)
        .join('\n');
      return `${chalk.red(fail.impact)} => ${url}\n${message}`;
    })
    .join('\n');
};

(async () => {
  try {
    //  Open a browser
    console.log(chalk.bold(`🌐 Opening ${concurrentCount} tabs in chromium`));
    const browser = await puppeteer.launch();

    // Get the test ids from storybook
    const testIds = await getUrls(browser);

    console.log(chalk.bold(`🧪 Testing ${testIds.length} urls with axe`));

    // Test the pages with axe
    const testPage = async (url) => {
      const id = url.replace(`${iframePath}?id=all-components-`, '');
      console.log(` - ${id}`);

      try {
        const page = await browser.newPage();
        await page.goto(url);
        const result = await page.evaluate(() =>
          window.axe.run(document.getElementById('root'), {}),
        );
        await page.close();

        if (result.violations.length) {
          return formatMessage(id, result.violations);
        }
      } catch (error) {
        return `please retry => ${id}:\n - ${error.message}`;
      }
    };

    const results = await pMap(testIds, testPage, {
      concurrency: concurrentCount,
    });
    await browser.close();

    // Format the results and log them out
    const messages = results.filter((x) => x);
    if (messages.length) {
      console.error(chalk.bold(`‼️  Test failures found`));
      console.log(messages.join('\n'));
      process.exit(1);
    } else {
      console.log(chalk.bold('🧚‍♀️ Accessibility is all g'));
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
