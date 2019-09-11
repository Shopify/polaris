import path from 'path';
import * as ts from 'typescript';
import glob from 'glob';
import cmd from 'node-cmd';

type Node = {
  fileName: string;
  dependsOn: Node[];
  dependedOnBy: Node[];
};

type GraphType = {
  [name: string]: Node;
};

const graph: GraphType = {};

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options);

  fileNames.map((fileName) => {
    if (!graph[path.resolve(fileName)]) {
      const ast: any = program.getSourceFile(fileName);
      recurse({
        fileName: skipIndexFile(path.resolve(ast.originalFileName)),
        dependsOn: [],
        dependedOnBy: [],
      });
    }
  });

  function recurse(node: Node) {
    const ast: any = program.getSourceFile(node.fileName);

    if (ast && ast.resolvedModules) {
      const dependencies = Array.from(ast.resolvedModules.entries())
        .map(([key, module]: any) => {
          if (!module) {
            return recurse({
              fileName: path.resolve(
                ast.originalFileName.replace(/(.*\/)(.*)/, `$1${key}`),
              ),
              dependsOn: [],
              dependedOnBy: [node],
            });
          }

          if (module.isExternalLibraryImport) {
            return undefined;
          }

          const moduleFileName = module.resolvedFileName;

          let newNode;
          if (graph[path.resolve(moduleFileName)]) {
            newNode = graph[path.resolve(moduleFileName)];
            newNode.dependedOnBy.push(node);
          } else {
            newNode = recurse({
              fileName: skipIndexFile(moduleFileName),
              dependsOn: [],
              dependedOnBy: [node],
            });
          }
          return newNode;
        })
        .filter((node) => node);

      node.dependsOn = dependencies;
    }

    graph[path.resolve(node.fileName)] = node;
    return node;
  }

  function skipIndexFile(fileName) {
    if (/(components\/)(\w*\/)?(index.ts)/.test(fileName)) {
      const ast: any = program.getSourceFile(fileName);
      return (Array.from(ast.resolvedModules.values())[0] as any)
        .resolvedFileName;
    }
    return fileName;
  }
}

function findDependencies(fileName) {
  const dependencies = {};
  recurse(graph[path.resolve(fileName)], 0);

  function recurse(node, depth) {
    if (node && node.dependedOnBy) {
      node.dependedOnBy.forEach((dependency) => {
        dependencies[dependency.fileName] = 1;
        recurse(dependency, depth + 1);
      });
    }
  }

  return Object.keys(dependencies)
    .filter((dependency) => !dependency.endsWith('/src/components/index.ts'))
    .map((dependency) => dependency.split('polaris-react/')[1]);
}

export function getGitStagedFiles(scope = '') {
  return new Promise((resolve, reject) => {
    cmd.get('git status --no-renames -s', (err, data, stderr) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(
        data
          .split('\n')
          .filter(
            (datum) =>
              ['M', 'A'].includes(datum[0]) || ['M', 'A'].includes(datum[1]),
          )
          .map((datum) => datum.slice(3))
          .filter((filepath) => filepath.startsWith(scope)),
      );
    });
  });
}

export function getDependencies(
  codebaseGlob: string,
  ignoreGlob: string,
  fileGlobs: string[],
) {
  const codebase = glob.sync(codebaseGlob, {
    ignore: ignoreGlob,
  });

  compile(codebase, {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
  });

  const dependencies = fileGlobs
    .map((fileGlob) => glob.sync(fileGlob))
    .reduce((accumulator, current) => [...accumulator, ...current], [])
    .map(findDependencies);

  return fileGlobs.map((fileGlob, index) => ({
    fileName: fileGlob,
    dependencies: dependencies[index],
  }));
}

// console.log(
//   getDependencies('src/***/*.tsx', 'src/***/*.test.tsx', [
//     'src/components/Button/Button.tsx',
//     'src/components/Avatar/Avatar.tsx',
//   ]),
// );

// debugger;
