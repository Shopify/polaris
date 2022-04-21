import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";

// function retextSentenceSpacing() {
//   return (tree, file) => {
//     let isExamples = false;
//     visit(tree, (node, index, parent) => {
//       console.log(node.type, node.value);

//       if (node.type === "heading" && node.depth === 2) {
//         isExamples =
//           node.children.length === 1 &&
//           node.children[0].type === "text" &&
//           node.children[0].value === "Examples";
//       }

//       if (isExamples && index && parent) {
//         parent.children.splice(index, 1);
//         return [SKIP, index];
//       }
//     });
//   };
// }

// const fileWithoutExamples = await unified()
//   .use(remarkParse)
//   .use(retextSentenceSpacing)
//   .use(remarkRehype)
//   .use(rehypeStringify).process(`# Hello world!

// ## Ally

// Previous thingie

// ## Examples

// Some code goes here

// One

// Two

// Three

// Four

// ## 34

// rgars

// - li
// - lo

// ## Something
// eparg
// `);

//console.log(fileWithoutExamples);

let outTree;

function extractExamples() {
  return (tree, file) => {
    let isExamples = false;
    visit(tree, (node, index, parent) => {
      if (node.type === "heading" && node.depth === 2) {
        isExamples =
          node.children.length === 1 &&
          node.children[0].type === "text" &&
          node.children[0].value === "Examples";
      }

      if (!isExamples && parent) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
      outTree = tree;
    });
  };
}

const examplesOnly = await unified()
  .use(remarkParse)
  .use(extractExamples)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(
    `# Hello world!

## Ally

Previous thingie

## Examples

### With code

Amazing things going on here

## 3444

rgars

- li
- lo

## Something
eparg
`
  );

let currentExample = "";

let examples = {
  // something: {
  //   name: "My example",
  //   description: "Something something",
  //   code: "Foo",
  // },
};

visit(outTree, (node, index, parent) => {
  if (node.type === "heading") {
    if (node.depth === 3 && node.children.length === 1) {
      currentExample = node.children[0].value;
    }
  }
  if (node.type === "paragraph") {
    if (node.children.length === 1) {
      examples[currentExample] = {
        ...examples[currentExample],
        description: node.children[0].value,
      };
    }
  }

  if (node.type === "code") {
    console.log(code);
    if (node.children.length === 1) {
      examples[currentExample] = {
        ...examples[currentExample],
        description: node.children[0].value,
      };
    }
  }
});

console.log(examples);
