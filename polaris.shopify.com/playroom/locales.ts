// @preval
// The `@preval` magic comment tells babel to execute this file inside node at
// build time, and use the value of module.exports as the final value that gets
// bundled.
// In this case, we're loading all the locale JSON objects and shoving them into
// an object with named keys.
const path = require("path");
const fs = require("fs");

const files = fs
  .readdirSync(
    path.join(
      path.dirname(require.resolve("@shopify/polaris/package.json")),
      "locales"
    ),
    { withFileTypes: true }
  )
  .filter((dirEnt) => dirEnt.isFile() && dirEnt.name.endsWith(".json"))
  .map((dirEnt) => dirEnt.name.replace(".json", ""));

module.exports = files.reduce(
  (memo, locale) => ({
    ...memo,
    [`locale:${locale}`]: require(`@shopify/polaris/locales/${locale}.json`),
  }),
  {}
);
