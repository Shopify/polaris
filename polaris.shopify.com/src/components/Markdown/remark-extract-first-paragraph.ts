// Forked from https://github.com/remarkjs/strip-markdown/blob/eb799e9fdd01f04f28790839f302b6bd71d76c70/index.js
// Modified to not mutate the node tree
/**
 * @typedef {import('mdast').Content} Content
 * @typedef {import('mdast').Root} Root
 * @typedef {Root|Content} Node
 * @typedef {Node['type']} Type
 *
 * @callback Handler
 * @param {any} node
 * @returns {Node|Node[]} node
 *
 * @typedef {Partial<Record<Type, Handler>>} Handlers
 *
 * @typedef Options
 *   Configuration.
 * @property {Array.<Type>|undefined} [keep]
 *   List of node types to leave unchanged.
 * @property {Array.<Type|[Type, Handler]>|undefined} [remove]
 *   List of additional node types to remove or replace.
 */

/**
 * Expose modifiers for available node types.
 * Node types not listed here are not changed (but their children are).
 *
 * @type {Handlers}
 */
const defaults = {
  heading: paragraph,
  text,
  inlineCode: text,
  image,
  imageReference: image,
  break: lineBreak,

  blockquote: children,
  list: children,
  listItem: children,
  strong: children,
  emphasis: children,
  delete: children,
  link: children,
  linkReference: children,

  code: empty,
  thematicBreak: empty,
  html: empty,
  table: empty,
  tableCell: empty,
  definition: empty,
  yaml: empty,

  // @ts-expect-error: custom frontmatter node.
  toml: empty,

  footnoteReference: empty,
  footnoteDefinition: empty,
};

const own = {}.hasOwnProperty;

/**
 * Plugin to extract the first paragraph of text with markdown formatting
 * removed.
 *
 * Will place the result on vFile.data.firstParagraph by default (customize with
 * the `dataKey` option).
 *
 * If no text is found, result is set to `null`.
 *
 * @type {import('unified').Plugin<[Options?] | void[], Root>}
 * @returns {import('unified').Transformer<Root>}
 */
export default function remarkExtractFirstParagraph(options = {}) {
  const handlers = Object.assign({}, defaults);
  const remove = options.remove || [];
  const keep = options.keep || [];
  const dataKey = options.dataKey || 'firstParagraph';

  let index = -1;

  while (++index < remove.length) {
    const value = remove[index];

    if (Array.isArray(value)) {
      handlers[value[0]] = value[1];
    } else {
      handlers[value] = empty;
    }
  }

  /** @type {Handlers} */
  let map = {};

  if (keep.length === 0) {
    map = handlers;
  } else {
    /** @type {Type} */
    let key;

    for (key in handlers) {
      if (!keep.includes(key)) {
        map[key] = handlers[key];
      }
    }

    index = -1;

    // Warn if unknown keys are turned off.
    while (++index < keep.length) {
      key = keep[index];

      if (!own.call(handlers, key)) {
        throw new Error(
          'Invalid `keep` option: No modifier is defined for node type `' +
            key +
            '`',
        );
      }
    }
  }

  // @ts-expect-error: assume content model (for root) matches.
  return (tree, file, done) => {
    const textTree = one(tree);
    const firstParagraph = (textTree.children ?? []).find(
      (node) => node.type === 'paragraph' || node.type === 'text',
    );

    if (!firstParagraph) {
      file.data[dataKey] = null;
    } else {
      if (firstParagraph.type === 'text') {
        file.data[dataKey] = firstParagraph.value;
      } else {
        file.data[dataKey] = firstParagraph.children[0]?.value;
      }
    }
    done();
  };

  /**
   * @param {Node} node
   * @returns {Node|Node[]}
   */
  function one(node) {
    /** @type {Type} */
    const type = node.type;
    /** @type {Node|Node[]} */
    let result = node;

    if (type in map) {
      const handler = map[type];
      if (handler) result = handler(result);
    }

    result = Array.isArray(result) ? all(result) : result;

    if ('children' in result) {
      // shallow clone the result so we don't mutate the tree
      result = {
        ...result,
        // @ts-expect-error: assume content models match.
        children: all(result.children),
      };
    }

    return result;
  }

  /**
   * @param {Node[]} nodes
   * @returns {Node[]}
   */
  function all(nodes) {
    let index = -1;
    /** @type {Node[]} */
    const result = [];

    while (++index < nodes.length) {
      const value = one(nodes[index]);

      if (Array.isArray(value)) {
        result.push(...value.flatMap((d) => one(d)));
      } else {
        result.push(value);
      }
    }

    return clean(result);
  }
}

/**
 * Clean nodes: merges literals.
 *
 * @param {Node[]} values
 * @returns {Node[]}
 */
function clean(values) {
  let index = 0;
  /** @type {Node[]} */
  const result = [];
  /** @type {Node|undefined} */
  let previous = values[0];

  while (++index < values.length) {
    const value = values[index];

    // Mrge in a non-mutating way
    if (value.type === previous.type && 'value' in value) {
      // @ts-expect-error: we just checked that they’re the same node.
      previous = {...previous, value: previous.value + value.value};
    } else {
      result.push(previous);
      previous = value;
    }
  }

  if (previous) {
    result.push(previous);
  }

  return result;
}

/**
 * @type {Handler}
 * @param {import('mdast').Image|import('mdast').ImageReference} node
 */
function image(node) {
  const title = 'title' in node ? node.title : '';
  return {type: 'text', value: node.alt || title || ''};
}

/**
 * @type {Handler}
 * @param {import('mdast').Text} node
 */
function text(node) {
  return {type: 'text', value: node.value};
}

/**
 * @type {Handler}
 * @param {import('mdast').Paragraph} node
 */
function paragraph(node) {
  return {type: 'paragraph', children: node.children};
}

/**
 * @type {Handler}
 * @param {Extract<Node, import('unist').Parent>} node
 */
function children(node) {
  return node.children || [];
}

/**
 * @type {Handler}
 */
function lineBreak() {
  return {type: 'text', value: '\n'};
}

/**
 * @type {Handler}
 */
function empty() {
  return {type: 'text', value: ''};
}
