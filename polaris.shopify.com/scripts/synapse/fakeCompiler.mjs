/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[Options]|void[], Node, string>}
 */
export default function fakeCompiler(options) {
  /** @type {import('unified').CompilerFunction<Node, string>} */
  const compiler = (tree) => {
    return 'fakely compiled';
  };

  Object.assign(this, {Compiler: compiler});
}
