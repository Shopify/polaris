const marked = require('marked');

function addNavigationHashToURL(href) {
  const isExternalLink =
    !href.startsWith('/') && !href.startsWith('https://polaris.shopify.com');
  if (isExternalLink) {
    return href;
  }

  const location = new URL(href, 'https://polaris.shopify.com');

  return location.toString();
}

class MdParser {
  constructor() {
    marked.setOptions({
      headerIds: false,
      gfm: true,
      renderer: this.getCustomRenderer(),
      xhtml: true,
    });
  }

  parse(markdown) {
    return marked(markdown);
  }

  getCustomRenderer() {
    const customRenderer = new marked.Renderer();
    customRenderer.link = function(href, title, text) {
      // Add #navigation to them unless they already point to an anchor.
      // It's a trick: adding #navigation at the end of a URL forces a scroll back to the top of the page
      const outHref = addNavigationHashToURL(href);

      return `<a href="${outHref}"${
        title ? ` title="${title}"` : ''
      }>${text}</a>`;
    };

    return customRenderer;
  }
}

module.exports = MdParser;
