Object.defineProperty(exports, '__esModule', { value: true });

const os = require('os');

const puppeteer = require('puppeteer');
const pMap = require('p-map');
const chalk = require('chalk');
const axe = require('axe-core');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

const os__default = /* #__PURE__*/ _interopDefaultLegacy(os);
const puppeteer__default = /* #__PURE__*/ _interopDefaultLegacy(puppeteer);
const pMap__default = /* #__PURE__*/ _interopDefaultLegacy(pMap);
const chalk__default = /* #__PURE__*/ _interopDefaultLegacy(chalk);

/* eslint-disable no-console */
const FORMATTING_SPACER = '    ';

function getBrowser() {
  return puppeteer__default.default.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

async function getStoryIds(iframePath) {
  console.log('Story ids...');
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto(iframePath);
  const storyIds = await page.evaluate(() =>
    Object.keys(window.__STORYBOOK_STORY_STORE__.extract()),
  );
  const disabledStoryIds = await page.evaluate(() =>
    window.__STORYBOOK_STORY_STORE__
      .raw()
      .filter((story) => story.parameters.a11y && story.parameters.a11y.disable)
      .map((story) => story.id),
  );
  await page.close();
  await browser.close();
  return storyIds.filter((storyId) => !disabledStoryIds.includes(storyId));
}

function removeSkippedStories(skippedStoryIds) {
  return (selectedStories = [], storyId = '') => {
    if (skippedStoryIds.every((skipId) => !storyId.includes(skipId))) {
      return [...selectedStories, storyId];
    }

    return selectedStories;
  };
}

async function getCurrentStoryIds({ iframePath, skippedStoryIds = [] }) {
  const stories =
    process.argv[2] == null
      ? await getStoryIds(iframePath)
      : process.argv[2].split('|');
  return stories.reduce(removeSkippedStories(skippedStoryIds), []);
}

function formatFailureNodes(nodes) {
  return `${FORMATTING_SPACER}${nodes
    .map((node) => node.html)
    .join(`\n${FORMATTING_SPACER}`)}`;
}

function formatMessage(id, violations) {
  return violations
    .map((fail) => {
      return `
- Story ID: ${id}
  Error: ${fail.help} (${fail.id})
  Affected node(s):
${formatFailureNodes(fail.nodes)}
  For help resolving this see: ${fail.helpUrl}`.trim();
    })
    .join('\n');
} // This check is added specifically for autocomplete="nope"
// https://bugs.chromium.org/p/chromium/issues/detail?id=468153
// This is necessary to prevent autocomplete in chrome and fails the axe test
// Do not disable accessibility tests if you notice a failure please fix the issue

function isAutocompleteNope(violation) {
  const isAutocompleteAttribute = violation.id === 'autocomplete-valid';
  const hasNope = violation.nodes.every((node) =>
    node.html.includes('autocomplete="nope"'),
  );
  return isAutocompleteAttribute && hasNope;
}

function testPage(iframePath, browser, timeout, disableAnimation) {
  return async function (id) {
    console.log(` - ${id}`);

    try {
      const page = await browser.newPage();
      await page.goto(`${iframePath}?id=${id}`, {
        waitUntil: 'load',
        timeout,
      });

      if (disableAnimation) {
        await page.addStyleTag({
          content: `*,
            *::after,
            *::before {
              transition-delay: 0.0001s !important;
              transition-duration: 0.0001s !important;
              animation-delay: -0.0001s !important;
              animation-duration: 0.0001s !important;
            }`,
        });
      }

      const result = await page.evaluate(async (id) => {
        console.log('axe', window.axe);
        // Implementation matching
        function getElement() {
          const storyRoot = document.getElementById('story-root');
          return storyRoot
            ? storyRoot.childNodes
            : document.getElementById('root');
        } // Returns story parameters or default ones.
        // Originally inspired by:
        // https://github.com/storybookjs/storybook/blob/78c580eac4c91231b5966116492e34de0a0df66f/addons/a11y/src/a11yRunner.ts#L69-L80

        function getA11yParams(storyId) {
          const { parameters } = window.__STORYBOOK_STORY_STORE__.fromId(storyId);

          return (
            parameters.a11y || {
              config: {},
              options: {
                restoreScroll: true,
              },
            }
          );
        }

        const storyA11yParams = getA11yParams(id);
        const {
          // Context for axe to analyze
          // https://www.deque.com/axe/core-documentation/api-documentation/#context-parameter
          element = getElement(),
          // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
          config,
          // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
          options = {},
        } = storyA11yParams;
        axe.reset();

        if (config) {
          axe.configure(config);
        }

        return axe.run(element, options);
      }, id);
      await page.close();

      if (result.violations && result.violations.length) {
        const filteredViolations = result.violations.filter(
          (violation) => !isAutocompleteNope(violation),
        );
        return formatMessage(id, filteredViolations);
      }

      return null;
    } catch (err) {
      return `please retry => ${id}:\n - ${err.message}`;
    }
  };
}

async function testPages({
  iframePath,
  storyIds = [],
  concurrentCount = os__default.default.cpus().length,
  timeout = 3000,
  disableAnimation = false,
}) {
  try {
    console.log(
      chalk__default.default.bold(
        `🌐 Opening ${concurrentCount} tabs in Chromium`,
      ),
    );
    const browser = await getBrowser();
    console.log(
      chalk__default.default.bold(
        `🧪 Testing ${storyIds.length} urls with axe`,
      ),
    );
    const results = await pMap__default.default(
      storyIds,
      testPage(iframePath, browser, timeout, disableAnimation),
      {
        concurrency: concurrentCount,
      },
    );
    await browser.close();
    return results.filter((x) => x);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

exports.getCurrentStoryIds = getCurrentStoryIds;
exports.getStoryIds = getStoryIds;
exports.testPages = testPages;
