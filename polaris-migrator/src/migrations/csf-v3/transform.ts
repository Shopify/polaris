import type {API, FileInfo} from 'jscodeshift';

export default function transformer(file: FileInfo, {jscodeshift: j}: API) {
  const source = j(file.source);

  source.find(j.ExportNamedDeclaration).replaceWith(({value: node}) => {
    let id;
    let storyFn;
    let isArrowFunction = false;

    if (
      // export function App() {..}
      j.match(node, {
        // @ts-expect-error -- shh
        declaration: {type: 'FunctionDeclaration'},
      })
    ) {
      // @ts-expect-error -- shh
      id = node.declaration.id;
      storyFn = j.functionExpression(
        null,
        // @ts-expect-error -- shh
        node.declaration.params,
        // @ts-expect-error -- shh
        node.declaration.body,
      );
    } else if (
      // export const App = () => {..}
      j.match(node, {
        declaration: {
          type: 'VariableDeclaration',
          // @ts-expect-error -- shh
          declarations: [{init: {type: 'ArrowFunctionExpression'}}],
        },
      })
    ) {
      // @ts-expect-error -- shh
      id = node.declaration?.declarations?.[0]?.id;
      storyFn = j.arrowFunctionExpression(
        // @ts-expect-error -- shh
        node.declaration.declarations[0].init.params,
        // @ts-expect-error -- shh
        node.declaration.declarations[0].init.body,
      );
      isArrowFunction = true;
    } else {
      return node;
    }

    // App.parameters = {..}, etc
    const storyData = source.find(j.ExpressionStatement, {
      expression: {
        type: 'AssignmentExpression',
        left: {
          type: 'MemberExpression',
          object: {
            name: id.name,
          },
        },
      },
    });

    // Convert it into object properties:
    // parameters: {..}, etc
    const storyProps = storyData.nodes().map((node) =>
      j.property(
        'init',
        // @ts-expect-error -- shh
        node.expression.left.property,
        // @ts-expect-error -- shh
        node.expression.right,
      ),
    );

    // They'll be added to the newly exported object later, so don't need them
    // anymore
    storyData.remove();

    // render() { ... }
    // or
    // render: () => { ... }
    const renderProp = j.property('init', j.identifier('render'), storyFn);

    if (!isArrowFunction) {
      // Use the ES6 shorthand
      renderProp.method = true;
    }

    // export const App = { render() { ... }, parameters: { .. } }
    return j.exportNamedDeclaration(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          id,
          j.objectExpression([renderProp, ...storyProps]),
        ),
      ]),
    );
  });

  return source.toSource();
}
