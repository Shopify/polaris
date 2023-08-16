// Forked from https://github.com/remarkjs/strip-markdown/blob/eb799e9fdd01f04f28790839f302b6bd71d76c70/index.js
// Modified to not mutate the node tree and instead extract the first paragraph
/* TODO: Use the original module, but wrapped in a clone, like so:
*
import cloneDeep from 'lodash.clonedeep';
import type {Content, Root, Paragraph} from 'mdast';
import type {Transformer} from 'unified';
import stripMarkdown from 'strip-markdown';

type Options = Parameters<stripMarkdown>[0] & { dataKey?: string }

export default function remarkExtractFirstParagraph(
  options: Options  = {},
): Transformer<Root> {
  const dataKey = options.dataKey || 'firstParagraph';

  const markdownStripper = stripMarkdown(options);

  return (tree, file, done) => {
    // Make a clone of the tree to avoid accidentally modifying it
    const treeClone = cloneDeep(tree)
    
    // Process the tree to extract just the text nodes
    const textTree: Nodes = markdownStripper(treeClone) ?? [];

    const flattenedTextTree = (
      Array.isArray(textTree) ? textTree : [textTree]
    ).flatMap((node) =>
      // Replace Root nodes with their direct children
      node.type === 'root' ? node.children : [node],
    ) as Content[];

    const result = flattenedTextTree.find(
      (node) => node?.type === 'paragraph' && node.children?.length,
    ) as Paragraph | undefined;

    if (!result) {
      file.data[dataKey] = null;
    } else {
      // Grab all the text from the paragraph
      file.data[dataKey] = result.children
        .map((node: Node) => node.type === 'text' && node.value)
        .filter(Boolean)
        // Ensure there's at least one space between sentences, inline quotes, etc
        .join(' ')
        // Collapse multiple spaces (including new lines)
        .replace(/\s+/s, ' ');
    }

    done();
  };
}
*/
import type {Content, Root, Paragraph} from 'mdast';
type Node = Root | Content;
type Nodes = Node | Node[];
type MaybeNodes = Nodes | undefined;
type Type = Node['type'];
export type Handler = (node: any) => MaybeNodes;
type Handlers = Partial<Record<Type, Handler>>;
interface Options {
  keep?: Array<Type>;
  remove?: Array<Type | [Type, Handler]>;
  dataKey?: string;
}

/**
 * Expose modifiers for available node types.
 * Node types not listed here are not changed (but their children are).
 */
const defaults: Handlers = {
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
 */
export default function remarkExtractFirstParagraph(
  options: Options = {},
): import('unified').Transformer<Root> {
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

  let map: Handlers = {};

  if (keep.length === 0) {
    map = handlers;
  } else {
    let key: Type;

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

  return (tree, file, done) => {
    // Process the tree to extract just the text nodes
    const textTree: Nodes = one(tree) ?? [];

    const flattenedTextTree = (
      Array.isArray(textTree) ? textTree : [textTree]
    ).flatMap((node) =>
      // Replace Root nodes with their direct children
      node.type === 'root' ? node.children : [node],
    ) as Content[];

    const result = flattenedTextTree.find(
      (node) => node?.type === 'paragraph' && node.children?.length,
    ) as Paragraph | undefined;

    if (!result) {
      file.data[dataKey] = null;
    } else {
      // Grab all the text from the paragraph
      file.data[dataKey] = result.children
        .map((node: Node) => node.type === 'text' && node.value)
        .filter(Boolean)
        // Ensure there's at least one space between sentences, inline quotes, etc
        .join(' ')
        // Collapse multiple spaces (including new lines)
        .replace(/\s+/s, ' ');
    }

    done();
  };

  function one(node: Node): MaybeNodes {
    const type: Type = node.type;
    let result: MaybeNodes = node;

    if (type in map) {
      const handler = map[type];
      if (handler) result = handler(result);
    }

    result = Array.isArray(result) ? all(result) : result;

    if (result && 'children' in result) {
      // shallow clone the result so we don't mutate the tree
      result = {
        ...result,
        // @ts-expect-error: assume content models match.
        children: all(result.children),
      };
    }

    return result;
  }

  function all(nodes: Node[]): Node[] {
    let index = -1;
    const result: Node[] = [];

    while (++index < nodes.length) {
      const value = one(nodes[index]);

      if (Array.isArray(value)) {
        result.push(...all(value));
      } else if (value) {
        result.push(value);
      }
    }

    return clean(result);
  }
}

/**
 * Clean nodes: merges literals.
 */
function clean(values: Node[]): Node[] {
  let index = 0;
  const result: Node[] = [];
  let previous: Node = values[0];

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

function image(
  node: import('mdast').Image | import('mdast').ImageReference,
): MaybeNodes {
  const title = 'title' in node ? node.title : '';
  const value = node.alt || title || '';
  return value ? {type: 'text', value} : undefined;
}

function text(node: import('mdast').Text): MaybeNodes {
  return {type: 'text', value: node.value};
}

function paragraph(node: import('mdast').Paragraph): MaybeNodes {
  return {type: 'paragraph', children: node.children};
}

function children(node: Extract<Node, import('unist').Parent>): MaybeNodes {
  return node.children;
}

function lineBreak(): MaybeNodes {
  return {type: 'text', value: '\n'};
}

function empty(): MaybeNodes {
  return undefined;
}
