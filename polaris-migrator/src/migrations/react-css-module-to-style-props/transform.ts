import type {
  JSCodeshift,
  API,
  FileInfo,
  Options,
  Collection,
} from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: Options,
) {
  const {componentName} = options;
  const componentParts = componentName?.split('.');
  if (!componentName || componentParts?.length > 2) {
    throw new Error(
      'Missing required options: componentName, or your compound component exceeds 2 levels',
    );
  }

  const source = j(file.source);

  convertCSSModuleToStyleProps(j, source, componentName);

  return source.toSource();
}

function convertCSSModuleToStyleProps(
  j: JSCodeshift,
  source: Collection<any>,
  componentName: string,
) {
  const [component, subcomponent] = componentName.split('.');

  // Handle compound components
  if (component && subcomponent) {
    source.find(j.JSXElement).forEach((element) => {
      if (
        element.node.openingElement.name.type === 'JSXMemberExpression' &&
        element.node.openingElement.name.object.type === 'JSXIdentifier' &&
        element.node.openingElement.name.object.name === component &&
        element.node.openingElement.name.property.name === subcomponent
      ) {
        element.node.openingElement.attributes?.forEach((node) =>
          updateNode(node),
        );
      }
    });
    return;
  }

  // Handle basic components
  source.findJSXElements(componentName)?.forEach((element) => {
    element.node.openingElement.attributes?.forEach((node) => updateNode(node));
  });

  return source;

  function updateNode(node: any) {
    if (!(node.type === 'JSXAttribute' && node.name.name === 'className')) {
      return node;
    }

    // TODO:
    // 1. Use `node.value` to get the variable name passed in
    // 2. Find where that variable was imported
    // 3. Get the import filename
    // 4. Pass that filename to postcss: return postcss(plugin(options)).process(file.source, { syntax: require('postcss-scss'), }).css;
    // 5. Convert the PostCSS style AST to a set of attributes
    // 6. Add those attributes onto this element

    return node;
  }
}
