// Not a TS file because our playroom.config.js needs to access it also, and can't understand ts imports.

// The site is published as a static export to GitHub Pages at
// https://shopify.github.io/polaris-react-archive/, so every asset and route
// needs the `/polaris-react-archive` prefix. A GitHub Pages project site is
// served from a path named after the repository, so this has to track the
// repository name (`Shopify/polaris-react-archive`). Set POLARIS_BASE_PATH to
// an empty string to build or serve the site from the root of a domain (this
// is what `pnpm dev` does).
const basePath =
  process.env.POLARIS_BASE_PATH === undefined
    ? '/polaris-react-archive'
    : process.env.POLARIS_BASE_PATH;

module.exports = {
  basePath,
  playroom: {
    baseUrl: `${basePath}/playroom/`,
  },
};
