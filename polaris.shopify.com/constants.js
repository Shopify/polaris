// Not a TS file because our playroom.config.js needs to access it also, and can't understand ts imports.

// The site is published as a static export to GitHub Pages at
// https://shopify.github.io/polaris-react/, so every asset and route needs the
// `/polaris-react` prefix. Set POLARIS_BASE_PATH to an empty string to build or
// serve the site from the root of a domain (this is what `pnpm dev` does).
const basePath =
  process.env.POLARIS_BASE_PATH === undefined
    ? '/polaris-react'
    : process.env.POLARIS_BASE_PATH;

module.exports = {
  basePath,
  playroom: {
    baseUrl: `${basePath}/playroom/`,
  },
};
