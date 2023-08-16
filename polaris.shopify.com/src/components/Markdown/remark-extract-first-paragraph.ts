// Forked from https://github.com/remarkjs/strip-markdown/blob/eb799e9fdd01f04f28790839f302b6bd71d76c70/index.js
// Modified to not mutate the node tree and instead extract the first paragraph
type Content = import('mdast').Content;
type Root = import('mdast').Root;
type Node = Root | Content;
type Type = Node['type'];
type HandlerReturn = Node | Node[] | undefined;
type Handler = (node: any) => HandlerReturn;
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
    let textTree: Node | Node[] = one(tree) ?? [];

    // always deal with arrays
    textTree = Array.isArray(textTree) ? textTree : [textTree];

    let flattenedTextTree: Content[] = [];
    let index = -1;

    // Flatten out the root nodes
    while (++index < textTree.length) {
      if (textTree[index].type === 'root') {
        // @ts-expect-error: TS can't accurately narrow to the subset of unions
        // which have '.children', but we can do it as a runtime check
        flattenedTextTree.push(...textTree[index].children);
      } else {
        flattenedTextTree.push(textTree as unknown as Content);
      }
    }

    let result: Node | undefined = undefined;

    if (flattenedTextTree) {
      let index = -1;

      // Search for a node that is either itself a paragraph/text, or has an
      // immediate child that is a paragraph/text.
      while (++index < flattenedTextTree.length) {
        if (!flattenedTextTree[index]) {
          continue;
        }

        if (
          flattenedTextTree[index].type === 'paragraph' ||
          flattenedTextTree[index].type === 'text'
        ) {
          result = flattenedTextTree[index];
          // @ts-expect-error: TS can't accurately narrow to the subset of unions
          // which have '.children', but we can do it as a runtime check
        } else if (Array.isArray(flattenedTextTree[index].children)) {
          // @ts-expect-error: same as above
          result = flattenedTextTree[index].children.find(
            (node: Node) =>
              node && (node.type === 'paragraph' || node.type === 'text'),
          );
        }

        // Found it, so stop searching
        if (result) {
          break;
        }
      }
    }

    if (!result) {
      file.data[dataKey] = null;
    } else {
      if (result.type === 'text') {
        file.data[dataKey] = result.value;
      } else if (result.type === 'paragraph') {
        // Grab all the text from the paragraph
        file.data[dataKey] = result.children
          .flatMap((node: Node) => 'value' in node && node.value)
          .filter(Boolean)
          .join(' ');
      }
    }

    done();
  };

  function one(node: Node): Node | Node[] | undefined {
    const type: Type = node.type;
    let result: Node | Node[] | undefined = node;

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
): HandlerReturn {
  const title = 'title' in node ? node.title : '';
  const value = node.alt || title || '';
  return value ? {type: 'text', value} : undefined;
}

function text(node: import('mdast').Text): HandlerReturn {
  return {type: 'text', value: node.value};
}

function paragraph(node: import('mdast').Paragraph): HandlerReturn {
  return {type: 'paragraph', children: node.children};
}

function children(node: Extract<Node, import('unist').Parent>): HandlerReturn {
  return node.children;
}

function lineBreak(): HandlerReturn {
  return {type: 'text', value: '\n'};
}

function empty(): HandlerReturn {
  return undefined;
}
